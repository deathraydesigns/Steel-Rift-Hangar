import {defineStore} from 'pinia';
import {computed} from 'vue';
import {useArmyListStore} from './army-list-store.js';
import {useTeamStore} from './team-store.js';
import {useMechStore} from './mech-store.js';
import {MECH_TEAMS} from '../data/mech-teams.js';
import {useSupportAssetCountsStore} from './support-asset-count-store.js';
import {MECH_WEAPONS} from '../data/mech-weapons.js';
import {countBy} from 'es-toolkit';
import {difference, find, max, min} from 'es-toolkit/compat';
import {WEAPON_TRAITS} from '../data/weapon-traits.js';
import {GAME_SIZE_BATTLE, GAME_SIZE_DUEL, GAME_SIZE_RECON, GAME_SIZE_STRIKE} from '../data/game-sizes.js';
import {useSupportAssetUnitsStore} from './support-asset-units-store.js';
import {COMBAT_SHIELD, MECH_UPGRADES} from '../data/mech-upgrades.js';
import {MECH_SIZES, SIZE_MEDIUM} from '../data/unit-sizes.js';
import {MECH_ARMOR_UPGRADES} from '../data/mech-armor-upgrades.js';
import {MECH_BODY_MODS} from '../data/mech-body.js';
import {TEAM_PERK_COMBAT_BUCKLER} from '../data/mech-team-perks.js';

