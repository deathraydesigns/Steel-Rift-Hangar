import {defineStore} from 'pinia';
import {computed} from 'vue';
import {useFactionStore} from './faction-store.js';
import {FACTIONS} from '../data/factions.js';
import {useTeamStore} from './team-store.js';
import {MECH_TEAMS} from '../data/mech-teams.js';
import {SECONDARY_AGENDAS} from '../data/secondary-agendas.js';
import {useArmyListStore} from './army-list-store.js';

export const useSecondaryAgendaStore = defineStore('secondary-agenda', () => {

    const factionStore = useFactionStore();
    const teamStore = useTeamStore();
    const armyListStore = useArmyListStore();

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
                            type: 'Team',
                            type_display_name: MECH_TEAMS[team.id].display_name,
                        },
                    ));
                }
            }
        });
        return result;
    });

    return {
        max_secondary_agendas,
        secondary_agendas,
        $reset,
    };
});