import {defineStore} from 'pinia';
import {computed} from 'vue';
import {useArmyListStore} from './army-list-store.js';
import {useTeamStore} from './team-store.js';
import {useMechStore} from './mech-store.js';
import {MECH_TEAMS} from '../data/mech-teams.js';
import {useSupportAssetCountsStore} from './support-asset-count-store.js';
import {MECH_WEAPONS} from '../data/mech-weapons.js';
import {countBy} from 'es-toolkit';
import {difference, max, min} from 'es-toolkit/compat';
import {WEAPON_TRAITS} from '../data/weapon-traits.js';
import {GAME_SIZE_BATTLE, GAME_SIZE_DUEL, GAME_SIZE_RECON, GAME_SIZE_STRIKE} from '../data/game-sizes.js';
import {useSupportAssetUnitsStore} from './support-asset-units-store.js';
import {MECH_UPGRADES} from '../data/mech-upgrades.js';
import {MECH_SIZES} from '../data/unit-sizes.js';
import {MECH_ARMOR_UPGRADES} from '../data/mech-armor-upgrades.js';
import {MECH_BODY_MODS} from '../data/mech-body.js';

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

    function getInvalidTeamGroupMechMessages(mechId) {
        return [
            teamGroupAtLeastOneWeaponWithTraitInvalid(mechId),
            teamGroupRequiredWeaponsInvalid(mechId),
            teamGroupRequiredUpgradesInvalid(mechId),
            teamGroupRequiredOneOfWeaponsInvalid(mechId),
            teamGroupMechSizeInvalid(mechId),
            teamGroupMechArmorUpgradeInvalid(mechId),
            teamGroupMechStructureInvalid(mechId),
            teamGroupMechArmorInvalid(mechId),

        ].filter(i => i);
    }

    function getInvalidMechMessages(mechId) {
        return [
            mechTonsInvalid(mechId),
            mechSlotsInvalid(mechId),
            mechArmorUpgradeInvalid(mechId),
        ].filter(i => i);
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
            current_display_name,
            valid_size_display_names,
        } = getMechArmorUpgradeValidation(mechId, armor_upgrade_id);

        if (!valid) {
            return `Invalid Armor Upgrade: ${current_display_name}. Only available to HE-V size(s): ${valid_size_display_names}`;
        }

        return false;
    }

    function getMechArmorUpgradeValidation(mechId, armorUpgradeId) {
        let {
            size_id,
        } = mechStore.getMech(mechId);

        const {limited_size_ids, display_name} = MECH_ARMOR_UPGRADES[armorUpgradeId];
        if (limited_size_ids.length && !limited_size_ids.includes(size_id)) {
            return {
                valid: false,
                current_display_name: display_name,
                valid_size_display_names: limited_size_ids.map(sizeId => MECH_SIZES[sizeId].display_name).join(', '),
            };
        }

        return {
            valid: true,
            current_display_name: null,
            valid_size_display_names: [],
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
            current_display_name,
            valid_sizes_display_names,
        } = getTeamGroupMechSizeValidation(mechId, mech.size_id);

        if (!valid) {
            return `Invalid Size: ${current_display_name}. Valid values: ${valid_sizes_display_names}`;
        }

        return false;
    }

    function getTeamGroupMechArmorUpgradeValidation(mechId, armorUpgradeId) {
        const {teamId, groupId} = teamStore.getMechTeamAndGroupIds(mechId);
        const groupDef = teamStore.getTeamGroupDef(teamId, groupId);
        const validIds = groupDef.limited_armor_upgrade_ids;

        if (validIds?.length) {
            if (!validIds.includes(armorUpgradeId)) {
                return {
                    valid: false,
                    current_display_name: MECH_ARMOR_UPGRADES[armorUpgradeId].display_name,
                    valid_armor_upgrade_display_names: validIds.map(id => MECH_ARMOR_UPGRADES[id].display_name),
                    team_display_name: teamStore.getTeamDisplayName(teamId),
                    group_display_name: groupDef.display_name,
                };

            }
        }

        return {
            valid: true,
            current_display_name: null,
            valid_armor_upgrade_display_names: [],
            team_display_name: null,
            group_display_name: null,
        };
    }

    function teamGroupMechArmorUpgradeInvalid(mechId) {
        const mech = mechStore.getMech(mechId);
        const {
            valid,
            current_display_name,
            valid_armor_upgrade_display_names,
        } = getTeamGroupMechArmorUpgradeValidation(mechId, mech.armor_upgrade_id);

        if (!valid) {
            return `Invalid Armor Upgrade: ${current_display_name}. Valid values: ${valid_armor_upgrade_display_names.join(', ')}`;
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
                current_display_name: MECH_SIZES[sizeId].display_name,
                valid_sizes_display_names: groupDef.size_ids.map(id => MECH_SIZES[id].display_name).join(', '),
            };
        }
        return {
            valid: true,
            current_display_name: null,
            valid_sizes_display_names: null,
        };
    }

    function getTeamValidation(teamId) {
        const team = teamStore.findTeam(teamId);

        const {display_name, icon} = teamStore.getTeamDef(team.id);

        const groups = team.groups.map(group => getTeamGroupValidation(teamId, group.id)).filter(i => i);
        if (!groups.length) {
            return false;
        }

        return {
            id: team.id,
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
            const group_validation_messages = getInvalidTeamGroupMechMessages(mechId);
            const mech_validation_messages = [
                mechTonsInvalid(mechId),
                mechSlotsInvalid(mechId),
                mechArmorUpgradeInvalid(mechId),
            ].filter(i => i);

            if (!group_validation_messages.length && !mech_validation_messages.length) {
                return false;
            }

            return {
                info: mechStore.getMechInfo(mechId),
                group_validation_messages,
                mech_validation_messages,
            };
        }).filter(i => i);

        if (!mechs.length) {
            return false;
        }

        return {
            id: groupId,
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

        getInvalidMechMessages,
        getInvalidTeamGroupMechMessages,

        getTeamGroupSizeValidation,
        getTeamGroupMechArmorUpgradeValidation,

        getMechArmorUpgradeValidation,

        teamGroupMechSizeInvalid,
        teamGroupMechStructureInvalid,
        teamGroupMechArmorInvalid,

        getNotAvailableToTeamGroupMessage,

        $reset,
    };
});