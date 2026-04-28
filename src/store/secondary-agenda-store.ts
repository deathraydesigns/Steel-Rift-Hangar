import { countBy } from 'es-toolkit';
import { defineScopeableStore } from 'pinia-scope';
import { computed } from 'vue';
import { FACTIONS } from '../data/factions';
import { MECH_TEAMS } from '../data/mech-teams';
import {
    SECONDARY_AGENDA,

    SECONDARY_AGENDAS,
    type SecondaryAgenda,
} from '../data/secondary-agendas';
import { SIZE } from '../data/unit-sizes';
import { useArmyListStore } from './army-list-store';
import { useFactionStore } from './faction-store';
import { useMechStore } from './mech-store';
import { useTeamStore } from './team-store';

export const useSecondaryAgendaStore = defineScopeableStore('secondary-agenda', ({ scope }: { scope: string }) => {

    const factionStore = useFactionStore(scope);
    const teamStore = useTeamStore(scope);
    const armyListStore = useArmyListStore(scope);
    const mechStore = useMechStore(scope);

    function $reset() {

    }

    const max_secondary_agendas = computed(() => {
        return armyListStore.game_size_info.max_secondary_agendas;
    });

    const secondary_agendas = computed(() => {
        const result: SecondaryAgenda[] = [];
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

        teamStore.teams.map((team) => {
            if (teamStore.getTeamUnitCount(team.id)) {
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

        const sizesByCount = countBy(mechStore.mechs, (mech) => mech.size_id);

        if (sizesByCount[SIZE.LIGHT] >= 2) {
            result.push(SECONDARY_AGENDAS[SECONDARY_AGENDA.STALKERS]);
        }

        if (sizesByCount[SIZE.MEDIUM] >= 2) {
            result.push(SECONDARY_AGENDAS[SECONDARY_AGENDA.BRAWLERS]);
        }

        if (sizesByCount[SIZE.HEAVY] >= 2) {
            result.push(SECONDARY_AGENDAS[SECONDARY_AGENDA.ENFORCERS]);
        }

        if (sizesByCount[SIZE.ULTRA] >= 2) {
            result.push(SECONDARY_AGENDAS[SECONDARY_AGENDA.TITAN_KILLERS]);
        }

        return result;
    });

    const universal_secondary_agendas = computed(() => {
        return Object.values(SECONDARY_AGENDAS).filter((item) => item.is_universal);
    });

    return {
        max_secondary_agendas,
        universal_secondary_agendas,
        secondary_agendas,
        $reset,
    };
});
