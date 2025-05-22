import {defineStore} from 'pinia';
import {computed, readonly, ref} from 'vue';
import {findItemIndexById, move, setDisplayOrders} from './helpers/collection-helper.js';
import {MECH_TEAM_SIZES, MECH_TEAMS, TEAM_FIRE_SUPPORT, TEAM_GENERAL, TEAM_RECON} from '../data/mech-teams.js';
import {useMechStore} from './mech-store.js';
import {difference, each, find, groupBy, map, sortBy, sumBy} from 'es-toolkit/compat';
import {getter} from './helpers/store-helpers.js';
import {MECH_BODY_MODS_DROP_DOWN} from '../data/mech-body.js';
import {MECH_WEAPONS} from '../data/mech-weapons.js';
import {useArmyListStore} from './army-list-store.js';
import {GAME_SIZES} from '../data/game-sizes.js';
import {MECH_TEAM_PERKS} from '../data/mech-team-perks.js';
import {MECH_SIZES, MECH_SIZES_DROP_DOWN, SIZE_HEAVY, SIZE_MEDIUM} from '../data/unit-sizes.js';
import {WEAPON_TRAITS} from '../data/weapon-traits.js';

export const useTeamStore = defineStore('team', () => {

        const mechStore = useMechStore();
        const armyListStore = useArmyListStore();

        const teams = ref([makeGeneralTeam()]);

        function $reset() {
            teams.value = [makeGeneralTeam()];
        }

        function makeGeneralTeam() {
            return {
                id: TEAM_GENERAL,
                groups: [
                    {
                        id: 'A',
                        mechs: [],
                    },
                ],
            };
        }

        const special_teams = computed(() => teams.value.filter(item => item.id !== TEAM_GENERAL));

        const addable_teams = computed(() => {
            const currentTeamIds = map(teams.value, 'id');
            const teamIds = Object.keys(MECH_TEAMS);
            const availableTeamIds = difference(teamIds, currentTeamIds);
            return availableTeamIds.map((teamId) => {
                const {display_name, icon} = MECH_TEAMS[teamId];
                return {
                    id: teamId,
                    display_name,
                    icon,
                };
            });
        });

        function addTeam(teamId) {
            const teamDef = MECH_TEAMS[teamId];
            const groups = [];

            const groupIds = Object.keys(teamDef.groups);

            groupIds.forEach((groupId) => {
                groups.push({
                    id: groupId,
                    mechs: [],
                });
            });

            teams.value.push({
                id: teamId,
                groups,
            });

            groupIds.forEach(groupId => {
                const min = MECH_TEAMS[teamId].groups[groupId].min_count;
                if (min > 0) {
                    addMechToTeam(teamId, groupId);
                }
            });
        }

        const getTeamInfo = getter((teamId) => readonly(MECH_TEAMS[teamId]));
        const getTeamGroupInfo = getter((teamId, groupId) => readonly(MECH_TEAMS[teamId].groups[groupId]));

        const getWeaponIsRequired = getter((teamId, groupId, weaponAttachment, mech) => {
            const groupInfo = getTeamGroupInfo.value(teamId, groupId);
            const teamDisplayName = getTeamInfo.value(teamId).display_name;

            if (groupInfo.required_weapon_ids.includes(weaponAttachment.weapon_id)) {
                const prevInstances = mech.weapons.filter((item) => {
                    return item.weapon_id === weaponAttachment.weapon_id && item.display_order < weaponAttachment.display_order;
                }).length;

                if (prevInstances === 0) {
                    return {
                        required: true,
                        required_reason: `Required by ${teamDisplayName} ${groupInfo.display_name}`,
                    };
                }
            }

            const requiredAtLeastOne = groupInfo.required_at_least_one_of_weapon_ids;
            if (requiredAtLeastOne.length) {
                const otherInstances = mech.weapons.filter((item) => {
                    return weaponAttachment.id !== item.id && requiredAtLeastOne.includes(item.weapon_id);
                }).length;

                if (otherInstances === 0) {

                    const atLeastOneWeapons = requiredAtLeastOne.map((weaponId) => MECH_WEAPONS[weaponId].display_name);

                    return {
                        required: true,
                        required_reason: `${teamDisplayName} ${groupInfo.display_name} require at least one of the following: ${atLeastOneWeapons.join(', ')}`,
                    };
                }
            }

            const requiredAtLeastOneWithTraitId = groupInfo.required_at_least_one_weapon_with_trait_id;
            if (requiredAtLeastOneWithTraitId) {
                const otherInstances = mech.weapons.filter((item) => {
                    const traitIds = MECH_WEAPONS[item.weapon_id].traits_by_size[mech.size_id];
                    return weaponAttachment.id !== item.id && traitIds.includes(requiredAtLeastOneWithTraitId);
                }).length;

                if (otherInstances === 0) {
                    const traitDisplayName = WEAPON_TRAITS[requiredAtLeastOneWithTraitId].display_name;

                    return {
                        required: true,
                        required_reason: `${teamDisplayName} ${groupInfo.display_name} requires at least one weapon with the of the ${traitDisplayName} trait.`,
                    };
                }
            }

            return {
                required: false,
                required_reason: null,
            };
        });

        const getWeaponIsProhibited = getter((mechId, weaponId, traits) => {
            const {teamId, groupId} = getMechTeamAndGroupIds.value(mechId);
            const groupInfo = getTeamGroupInfo.value(teamId, groupId);

            if (groupInfo.prohibited_weapons_with_trait_ids?.length) {

                const prohibited = traits.find((trait) => groupInfo.prohibited_weapons_with_trait_ids.includes(trait.id));
                if (prohibited) {
                    const teamDisplayName = getTeamInfo.value(teamId).display_name;
                    const prohibitedTraits = groupInfo.prohibited_weapons_with_trait_ids.map(traitId => WEAPON_TRAITS[traitId].display_name);
                    return {
                        valid: false,
                        validation_message: `${teamDisplayName} ${groupInfo.display_name} cannot use weapons with the following traits: ${prohibitedTraits.join(', ')}`,
                    };
                }
            }

            return {
                valid: true,
                validation_message: null,
            };
        });

        const getUpgradeIsRequired = getter((teamId, groupId, upgradeId) => {
            const groupDef = MECH_TEAMS[teamId].groups[groupId];
            return groupDef.required_upgrade_ids.includes(upgradeId);
        });

        const getMechTeamAndGroupIds = getter((mechId) => {
            let teamId = null;
            let groupId = null;

            teams.value.find((team) => {
                team.groups.find((group) => {
                    const found = group.mechs.find(mech => mech.mech_id === mechId);

                    if (!!found) {
                        teamId = team.id;
                        groupId = group.id;
                    }
                });
            });
            if (!teamId) {
                throw new Error('Mech team not found!');
            }
            if (!groupId) {
                throw new Error('Mech group not found!');
            }
            return {
                teamId,
                groupId,
            };
        });

        const getAvailableMechSizes = getter((mechId) => {
            const {teamId, groupId} = getMechTeamAndGroupIds.value(mechId);
            const info = getTeamGroupInfo.value(teamId, groupId);

            if (!info.size_ids || !info.size_ids.length) {
                return true;
            }

            return MECH_SIZES_DROP_DOWN.filter((size) => info.size_ids.includes(size.id));
        });

        // internal
        const getMechStructureModValid = getter((mechId, modId) => {
            const mech = mechStore.getMech(mechId);
            const {teamId, groupId} = getMechTeamAndGroupIds.value(mechId);
            const teamDisplayName = getTeamInfo.value(teamId).display_name;
            const info = getTeamGroupInfo.value(teamId, groupId);

            if (!getBodyModValid(info.limited_structure_mod_ids, modId)) {
                return {
                    valid: false,
                    validation_message: `Not available to ${teamDisplayName} ${info.display_name}`,
                };
            }

            const requiredId = info.required_armor_or_structure_mod_id_once;
            if (requiredId) {
                if (!requiredStructureOrArmorModValid(
                    mech.structure_mod_id,
                    mech.armor_mod_id,
                    requiredId,
                    modId,
                )) {
                    return {
                        valid: false,
                        validation_message: `${teamDisplayName} requires ${info.display_name} structure or armor to be Reinforced`,
                    };
                }
            }

            return {
                valid: true,
                validation_message: null,
            };
        });

        // internal
        const getMechArmorModValid = getter((mechId, modId) => {
            const mech = mechStore.getMech(mechId);
            const {teamId, groupId} = getMechTeamAndGroupIds.value(mechId);
            const teamDisplayName = getTeamInfo.value(teamId).display_name;
            const info = getTeamGroupInfo.value(teamId, groupId);

            if (!getBodyModValid(info.limited_armor_mod_ids, modId)) {
                return {
                    valid: false,
                    validation_message: `Not available to ${teamDisplayName} ${info.display_name}`,
                };
            }

            const requiredId = info.required_armor_or_structure_mod_id_once;
            if (requiredId) {
                if (!requiredStructureOrArmorModValid(
                    mech.armor_mod_id,
                    mech.structure_mod_id,
                    requiredId,
                    modId,
                )) {
                    return {
                        valid: false,
                        validation_message: `${teamDisplayName} requires ${info.display_name} structure or armor to be Reinforced`,
                    };
                }
            }

            return {
                valid: true,
                validation_message: null,
            };
        });

        function requiredStructureOrArmorModValid(currentModId, otherModId, requiredId, modId) {
            return !(otherModId !== requiredId &&
                currentModId === requiredId &&
                modId !== requiredId);
        }

        function getBodyModValid(limitedModIds, modId) {
            if (!limitedModIds || !limitedModIds.length) {
                return true;
            }

            return limitedModIds.includes(modId);
        }

        const getTeamMechCount = getter((teamId) => {
            const team = find(teams.value, {id: teamId});
            return sumBy(team.groups, (group) => group.mechs.length);
        });

        const getTeamGroupMechCount = getter((teamId, groupId) => {
            const group = findGroup.value(teamId, groupId);
            return group.mechs.length;
        });

        const getTeamMechIds = getter((teamId) => {
            const team = find(teams.value, {id: teamId});

            let mechIds = [];
            team.groups.forEach((group) => {
                mechIds = mechIds.concat(map(group.mechs, 'mech_id'));
            });
            return mechIds;
        });

        const getTeamGroupMechIds = getter((teamId, groupId) => {
            const group = findGroup.value(teamId, groupId);
            return map(group.mechs, 'mech_id');
        });

        const findGroup = getter((teamId, groupId) => {
            const team = find(teams.value, {id: teamId});
            return find(team.groups, {id: groupId});
        });

        const getMechStructureModOptions = getter((mechId) => {
            return MECH_BODY_MODS_DROP_DOWN.map((item) => {
                item = Object.assign({}, item);
                const {valid, validation_message} = getMechStructureModValid.value(mechId, item.id);
                item.valid = valid;
                item.validation_message = validation_message;
                return item;
            });
        });

        const getMechArmorModOptions = getter((mechId) => {
            return MECH_BODY_MODS_DROP_DOWN.map((item) => {
                item = Object.assign({}, item);
                const {valid, validation_message} = getMechArmorModValid.value(mechId, item.id);
                item.valid = valid;
                item.validation_message = validation_message;
                return item;
            });
        });

        const getMechHasTeamPerkId = getter((mechId, perkId) => {
            const sizeId = mechStore.getMech(mechId).size_id;
            const {teamId} = getMechTeamAndGroupIds.value(mechId);
            return getTeamPerkIdsByMechSize.value(teamId, sizeId).includes(perkId);
        });

        const getTeamPerksInfoByMech = getter((mechId) => {
            const sizeId = mechStore.getMech(mechId).size_id;
            const {teamId} = getMechTeamAndGroupIds.value(mechId);
            const perkIds = getTeamPerkIdsByMechSize.value(teamId, sizeId);
            return perkIdsToInfo(perkIds);
        });

        const getTeamGroupPerksInfo = getter((teamId, groupId) => {
            const groupInfo = getTeamGroupInfo.value(teamId, groupId);
            let result = groupInfo.size_ids.map(sizeId => {
                const perkIds = getTeamPerkIdsByMechSize.value(teamId, sizeId);
                return {
                    size_id: sizeId,
                    display_name: MECH_SIZES[sizeId].display_name,
                    perks: perkIdsToInfo(perkIds),
                };
            });

            // ugly hack to remove redundant data for table view
            if (
                (teamId === TEAM_RECON ||
                    teamId === TEAM_FIRE_SUPPORT) &&
                groupId === 'B'
            ) {
                const medium = find(result, {size_id: SIZE_MEDIUM});
                medium.display_name = MECH_SIZES[SIZE_MEDIUM].display_name + ' & ' + MECH_SIZES[SIZE_HEAVY].display_name;
                result = result.filter(item => item.size_id !== SIZE_HEAVY);
            }

            return result;
        });

        const getUsedTeamAbilityPerksInfo = getter((teamId) => {
            const perkIdsMap = {};
            const mechIds = getTeamMechIds.value(teamId);

            mechIds.forEach((mechId) => {
                const sizeId = mechStore.getMech(mechId).size_id;
                const perkIds = getTeamPerkIdsByMechSize.value(teamId, sizeId);
                perkIds.forEach(perkId => perkIdsMap[perkId] = true);
            });

            const perkIds = Object.keys(perkIdsMap);

            return perkIds.filter(perkId => MECH_TEAM_PERKS[perkId].is_ability)
                .map((perkId) => MECH_TEAM_PERKS[perkId]);

        });

        // internal
        const getTeamPerkIdsByMechSize = getter((teamId, sizeId) => {
            if (teamId === TEAM_GENERAL) {
                return [];
            }
            const columns = MECH_TEAMS[teamId].team_size_perk_columns;

            const indexes = [];
            columns.forEach((sizeIds, index) => {
                if (sizeIds.includes(sizeId)) {
                    indexes.push(index);
                }
            });

            if (!indexes.length) {
                return [];
            }

            const teamSize = getTeamMechCount.value(teamId);

            let perkIds = [];

            indexes.forEach(index => {
                each(MECH_TEAMS[teamId].team_size_perk_rows, (row, count) => {
                    if (count <= teamSize) {
                        perkIds = perkIds.concat(row[index]);
                    }
                });
            });

            return perkIds;
        });

        const used_teams_count = computed(() => teams.value.filter((team) => team.id !== TEAM_GENERAL).length);
        const max_teams_count = computed(() => armyListStore.game_size_info.max_teams);

        const max_team_size_info = computed(() => {
            const sizeId = armyListStore.game_size_id;
            return map(GAME_SIZES[sizeId].max_team_sizes, (count, teamSizeId) => {
                return Object.assign({
                    max_instance_count: count,
                }, MECH_TEAM_SIZES[teamSizeId]);
            });
        });

        function addMechToTeam(teamId, groupId, addDefaults = true) {
            const groupDef = MECH_TEAMS[teamId].groups[groupId];
            const mechOptions = {};

            if (addDefaults) {

                if (groupDef?.size_ids?.length) {
                    mechOptions.size_id = groupDef.size_ids[0];
                }
                if (groupDef?.limited_structure_mod_ids?.length) {
                    mechOptions.structure_mod_id = groupDef.limited_structure_mod_ids[0];
                }
                if (groupDef?.limited_armor_mod_ids?.length) {
                    mechOptions.armor_mod_id = groupDef.limited_armor_mod_ids[0];
                }
                if (groupDef?.limited_armor_upgrade_ids?.length) {
                    mechOptions.armor_upgrade_id = groupDef.limited_armor_upgrade_ids[0];
                }
                if (groupDef?.required_armor_or_structure_mod_id_once) {
                    mechOptions.structure_mod_id = groupDef.required_armor_or_structure_mod_id_once;
                }
            }
            const mech = mechStore.addMech(mechOptions);

            if (addDefaults) {
                groupDef.required_weapon_ids.forEach((weaponId) => {
                    mechStore.addMechWeaponAttachment(mech.id, weaponId);
                });
                groupDef.required_upgrade_ids.forEach((upgradeId) => {
                    mechStore.addMechUpgradeAttachment(mech.id, upgradeId);
                });
                if (groupDef?.required_at_least_one_of_weapon_ids.length) {
                    mechStore.addMechWeaponAttachment(mech.id, groupDef?.required_at_least_one_of_weapon_ids[0]);
                }
            }

            const group = findGroup.value(teamId, groupId);

            group.mechs.push({
                mech_id: mech.id,
            });
            setDisplayOrders(group.mechs);

            return mech.id;
        }

        function removeMechFromTeam(mechId) {
            const {teamId, groupId} = getMechTeamAndGroupIds.value(mechId);
            const group = findGroup.value(teamId, groupId);
            const index = group.mechs.findIndex(mech => mech.mech_id === mechId);
            group.mechs.splice(index, 1);
        }

        function removeTeam(teamId) {
            const mechIds = getTeamMechIds.value(teamId);
            mechIds.forEach((mechId) => mechStore.removeMech(mechId));
            let index = findItemIndexById(teams.value, teamId);
            teams.value.splice(index, 1);
        }

        function moveGroupMech(teamId, groupId, mechId, toIndex) {
            const group = findGroup.value(teamId, groupId);

            const index = group.mechs.findIndex(mech => mech.mech_id === mechId);
            move(group.mechs, index, toIndex);

        }

        return {
            teams,
            addable_teams,
            max_team_size_info,
            used_teams_count,
            max_teams_count,
            special_teams,

            findGroup,
            getTeamMechCount,
            getTeamGroupMechCount,
            getTeamInfo,
            getTeamGroupInfo,
            getTeamGroupMechIds,
            getWeaponIsRequired,
            getUpgradeIsRequired,
            getMechTeamAndGroupIds,
            getAvailableMechSizes,
            getMechStructureModOptions,
            getMechArmorModOptions,
            getWeaponIsProhibited,
            getTeamPerksInfoByMech,
            getTeamGroupPerksInfo,
            getMechHasTeamPerkId,
            getUsedTeamAbilityPerksInfo,
            getTeamMechIds,

            addMechToTeam,
            removeMechFromTeam,
            moveGroupMech,
            addTeam,
            removeTeam,
            $reset,
        };
    },
    {
        persist: {
            enabled: true,
            afterHydrate: (ctx) => {
                // console.log(`hydrated '${ctx.store.$id}'`);
            },
        },
    },
);

function perkIdsToInfo(perkIds) {
    const grouped = groupBy(perkIds, (perkId) => perkId);

    let result = map(grouped, (perkIds, perkId) => {
        const repeatCount = perkIds.length;
        const perkInfo = MECH_TEAM_PERKS[perkId];
        let {
            id,
            display_name,
            display_name_short,
            description,
            stackable,
            display_order,
            renderDisplayName,
            renderDesc,
            value,
            is_ability,
        } = perkInfo;

        if (repeatCount > 1 && stackable) {
            const newValue = value * repeatCount;
            return {
                id,
                display_name: renderDisplayName(value, repeatCount),
                display_name_short,
                description: renderDesc(value, repeatCount),
                display_order,
                value: newValue,
                repeatCount,
                is_ability,
            };
        }

        return {
            id,
            display_name,
            display_name_short,
            description,
            display_order,
            is_ability,
            value,
        };
    });

    return sortBy(result, 'display_order');
}