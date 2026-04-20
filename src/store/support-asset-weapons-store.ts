import { sumBy } from 'es-toolkit/compat';
import { storeToRefs } from 'pinia';
import { defineScopeableStore } from 'pinia-scope';
import { computed, readonly, ref, watch } from 'vue';
import { DWC_OUTRAGEOUS_SUPPORT_BUDGET, FACTION_PERKS, OI_ORBITAL_STOCKPILES } from '../data/faction-perks';
import { MECH_TEAM_PERKS, TEAM_PERK } from '../data/mech-team-perks';
import {
    type OffTableWeaponInfo,
    SUPPORT_ASSET_WEAPONS,
    type SupportAssetWeaponId,
    type SupportAssetWeaponInfo,
} from '../data/support-asset-weapons';
import { TRAIT_LIMITED, WEAPON_TRAITS, weaponTraitDisplayName } from '../data/weapon-traits';
import { useFactionStore } from './faction-store';
import { useTeamStore } from './team-store';

export const useSupportAssetWeaponsStore = defineScopeableStore('weapon-support-asset', ({ scope }: {
        scope: string
    }) => {
        const factionStore = useFactionStore(scope);
        const teamStore = useTeamStore(scope);

        const outrageous_budget_perk_support_asset_id = ref<SupportAssetWeaponId | null>(null);
        const support_asset_weapon_ids = ref<SupportAssetWeaponId[]>([]);

        function $reset() {
            support_asset_weapon_ids.value = [];
            outrageous_budget_perk_support_asset_id.value = null;
        }

        const available_support_asset_weapon_ids = computed(() => {
            return (Object.keys(SUPPORT_ASSET_WEAPONS) as SupportAssetWeaponId[])
                .filter((id) => !support_asset_weapon_ids.value.includes(id));
        });

        const available_support_asset_weapons_info = computed(() => {
            return available_support_asset_weapon_ids.value
                .map(id => getSupportAssetInfo(id));
        });

        const support_asset_weapons_info = computed(() => {
            return support_asset_weapon_ids.value
                .map(id => getSupportAssetInfo(id));
        });

        function getSupportAssetInfo(supportAssetId: SupportAssetWeaponId): SupportAssetWeaponInfo {
            let asset = SUPPORT_ASSET_WEAPONS[supportAssetId];
            const assetInfo = Object.assign({}, asset) as SupportAssetWeaponInfo;
            assetInfo.notes = [];

            const weapon = Object.assign({}, assetInfo.off_table_weapon) as OffTableWeaponInfo;
            weapon.traits = weapon.traits.map((trait) => Object.assign({}, trait));
            weapon.damage_modifiers = [];

            if (factionStore.hasPerk(OI_ORBITAL_STOCKPILES)) {
                let hasLimitedTrait = false;
                weapon.traits.forEach((trait) => {
                    if (trait.id === TRAIT_LIMITED) {
                        (trait.number as number) += 1;
                        hasLimitedTrait = true;
                    }
                });
                if (hasLimitedTrait) {
                    assetInfo.notes.push({
                        ...FACTION_PERKS[OI_ORBITAL_STOCKPILES],
                        display_name: FACTION_PERKS[OI_ORBITAL_STOCKPILES].display_name + ' Limit(+1) applied',
                        is_faction_perk: true,
                    });
                }
            }

            if (factionStore.hasPerk(DWC_OUTRAGEOUS_SUPPORT_BUDGET)) {
                if (assetInfo.id === outrageous_budget_perk_support_asset_id.value) {
                    assetInfo.cost = 0;
                    if (weapon.damage ?? 0 > 0) {
                        weapon.damage_modifiers.push(-1);
                    }

                    weapon.traits.forEach((trait) => {
                        if (typeof trait.number === 'number') {
                            trait.number -= 1;
                        }
                    });

                    assetInfo.notes.push({
                        ...FACTION_PERKS[DWC_OUTRAGEOUS_SUPPORT_BUDGET],
                        is_faction_perk: true,
                    });
                }
            }

            const perkIds = teamStore.allUsedTeamAbilityPerkIds;
            if (perkIds.includes(TEAM_PERK.SUPPORT_ASSET_DAMAGE)) {
                if (weapon.damage) {
                    weapon.damage_modifiers.push(1);

                    assetInfo.notes.push({
                        ...MECH_TEAM_PERKS[TEAM_PERK.SUPPORT_ASSET_DAMAGE],
                        is_team_perk: true,
                    });
                }
            }

            if (perkIds.includes(TEAM_PERK.DIRECTIONAL_ASSETS)) {
                assetInfo.notes.push({
                    ...MECH_TEAM_PERKS[TEAM_PERK.DIRECTIONAL_ASSETS],
                    is_team_perk: true,
                });
            }

            weapon.traits = weapon.traits.map((trait) => Object.assign({},
                trait,
                WEAPON_TRAITS[trait.id],
                { display_name: weaponTraitDisplayName(trait) },
            ));

            assetInfo.off_table_weapon = weapon;

            return readonly(assetInfo) as SupportAssetWeaponInfo;
        }

        function hasSupportAssetId(supportAssetId: SupportAssetWeaponId) {
            return support_asset_weapon_ids.value.includes(supportAssetId);
        }

        const used_tons = computed(() => sumBy(support_asset_weapons_info.value, 'cost'));
        const used_count = computed(() => support_asset_weapon_ids.value.length);

        function removeSupportAssetId(id: SupportAssetWeaponId) {
            let index = support_asset_weapon_ids.value.indexOf(id);
            if (index !== -1) {
                support_asset_weapon_ids.value.splice(index, 1);
            }

            syncOutrageousSupportBudget();
        }

        function addSupportAsset(id: SupportAssetWeaponId) {
            support_asset_weapon_ids.value.push(id);
        }

        function syncOutrageousSupportBudget() {
            if (!support_asset_weapon_ids.value.includes(outrageous_budget_perk_support_asset_id.value!)) {
                outrageous_budget_perk_support_asset_id.value = null;
            }
        }

        const { perk_1_id, perk_2_id } = storeToRefs(factionStore);

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
    }, (scope: string) => {
        return {
            persist: scope === '',
        };
    },
);
