import {defineStore} from 'pinia';
import {computed, readonly, ref} from 'vue';
import {
    BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE,
    DWC_TOP_END_HARDWARE,
    FACTION_PERKS,
    isMatchingPerkOrCopy,
    OI_MATERIEL_STOCKPILES,
    RD_ADVANCED_HARDPOINT_DESIGN,
    UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN,
} from '../data/faction-perks.js';
import {find} from 'lodash';
import {getter} from './helpers/store-helpers.js';
import {
    DWC_TOP_END_HARDWARE_BONUS_TONS,
    FACTIONS,
    NO_FACTION,
    RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS,
} from '../data/factions.js';

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

        const perkBelongsToFaction = getter((perkId) => {
            return !!find(FACTIONS[faction_id.value].faction_perk_groups, (perkGroup) => {
                return perkGroup.perk_ids.includes(perkId);
            });
        });

        const hasPerk = getter((perkId) => perkId === perk_1_id.value || perkId === perk_2_id.value);

        const hasPerkOrCopiedPerk = getter((perkId) => {
            return isMatchingPerkOrCopy(perkId, perk_1_id.value) || isMatchingPerkOrCopy(perkId, perk_2_id.value);
        });

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
            if (!perkBelongsToFaction.value(perk_1_id.value)) {
                perk_1_id.value = null;
            }

            if (!perkBelongsToFaction.value(perk_2_id.value)) {
                perk_2_id.value = null;
            }
        }

        const perk_1_info = computed(() => FACTION_PERKS[perk_1_id.value]);
        const perk_2_info = computed(() => FACTION_PERKS[perk_2_id.value]);

        const perk_1_group_id = computed(() => findPerkGroupId.value(perk_1_id.value));
        const perk_2_group_id = computed(() => findPerkGroupId.value(perk_2_id.value));

        const perks_full = computed(() => {
            return !!(perk_1_id.value && perk_2_id.value);
        });

        const hasPerkInGroupId = getter((groupId) => {
            if (perk_1_group_id.value) {
                return perk_1_group_id.value === groupId;
            }
            if (perk_2_group_id.value) {
                return perk_2_group_id.value === groupId;
            }
            return false;
        });

        const findPerkGroupId = getter((perkId) => {
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
        });

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

        const hasAdvancedHardPoints = computed(() => {
            return hasPerkOrCopiedPerk.value(RD_ADVANCED_HARDPOINT_DESIGN);
        });

        const advancedHardPointsInfo = computed(() => {
            if (hasPerk.value(RD_ADVANCED_HARDPOINT_DESIGN)) {
                return FACTION_PERKS[RD_ADVANCED_HARDPOINT_DESIGN];
            }
            if (hasPerk.value(UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN)) {
                return FACTION_PERKS[UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN];
            }
        });

        const hasTopEndHardware = computed(() => {
            return hasPerkOrCopiedPerk.value(DWC_TOP_END_HARDWARE);
        });
        const topEndHardwareInfo = computed(() => {
            if (hasPerk.value(DWC_TOP_END_HARDWARE)) {
                return FACTION_PERKS[DWC_TOP_END_HARDWARE];
            }
            if (hasPerk.value(BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE)) {
                return FACTION_PERKS[BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE];
            }
        });

        const advancedHardPointsBonusSlots = computed(() => RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS);
        const topEndHardwareBonusTons = computed(() => DWC_TOP_END_HARDWARE_BONUS_TONS);

        const materielStockpilesPerk = computed(() => {
            return FACTION_PERKS[OI_MATERIEL_STOCKPILES];
        });

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
            materielStockpilesPerk,

            $reset,
        };
    },
    {
        persist: {
            enabled: true,
        },
    },
);