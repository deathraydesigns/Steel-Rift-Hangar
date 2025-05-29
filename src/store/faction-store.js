import {defineStore} from 'pinia';
import {computed, readonly, ref} from 'vue';
import {
    DWC_OUTRAGEOUS_SUPPORT_BUDGET,
    DWC_TOP_END_HARDWARE,
    FACTION_PERKS,
    isMatchingPerkOrCopy,
    RD_ADVANCED_HARDPOINT_DESIGN,
} from '../data/faction-perks.js';
import {
    DWC_TOP_END_HARDWARE_BONUS_TONS,
    FACTIONS,
    NO_FACTION,
    RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS,
} from '../data/factions.js';
import {find} from 'es-toolkit/compat';

export const useFactionStore = defineStore('faction', () => {

        const defaultFactionId = NO_FACTION;

        const perk_1_id = ref(null);
        const perk_2_id = ref(null);
        const faction_id = ref(defaultFactionId);

        function $reset() {
            faction_id.value = defaultFactionId;
            perk_1_id.value = null;
            perk_2_id.value = null;
        }

        const faction_display_name = computed(() => FACTIONS[faction_id.value].display_name);

        function perkBelongsToFaction(perkId) {
            return !!find(FACTIONS[faction_id.value].faction_perk_groups, (perkGroup) => {
                return perkGroup.perk_ids.includes(perkId);
            });
        }

        function hasPerk(perkId) {
            return isMatchingPerkOrCopy(perkId, perk_1_id.value) || isMatchingPerkOrCopy(perkId, perk_2_id.value);
        }

        function getMatchingPerkOrCopyInfo(perkId) {
            if (isMatchingPerkOrCopy(perkId, perk_1_id.value)) {
                return FACTION_PERKS[perk_1_id.value];
            }

            if (isMatchingPerkOrCopy(perkId, perk_2_id.value)) {
                return FACTION_PERKS[perk_2_id.value];
            }
        }

        function hasExactPerk(perkId) {
            return perkId === perk_1_id.value || perkId === perk_2_id.value;
        }

        function addPerk(perkId) {
            if (perk_1_id.value === null) {
                perk_1_id.value = perkId;
                return;
            }
            if (perk_2_id.value === null) {
                perk_2_id.value = perkId;
            }
        }

        function removePerk(perkId) {
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

        const perk_1_info = computed(() => FACTION_PERKS[perk_1_id.value]);
        const perk_2_info = computed(() => FACTION_PERKS[perk_2_id.value]);

        const perk_1_group_id = computed(() => findPerkGroupId(perk_1_id.value));
        const perk_2_group_id = computed(() => findPerkGroupId(perk_2_id.value));

        const perks_full = computed(() => {
            return !!(perk_1_id.value && perk_2_id.value);
        });

        function hasPerkInGroupId(groupId) {
            if (perk_1_group_id.value) {
                return perk_1_group_id.value === groupId;
            }
            if (perk_2_group_id.value) {
                return perk_2_group_id.value === groupId;
            }
            return false;
        }

        function findPerkGroupId(perkId) {
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

            return Object.values(perkGroups).map(({id, display_name, perk_ids}) => {
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

        const hasAdvancedHardPoints = computed(() => hasPerk(RD_ADVANCED_HARDPOINT_DESIGN));
        const hasOutrageousSupportBudget = computed(() => hasPerk(DWC_OUTRAGEOUS_SUPPORT_BUDGET));

        const advancedHardPointsInfo = computed(() => getMatchingPerkOrCopyInfo(RD_ADVANCED_HARDPOINT_DESIGN));

        const hasTopEndHardware = computed(() => hasPerk(DWC_TOP_END_HARDWARE));
        const topEndHardwareInfo = computed(() => getMatchingPerkOrCopyInfo(DWC_TOP_END_HARDWARE));

        const advancedHardPointsBonusSlots = computed(() => RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS);
        const topEndHardwareBonusTons = computed(() => DWC_TOP_END_HARDWARE_BONUS_TONS);

        const hasMaterielStockpilesInfo = computed(() => getMatchingPerkOrCopyInfo(DWC_TOP_END_HARDWARE));

        const factions_info = computed(() => {
            return readonly(Object.values(FACTIONS).map(({id, display_name}) => {
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
    },
    {
        persist: {
            enabled: true,
        },
    },
);