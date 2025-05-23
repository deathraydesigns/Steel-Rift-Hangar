import {defineStore} from 'pinia';
import {computed} from 'vue';
import {useFactionStore} from './faction-store.js';
import {FACTIONS} from '../data/factions.js';
import {useTeamStore} from './team-store.js';
import {MECH_TEAMS} from '../data/mech-teams.js';
import {
    SA_BRAWLERS,
    SA_ENFORCERS,
    SA_STALKERS,
    SA_TITAN_KILLERS,
    SECONDARY_AGENDAS,
} from '../data/secondary-agendas.js';
import {useArmyListStore} from './army-list-store.js';
import {useMechStore} from './mech-store.js';
import {SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM, SIZE_ULTRA} from '../data/unit-sizes.js';
import {countBy} from 'es-toolkit';

export const useSecondaryAgendaStore = defineStore('secondary-agenda', () => {

    const factionStore = useFactionStore();
    const teamStore = useTeamStore();
    const armyListStore = useArmyListStore();
    const mechStore = useMechStore();

    function $reset() {

    }

    const max_secondary_agendas = computed(() => {
        return armyListStore.game_size_info.max_secondary_agendas;
    });

    const secondary_agendas = computed(() => {
        const result = [];
        const factionId = factionStore.faction_id;
        if (factionId) {
            const agendaId = FACTIONS[factionId].secondary_agenda_id;
            if (agendaId) {
                result.push(Object.assign({},
                    SECONDARY_AGENDAS[agendaId],
                    {
                        type: 'Faction',
                        type_display_name: FACTIONS[factionId].display_name,
                    },
                ));
            }
        }

        teamStore.teams.map(team => {
            if (teamStore.getTeamMechCount(team.id)) {
                const agendaId = MECH_TEAMS[team.id].secondary_agenda;
                if (agendaId) {
                    result.push(Object.assign({},
                        SECONDARY_AGENDAS[agendaId],
                        {
                            type: null,
                            type_display_name: MECH_TEAMS[team.id].display_name,
                        },
                    ));
                }
            }
        });

        const sizesByCount = countBy(mechStore.mechs, mech => mech.size_id);

        if (sizesByCount[SIZE_LIGHT] === 2) {
            result.push(Object.assign({},
                SECONDARY_AGENDAS[SA_STALKERS],
                {
                    type: null,
                    type_display_name: 'Universal',
                },
            ));
        }
        if (sizesByCount[SIZE_MEDIUM] === 2) {
            result.push(Object.assign({},
                SECONDARY_AGENDAS[SA_BRAWLERS],
                {
                    type: null,
                    type_display_name: 'Universal',
                },
            ));
        }

        if (sizesByCount[SIZE_HEAVY] === 2) {
            result.push(Object.assign({},
                SECONDARY_AGENDAS[SA_ENFORCERS],
                {
                    type: null,
                    type_display_name: 'Universal',
                },
            ));
        }

        if (sizesByCount[SIZE_ULTRA] === 2) {
            result.push(Object.assign({},
                SECONDARY_AGENDAS[SA_TITAN_KILLERS],
                {
                    type: 'Opponent Eligible',
                    type_display_name: 'Universal',
                },
            ));
        }

        return result;
    });

    return {
        max_secondary_agendas,
        secondary_agendas,
        $reset,
    };
});