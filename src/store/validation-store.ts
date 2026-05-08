import { countBy, difference } from 'es-toolkit';
import { defineScopeableStore } from 'pinia-scope';
import { computed } from 'vue';
import { GAME_SIZE } from '../data/game-sizes';
import { MECH_ARMOR_UPGRADE, MECH_ARMOR_UPGRADES } from '../data/mech-armor-upgrades';
import { MECH_BODY_MODS } from '../data/mech-body-mod';
import { MECH_TEAM, MECH_TEAMS, SUPPORT_ASSET_UNITS_GROUP_ID } from '../data/mech-teams';
import { MECH_UPGRADES } from '../data/mech-upgrades';
import { MECH_WEAPONS } from '../data/mech-weapons';
import { SUPPORT_ASSET_UNITS } from '../data/support-asset-units';
import { type SUPPORT_ASSET_UNIT } from '../data/support-assets/_support-asset-types';
import { MECH_SIZES, type MechSizeId } from '../data/unit-sizes';
import { WEAPON_TRAITS } from '../data/weapon-traits';
import type { MechInfo } from '../types';
import { useArmyListStore } from './army-list-store';
import { useMechStore } from './mech-store';
import { useSupportAssetCountsStore } from './support-asset-count-store';
import { useSupportAssetUnitsStore } from './support-asset-units-store';
import { useTeamStore } from './team-store';

