import { countBy, difference } from 'es-toolkit';
import { defineScopeableStore } from 'pinia-scope';
import { computed } from 'vue';
import { GAME_SIZE } from '../data/game-sizes';
import { type MECH_ARMOR_UPGRADE, MECH_ARMOR_UPGRADES } from '../data/mech-armor-upgrades';
import { MECH_BODY_MODS } from '../data/mech-body';
import { TEAM_PERK } from '../data/mech-team-perks';
import { MECH_TEAM, MECH_TEAMS } from '../data/mech-teams';
import { MECH_UPGRADE, MECH_UPGRADES } from '../data/mech-upgrades';
import { MECH_WEAPONS } from '../data/mech-weapons';
import { MECH_SIZES, type MechSizeId, SIZE } from '../data/unit-sizes';
import { WEAPON_TRAITS } from '../data/weapon-traits';
import type { MechInfo } from '../types';
import { useArmyListStore } from './army-list-store';
import { findById } from './helpers/collection-helper';
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

        messages = messages.concat(supportAssetUnitsStore.validation_messages);
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
            ...teamGroupMechArmorUpgradeInvalidMessages(mechId),
            teamGroupMechStructureInvalid(mechId),
            teamGroupMechArmorInvalid(mechId),
            ...mechTeamGroupWeaponMessages(mechId),
            ...mechTeamGroupUpgradeMessages(mechId),
        ].filter(i => i) as string[];
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
        return mech.weapons.map((weapon) => {
            const {
                valid,
                validSizeDisplayNames,
            } = getMechWeaponSizeValidation(mechId, weapon.weapon_id);
            if (!valid) {
                const displayName = MECH_WEAPONS[weapon.weapon_id].display_name;
                return `${displayName} is only available for ${validSizeDisplayNames.join('/')} HE-Vs`;
            }
            return '';
        }).filter(i => i);
    }

    function getInvalidMechUpgradeMessages(mechId: number) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return [];
        return mech.upgrades.map((upgrade) => {
            const {
                valid,
                validSizeDisplayNames,
                upgradeDisplayName,
            } = getMechUpgradeSizeValidation(mechId, upgrade.upgrade_id);
            if (!valid) {
                return `${upgradeDisplayName} is only available for ${validSizeDisplayNames.join('/')} HE-Vs`;
            }
            return null;
        }).filter(Boolean);
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

        return mech.armor_upgrade_ids.map(id => mechArmorUpgradeSizeInvalid(mechId, id)).filter(v => !!v) as string[];
    }

    function mechArmorUpgradeSizeInvalid(mechId: number, armorUpgradeId: MECH_ARMOR_UPGRADE) {
        let mech = mechStore.getMech(mechId);
        if (!mech) return false;

        const {
            valid,
            armorUpgradeDisplayName,
            validSizeDisplayNames,
        } = getMechArmorUpgradeSizeValidation(mechId, armorUpgradeId);

        if (!valid) {
            return `Invalid Armor Upgrade: ${armorUpgradeDisplayName}. Only available to HE-V size(s): ${validSizeDisplayNames}`;
        }

        return false;
    }

    function getMechWeaponSizeValidation(mechId: number, weaponId: string): MechSizeValidation {
        const mech = mechStore.getMech(mechId);
        if (!mech) return { valid: true, validSizeDisplayNames: [] };
        const size_id = mech.size_id;
        const weapon = MECH_WEAPONS[weaponId];
        const limited_size_ids = weapon.limited_size_ids;

        if (limited_size_ids.length) {
            return {
                valid: limited_size_ids.includes(size_id),
                validSizeDisplayNames: limited_size_ids.map((sizeId) => MECH_SIZES[sizeId].display_name),
            };
        }
        return {
            valid: true,
            validSizeDisplayNames: [],
        };
    }

    function getMechUpgradeSizeValidation(mechId: number, upgradeId: MECH_UPGRADE) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return { valid: true, upgradeDisplayName: '', validSizeDisplayNames: [], sizeTeamPerk: null };
        let limited_size_ids = MECH_UPGRADES[upgradeId].limited_size_ids || [];
        let sizeTeamPerk = null;
        let valid = true;

        if (upgradeId === MECH_UPGRADE.COMBAT_SHIELD) {
            const teamPerks = teamStore.getTeamPerksInfoByMech(mechId);
            let combatBuckler = findById(teamPerks, TEAM_PERK.COMBAT_BUCKLER);
            if (combatBuckler) {
                limited_size_ids = [...limited_size_ids, SIZE.MEDIUM];

                if (mech.size_id === SIZE.MEDIUM) {
                    sizeTeamPerk = combatBuckler;
                }
            }
        }

        if (limited_size_ids.length) {
            valid = limited_size_ids.includes(mech.size_id);
        }

        return {
            valid,
            upgradeDisplayName: MECH_UPGRADES[upgradeId].display_name,
            validSizeDisplayNames: limited_size_ids.map((sizeId) => MECH_SIZES[sizeId].display_name),
            sizeTeamPerk,
        };
    }

    function getMechArmorUpgradeSizeValidation(mechId: number, armorUpgradeId: MECH_ARMOR_UPGRADE) {
        let mech = mechStore.getMech(mechId);
        if (!mech) return { valid: true, armorUpgradeDisplayName: null, validSizeDisplayNames: [] };
        let {
            size_id,
        } = mech;

        const { limited_size_ids, display_name } = MECH_ARMOR_UPGRADES[armorUpgradeId];
        if (limited_size_ids?.length && !limited_size_ids.includes(size_id)) {
            return {
                valid: false,
                armorUpgradeDisplayName: display_name,
                validSizeDisplayNames: limited_size_ids.map((sizeId) => MECH_SIZES[sizeId].display_name),
            };
        }

        return {
            valid: true,
            armorUpgradeDisplayName: null,
            validSizeDisplayNames: [],
        };
    }

    function getTeamGroupSizeValidation(teamId: MECH_TEAM, groupId: string) {
        const { min_count, max_count } = MECH_TEAMS[teamId].groups[groupId];
        const group = teamStore.findGroup(teamId, groupId);
        const mechCount = group ? group.mechs.length : 0;

        let size_valid = true;
        let size_validation_message = 'Valid Group Size';
        if (typeof min_count === 'number') {
            if (min_count > mechCount) {
                size_valid = false;
                size_validation_message = 'Group has less than the minimum number of HE-V: ' + min_count;
            }
        }

        if (typeof max_count === 'number') {
            if (max_count < mechCount) {
                size_valid = false;
                size_validation_message = 'Group has more than the maximum number of HE-V: ' + max_count;
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
        const validIds = groupDef.limited_armor_upgrade_ids;

        if (validIds?.length) {
            if (!validIds.includes(armorUpgradeId)) {
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

    function teamGroupMechArmorUpgradeInvalidMessages(mechId: number): string[] {
        const mech = mechStore.getMech(mechId);
        if (!mech) return [];

        return mech.armor_upgrade_ids.map(id => teamGroupMechArmorUpgradeInvalid(mechId, id)).filter(v => !!v) as string[];
    }

    function teamGroupMechArmorUpgradeInvalid(mechId: number, armorUpgradeId: MECH_ARMOR_UPGRADE) {
        const mech = mechStore.getMech(mechId);
        if (!mech) return false;
        const {
            valid,
            armorUpgradeDisplayName,
            validArmorUpgradeDisplayNames,
        } = getMechTeamGroupArmorUpgradeValidation(mechId, armorUpgradeId);

        if (!valid) {
            return `Invalid Armor Upgrade: ${armorUpgradeDisplayName}. Valid values: ${validArmorUpgradeDisplayNames.join(', ')}`;
        }

        return false;
    }

    function teamGroupMechStructureInvalid(mechId: number) {
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

    function teamGroupMechArmorInvalid(mechId: number) {
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

        const { display_name, icon } = teamStore.getTeamDef(team.id);
        const groups = team.groups.map(group => getTeamGroupValidation(teamId, group.id))
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

        getTeamValidation,
        getTeamGroupValidation,
        getTeamGroupSizeValidation,
        getMechTeamGroupArmorUpgradeValidation,

        getMechArmorUpgradeSizeValidation,
        getMechWeaponSizeValidation,
        getMechUpgradeSizeValidation,

        teamGroupMechSizeInvalid,
        teamGroupMechStructureInvalid,
        teamGroupMechArmorInvalid,
        teamGroupMechArmorUpgradeInvalid,

        getNotAvailableToTeamGroupMessage,

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

export interface MechSizeValidation {
    valid: boolean,
    validSizeDisplayNames: string[],
}

export interface MechValidationInfo {
    info: MechInfo,
    valid: boolean,
    group_validation_messages: string[],
    mech_validation_messages: string[],
}