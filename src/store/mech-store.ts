import { sortBy, sumBy } from 'es-toolkit';
import { defineScopeableStore } from 'pinia-scope';
import { computed, readonly, ref } from 'vue';
import { trait, updateObject } from '../data/data-helpers';
import type { FactionPerk } from '../data/faction-perks';
import { DWC_TOP_END_HARDWARE_BONUS_TONS, RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS } from '../data/factions';
import { MECH_ARMOR_UPGRADE, MECH_ARMOR_UPGRADES } from '../data/mech-armor-upgrades';
import { MECH_BODY_MOD } from '../data/mech-body-mod';
import { MECH_MOBILITIES, MECH_MOBILITY } from '../data/mech-mobility';
import { MECH_TEAM_PERKS, TEAM_PERK, type TeamPerkInfo } from '../data/mech-team-perks';
import { MECH_TEAM } from '../data/mech-teams';
import {
    getMechUpgradeTraitsInfo,
    MECH_UPGRADE,
    MECH_UPGRADES,
    MechDroneUpgradeAttachType,
    type MechUpgrade,
} from '../data/mech-upgrades';
import { MECH_WEAPON, MECH_WEAPONS, MECH_WEAPONS_BY_TYPE, type MechWeaponInfo } from '../data/mech-weapons';
import { MECH_SIZES, type MechSizeId, SIZE } from '../data/unit-sizes';
import { UNIT_TYPE } from '../data/unit-types';
import { UPGRADE_TRAIT, UPGRADE_TRAITS, upgradeTraitDisplayName } from '../data/upgrade-traits';
import { WEAPON_TRAIT, weaponTraitInfo } from '../data/weapon-traits';
import { toaster } from '../toaster';
import type { MechArmorUpgradeInfo, MechUpgradeInfo, TraitInfo } from '../types';
import {
    type Mech,
    type MechInfo,
    type MechUpgradeAttachment,
    type MechUpgradeAttachmentInfo,
    type MechUpgradeTraitsInfo,
    type MechWeaponAttachment,
    type MechWeaponAttachmentInfo,
    type Trait,
} from '../types';
import { useFactionStore } from './faction-store';
import { deleteItemById, findBy, findById, findItemIndex, moveItem } from './helpers/collection-helper';
import { type GrantedOrderCollection, makeGrantedOrderCollection } from './helpers/helpers';
import { useMechArmorStore } from './mech-armor-store';
import { useTeamStore } from './team-store';
import { useValidationStore } from './validation-store';

