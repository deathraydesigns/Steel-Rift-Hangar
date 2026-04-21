import { defineScopeableStore } from 'pinia-scope';
import { computed, readonly, ref } from 'vue';
import { FACTION_PERK, FACTION_PERKS, type FactionPerkInfo, isMatchingPerkOrCopy } from '../data/faction-perks';
import {
    DWC_TOP_END_HARDWARE_BONUS_TONS,
    FACTION,
    FACTIONS,
    RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS,
} from '../data/factions';

export const useFactionStore = defineScopeableStore('faction', ({ scope }: { scope: string }) => {

        const defaultFactionId = FACTION.NO_FACTION;

        const perk_1_id = ref<FACTION_PERK | null>(null);
        const perk_2_id = ref<FACTION_PERK | null>(null);
        const faction_id = ref<FACTION>(defaultFactionId);

        function $reset() {
            faction_id.value = defaultFactionId;
            perk_1_id.value = null;
            perk_2_id.value = null;
        }

        const faction_display_name = computed(() => FACTIONS[faction_id.value].display_name);

        function perkBelongsToFaction(perkId: FACTION_PERK | null) {
            if (!perkId) return false;
            return !!Object.values(FACTIONS[faction_id.value].faction_perk_groups).find((perkGroup) => {
                return perkGroup.perk_ids.includes(perkId);
            });
        }

        function hasPerk(perkId: FACTION_PERK) {
            return isMatchingPerkOrCopy(perkId, perk_1_id.value) || isMatchingPerkOrCopy(perkId, perk_2_id.value);
        }

        function getMatchingPerkOrCopyInfo(perkId: FACTION_PERK) {
            if (isMatchingPerkOrCopy(perkId, perk_1_id.value)) {
                return FACTION_PERKS[perk_1_id.value!];
            }

            if (isMatchingPerkOrCopy(perkId, perk_2_id.value)) {
                return FACTION_PERKS[perk_2_id.value!];
            }
        }

        function hasExactPerk(perkId: FACTION_PERK) {
            return perkId === perk_1_id.value || perkId === perk_2_id.value;
        }

        function addPerk(perkId: FACTION_PERK) {
            if (perk_1_id.value === null) {
                perk_1_id.value = perkId;
                return;
            }
            if (perk_2_id.value === null) {
                perk_2_id.value = perkId;
            }
        }

        function removePerk(perkId: string) {
            if (perk_1_id.value === perkId) {
                perk_1_id.value = null;
                return;
            }
            if (perk_2_id.value === perkId) {
                perk_2_id.value = null;
            }
        }

        function clearInvalidPerks() {
            if (!perkBelongsToFaction(perk_1_id.value)) {
                perk_1_id.value = null;
            }

            if (!perkBelongsToFaction(perk_2_id.value)) {
                perk_2_id.value = null;
            }
        }

        function getPerkInfo(perkId: FACTION_PERK | null): null | FactionPerkInfo {
            if (!perkId || !FACTION_PERKS[perkId]) {
                return null;
            }
            const perk = FACTION_PERKS[perkId];
            const optional_perks = perk.optional_perks?.map((p) => FACTION_PERKS[p]) ?? [];
            return { ...perk, optional_perks };
        }

        const perk_1_info = computed(() => getPerkInfo(perk_1_id.value));
        const perk_2_info = computed(() => getPerkInfo(perk_2_id.value));

        const perk_1_group_id = computed(() => findPerkGroupId(perk_1_id.value));
        const perk_2_group_id = computed(() => findPerkGroupId(perk_2_id.value));

        const perks_full = computed(() => {
            return !!(perk_1_id.value && perk_2_id.value);
        });

        function hasPerkInGroupId(groupId: string) {
            if (perk_1_group_id.value) {
                return perk_1_group_id.value === groupId;
            }
            if (perk_2_group_id.value) {
                return perk_2_group_id.value === groupId;
            }
            return false;
        }

        function findPerkGroupId(perkId: FACTION_PERK | null) {
            if (!perkId) return;
            const factions = Object.values(FACTIONS);
            for (let i = 0; i < factions.length; i++) {
                const faction = factions[i];

                const groups = Object.values(faction.faction_perk_groups);
                for (let j = 0; j < groups.length; j++) {

                    const group = groups[j];

                    if (group.perk_ids.includes(perkId)) {
                        return group.id;
                    }
                }
            }
        }

        const perk_grid = computed(() => {
            let perkGroups = FACTIONS[faction_id.value].faction_perk_groups;

            return Object.values(perkGroups).map(({ id, display_name, perk_ids }) => {
                return {
                    id,
                    display_name,
                    perks: perk_ids.map((perkId) => {
                        const {
                            id,
                            display_name,
                            description,
                        } = FACTION_PERKS[perkId];
                        return {
                            id,
                            display_name,
                            description,
                        };
                    }),
                };
            });
        });

        const hasAdvancedHardPoints = computed(() => hasPerk(FACTION_PERK.RD_ADVANCED_HARDPOINT_DESIGN));
        const hasOutrageousSupportBudget = computed(() => hasPerk(FACTION_PERK.DWC_OUTRAGEOUS_SUPPORT_BUDGET));

        const advancedHardPointsInfo = computed(() => getMatchingPerkOrCopyInfo(FACTION_PERK.RD_ADVANCED_HARDPOINT_DESIGN));

        const hasTopEndHardware = computed(() => hasPerk(FACTION_PERK.DWC_TOP_END_HARDWARE));
        const topEndHardwareInfo = computed(() => getMatchingPerkOrCopyInfo(FACTION_PERK.DWC_TOP_END_HARDWARE));

        const advancedHardPointsBonusSlots = computed(() => RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS);
        const topEndHardwareBonusTons = computed(() => DWC_TOP_END_HARDWARE_BONUS_TONS);

        const hasMaterielStockpilesInfo = computed(() => getMatchingPerkOrCopyInfo(FACTION_PERK.OI_MATERIEL_STOCKPILES));

        const factions_info = computed(() => {
            return readonly(Object.values(FACTIONS).map(({ id, display_name }) => {
                return {
                    id, display_name,
                };
            }));
        });

        return {
            perk_1_id,
            perk_2_id,
            perk_1_group_id,
            perk_2_group_id,
            perk_1_info,
            perk_2_info,
            faction_id,
            faction_display_name,
            perks_full,
            factions_info,
            perk_grid,

            addPerk,
            removePerk,
            clearInvalidPerks,
            hasPerkInGroupId,
            hasPerk,

            hasAdvancedHardPoints,
            advancedHardPointsInfo,
            advancedHardPointsBonusSlots,
            topEndHardwareBonusTons,
            hasTopEndHardware,
            topEndHardwareInfo,
            hasMaterielStockpilesInfo,
            hasOutrageousSupportBudget,

            $reset,
        };
    }, (scope: string) => {
        return {
            persist: scope === '',
        };
    },
);