export const useValidationStore = defineScopeableStore('validation', ({ scope }: { scope: string }) => {

    const armyListStore = useArmyListStore(scope);
    const teamStore = useTeamStore(scope);
    const mechStore = useMechStore(scope);
    const supportAssetCountStore = useSupportAssetCountsStore(scope);
    const supportAssetUnitsStore = useSupportAssetUnitsStore(scope);

    function $reset() {

    }

    const list_is_valid = computed((): boolean => {
        return !list_validation.value.length && !team_validation.value.length;
    });

    const list_validation = computed(() => {
        let messages: (string | false)[] = [
            invalid_army_list_tons.value,
            invalid_number_of_teams.value,
            invalid_number_of_support_assets.value,
        ];

        const sizeValidation = team_size_count_validation.value;
        if (!sizeValidation.valid) {
            messages.push(sizeValidation.validation_message + ' for this game size');
        }

        messages = messages.concat(supportAssetUnitsStore.validation_messages, supportAssetUnitUniquenessInvalidMessages());
        return messages.filter(i => i);
    });

    const invalid_army_list_tons = computed(() => {
        const usedTons = armyListStore.used_tons;
        const maxTons = armyListStore.max_tons;
        if (usedTons > maxTons) {
            return `List uses ${usedTons}/${maxTons} tons`;
        }
        return false;
    });

    const invalid_number_of_teams = computed(() => {
        const usedTeams = teamStore.used_teams_count;
        const maxTeams = teamStore.max_teams_count;

        if (maxTeams < usedTeams) {
            return `List has ${usedTeams} teams but may only have ${maxTeams}`;
        }
        return false;
    });

    const invalid_number_of_support_assets = computed(() => {
        const { used_support_assets, max_support_assets } = supportAssetCountStore;

        if (max_support_assets < used_support_assets) {
            return `List has ${used_support_assets} Support Assets but may only have ${max_support_assets}`;
        }

        return false;
    });

    const team_size_count_validation = computed(() => {
        const messageValid = {
            valid: true,
            validation_message: '',
        };
        const messageMin = (val: number) => ({
            valid: false,
            validation_message: `A team has less than the minimum of ${val} HE-Vs`,
        });
        const messageMax = (val: number) => ({
            valid: false,
            validation_message: `A team has more than the maximum of ${val} HE-Vs`,
        });

        const gameSizeId = armyListStore.game_size_id;

        if (gameSizeId === GAME_SIZE.DUEL) {
            return messageValid;
        }
        const teamCounts = teamStore.special_teams.map((team) => teamStore.getTeamMechCount(team.id));
        const smallestTeamCount = (Math.min(...teamCounts) ?? 0) as number;
        const largestTeamCount = (Math.max(...teamCounts) ?? 0) as number;

        if (smallestTeamCount < 2) {
            return messageMin(2);
        }

        if (gameSizeId === GAME_SIZE.RECON) {
            if (largestTeamCount > 2) {
                return messageMax(2);
            }
        }

        if (gameSizeId === GAME_SIZE.STRIKE) {
            if (largestTeamCount > 3) {
                return messageMax(3);
            }
        }

        if (gameSizeId === GAME_SIZE.BATTLE) {
            if (largestTeamCount > 4) {
                return messageMax(4);
            }
            const instancesOfCount = countBy(teamCounts, (i: number) => i);
            if (instancesOfCount[4] > 1) {
                return {
                    valid: false,
                    validation_message: `There may only be one team with a count of 4 HE-Vs`,
                };
            }
        }
        return messageValid;
    });

    function mechTeamGroupMessages(mechId: number) {
        return [
            teamGroupRequiredUpgradesInvalid(mechId),
            teamGroupMechSizeInvalid(mechId),
            ...mechTeamGroupArmorUpgradeMessages(mechId),
            teamGroupMechStructureModInvalid(mechId),
            teamGroupMechArmorModInvalid(mechId),
            ...mechTeamGroupWeaponMessages(mechId),
            ...mechTeamGroupUpgradeMessages(mechId),
        ].filter(i => i) as string[];
    }

    function mechTeamGroupArmorUpgradeMessages(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return [];

        return [
            teamGroupMechArmorUpgradeRequireAtLeastOneInvalid(mechId),
        ].filter(v => !!v) as string[];
    }

    function mechTeamGroupWeaponMessages(mechId: number) {
        return [
            teamGroupProhibitedWeaponsInvalid(mechId),
            teamGroupRequiredWeaponsInvalid(mechId),
            teamGroupRequiredOneOfWeaponsInvalid(mechId),
            teamGroupAtLeastOneWeaponWithTraitInvalid(mechId),
        ].filter(i => !!i) as string[];
    }

    function mechTeamGroupUpgradeMessages(mechId: number) {
        return [
            teamGroupRequiredUpgradesInvalid(mechId),
        ].filter(i => i) as string[];
    }

    function mechMessages(mechId: number) {
        return [
            mechTonsInvalid(mechId),
            mechSlotsInvalid(mechId),
            ...mechArmorUpgradeSizeInvalidMessages(mechId),
            ...getInvalidMechWeaponMessages(mechId),
            ...getInvalidMechUpgradeMessages(mechId),
        ].filter(i => i) as string[];
    }

    function mechAllWeaponMessages(mechId: number) {
        return [
            ...getInvalidMechWeaponMessages(mechId),
            ...mechTeamGroupWeaponMessages(mechId),
        ].filter(i => i) as string[];
    }

    function mechAllUpgradesMessages(mechId: number) {
        return [
            ...getInvalidMechUpgradeMessages(mechId),
            ...mechTeamGroupUpgradeMessages(mechId),
        ].filter(i => i) as string[];
    }

    function getInvalidMechWeaponMessages(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return [];
        return mech.weapons.flatMap((weapon) => {
            const {
                valid,
                validation_message,
            } = mechStore.getMechWeaponAttachmentInfo(mechId, weapon.id)!;
            if (!valid) {
                const displayName = MECH_WEAPONS[weapon.weapon_id].display_name;
                return displayName + ': ' + validation_message;
            }
            return '';
        }).filter(i => i);
    }

    function getInvalidMechUpgradeMessages(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return [];
        return mech.upgrades.flatMap((upgrade) => {
            const {
                availability_validation_message,
                validation_messages,
                display_name,
            } = mechStore.getMechUpgradeAttachmentInfo(mechId, upgrade.id)!;

            return [
                availability_validation_message,
                ...validation_messages,
            ].filter(i => i).map((message) => {
                return display_name + ': ' + message;
            });
        });
    }

    function mechTonsInvalid(mechId: number) {
        const m = mechStore.getMechInfo(mechId);
        if (!m) return false;
        const {
            max_tons,
            used_tons,
        } = m;

        if (max_tons < used_tons) {
            return `Uses ${used_tons}/${max_tons} tons`;
        }
        return false;
    }

    function mechSlotsInvalid(mechId: number) {
        const m = mechStore.getMechInfo(mechId);
        if (!m) return false;
        const {
            max_slots,
            used_slots,
        } = m;

        if (max_slots < used_slots) {
            return `Uses ${used_slots}/${max_slots} slots`;
        }
        return false;
    }

    function getNotAvailableToTeamGroupMessage(mechId: number) {
        const { teamId, groupId } = teamStore.getMechTeamAndGroupIds(mechId);
        const teamGroupDisplayName = teamStore.getFullTeamGroupDisplayName(teamId, groupId);
        return `Not available to ${teamGroupDisplayName}`;
    }

    function mechArmorUpgradeSizeInvalidMessages(mechId: number): string[] {
        const mech = mechStore.getMech(mechId);
        if (!mech) return [];

        return mechStore.getMechAllArmorUpgradesInfo(mechId).filter(v => !v.valid).map(v => v.validation_message);
    }

    function getTeamGroupSizeValidation(teamId: MECH_TEAM, groupId: string) {
        const teamDef = MECH_TEAMS[teamId];
        const { min_count, max_count } = teamStore.getTeamGroupMinMaxCount(teamId, groupId);

        const count = teamStore.getTeamGroupUnitCount(teamId, groupId);
        let entity = 'HE-Vs';
        if (teamDef.support_asset_units) {
            entity = 'Units';
        }

        let size_valid = true;
        let size_validation_message = 'Valid Group Size';
        if (typeof min_count === 'number') {
            if (min_count > count) {
                size_valid = false;
                size_validation_message = `Group has less than the minimum number of ${entity}: ${min_count}`;
            }
        }

        if (typeof max_count === 'number') {
            if (max_count < count) {
                size_valid = false;
                size_validation_message = `Group has more than the maximum number of ${entity}: ${max_count}`;
            }
        }

        return {
            min_count,
            max_count,
            size_valid,
            size_validation_message,
        };
    }

    function teamGroupAtLeastOneWeaponWithTraitInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const groupDef = teamStore.getMechTeamGroupDef(mechId);

        const requiredAtLeastOneWithTraitId = groupDef.required_at_least_one_weapon_with_trait_id;
        if (requiredAtLeastOneWithTraitId) {
            const result = mech.weapons.find((weapon) => {
                const traits = MECH_WEAPONS[weapon.weapon_id].traits_by_size[mech.size_id];
                return traits.find((trait) => trait.id === requiredAtLeastOneWithTraitId);
            });
            if (!result) {
                const traitDisplayName = WEAPON_TRAITS[requiredAtLeastOneWithTraitId].display_name;

                return `Team group requires at least one weapon with the ${traitDisplayName} trait.`;
            }
        }

        return false;
    }

    function teamGroupRequiredWeaponsInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const weaponIds = mech.weapons.map((weapon) => weapon.weapon_id);
        const groupDef = teamStore.getMechTeamGroupDef(mechId);

        const missingWeaponIds = difference(groupDef.required_weapon_ids, weaponIds);

        if (missingWeaponIds.length) {
            const weapons = missingWeaponIds.map(weaponId => MECH_WEAPONS[weaponId].display_name);
            return `Team Group requires weapon(s): ${weapons.join(', ')}`;
        }

        return false;
    }

    function teamGroupProhibitedWeaponsInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const weaponIds = mech.weapons.map((weapon) => weapon.weapon_id);

        const prohibitedWeaponIds = weaponIds.filter(weaponId => {
            let { traits } = mechStore.getWeaponTraitsInfo(mechId, weaponId);
            const { valid } = teamStore.getWeaponTraitsProhibited(mechId, traits);
            return !valid;
        });

        if (prohibitedWeaponIds.length) {
            const groupDef = teamStore.getMechTeamGroupDef(mechId);
            const traits = groupDef.prohibited_weapons_with_trait_ids.map((traitId) => WEAPON_TRAITS[traitId as keyof typeof WEAPON_TRAITS].display_name);
            const weapons = prohibitedWeaponIds.map((weaponId: keyof typeof MECH_WEAPONS) => MECH_WEAPONS[weaponId].display_name);
            return `Team Group prohibits weapons with the trait(s) ${traits.join(', ')}: Invalid Weapons: ${weapons.join(', ')}`;
        }

        return false;
    }

    function teamGroupRequiredOneOfWeaponsInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const weaponIds = mech.weapons.map((weapon) => weapon.weapon_id);
        const groupDef = teamStore.getMechTeamGroupDef(mechId);

        if (!groupDef.required_at_least_one_of_weapon_ids?.length) {
            return false;
        }
        const match = groupDef.required_at_least_one_of_weapon_ids.find(requiredWeaponId => {
            return weaponIds.includes(requiredWeaponId);
        });

        if (!match) {
            const weapons = groupDef.required_at_least_one_of_weapon_ids.map(weaponId => MECH_WEAPONS[weaponId].display_name);
            return `Team Group requires at least one of the following weapon(s): ${weapons.join(', ')}`;
        }

        return false;
    }

    function teamGroupRequiredUpgradesInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const upgradeIds = mech.upgrades.map((upgrade) => upgrade.upgrade_id);
        const groupDef = teamStore.getMechTeamGroupDef(mechId);
        const missingUpgradeIds = difference(groupDef.required_upgrade_ids, upgradeIds);

        if (missingUpgradeIds.length) {
            const upgrades = missingUpgradeIds.map(id => MECH_UPGRADES[id].display_name);
            return `Team Group requires upgrade(s): ${upgrades.join(', ')}`;
        }

        return false;
    }

    function teamGroupMechSizeInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;

        const {
            valid,
            sizeDisplayName,
            validSizeDisplayNames,
        } = getTeamGroupMechSizeValidation(mechId, mech.size_id);

        if (!valid) {
            return `Invalid Size: ${sizeDisplayName}. Valid values: ${(validSizeDisplayNames as string[]).join(', ')}`;
        }

        return false;
    }

    function getMechTeamGroupArmorUpgradeValidation(mechId: number, armorUpgradeId: MECH_ARMOR_UPGRADE) {
        const { teamId, groupId } = teamStore.getMechTeamAndGroupIds(mechId);
        const groupDef = teamStore.getTeamGroupDef(teamId, groupId);
        const validIds = groupDef.required_at_least_one_of_armor_upgrade_ids;
        const mech = mechStore.getMech(mechId)!;
        const mechArmorUpgradeIds = [mech.armor_upgrade_ids, mech.aux_armor_upgrade_id];

        if (validIds?.length) {
            const hasOne = validIds.some(validId => {
                return mechArmorUpgradeIds.includes(validId);
            });

            if (!hasOne) {
                return {
                    valid: false,
                    armorUpgradeDisplayName: MECH_ARMOR_UPGRADES[armorUpgradeId].display_name,
                    validArmorUpgradeDisplayNames: validIds.map(id => MECH_ARMOR_UPGRADES[id].display_name),
                    teamDisplayName: teamStore.getTeamDisplayName(teamId),
                    groupDisplayName: groupDef.display_name,
                };

            }
        }

        return {
            valid: true,
            armorUpgradeDisplayName: null,
            validArmorUpgradeDisplayNames: [],
            teamDisplayName: null,
            groupDisplayName: null,
        };
    }

    function teamGroupMechArmorUpgradeRequireAtLeastOneInvalid(mechId: number) {
        const { teamId, groupId } = teamStore.getMechTeamAndGroupIds(mechId);
        const groupDef = teamStore.getTeamGroupDef(teamId, groupId);
        const validIds = groupDef.required_at_least_one_of_armor_upgrade_ids;
        const mech = mechStore.getMech(mechId)!;
        const mechArmorUpgradeIds = [...mech.armor_upgrade_ids, mech.aux_armor_upgrade_id];

        if (validIds?.length) {
            const hasOne = validIds.some(validId => {
                return mechArmorUpgradeIds.includes(validId);
            });

            if (!hasOne) {
                const validArmorUpgradeDisplayNames = validIds.map(id => MECH_ARMOR_UPGRADES[id].display_name);
                return `Must have at least one of the following Defense Configurations: ${validArmorUpgradeDisplayNames.join(', ')}`;
            }

            return false;
        }
    }

    function teamGroupMechStructureModInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const groupDef = teamStore.getMechTeamGroupDef(mechId);

        if (groupDef.limited_structure_mod_ids?.length) {
            if (!groupDef.limited_structure_mod_ids.includes(mech.structure_mod_id)) {
                const currentDisplayName = MECH_BODY_MODS[mech.structure_mod_id].display_name;
                const validMods = groupDef.limited_structure_mod_ids.map(id => MECH_BODY_MODS[id].display_name);
                return `Invalid Structure Type: ${currentDisplayName}. Valid values: ${validMods.join(', ')}`;
            }
        }

        return false;
    }

    function teamGroupMechArmorModInvalid(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const groupDef = teamStore.getMechTeamGroupDef(mechId);

        if (groupDef.limited_armor_mod_ids?.length) {
            if (!groupDef.limited_armor_mod_ids.includes(mech.armor_mod_id)) {
                const currentDisplayName = MECH_BODY_MODS[mech.armor_mod_id].display_name;

                const validMods = groupDef.limited_armor_mod_ids.map(id => MECH_BODY_MODS[id].display_name);
                return `Invalid Armor Type: ${currentDisplayName}. Valid values: ${validMods.join(', ')}`;
            }
        }

        return false;
    }

    const team_validation = computed(() => {
        return teamStore.non_shelf_teams.map((team) => getTeamValidation(team.id)).filter((i) => !i.valid);
    });

    function getTeamGroupMechSizeValidation(mechId: number, sizeId: MechSizeId) {
        const groupDef = teamStore.getMechTeamGroupDef(mechId);
        if (!groupDef.size_ids.includes(sizeId)) {
            return {
                valid: false,
                sizeDisplayName: MECH_SIZES[sizeId].display_name,
                validSizeDisplayNames: groupDef.size_ids.map(id => MECH_SIZES[id].display_name),
            };
        }
        return {
            valid: true,
            sizeDisplayName: null,
            validSizeDisplayNames: null,
        };
    }

    function getTeamValidation(teamId: MECH_TEAM) {
        const team = teamStore.findTeam(teamId);
        if (!team) return {
            id: teamId,
            valid: true,
            display_name: '',
            icon: '',
            groups: [],
        };

        const { display_name, icon, groups: teamGroups } = teamStore.getTeamDef(team.id);
        const groups = Object.values(teamGroups).map(group => getTeamGroupValidation(teamId, group.id))
            .filter(i => !i.valid);

        return {
            id: team.id,
            valid: !groups.length,
            display_name,
            icon,
            groups,
        };
    }

    function getTeamGroupValidation(teamId: MECH_TEAM, groupId: string): TeamGroupValidation {
        const { display_name } = teamStore.getTeamGroupDef(teamId, groupId);
        const validation_messages: string[] = [];
        if (teamId === MECH_TEAM.SHELF) {
            return {
                id: groupId,
                valid: true,
                display_name: display_name ?? '',
                validation_messages,
                mechs: [],
            };
        }
        const { size_valid, size_validation_message } = getTeamGroupSizeValidation(teamId, groupId);
        if (!size_valid) {
            validation_messages.push(size_validation_message);
        }

        const mechIds = teamStore.getTeamGroupMechIds(teamId, groupId);

        const mechs = mechIds.map((mechId: number) => {
            const group_validation_messages = mechTeamGroupMessages(mechId);
            const mech_validation_messages = mechMessages(mechId);

            const valid: boolean = !group_validation_messages.length && !mech_validation_messages.length;

            return {
                info: mechStore.getMechInfo(mechId),
                valid,
                group_validation_messages,
                mech_validation_messages,
            };
        }).filter(i => !i.valid) as MechValidationInfo[];

        return {
            id: groupId,
            valid: !validation_messages.length && !mechs.length,
            display_name,
            validation_messages,
            mechs,
        };
    }

    function supportAssetUnitUniquenessInvalidMessages() {
        return supportAssetUnitsStore.support_asset_units.flatMap(v => {
            return supportAssetUnitsStore.getUnitAttachmentInvalidMessages(v.id).map(msg => {
                const unitDisplayName = SUPPORT_ASSET_UNITS[v.support_asset_unit_id].display_name;
                return `${unitDisplayName}: ${msg}`;
            });
        }).filter(v => !!v);
    }

    function addSupportAssetUnitInvalid(supportAssetUnitId: SUPPORT_ASSET_UNIT, is_coordinated_asset_team: boolean) {
        let existingUnits = supportAssetUnitsStore.support_asset_units;

        if (is_coordinated_asset_team) {
            existingUnits = supportAssetUnitsStore.support_asset_units.filter(v => !v.is_coordinated_asset_team);
            const teamId = MECH_TEAM.COORDINATED_ASSETS;
            const groupId = SUPPORT_ASSET_UNITS_GROUP_ID;
            const { max_count } = teamStore.getTeamGroupMinMaxCount(teamId, groupId);
            const count = teamStore.getTeamGroupUnitCount(teamId, groupId);
            if (count + 1 > (max_count as number)) {
                const teamDisplayName = teamStore.getTeamDisplayName(teamId);
                return `Team ${teamDisplayName} already has the maximum number of units (${max_count})`;
            }
        }

        if (existingUnits.some(v => v.support_asset_unit_id === supportAssetUnitId)) {
            const unitDisplayName = SUPPORT_ASSET_UNITS[supportAssetUnitId].display_name;
            return `This force already contains ${unitDisplayName}.`;
        }

        return null;
    }

    return {
        list_validation,
        list_is_valid,
        team_validation,
        invalid_number_of_support_assets,
        team_size_count_validation,

        mechMessages,
        mechAllWeaponMessages,
        mechAllUpgradesMessages,

        mechTeamGroupMessages,
        mechTeamGroupWeaponMessages,
        mechTeamGroupUpgradeMessages,
        mechTeamGroupArmorUpgradeMessages,

        getTeamValidation,
        getTeamGroupValidation,
        getTeamGroupSizeValidation,
        getMechTeamGroupArmorUpgradeValidation,

        teamGroupMechSizeInvalid,
        teamGroupMechStructureModInvalid,
        teamGroupMechArmorModInvalid,
        teamGroupMechArmorUpgradeRequireAtLeastOneInvalid,

        getNotAvailableToTeamGroupMessage,
        addSupportAssetUnitInvalid,

        $reset,
    };
});

export interface TeamGroupValidation {
    id: string,
    valid: boolean,
    display_name: string,
    validation_messages: string[],
    mechs: MechValidationInfo[],
}

export interface MechValidationInfo {
    info: MechInfo,
    valid: boolean,
    group_validation_messages: string[],
    mech_validation_messages: string[],
}