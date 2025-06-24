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

export const useSecondaryAgendaStore = (prefix = '') => (defineStore(prefix + 'secondary-agenda', () => {

    const factionStore = useFactionStore(prefix);
    const teamStore = useTeamStore(prefix);
    const armyListStore = useArmyListStore(prefix);
    const mechStore = useMechStore(prefix);

    function $reset() {

    }

    const max_secondary_agendas = computed(() => {
        return armyListStore.game_size_info.max_secondary_agendas;
    });

    const secondary_agendas = computed(() => {
        const result = [];
        const factionId = factionStore.faction_id;
        if (factionId) {
            const faction = FACTIONS[factionId];
            const agendaId = faction.secondary_agenda_id;
            if (agendaId) {
                result.push(Object.assign({},
                    SECONDARY_AGENDAS[agendaId],
                    {
                        type_display_name: 'Faction',
                        subtype_display_name: faction.display_name,
                    },
                ));
            }
        }

        teamStore.teams.map(team => {
            if (teamStore.getTeamMechCount(team.id)) {
                const agendaId = MECH_TEAMS[team.id].secondary_agenda_id;
                if (agendaId) {
                    result.push(Object.assign({},
                        SECONDARY_AGENDAS[agendaId],
                        {
                            type_display_name: MECH_TEAMS[team.id].display_name,
                        },
                    ));
                }
            }
        });

        const sizesByCount = countBy(mechStore.mechs, mech => mech.size_id);

        if (sizesByCount[SIZE_LIGHT] >= 2) {
            result.push(SECONDARY_AGENDAS[SA_STALKERS]);
        }

        if (sizesByCount[SIZE_MEDIUM] >= 2) {
            result.push(SECONDARY_AGENDAS[SA_BRAWLERS]);
        }

        if (sizesByCount[SIZE_HEAVY] >= 2) {
            result.push(SECONDARY_AGENDAS[SA_ENFORCERS]);
        }

        if (sizesByCount[SIZE_ULTRA] >= 2) {
            result.push(SECONDARY_AGENDAS[SA_TITAN_KILLERS]);
        }

        return result;
    });

    const universal_secondary_agendas = computed(() => {
        return Object.values(SECONDARY_AGENDAS).filter(item => item.is_universal);
    });

    return {
        max_secondary_agendas,
        universal_secondary_agendas,
        secondary_agendas,
        $reset,
    };
}))();