export type AddMechOptions = {
    size_id?: MechSizeId,
    structure_mod_id?: MECH_BODY_MOD,
    armor_mod_id?: MECH_BODY_MOD,
    armor_upgrade_ids?: MECH_ARMOR_UPGRADE[],
    aux_armor_upgrade_id?: MECH_ARMOR_UPGRADE | null,
    mobility_id?: MECH_MOBILITY,
    preferred_team_id?: MECH_TEAM,
    name?: string,
};
export const useMechStore = defineScopeableStore('mech', ({ scope }: { scope: string }) => {
        const teamStore = useTeamStore(scope);
        const validationStore = useValidationStore(scope);
        const factionStore = useFactionStore(scope);
        const mechArmorStore = useMechArmorStore(scope);

        const mechs = ref<Mech[]>([]);
        const mechs_id_increment = ref(1);

        function $reset() {
            mechs.value = [];
            mechs_id_increment.value = 1;
        }

        function addMech(
            {
                size_id,
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_ids,
                aux_armor_upgrade_id,
                mobility_id,
                preferred_team_id,
                name = '',
            }: AddMechOptions) {

            size_id = size_id ?? SIZE.MEDIUM;
            structure_mod_id = structure_mod_id ?? MECH_BODY_MOD.STANDARD;
            armor_mod_id = armor_mod_id ?? MECH_BODY_MOD.STANDARD;
            aux_armor_upgrade_id = aux_armor_upgrade_id ?? MECH_ARMOR_UPGRADE.CERAMIC_ARMOR_UPGRADE;
            const maxArmorUpgrades = MECH_SIZES[size_id].max_armor_upgrades;

            const baseArmorUpgradeIds = new Array(maxArmorUpgrades).fill(MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE);
            if (!armor_upgrade_ids?.length) {
                armor_upgrade_ids = baseArmorUpgradeIds;
            } else if (armor_upgrade_ids?.length !== maxArmorUpgrades) {
                armor_upgrade_ids = [...armor_upgrade_ids, ...baseArmorUpgradeIds].slice(0, maxArmorUpgrades);
            }
            mobility_id = mobility_id ?? MECH_MOBILITY.BI_PEDAL;
            preferred_team_id = teamStore.normalizePreferredTeamId(preferred_team_id ?? MECH_TEAM.GENERAL);

            let id = mechs_id_increment.value++;
            let mech: Mech = {
                id,
                name,
                size_id,
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_ids,
                aux_armor_upgrade_id,
                mobility_id,
                preferred_team_id,
                weapons: [],
                weapons_id_increment: 1,
                upgrades: [],
                upgrades_id_increment: 1,
                display_order: null,
                unit_type_id: UNIT_TYPE.HEV,
            };

            mechs.value.push(mech);
            mech.display_order = findItemIndex(mechs.value, mech) as number;

            return id;
        }

        function updateMech(mechId: number, data: Partial<Mech>) {
            let mech = findById(mechs.value, mechId);
            if (mech) {
                updateObject(mech, data, [
                    'name',
                    'size_id',
                    'structure_mod_id',
                    'armor_mod_id',
                    'armor_upgrade_ids',
                    'mobility_id',
                    'preferred_team_id',
                ]);

                if (data.size_id) {
                    removeInvalidMechAttachments(mechId);
                }
            }
        }

        function duplicateMech(mechId: number) {

            const mech = getMech(mechId);
            if (!mech) return;

            const {
                teamId,
                groupId,
            } = teamStore.getMechTeamAndGroupIds(mechId);

            const newMechId = teamStore.addMechToTeam(teamId, groupId);

            const {
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_ids,
                mobility_id,
                size_id,
                weapons,
                upgrades,
            } = mech;

            updateMech(newMechId, {
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_ids,
                mobility_id,
                size_id,
            });

            weapons.forEach(weapon => {
                addMechWeaponAttachment(newMechId, weapon.weapon_id);
            });

            upgrades.forEach(upgrade => {
                addMechUpgradeAttachment(newMechId, upgrade.upgrade_id, upgrade.drone_attachment_target_id);
            });
        }

        function removeMech(mechId: number) {
            teamStore.removeMechFromTeam(mechId);
            deleteItemById(mechs.value, mechId);
        }

        function addMechWeaponAttachment(mechId: number, weaponId: MECH_WEAPON) {
            let mech = findById(mechs.value, mechId);
            if (mech) {
                let id = mech.weapons_id_increment++;
                let weapon: MechWeaponAttachment = {
                    id,
                    weapon_id: weaponId,
                    display_order: null,
                };
                mech.weapons.push(weapon);
                weapon.display_order = findItemIndex(mech.weapons, weapon) as number;
            }
        }

        function removeMechWeaponAttachment(mechId: number, mechWeaponAttachmentId: number) {
            let mech = findById(mechs.value, mechId);
            if (mech) {
                deleteItemById(mech.weapons, mechWeaponAttachmentId);

                getMechUpgradesAttachmentInfo(mechId).forEach(v => {
                    if (v.drone_attach_type === MechDroneUpgradeAttachType.WEAPON) {
                        if (v.drone_attachment_target_id === mechWeaponAttachmentId) {
                            setMechDroneUpgradeAttachmentTarget(mechId, mechWeaponAttachmentId, null);
                        }
                    }
                });
            }
        }

        function moveMechWeaponAttachment(mechId: number, weaponAttachment: MechWeaponAttachment, toIndex: number) {
            let mech = findById(mechs.value, mechId);
            if (mech) {
                moveItem(mech.weapons, weaponAttachment, toIndex);
            }
        }

        function addMechUpgradeAttachment(mechId: number, upgradeId: MECH_UPGRADE, droneAttachmentTargetId: number | null = null) {
            let mech = findById(mechs.value, mechId);
            if (mech) {
                let id = mech.upgrades_id_increment++;
                let upgrade: MechUpgradeAttachment = {
                    id,
                    upgrade_id: upgradeId,
                    display_order: null,
                    drone_attachment_target_id: droneAttachmentTargetId,
                };
                mech.upgrades.push(upgrade);
                upgrade.display_order = findItemIndex(mech.upgrades, upgrade) as number;
            }
        }

        function getMechDroneUpgradeWeaponAttachmentTargetIds(mechId: number): number[] {
            const mech = getMech(mechId);
            if (!mech) return [];

            return getMechUpgradesAttachmentInfo(mechId)
                .map(v => {
                    if (v.drone_attach_type === MechDroneUpgradeAttachType.WEAPON) {
                        return v.drone_attachment_target_id;
                    }
                    return null;
                })
                .filter(v => v !== null);
        }

        function setMechDroneUpgradeAttachmentTarget(mechId: number, mechUpgradeAttachmentId: number, targetId: number | null) {
            const mech = getMech(mechId);
            if (!mech) return null;

            const upgradeAttachment = findById(mech.upgrades, mechUpgradeAttachmentId);
            if (!upgradeAttachment) return;

            const upgrade = getMechUpgradeAttachmentInfo(mechId, mechUpgradeAttachmentId);
            if (!upgrade) return;

            const type = upgrade.drone_attach_type;
            if (!type) return;

            if (targetId) {
                if (type === MechDroneUpgradeAttachType.WEAPON) {
                    const weapon = getMechWeaponAttachmentInfo(mechId, targetId);
                    if (!weapon) return;
                } else if (type === MechDroneUpgradeAttachType.MINE_DRONE_CARRIER) {
                    const upgrade = getMechUpgradeAttachmentInfo(mechId, targetId);
                    if (!upgrade) return;
                    if (upgrade.upgrade_id !== MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM) return;
                } else {
                    throw new Error(`invalid type: ${type}`);
                }
            }

            upgradeAttachment.drone_attachment_target_id = targetId;
        }

        function removeMechUpgradeAttachment(mechId: number, mechUpgradeAttachmentId: number) {
            let mech = findById(mechs.value, mechId);
            if (mech) {
                deleteItemById(mech.upgrades, mechUpgradeAttachmentId);

                getMechUpgradesAttachmentInfo(mechId).forEach(v => {
                    if (v.drone_attach_type === MechDroneUpgradeAttachType.MINE_DRONE_CARRIER) {
                        if (v.drone_attachment_target_id === mechUpgradeAttachmentId) {
                            setMechDroneUpgradeAttachmentTarget(mechId, mechUpgradeAttachmentId, null);
                        }
                    }
                });
            }
        }

        function moveMechUpgradeAttachment(mechId: number, upgradeAttachment: MechUpgradeAttachment, toIndex: number) {
            let mech = findById(mechs.value, mechId);
            if (mech) {
                moveItem(mech.upgrades, upgradeAttachment, toIndex);
            }
        }

        function removeInvalidMechAttachments(mechId: number): void {
            let mech = findById(mechs.value, mechId);
            if (!mech) return;
            let mechInfo = getMechInfo(mechId);
            if (!mechInfo) return;
            mech.upgrades.forEach((upgradeAttachment) => {
                const info = getMechUpgradeAttachmentInfo(mechId, upgradeAttachment.id);
                if (info && !info.valid) {
                    toaster().info(`${mechInfo.size.display_name} HE-V (${mechInfo.display_name})`,
                        `${info.display_name} removed: (${info.validation_message})`);
                    removeMechUpgradeAttachment(mechId, upgradeAttachment.id);
                }
            });

            mech.weapons.forEach((weaponAttachment) => {
                const info = getMechWeaponAttachmentInfo(mechId, weaponAttachment.id);
                if (info && !info.valid) {

                    toaster().info(`${mechInfo.size.display_name} HE-V (${mechInfo.display_name})`,
                        `${info.display_name} removed: (${info.validation_message})`);
                    removeMechWeaponAttachment(mechId, weaponAttachment.id);
                }
            });
        }

        function setMechVisible(mechId: number, visible: boolean) {
            const mech = getMech(mechId);
            if (mech) {
                mech.visible = visible;
            }
        }

        function getMechVisible(mechId: number) {
            const mech = getMech(mechId);
            return mech ? !!mech.visible : false;
        }

        const totalTons = computed(() => {
            let tons = 0;

            mechs.value.forEach((mech) => {
                const { teamId } = teamStore.getMechTeamAndGroupIds(mech.id);
                if (teamId !== MECH_TEAM.SHELF) {
                    const m = getMechInfo(mech.id);
                    if (!m) return;
                    tons += m.size.max_tons;
                }
            });
            return tons;
        });

        function getMech(mechId: number): Mech | undefined {
            return findById(mechs.value, mechId);
        }

        function getMechInfo(mechId: number): MechInfo | null {
            let mech = getMech(mechId);
            if (!mech) return null;

            let {
                name,
                size_id,
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_ids,
                aux_armor_upgrade_id,
                mobility_id,
                weapons,
                upgrades,
                preferred_team_id,
            } = mech;

            const placeholder_name = ('HE-V-' + mechId).padStart(1);

            const upgradesInfo = upgrades.map((item) => getMechUpgradeAttachmentInfo(mechId, item.id)).filter(v => !!v);
            const weaponsInfo = weapons.map((item) => getMechWeaponAttachmentInfo(mechId, item.id)).filter(v => !!v);

            const armorUpgradesInfo = armor_upgrade_ids.map(id => getMechArmorUpgradeInfo(mechId, id)).filter(v => !!v);

            // const all_armor_upgrade_ids = armor_upgrade_ids;
            // if (aux_armor_upgrade_id) {
            //     all_armor_upgrade_ids.push(aux_armor_upgrade_id);
            //     armorUpgradesInfo.push(getMechArmorUpgradeInfo(mechId, aux_armor_upgrade_id, true)!);
            // }

            const size = MECH_SIZES[size_id];

            const structure_mod = mechArmorStore.getStructureBodyModInfo(mechId, structure_mod_id);
            const armor_mod = mechArmorStore.getArmorBodyModInfo(mechId, armor_mod_id);
            const mobility = MECH_MOBILITIES[mobility_id];

            let {
                defense,
                max_tons,
                max_slots,
                smash_damage,
            } = size;

            let armor_stat = size.armor + armor_mod.modifier;
            const structure_stat = size.structure + structure_mod.modifier;

            const weapon_used_slots = sumBy(weaponsInfo, v => v.slots);
            const weapon_used_tons = sumBy(weaponsInfo, v => v.cost);

            const upgrade_used_slots = sumBy(upgradesInfo, v => v.slots);
            const upgrade_used_tons = sumBy(upgradesInfo, v => v.cost ?? 0);

            let used_slots = weapon_used_slots +
                upgrade_used_slots +
                mobility.slots;

            if (factionStore.hasAdvancedHardPoints) {
                used_slots += RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS;
            }

            let used_tons = weapon_used_tons +
                upgrade_used_tons +
                // armor stat tons
                size.armor + armor_mod.max_tons +
                // structure stat tons
                size.structure + structure_mod.max_tons +
                sumBy(armorUpgradesInfo, (v) => v.cost ?? 0);

            if (factionStore.hasTopEndHardware) {
                used_tons += DWC_TOP_END_HARDWARE_BONUS_TONS;
            }

            let display_name = name || placeholder_name;

            let { move, jump } = (MECH_SIZES)[size_id];
            const jumpJets = findBy(upgrades, 'upgrade_id', MECH_UPGRADE.JUMP_JETS);

            if (jumpJets) {
                const hasJumpBooster = teamStore.getMechHasTeamPerkId(mechId, TEAM_PERK.JUMP_BOOSTER);
                if (hasJumpBooster) {
                    jump += 1;
                }
            } else {
                jump = 0;
            }

            armor_stat += sumBy(armorUpgradesInfo, (v) => v.armor_mod ?? 0);

            let tonnage_stat = MECH_SIZES[size_id].max_tons;
            const extraTonnage = teamStore.getMechHasTeamPerkId(mechId, TEAM_PERK.EXTRA_TONNAGE);
            if (extraTonnage) {
                tonnage_stat += 5;
            }

            const hasRedundantInternals = armorUpgradesInfo.some(v => v?.id === MECH_ARMOR_UPGRADE.REDUNDANT_INTERNALS);

            const result: MechInfo = {
                display_name,
                placeholder_name,
                size,
                structure_mod,
                armor_mod,
                max_tons,
                used_tons,
                max_slots,
                used_slots,
                armor_stat,
                structure_stat,
                upgrade_used_tons,
                upgrade_used_slots,
                weapon_used_slots,
                weapon_used_tons,
                armor_upgrade_ids,
                mobility,
                move,
                jump,
                tonnage_stat,
                defense,
                smash_damage,
                preferred_team_id,
                has_fragile_internals: size_id === SIZE.LIGHT && !hasRedundantInternals,
                has_backup_systems: size_id === SIZE.ULTRA,
            };
            return readonly(result) as Readonly<MechInfo>;
        }

        function getMechGrantedOrdersCollection(mechId: number): GrantedOrderCollection {
            const grantedOrders = makeGrantedOrderCollection();

            const info = getMechInfo(mechId);
            if (!info) return grantedOrders;
            grantedOrders.add(info.mobility);

            const weapons = getMechWeaponsAttachmentInfo(mechId);
            weapons.forEach(weapon => {
                grantedOrders.addMultiple(weapon.traits);
            });

            const upgrades = getMechUpgradesAttachmentInfo(mechId);
            upgrades.forEach(upgrade => {
                grantedOrders.addMultiple(upgrade.traits);
            });

            return grantedOrders;
        }

        function getWeaponInfo(mechId: number, weaponId: MECH_WEAPON, weaponAttachmentId?: number): MechWeaponInfo | null {
            const mech = getMech(mechId);
            if (!mech) return null;
            const size_id = mech.size_id;
            const size = MECH_SIZES[size_id];
            const weapon = MECH_WEAPONS[weaponId];
            const damage = weapon.damage_by_size[size_id];
            const cost = weapon.cost_by_size[size_id] ?? 0;

            const {
                display_name,
                slots,
                limited_size_ids,
                range,
            } = weapon;

            let { traits, team_perks, faction_perks, range_modifier } = getWeaponTraitsInfo(mechId, weaponId);
            const traitLimited = findById(traits, WEAPON_TRAIT.LIMITED);

            let max_uses = null;
            if (traitLimited) {
                max_uses = traitLimited.X as number;
            }

            let validation_message: string | null = null;
            let valid = true;

            const {
                valid: sizeValid,
                validSizeDisplayNames,
            } = validationStore.getMechWeaponSizeValidation(mechId, weaponId);

            if (!sizeValid) {
                valid = false;
                validation_message = `Only available for ${validSizeDisplayNames.join('/')} HE-Vs`;
            }

            if (valid) {
                const prohibited = teamStore.getWeaponTraitsProhibited(mechId, traits);
                valid = prohibited.valid;
                validation_message = prohibited.validation_message;
            }

            if (valid) {
                const prohibited = teamStore.getWeaponProhibited(mechId, weaponId, weaponAttachmentId);
                valid = prohibited.valid;
                validation_message = prohibited.validation_message;
            }

            let melee_base_damage = 0;
            let melee_trait_damage = 0;

            const melee = findById<Trait<WEAPON_TRAIT>>(traits, WEAPON_TRAIT.MELEE);
            if (melee) {
                melee_base_damage = size.smash_damage + 1;
                melee_trait_damage = melee.X as number;
            }

            const result: MechWeaponInfo = {
                weapon_id: weaponId,
                display_name,
                damage,
                slots,
                cost,
                range,
                range_modifier,
                range_total: (range || 0) + (range_modifier || 0),
                melee_base_damage,
                melee_trait_damage,
                melee_total_damage: (melee_base_damage) + (melee_trait_damage),
                traits,
                team_perks,
                faction_perks,
                max_uses,
                valid,
                validation_message,
            };
            return readonly(result) as MechWeaponInfo;
        }

        interface MechWeaponTraitsInfo {
            traits: TraitInfo<WEAPON_TRAIT>[],
            team_perks: TeamPerkInfo[],
            faction_perks: FactionPerk[],
            range_modifier: number
        }

        function getWeaponTraitsInfo(mechId: number, weaponId: MECH_WEAPON): MechWeaponTraitsInfo {
            const mech = getMech(mechId);
            if (!mech) return { traits: [], team_perks: [], faction_perks: [], range_modifier: 0 };
            const size_id = mech.size_id;
            const weapon = (MECH_WEAPONS)[weaponId];
            let traits: Trait<WEAPON_TRAIT>[] = structuredClone(weapon.traits_by_size[size_id]);
            const perks = teamStore.getTeamPerksInfoByMech(mechId);

            const faction_perks: FactionPerk[] = [];
            const team_perks: TeamPerkInfo[] = [];

            let range_modifier = 0;

            if (weaponId === MECH_WEAPON.CLUSTER_ROCKETS) {
                const perk = findById(perks, TEAM_PERK.EXTRA_CLUSTER_ROCKET_AMMO);
                const traitLimited = findById(traits, WEAPON_TRAIT.LIMITED);

                if (perk) {
                    if (traitLimited) (traitLimited.X as number) += perk.value as number;
                    team_perks.push(perk);
                }
            }

            const perk = findById(perks, TEAM_PERK.BARREL_EXTENSIONS);
            if (perk) {
                const match = findById(traits, WEAPON_TRAIT.SHORT);
                if (match) {
                    range_modifier = perk.value as number;
                    team_perks.push(perk);
                }
            }

            if (weaponId === MECH_WEAPON.ROCKET_PACK) {
                const perk = findById(perks, TEAM_PERK.GUIDED_ROCKETS);
                if (perk) {
                    traits.push(trait(WEAPON_TRAIT.SMART));
                    traits.push(trait(WEAPON_TRAIT.SHORT, 16));
                    team_perks.push(perk);
                }
            }

            const droneSharingPerk = findById(perks, TEAM_PERK.DRONE_SHARING);
            if (droneSharingPerk) {
                traits = [...traits, ...teamStore.getDroneSharedWeaponTraits(mechId, weaponId)];
                team_perks.push(droneSharingPerk);
            }

            return {
                traits: traits.map(weaponTraitInfo),
                team_perks,
                faction_perks,
                range_modifier,
            };
        }

        function getMechWeaponsAttachmentInfo(mechId: number) {
            const mech = getMech(mechId);
            if (!mech) return [];

            return mech.weapons.map(({ id }) => getMechWeaponAttachmentInfo(mechId, id)).filter(v => !!v);
        }

        function getMechWeaponAttachmentWeaponId(mechId: number, mechWeaponAttachmentId: number): null | MECH_WEAPON {
            const mech = getMech(mechId);
            if (!mech) return null;
            const weaponAttachment = findById(mech.weapons, mechWeaponAttachmentId);
            if (!weaponAttachment) return null;
            return weaponAttachment.weapon_id;
        }

        function getMechWeaponAttachmentInfo(mechId: number, mechWeaponAttachmentId: number): MechWeaponAttachmentInfo | null {
            const mech = getMech(mechId);
            if (!mech) return null;
            const weaponAttachment = findById(mech.weapons, mechWeaponAttachmentId);
            if (!weaponAttachment) return null;
            const weapon_id = weaponAttachment.weapon_id;
            const weaponInfo = getWeaponInfo(mechId, weapon_id, mechWeaponAttachmentId);
            if (!weaponInfo) return null;

            const previousWeaponInstances = mech.weapons.filter((item) => {
                return item.weapon_id === weapon_id && (item.display_order ?? 0) < (weaponAttachment.display_order ?? 0);
            }).length;

            let cost = weaponInfo.cost ?? 0;
            const duplicate_cost = Math.floor(previousWeaponInstances * cost * 0.5);
            const { teamId, groupId } = teamStore.getMechTeamAndGroupIds(mechId);

            let required_by_group = false;
            let required_by_group_reason = null as null | string;

            let {
                required,
                required_reason,
            } = teamStore.getWeaponAttachmentIsRequired(teamId, groupId, weaponAttachment, mech);
            if (required) {
                required_by_group = true;
                required_by_group_reason = required_reason;
            }

            const result: MechWeaponAttachmentInfo = {
                ...weaponInfo,
                id: mechWeaponAttachmentId,
                base_cost: cost,
                cost: cost + duplicate_cost,
                duplicate_cost,
                required_by_group,
                required_by_group_reason,
                duplicate_percent: previousWeaponInstances * 50,
                display_order: null,
            };

            return readonly(result) as MechWeaponAttachmentInfo;
        }

        function getMechAvailableWeaponsInfo(mechId: number) {

            const makeList = (weapons: MECH_WEAPON[]) => {
                const result = weapons.map((weaponId) => {
                    const {
                        required,
                        reason,
                    } = teamStore.getMechWeaponIsRequiredInfo(mechId, weaponId);

                    return {
                        ...getWeaponInfo(mechId, weaponId),
                        meets_requirements: required,
                        meets_requirements_reason: reason,
                    };
                });
                return sortBy(result, ['display_name']);
            };

            return {
                melee: makeList(MECH_WEAPONS_BY_TYPE.melee),
                ranged: makeList(MECH_WEAPONS_BY_TYPE.ranged),
            };
        }

        function getUpgradeTraitsInfo(mechId: number, upgradeId: MECH_UPGRADE): null | MechUpgradeTraitsInfo {
            let mech = getMech(mechId);
            if (!mech) return null;
            let { size_id } = mech;
            let traits = getMechUpgradeTraitsInfo(upgradeId, size_id);

            const traitLimited = findById(traits, UPGRADE_TRAIT.LIMITED);
            const teamPerks = teamStore.getTeamPerksInfoByMech(mechId);

            const used_team_perks: TeamPerkInfo[] = [];
            const faction_perks: FactionPerk[] = [];

            if (upgradeId === MECH_UPGRADE.NITRO_BOOST) {
                let perk = findById(teamPerks, TEAM_PERK.EXTRA_NITRO);
                if (perk) {
                    if (traitLimited) {
                        (traitLimited.X as number) += 1;
                        used_team_perks.push(perk);
                    }
                }
            }

            if (MECH_UPGRADES[upgradeId].drone_attach_type) {
                let perk = findById(teamPerks, TEAM_PERK.DRONE_RACK);
                if (perk) {
                    traits = traits.filter(v => v.id !== UPGRADE_TRAIT.COMPACT);
                    used_team_perks.push(perk);
                }
            }

            let max_uses = null;
            if (traitLimited) {
                max_uses = traitLimited.X as number ?? null;
            }

            return {
                used_team_perks,
                faction_perks,
                traits,
                max_uses,
            };
        }

        function getUpgradeInfo(mechId: number, upgradeId: MECH_UPGRADE): MechUpgradeInfo | null {
            let mech = getMech(mechId);
            if (!mech) return null;
            let { size_id, upgrades } = mech;
            let {
                slots,
                display_name,
                description,
                cost_by_size,
                limited_size_ids,
                drone_attach_type,
                drone_attached_trait_id,
            } = MECH_UPGRADES[upgradeId];

            const t = getUpgradeTraitsInfo(mechId, upgradeId);
            if (!t) return null;
            let {
                used_team_perks,
                faction_perks,
                traits,
                max_uses,
            } = t;

            let cost = cost_by_size[size_id];

            let validation_message: string | null = null;
            let valid = true;

            const teamPerks = teamStore.getTeamPerksInfoByMech(mechId);

            const {
                valid: sizeValid,
                validSizeDisplayNames,
                sizeTeamPerk,
            } = validationStore.getMechUpgradeSizeValidation(mechId, upgradeId);

            if (sizeTeamPerk) {
                used_team_perks.push(sizeTeamPerk);
            }

            if (!sizeValid) {
                valid = false;
                validation_message = `Only available for ${validSizeDisplayNames.join('/')} HE-Vs`;
            }

            const traitCompact = findById(traits, UPGRADE_TRAIT.COMPACT);
            if (traitCompact) {
                const otherCompact = upgrades.filter((upgrade) => {
                    if (upgrade.upgrade_id === upgradeId) {
                        return false;
                    }
                    const t = getUpgradeTraitsInfo(mechId, upgrade.upgrade_id);
                    if (!t) return;

                    return !!findById(t.traits, UPGRADE_TRAIT.COMPACT);
                });

                if (otherCompact.length) {
                    const otherCompatDisplayNames = otherCompact.map(v => MECH_UPGRADES[v.upgrade_id].display_name);
                    valid = false;
                    validation_message = `Only one Upgrade with the ${(UPGRADE_TRAITS)[UPGRADE_TRAIT.COMPACT].display_name} trait may be selected. Other Compact Upgrades: ${otherCompatDisplayNames.join(', ')}`;
                }
            }

            if (upgradeId === MECH_UPGRADE.TARGET_DESIGNATOR) {
                let perk = findById(teamPerks, TEAM_PERK._0_SLOT_TARGET_DESIGNATORS);
                if (perk) {
                    slots = 0;
                    used_team_perks.push(perk);
                }

                perk = findById(teamPerks, TEAM_PERK._0_TON_TARGET_DESIGNATORS);
                if (perk) {
                    cost = 0;
                    used_team_perks.push(perk);
                }
            }

            if (upgradeId === MECH_UPGRADE.DIRECTIONAL_THRUSTER) {
                let perk = findById(teamPerks, TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS);
                if (perk) {
                    slots = 0;
                    used_team_perks.push(perk);
                }
            }

            if (upgradeId === MECH_UPGRADE.ELECTRONIC_COUNTERMEASURES) {
                let perk = findById(teamPerks, TEAM_PERK._0_SLOT_ECM);
                if (perk) {
                    slots = 0;
                    used_team_perks.push(perk);
                }

                perk = findById(teamPerks, TEAM_PERK._0_TON_ECM);
                if (perk) {
                    cost = 0;
                    used_team_perks.push(perk);
                }
            }

            if (drone_attach_type === null) {
                const shared = teamStore.getDroneSharedUpgradeTraits(mechId, upgradeId);
                if (shared.length) {
                    const perk = findById(teamPerks, TEAM_PERK.DRONE_SHARING)!;
                    used_team_perks.push(perk);
                    traits = [...traits, ...shared];
                }
            }

            const result: MechUpgradeInfo = {
                upgrade_id: upgradeId,
                display_name,
                description,
                valid,
                validation_message,
                slots,
                cost,
                team_perks: used_team_perks,
                faction_perks,
                max_uses,
                traits,
                required_by_group: teamStore.getMechUpgradeIsRequired(mechId, upgradeId),
                drone_attach_type: drone_attach_type as any,
                drone_attached_trait_id: drone_attached_trait_id as any,
            };

            return readonly(result) as Readonly<MechUpgradeInfo>;
        }

        function getMechUpgradeAttachments(mechId: number) {
            const mech = getMech(mechId);
            if (!mech) return [];
            return mech.upgrades;
        }

        function getMechUpgradesAttachmentInfo(mechId: number): MechUpgradeAttachmentInfo[] {
            const mech = getMech(mechId);
            if (!mech) return [];

            return mech.upgrades.map(({ id }) => getMechUpgradeAttachmentInfo(mechId, id)).filter(v => !!v);
        }

        function getMechUpgradeAttachmentInfo(mechId: number, mechUpgradeAttachmentId: number): null | MechUpgradeAttachmentInfo {
            const mech = getMech(mechId);
            if (!mech) return null;
            const upgradeAttachment = findById(mech.upgrades, mechUpgradeAttachmentId);
            if (!upgradeAttachment) return null;

            const upgradeId = upgradeAttachment.upgrade_id;
            let info = getUpgradeInfo(mechId, upgradeId);
            if (!info) return null;

            const { display_order, drone_attachment_target_id } = upgradeAttachment;

            if (info.drone_attach_type && drone_attachment_target_id === null) {
                info = {
                    ...info,
                    valid: false,
                    validation_message: 'Drone must have target',
                };
            }

            return {
                id: mechUpgradeAttachmentId,
                display_order,
                drone_attachment_target_id,
                ...info,
            };
        }

        function getMechAvailableUpgradesInfo(mechId: number): MechUpgradeInfo[] {
            const mech = findById(mechs.value, mechId);
            if (!mech) return [];
            const hasDroneRacks = teamStore.getMechHasTeamPerkId(mechId, TEAM_PERK.DRONE_RACK);
            const existingUpgradeIds = mech.upgrades
                .filter(item => {
                    return !(hasDroneRacks && MECH_UPGRADES[item.upgrade_id].drone_attach_type);
                })
                .map((item) => item.upgrade_id);

            const result = (Object.keys(MECH_UPGRADES) as MECH_UPGRADE[])
                .filter((upgradeId) => !existingUpgradeIds.includes(upgradeId))
                .map((upgradeId) => getUpgradeInfo(mechId, upgradeId))
                .filter(v => !!v);

            return sortBy(result, ['display_name']);
        }

        function getMechAllArmorUpgradesInfo(mechId: number): MechArmorUpgradeInfo[] {
            let mech = getMech(mechId);
            const result: MechArmorUpgradeInfo[] = [];
            if (!mech) return result;

            result.push(...getMechAvailableArmorUpgrades(mechId));
            const aux = getMechAuxArmorUpgradeInfo(mechId);
            if (aux) {
                result.push(aux);
            }

            return result;
        }

        function getMechArmorUpgradesInfo(mechId: number): MechArmorUpgradeInfo[] {
            let mech = getMech(mechId);
            if (!mech) return [];
            let {
                armor_upgrade_ids,
            } = mech;

            return armor_upgrade_ids.map((id) => getMechArmorUpgradeInfo(mechId, id)).filter(v => !!v);
        }

        function getMechAuxArmorUpgradeInfo(mechId: number): null | MechArmorUpgradeInfo {
            let mech = getMech(mechId);
            if (!mech) return null;
            if (!mech.aux_armor_upgrade_id) return null;

            return getMechArmorUpgradeInfo(mechId, mech.aux_armor_upgrade_id);
        }

        function getMechArmorUpgradeInfo(mechId: number, armorUpgradeId: MECH_ARMOR_UPGRADE, auxPerk: true | null = null): null | MechArmorUpgradeInfo {
            let mech = getMech(mechId);
            if (!mech) return null;
            let {
                size_id,
            } = mech;

            let {
                slots,
                cost_by_size,
                display_name,
                card_upgrade_display_name,
                armor_mod,
                description,
            } = MECH_ARMOR_UPGRADES[armorUpgradeId];

            let cost = cost_by_size[size_id];
            let valid = true;
            let validation_message: string = '';

            const {
                valid: armorValid,
                teamDisplayName,
                groupDisplayName,
            } = validationStore.getMechTeamGroupArmorUpgradeValidation(mechId, armorUpgradeId);

            if (!armorValid) {
                valid = false;
                validation_message = `Not available to ${teamDisplayName} ${groupDisplayName}`;
            }

            const {
                valid: armorSizeValid,
                validSizeDisplayNames,
            } = validationStore.getMechArmorUpgradeSizeValidation(mechId, armorUpgradeId);

            if (!armorSizeValid) {
                valid = false;
                validation_message = `Only available to HE-V size(s): ${validSizeDisplayNames.join('/')}`;
            }

            const perks = teamStore.getTeamPerksInfoByMech(mechId);
            const team_perks: TeamPerkInfo[] = [];

            if (auxPerk === null) {
                if (mech.aux_armor_upgrade_id === armorUpgradeId) {
                    const perk = findById(perks, TEAM_PERK.AUX_DEFENSE_CONFIG);
                    if (perk) {
                        slots = 1;
                        team_perks.push(perk);
                    }
                }
            } else if (auxPerk) {
                slots = 1;
                team_perks.push({
                    repeatCount: 1,
                    ...MECH_TEAM_PERKS[TEAM_PERK.AUX_DEFENSE_CONFIG],
                });
            }

            if (cost !== 0) {
                const perk = findById(perks, TEAM_PERK._0_TON_ARMOR_UPGRADES);
                if (perk) {
                    cost = 0;
                    team_perks.push(perk);
                }
            }

            return {
                id: armorUpgradeId,
                cost,
                slots,
                display_name,
                card_upgrade_display_name,
                description,
                valid,
                validation_message,
                team_perks,
                armor_mod,
            };
        }

        function getMechAvailableArmorUpgrades(mechId: number, auxPerk: true | null = null): MechArmorUpgradeInfo[] {
            const mech = getMech(mechId);
            if (!mech) return [];
            return (Object.values(MECH_ARMOR_UPGRADE))
                // never display armor upgrades a mech already has
                .filter((armorUpgradeId) => !mech.armor_upgrade_ids.includes(armorUpgradeId) && mech.aux_armor_upgrade_id !== armorUpgradeId)
                .map(armorUpgradeId => getMechArmorUpgradeInfo(mechId, armorUpgradeId, auxPerk))
                .filter(v => !!v);
        }

        const getUsedWeaponTraitIds = computed(() => {
            const weaponTraitIds = new Set<WEAPON_TRAIT>();
            mechs.value.forEach(mech => {
                mech.weapons.forEach(weapon => {
                    const traitInfo = getWeaponTraitsInfo(mech.id, weapon.weapon_id);
                    traitInfo.traits.map((trait) => weaponTraitIds.add(trait.id));
                });
            });
            return [...weaponTraitIds.values()];
        });

        const getUsedUpgradeTraitIds = computed(() => {
            const traitIds = new Set<UPGRADE_TRAIT>();
            mechs.value.forEach(mech => {
                mech.upgrades.forEach(upgrade => {
                    const traitInfo = getUpgradeTraitsInfo(mech.id, upgrade.upgrade_id);
                    if (!traitInfo) return null;
                    traitInfo.traits.forEach(t => traitIds.add(t.id));
                });
            });
            return [...traitIds.values()];
        });

        const getUsedUpgradeTraitsInfo = computed(() => {
            const results = getUsedUpgradeTraitIds.value.map(traitId => {
                return {
                    ...UPGRADE_TRAITS[traitId],
                    display_name: upgradeTraitDisplayName({ id: traitId, X: 'X', Y: 'Y' }),
                };
            });

            return sortBy(results, ['display_name']);
        });

        const getUsedUpgradeIds = computed(() => {
            const upgradeIds = new Set<MECH_UPGRADE>();
            mechs.value.forEach(mech => {
                mech.upgrades.forEach(upgrade => {
                    upgradeIds.add(upgrade.upgrade_id);
                });
            });
            return [...upgradeIds.values()];
        });

        interface UsedUpgradeInfo extends Omit<MechUpgrade, 'traits'> {
            traits: { display_name: string }[];
        }

        const getUsedUpgradesInfo = computed((): UsedUpgradeInfo[] => {
            const results = getUsedUpgradeIds.value.map(upgradeId => {

                const { traits, ...upgrade } = MECH_UPGRADES[upgradeId];

                const traitIds = new Set<UPGRADE_TRAIT>(traits.map(t => t.id));
                if (upgrade.traits_by_size) {
                    Object.values(upgrade.traits_by_size).forEach(upgradeTraits => {
                        for (const trait of upgradeTraits) {
                            traitIds.add(trait.id);
                        }
                    });
                }

                return {
                    ...upgrade,
                    traits: [...traitIds.values()].map((traitId) => {
                        return {
                            display_name: upgradeTraitDisplayName({ id: traitId, X: 'X', Y: 'Y' }),
                        };
                    }),
                };
            });

            return sortBy(results, ['display_name']);
        });

        return {
            mechs,
            mechs_id_increment,
            getUsedUpgradeIds,
            getUsedUpgradeTraitIds,
            getUsedUpgradeTraitsInfo,
            getUsedWeaponTraitIds,
            getUpgradeTraitsInfo,
            getUsedUpgradesInfo,
            getMechAvailableArmorUpgrades,
            getMechArmorUpgradeInfo,
            getMechArmorUpgradesInfo,
            getMechAuxArmorUpgradeInfo,
            getMechAllArmorUpgradesInfo,
            getMechAvailableUpgradesInfo,
            getUpgradeInfo,
            getMechUpgradeAttachmentInfo,
            getMechUpgradesAttachmentInfo,
            getMechAvailableWeaponsInfo,
            getMechWeaponAttachmentInfo,
            getMechWeaponsAttachmentInfo,
            getWeaponTraitsInfo,
            getWeaponInfo,
            getMechGrantedOrdersCollection,
            setMechDroneUpgradeAttachmentTarget,
            getMechDroneUpgradeWeaponAttachmentTargetIds,
            getMechUpgradeAttachments,
            updateMech,
            getMech,
            getMechInfo,
            duplicateMech,
            setMechVisible,
            getMechVisible,
            totalTons,
            addMech,
            removeMech,
            removeMechWeaponAttachment,
            removeInvalidMechAttachments,
            removeMechUpgradeAttachment,
            addMechUpgradeAttachment,
            addMechWeaponAttachment,
            moveMechWeaponAttachment,
            moveMechUpgradeAttachment,
            getMechWeaponAttachmentWeaponId,
            $reset,
        };
    }, {
        persist: true,
    },
);
