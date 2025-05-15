import {defineStore, storeToRefs} from 'pinia';
import {computed, readonly, ref, watch} from 'vue';
import {indexOf, sumBy} from 'lodash';
import {useFactionStore} from './faction-store.js';
import {TRAIT_LIMITED, weaponTraitDisplayName, WEAPON_TRAITS} from '../data/weapon-traits.js';
import {DWC_OUTRAGEOUS_SUPPORT_BUDGET, FACTION_PERKS, OI_ORBITAL_STOCKPILES} from '../data/faction-perks.js';
import {getter} from './helpers/store-helpers.js';
import {SUPPORT_ASSET_WEAPONS} from '../data/support-asset-weapons.js';

export const useSupportAssetWeaponsStore = defineStore('weapon-support-asset', () => {

        const factionStore = useFactionStore();

        const outrageous_budget_perk_support_asset_id = ref(null);
        const support_asset_weapon_ids = ref([]);

        function $reset() {
            support_asset_weapon_ids.value = [];
            outrageous_budget_perk_support_asset_id.value = null;
        }

        const available_support_asset_weapon_ids = computed(() => {
            return Object.keys(SUPPORT_ASSET_WEAPONS)
                .filter(id => !support_asset_weapon_ids.value.includes(id));
        });

        const available_support_asset_weapons_info = computed(() => {
            return available_support_asset_weapon_ids.value
                .map(id => getSupportAssetInfo.value(id));
        });

        const support_asset_weapons_info = computed(() => {
            return support_asset_weapon_ids.value
                .map(id => getSupportAssetInfo.value(id));
        });

        const getSupportAssetInfo = getter(supportAssetId => {
            let asset = SUPPORT_ASSET_WEAPONS[supportAssetId];
            asset = Object.assign({}, asset);

            const weapon = Object.assign({}, asset.off_table_weapon);
            weapon.traits = weapon.traits.map((trait) => Object.assign({}, trait));

            if (factionStore.hasPerk(OI_ORBITAL_STOCKPILES)) {
                weapon.traits.forEach((trait) => {
                    if (trait.id === TRAIT_LIMITED) {
                        trait.number += 1;
                    }
                });
                const note = FACTION_PERKS[OI_ORBITAL_STOCKPILES].display_name;

                asset.notes.push(`${note} Limit(+1)`);
            }

            if (factionStore.hasPerk(DWC_OUTRAGEOUS_SUPPORT_BUDGET)) {
                if (asset.id === outrageous_budget_perk_support_asset_id.value) {
                    asset.cost = 0;
                    if (weapon.damage > 0) {
                        weapon.damage -= 1;
                    }

                    weapon.traits.forEach((trait) => {
                        if (trait.number) {
                            trait.number -= 1;
                        }
                    });

                    const note = FACTION_PERKS[DWC_OUTRAGEOUS_SUPPORT_BUDGET].display_name;

                    asset.notes.push(note);
                }
            }

            weapon.traits = weapon.traits.map(trait => Object.assign({},
                trait,
                WEAPON_TRAITS[trait.id],
                {display_name: weaponTraitDisplayName(trait)},
            ));

            asset.off_table_weapon = weapon;

            return readonly(asset);
        });

        const hasSupportAssetId = getter(supportAssetId => support_asset_weapon_ids.value.includes(supportAssetId));

        const used_tons = computed(() => sumBy(support_asset_weapons_info.value, 'cost'));
        const used_count = computed(() => support_asset_weapon_ids.value.length);

        function removeSupportAssetId(id) {
            let index = indexOf(support_asset_weapon_ids.value, id);
            support_asset_weapon_ids.value.splice(index, 1);

            syncOutrageousSupportBudget();
        }

        function addSupportAsset(id) {
            support_asset_weapon_ids.value.push(id);
        }

        function syncOutrageousSupportBudget() {
            if (!support_asset_weapon_ids.value.includes(outrageous_budget_perk_support_asset_id.value)) {
                outrageous_budget_perk_support_asset_id.value = null;
            }
        }

        const {perk_1_id, perk_2_id} = storeToRefs(factionStore);

        function syncOutrageousSupportBudgetPerk() {
            if (!factionStore.hasPerk(DWC_OUTRAGEOUS_SUPPORT_BUDGET)) {
                outrageous_budget_perk_support_asset_id.value = null;
            }
        }

        watch(perk_1_id, syncOutrageousSupportBudgetPerk);
        watch(perk_2_id, syncOutrageousSupportBudgetPerk);
        return {
            support_asset_weapon_ids,
            outrageous_budget_perk_support_asset_id,
            used_tons,
            used_count,

            support_asset_weapons_info,
            available_support_asset_weapons_info,

            getSupportAssetInfo,
            removeSupportAssetId,
            addSupportAsset,
            hasSupportAssetId,
            $reset,
        };
    },
    {
        persist: true,
    },
);