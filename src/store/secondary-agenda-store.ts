import { countBy } from 'es-toolkit';
import { defineScopeableStore } from 'pinia-scope';
import { computed } from 'vue';
import { FACTIONS } from '../data/factions';
import { MECH_TEAMS } from '../data/mech-teams';
import {
    SA_BRAWLERS,
    SA_ENFORCERS,
    SA_STALKERS,
    SA_TITAN_KILLERS,
    SECONDARY_AGENDAS,
} from '../data/secondary-agendas';
import { SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM, SIZE_ULTRA } from '../data/unit-sizes';
import { useArmyListStore } from './army-list-store';
import { useFactionStore } from './faction-store';
import { useMechStore } from './mech-store';
import { useTeamStore } from './team-store';

export const useSecondaryAgendaStore = defineScopeableStore('secondary-agenda', ({ scope }: { scope: string }) => {

    const factionStore = useFactionStore(scope) as any;
    const teamStore = useTeamStore(scope) as any;
    const armyListStore = useArmyListStore(scope) as any;
    const mechStore = useMechStore(scope) as any;

    function $reset() {

    }

    const max_secondary_agendas = computed(() => {
        return armyListStore.game_size_info.max_secondary_agendas;
    });

    const secondary_agendas = computed(() => {
        const result: any[] = [];
        const factionId = factionStore.faction_id;
        if (factionId) {
            const faction = (FACTIONS as any)[factionId];
            const agendaId = faction.secondary_agenda_id;
            if (agendaId) {
                result.push(Object.assign({},
                    (SECONDARY_AGENDAS as any)[agendaId],
                    {
                        type_display_name: 'Faction',
                        subtype_display_name: faction.display_name,
                    },
                ));
            }
        }

        teamStore.teams.map((team: any) => {
            if (teamStore.getTeamMechCount(team.id)) {
                const agendaId = (MECH_TEAMS as any)[team.id].secondary_agenda_id;
                if (agendaId) {
                    result.push(Object.assign({},
                        (SECONDARY_AGENDAS as any)[agendaId],
                        {
                            type_display_name: (MECH_TEAMS as any)[team.id].display_name,
                        },
                    ));
                }
            }
        });

        const sizesByCount = countBy(mechStore.mechs, (mech: any) => mech.size_id);

        if ((sizesByCount as any)[SIZE_LIGHT] >= 2) {
            result.push((SECONDARY_AGENDAS as any)[SA_STALKERS]);
        }

        if ((sizesByCount as any)[SIZE_MEDIUM] >= 2) {
            result.push((SECONDARY_AGENDAS as any)[SA_BRAWLERS]);
        }

        if ((sizesByCount as any)[SIZE_HEAVY] >= 2) {
            result.push((SECONDARY_AGENDAS as any)[SA_ENFORCERS]);
        }

        if ((sizesByCount as any)[SIZE_ULTRA] >= 2) {
            result.push((SECONDARY_AGENDAS as any)[SA_TITAN_KILLERS]);
        }

        return result;
    });

    const universal_secondary_agendas = computed(() => {
        return Object.values(SECONDARY_AGENDAS).filter((item: any) => item.is_universal);
    });

    return {
        max_secondary_agendas,
        universal_secondary_agendas,
        secondary_agendas,
        $reset,
    };
});
