import {storeToRefs} from 'pinia';
import {computed, readonly, ref, watch} from 'vue';
import {sumBy} from 'es-toolkit/compat';
import {useFactionStore} from './faction-store.js';
import {TRAIT_LIMITED, WEAPON_TRAITS, weaponTraitDisplayName} from '../data/weapon-traits.js';
import {DWC_OUTRAGEOUS_SUPPORT_BUDGET, FACTION_PERKS, OI_ORBITAL_STOCKPILES} from '../data/faction-perks.js';
import {SUPPORT_ASSET_WEAPONS} from '../data/support-asset-weapons.js';
import {useTeamStore} from './team-store.js';
import {
    MECH_TEAM_PERKS,
    TEAM_PERK_DIRECTIONAL_ASSETS,
    TEAM_PERK_SUPPORT_ASSET_DAMAGE,
} from '../data/mech-team-perks.js';
import {defineScopeableStore} from 'pinia-scope';

export const useSupportAssetWeaponsStore = defineScopeableStore('weapon-support-asset', ({scope}) => {

        const factionStore = useFactionStore(scope);
        const teamStore = useTeamStore(scope);

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
                .map(id => getSupportAssetInfo(id));
        });

        const support_asset_weapons_info = computed(() => {
            return support_asset_weapon_ids.value
                .map(id => getSupportAssetInfo(id));
        });

        function getSupportAssetInfo(supportAssetId) {
            let asset = SUPPORT_ASSET_WEAPONS[supportAssetId];
            asset = Object.assign({}, asset);
            asset.notes = [];

            const weapon = Object.assign({}, asset.off_table_weapon);
            weapon.traits = weapon.traits.map((trait) => Object.assign({}, trait));
            weapon.damage_modifiers = [];

            if (factionStore.hasPerk(OI_ORBITAL_STOCKPILES)) {
                let hasLimitedTrait = false;
                weapon.traits.forEach((trait) => {
                    if (trait.id === TRAIT_LIMITED) {
                        trait.number += 1;
                        hasLimitedTrait = true;
                    }
                });
                if (hasLimitedTrait) {
                    asset.notes.push({
                        ...FACTION_PERKS[OI_ORBITAL_STOCKPILES],
                        display_name: FACTION_PERKS[OI_ORBITAL_STOCKPILES].display_name + ' Limit(+1) applied',
                        is_faction_perk: true,
                    });
                }
            }

            if (factionStore.hasPerk(DWC_OUTRAGEOUS_SUPPORT_BUDGET)) {
                if (asset.id === outrageous_budget_perk_support_asset_id.value) {
                    asset.cost = 0;
                    if (weapon.damage > 0) {
                        weapon.damage_modifiers.push(-1);
                    }

                    weapon.traits.forEach((trait) => {
                        if (trait.number) {
                            trait.number -= 1;
                        }
                    });

                    asset.notes.push({
                        ...FACTION_PERKS[DWC_OUTRAGEOUS_SUPPORT_BUDGET],
                        is_faction_perk: true,
                    });
                }
            }

            const perkIds = teamStore.allUsedTeamAbilityPerkIds;
            if (perkIds.includes(TEAM_PERK_SUPPORT_ASSET_DAMAGE)) {
                if (weapon.damage) {
                    weapon.damage_modifiers.push(1);

                    asset.notes.push({
                        ...MECH_TEAM_PERKS[TEAM_PERK_SUPPORT_ASSET_DAMAGE],
                        is_team_perk: true,
                    });
                }
            }

            if (perkIds.includes(TEAM_PERK_DIRECTIONAL_ASSETS)) {
                asset.notes.push({
                    ...MECH_TEAM_PERKS[TEAM_PERK_DIRECTIONAL_ASSETS],
                    is_team_perk: true,
                });
            }

            weapon.traits = weapon.traits.map(trait => Object.assign({},
                trait,
                WEAPON_TRAITS[trait.id],
                {display_name: weaponTraitDisplayName(trait)},
            ));

            asset.off_table_weapon = weapon;

            return readonly(asset);
        }

        function hasSupportAssetId(supportAssetId) {
            return support_asset_weapon_ids.value.includes(supportAssetId);
        }

        const used_tons = computed(() => sumBy(support_asset_weapons_info.value, 'cost'));
        const used_count = computed(() => support_asset_weapon_ids.value.length);

        function removeSupportAssetId(id) {
            let index = support_asset_weapon_ids.value.indexOf(id);
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
    (scope) => {
        return {
            persist: scope === '',
        };
    },
);