export const useValidationStore = defineStore('validation', () => {

    const armyListStore = useArmyListStore();
    const teamStore = useTeamStore();
    const mechStore = useMechStore();
    const supportAssetCountStore = useSupportAssetCountsStore();
    const supportAssetUnitsStore = useSupportAssetUnitsStore();

    function $reset() {

    }

    const list_is_valid = computed(() => {
        return !list_validation.value.length && !team_validation.value.length;
    });

    const list_validation = computed(() => {
        let messages = [
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
        const {used_support_assets, max_support_assets} = supportAssetCountStore;

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
        const messageMin = (val) => ({
            valid: false,
            validation_message: `A team has less than the minimum of ${val} HE-Vs`,
        });
        const messageMax = (val) => ({
            valid: false,
            validation_message: `A team has more than the maximum of ${val} HE-Vs`,
        });

        const gameSizeId = armyListStore.game_size_id;

        if (gameSizeId === GAME_SIZE_DUEL) {
            return messageValid;
        }
        const teamCounts = teamStore.special_teams.map((team) => teamStore.getTeamMechCount(team.id));
        const smallestTeamCount = min(teamCounts);
        const largestTeamCount = max(teamCounts);

        if (smallestTeamCount < 2) {
            return messageMin(2);
        }

        if (gameSizeId === GAME_SIZE_RECON) {
            if (largestTeamCount > 2) {
                return messageMax(2);
            }
        }

        if (gameSizeId === GAME_SIZE_STRIKE) {
            if (largestTeamCount > 3) {
                return messageMax(3);
            }
        }

        if (gameSizeId === GAME_SIZE_BATTLE) {
            if (largestTeamCount > 4) {
                return messageMax(4);
            }
            const instancesOfCount = countBy(teamCounts, (i) => i);
            if (instancesOfCount[4] > 1) {
                return {
                    valid: false,
                    validation_message: `There may only be one team with a count of 4 HE-Vs`,
                };
            }
        }
        return messageValid;
    });

    function mechTeamGroupMessages(mechId) {
        return [
            teamGroupRequiredUpgradesInvalid(mechId),
            teamGroupMechSizeInvalid(mechId),
            teamGroupMechArmorUpgradeInvalid(mechId),
            teamGroupMechStructureInvalid(mechId),
            teamGroupMechArmorInvalid(mechId),
            ...mechTeamGroupWeaponMessages(mechId),
            ...mechTeamGroupUpgradeMessages(mechId),
        ].filter(i => i);
    }

    function mechTeamGroupWeaponMessages(mechId) {
        return [
            teamGroupProhibitedWeaponsInvalid(mechId),
            teamGroupRequiredWeaponsInvalid(mechId),
            teamGroupRequiredOneOfWeaponsInvalid(mechId),
            teamGroupAtLeastOneWeaponWithTraitInvalid(mechId),
        ].filter(i => i);
    }

    function mechTeamGroupUpgradeMessages(mechId) {
        return [
            teamGroupRequiredUpgradesInvalid(mechId),
        ].filter(i => i);
    }

    function mechMessages(mechId) {
        return [
            mechTonsInvalid(mechId),
            mechSlotsInvalid(mechId),
            mechArmorUpgradeInvalid(mechId),
            ...getInvalidMechWeaponMessages(mechId),
            ...getInvalidMechUpgradeMessages(mechId),
        ].filter(i => i);
    }

    function mechAllWeaponMessages(mechId) {
        return [
            ...getInvalidMechWeaponMessages(mechId),
            ...mechTeamGroupWeaponMessages(mechId),
        ].filter(i => i);
    }

    function mechAllUpgradesMessages(mechId) {
        return [
            ...getInvalidMechUpgradeMessages(mechId),
            ...mechTeamGroupUpgradeMessages(mechId),
        ].filter(i => i);
    }

    function getInvalidMechWeaponMessages(mechId) {
        const mech = mechStore.getMech(mechId);
        return mech.weapons.map(weapon => {
            const {
                valid,
                validSizeDisplayNames,
            } = getMechWeaponSizeValidation(mechId, weapon.weapon_id);
            if (!valid) {
                const displayName = MECH_WEAPONS[weapon.weapon_id].display_name;
                return `${displayName} is only available for ${validSizeDisplayNames.join('/')} HE-Vs`;
            }
        });
    }

    function getInvalidMechUpgradeMessages(mechId) {
        const mech = mechStore.getMech(mechId);
        return mech.upgrades.map(weapon => {
            const {
                valid,
                validSizeDisplayNames,
                upgradeDisplayName,
            } = getMechUpgradeSizeValidation(mechId, weapon.upgrade_id);
            if (!valid) {
                return `${upgradeDisplayName} is only available for ${validSizeDisplayNames.join('/')} HE-Vs`;
            }
        });
    }

    function mechTonsInvalid(mechId) {
        const {max_tons, used_tons} = mechStore.getMechInfo(mechId);

        if (max_tons < used_tons) {
            return `Uses ${used_tons}/${max_tons} tons`;
        }
        return false;
    }

    function mechSlotsInvalid(mechId) {
        const {max_slots, used_slots} = mechStore.getMechInfo(mechId);

        if (max_slots < used_slots) {
            return `Uses ${used_slots}/${max_slots} slots`;
        }
        return false;
    }

    function getNotAvailableToTeamGroupMessage(mechId) {
        const {teamId, groupId} = teamStore.getMechTeamAndGroupIds(mechId);
        const teamGroupDisplayName = teamStore.getFullTeamGroupDisplayName(teamId, groupId);
        return `Not available to ${teamGroupDisplayName}`;
    }

    function mechArmorUpgradeInvalid(mechId) {
        let {
            armor_upgrade_id,
        } = mechStore.getMech(mechId);

        const {
            valid,
            armorUpgradeDisplayName,
            validSizeDisplayNames,
        } = getMechArmorUpgradeSizeValidation(mechId, armor_upgrade_id);

        if (!valid) {
            return `Invalid Armor Upgrade: ${armorUpgradeDisplayName}. Only available to HE-V size(s): ${validSizeDisplayNames}`;
        }

        return false;
    }

    function getMechWeaponSizeValidation(mechId, weaponId) {
        const mech = mechStore.getMech(mechId);
        const size_id = mech.size_id;
        const weapon = MECH_WEAPONS[weaponId];
        const limited_size_ids = weapon.limited_size_ids;

        if (limited_size_ids.length) {
            return {
                valid: limited_size_ids.includes(size_id),
                validSizeDisplayNames: limited_size_ids.map(sizeId => MECH_SIZES[sizeId].display_name),
            };
        }
        return {
            valid: true,
            validSizeDisplayNames: [],
        };
    }

    function getMechUpgradeSizeValidation(mechId, upgradeId) {
        const mech = mechStore.getMech(mechId);
        let limited_size_ids = MECH_UPGRADES[upgradeId].limited_size_ids || [];
        let sizeTeamPerk = null;
        let valid = true;

        if (upgradeId === COMBAT_SHIELD) {
            const teamPerks = teamStore.getTeamPerksInfoByMech(mechId);
            let combatBuckler = find(teamPerks, {id: TEAM_PERK_COMBAT_BUCKLER});
            if (combatBuckler) {
                limited_size_ids = [...limited_size_ids, SIZE_MEDIUM];

                if (mech.size_id === SIZE_MEDIUM) {
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
            validSizeDisplayNames: limited_size_ids.map(sizeId => MECH_SIZES[sizeId].display_name),
            sizeTeamPerk,
        };
    }

    function getMechArmorUpgradeSizeValidation(mechId, armorUpgradeId) {
        let {
            size_id,
        } = mechStore.getMech(mechId);

        const {limited_size_ids, display_name} = MECH_ARMOR_UPGRADES[armorUpgradeId];
        if (limited_size_ids.length && !limited_size_ids.includes(size_id)) {
            return {
                valid: false,
                armorUpgradeDisplayName: display_name,
                validSizeDisplayNames: limited_size_ids.map(sizeId => MECH_SIZES[sizeId].display_name),
            };
        }

        return {
            valid: true,
            armorUpgradeDisplayName: null,
            validSizeDisplayNames: [],
        };
    }

    function getTeamGroupSizeValidation(teamId, groupId) {
        const {min_count, max_count} = MECH_TEAMS[teamId].groups[groupId];
        const group = teamStore.findGroup(teamId, groupId);
        const mechCount = group.mechs.length;

        let size_valid = true;
        let size_validation_message = 'Valid Group Size';
        if (min_count !== false) {
            if (min_count > mechCount) {
                size_valid = false;
                size_validation_message = 'Group has less than the minimum number of HE-V: ' + min_count;
            }
        }

        if (max_count !== false) {
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

    function teamGroupAtLeastOneWeaponWithTraitInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
        const groupDef = teamStore.getMechTeamGroupDef(mechId);

        const requiredAtLeastOneWithTraitId = groupDef.required_at_least_one_weapon_with_trait_id;
        if (requiredAtLeastOneWithTraitId) {
            const result = mech.weapons.find((weapon) => {
                const traits = MECH_WEAPONS[weapon.weapon_id].traits_by_size[mech.size_id];
                return traits.find(trait => trait.id === requiredAtLeastOneWithTraitId);
            });
            if (!result) {
                const traitDisplayName = WEAPON_TRAITS[requiredAtLeastOneWithTraitId].display_name;

                return `Team group requires at least one weapon with the ${traitDisplayName} trait.`;
            }
        }

        return false;
    }

    function teamGroupRequiredWeaponsInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
        const weaponIds = mech.weapons.map(weapon => weapon.weapon_id);
        const groupDef = teamStore.getMechTeamGroupDef(mechId);

        const missingWeaponIds = difference(groupDef.required_weapon_ids, weaponIds);

        if (missingWeaponIds.length) {
            const weapons = missingWeaponIds.map(weaponId => MECH_WEAPONS[weaponId].display_name);
            return `Team Group requires weapon(s): ${weapons.join(', ')}`;
        }

        return false;
    }

    function teamGroupProhibitedWeaponsInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
        const weaponIds = mech.weapons.map(weapon => weapon.weapon_id);

        const prohibitedWeaponIds = weaponIds.filter(weaponId => {
            let {traits} = mechStore.getWeaponTraitsInfo(mechId, weaponId);
            const {valid} = teamStore.getWeaponTraitIsProhibited(mechId, weaponId, traits);
            return !valid;
        });

        if (prohibitedWeaponIds.length) {
            const groupDef = teamStore.getMechTeamGroupDef(mechId);
            const traits = groupDef.prohibited_weapons_with_trait_ids.map(traitId => WEAPON_TRAITS[traitId].display_name);
            const weapons = prohibitedWeaponIds.map(weaponId => MECH_WEAPONS[weaponId].display_name);
            return `Team Group prohibits weapons with the trait(s) ${traits.join(', ')}: Invalid Weapons: ${weapons.join(', ')}`;
        }

        return false;
    }

    function teamGroupRequiredOneOfWeaponsInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
        const weaponIds = mech.weapons.map(weapon => weapon.weapon_id);
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

    function teamGroupRequiredUpgradesInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
        const upgradeIds = mech.upgrades.map(upgrade => upgrade.upgrade_id);
        const groupDef = teamStore.getMechTeamGroupDef(mechId);
        const missingUpgradeIds = difference(groupDef.required_upgrade_ids, upgradeIds);

        if (missingUpgradeIds.length) {
            const upgrades = missingUpgradeIds.map(id => MECH_UPGRADES[id].display_name);
            return `Team Group requires upgrade(s): ${upgrades.join(', ')}`;
        }

        return false;
    }

    function teamGroupMechSizeInvalid(mechId) {
        const mech = mechStore.getMech(mechId);

        const {
            valid,
            sizeDisplayName,
            validSizeDisplayNames,
        } = getTeamGroupMechSizeValidation(mechId, mech.size_id);

        if (!valid) {
            return `Invalid Size: ${sizeDisplayName}. Valid values: ${validSizeDisplayNames.join(', ')}`;
        }

        return false;
    }

    function getMechTeamGroupArmorUpgradeValidation(mechId, armorUpgradeId) {
        const {teamId, groupId} = teamStore.getMechTeamAndGroupIds(mechId);
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

    function teamGroupMechArmorUpgradeInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
        const {
            valid,
            armorUpgradeDisplayName,
            validArmorUpgradeDisplayNames,
        } = getMechTeamGroupArmorUpgradeValidation(mechId, mech.armor_upgrade_id);

        if (!valid) {
            return `Invalid Armor Upgrade: ${armorUpgradeDisplayName}. Valid values: ${validArmorUpgradeDisplayNames.join(', ')}`;
        }

        return false;
    }

    function teamGroupMechStructureInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
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

    function teamGroupMechArmorInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
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
        return teamStore.teams.map(team => getTeamValidation(team.id)).filter(i => i);
    });

    function getTeamGroupMechSizeValidation(mechId, sizeId) {
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

    function getTeamValidation(teamId) {
        const team = teamStore.findTeam(teamId);

        const {display_name, icon} = teamStore.getTeamDef(team.id);
        const groups = team.groups.map(group => getTeamGroupValidation(teamId, group.id))
            .filter(i => i);

        return {
            id: team.id,
            valid: !groups.length,
            display_name,
            icon,
            groups,
        };
    }

    function getTeamGroupValidation(teamId, groupId) {
        const {size_valid, size_validation_message} = getTeamGroupSizeValidation(teamId, groupId);
        const validation_messages = [];
        if (!size_valid) {
            validation_messages.push(size_validation_message);
        }

        const {display_name} = teamStore.getTeamGroupDef(teamId, groupId);
        const mechIds = teamStore.getTeamGroupMechIds(teamId, groupId);

        let mechs = mechIds.map(mechId => {
            const group_validation_messages = mechTeamGroupMessages(mechId);
            const mech_validation_messages = mechMessages(mechId);

            if (!group_validation_messages.length && !mech_validation_messages.length) {
                return false;
            }

            return {
                info: mechStore.getMechInfo(mechId),
                group_validation_messages,
                mech_validation_messages,
            };
        }).filter(i => i);

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