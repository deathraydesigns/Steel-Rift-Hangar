import { difference, sumBy } from 'es-toolkit';
import { defineScopeableStore } from 'pinia-scope';
import { computed, ref } from 'vue';
import { GAME_SIZES } from '../data/game-sizes';
import { type MECH_ARMOR_UPGRADE, MECH_ARMOR_UPGRADES } from '../data/mech-armor-upgrades';
import { MECH_TEAM_PERKS, perkIdsToInfo, TEAM_PERK } from '../data/mech-team-perks';
import {
    MECH_TEAM,
    MECH_TEAM_SIZE,
    MECH_TEAM_SIZES,
    MECH_TEAMS,
    SUPPORT_ASSET_UNITS_GROUP_ID,
} from '../data/mech-teams';
import { MECH_UPGRADE, MECH_UPGRADES, MechDroneUpgradeAttachType } from '../data/mech-upgrades';
import { type MECH_WEAPON, MECH_WEAPONS, weaponHasTrait } from '../data/mech-weapons';
import { MECH_SIZES, type MechSizeId, SIZE } from '../data/unit-sizes';
import { UPGRADE_TRAIT, UPGRADE_TRAITS } from '../data/upgrade-traits';
import { WEAPON_TRAIT, WEAPON_TRAITS, weaponTraitInfo } from '../data/weapon-traits';
import type { Mech, MechGroupInstance, MechTeamInstance, MechWeaponAttachment, Trait, TraitInfo } from '../types';
import { useArmyListStore } from './army-list-store';
import { findBy, findById, findItemIndexById, move, setDisplayOrders } from './helpers/collection-helper';
import { ifEmptyString, makeUniqueItemIdCollection } from './helpers/helpers';
import { type AddMechOptions, useMechStore } from './mech-store';
import { useSupportAssetUnitsStore } from './support-asset-units-store';

export const useTeamStore = defineScopeableStore('team', ({ scope }: { scope: string }) => {

        const mechStore = useMechStore(scope);
        const armyListStore = useArmyListStore(scope);
        const supportAssetUnitStore = useSupportAssetUnitsStore(scope);

        const teams = ref<MechTeamInstance[]>([makeGeneralTeam(), makeShelfTeam()]);

        function $reset() {
            teams.value = [makeGeneralTeam(), makeShelfTeam()];
        }

        function afterHydrate() {
            if (!findTeam(MECH_TEAM.SHELF)) {
                teams.value.push(makeShelfTeam());
            }

            mechStore.mechs.forEach((mech: Mech) => {
                if (!mech.preferred_team_id) {
                    let { teamId } = getMechTeamAndGroupIds(mech.id);
                    mech.preferred_team_id = normalizePreferredTeamId(teamId);
                }
            });
        }

        function isSpecialTeam(teamId: MECH_TEAM) {
            return teamId !== MECH_TEAM.GENERAL && teamId !== MECH_TEAM.SHELF;
        }

        const non_shelf_teams = computed(() => teams.value.filter(team => team.id !== MECH_TEAM.SHELF));
        const special_teams = computed(() => teams.value.filter(item => isSpecialTeam(item.id)));

        const addable_teams = computed(() => {
            const currentTeamIds = teams.value.map(v => v.id);
            const teamIds = (Object.keys(MECH_TEAMS) as MECH_TEAM[]).filter(isSpecialTeam);
            const availableTeamIds = difference(teamIds, currentTeamIds);
            return availableTeamIds.map((teamId) => {
                const { display_name, icon } = MECH_TEAMS[teamId];
                return {
                    id: teamId,
                    display_name,
                    icon,
                };
            });
        });

        function addTeam(teamId: MECH_TEAM) {
            const teamDef = MECH_TEAMS[teamId];
            const groupIds = Object.keys(teamDef.groups);
            const groups: MechGroupInstance[] = groupIds.map((groupId) => {
                return {
                    id: groupId,
                    visible: true,
                    mechs: [],
                };
            });

            teams.value.push({
                id: teamId,
                visible: true,
                groups,
            });
        }

        function addTeamWithDefaultMechs(teamId: MECH_TEAM) {
            addTeam(teamId);

            const team = findTeam(teamId);
            if (!team) return;

            team.groups.forEach(group => {
                const min = getTeamGroupDef(teamId, group.id).min_count;
                if (typeof min === 'number' && min > 0 && group.id !== SUPPORT_ASSET_UNITS_GROUP_ID) {
                    addMechToTeamWithDefaults(teamId, group.id);
                }
            });
        }

        function getTeamVisibleComputed(teamId: MECH_TEAM) {
            return computed({
                get() {
                    const team = findTeam(teamId);
                    return team ? team.visible : false;
                },
                set(newVal: boolean) {
                    const team = findTeam(teamId);
                    if (team) team.visible = newVal;
                },
            });
        }

        function getTeamGroupVisibleComputed(teamId: MECH_TEAM, groupId: string) {
            return computed({
                get() {
                    const group = findGroup(teamId, groupId);
                    return group ? group.visible : false;
                },
                set(newVal: boolean) {
                    const group = findGroup(teamId, groupId);
                    if (group) group.visible = newVal;
                },
            });
        }

        const getTeamDisplayName = (teamId: MECH_TEAM) => MECH_TEAMS[teamId].display_name;

        const getTeamGroupDisplayName = (teamId: MECH_TEAM, groupId: string) => MECH_TEAMS[teamId].groups[groupId].display_name;

        const getFullTeamGroupDisplayName = (teamId: MECH_TEAM, groupId: string) => {
            const team = getTeamDisplayName(teamId);
            const group = getTeamGroupDisplayName(teamId, groupId);
            return `${team} ${group}`;
        };

        const getMechFullTeamGroupDisplayName = (mechId: number) => {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const team = getTeamDisplayName(teamId);
            const group = getTeamGroupDisplayName(teamId, groupId);
            return `${team} ${group}`;
        };

        const getTeamDef = (teamId: MECH_TEAM) => MECH_TEAMS[teamId];

        const getTeamGroupDef = (teamId: MECH_TEAM, groupId: string) => MECH_TEAMS[teamId].groups[groupId];

        function getArmorUpgradeIsRequired(teamId: MECH_TEAM, groupId: string, armorUpgradeId: MECH_ARMOR_UPGRADE) {
            const groupDef = getTeamGroupDef(teamId, groupId);
            const teamGroupDisplayName = getFullTeamGroupDisplayName(teamId, groupId);
            const validIds = groupDef.required_at_least_one_of_armor_upgrade_ids;

            if (validIds.length) {
                if (validIds.includes(armorUpgradeId)) {
                    const validArmorUpgradeDisplayNames = validIds.map(id => MECH_ARMOR_UPGRADES[id].display_name);

                    return {
                        required: true,
                        required_reason: `${teamGroupDisplayName} requires at least one of the following: ${validArmorUpgradeDisplayNames.join(', ')}`,
                    };
                }
            }

            return {
                required: false,
                required_reason: null,
            };
        }

        function getWeaponAttachmentIsRequired(teamId: MECH_TEAM, groupId: string, weaponAttachment: MechWeaponAttachment, mech: Mech) {
            const groupDef = getTeamGroupDef(teamId, groupId);
            const teamGroupDisplayName = getFullTeamGroupDisplayName(teamId, groupId);

            if (groupDef.required_weapon_ids.includes(weaponAttachment.weapon_id)) {
                const prevInstances = mech.weapons.filter((item) => {
                    return item.weapon_id === weaponAttachment.weapon_id && (item.display_order ?? 0) < (weaponAttachment.display_order ?? 0);
                }).length;

                if (prevInstances === 0) {
                    return {
                        required: true,
                        required_reason: `Required by ${teamGroupDisplayName}`,
                    };
                }
            }

            const requiredAtLeastOne = groupDef.required_at_least_one_of_weapon_ids;
            if (requiredAtLeastOne.length) {
                const otherInstances = mech.weapons.filter((item) => {
                    return weaponAttachment.id !== item.id && requiredAtLeastOne.includes(item.weapon_id);
                }).length;

                if (otherInstances === 0) {
                    const atLeastOneWeapons = requiredAtLeastOne.map((weaponId) => MECH_WEAPONS[weaponId].display_name);

                    return {
                        required: true,
                        required_reason: `${teamGroupDisplayName}: require at least one of the following: ${atLeastOneWeapons.join(', ')}`,
                    };
                }
            }

            const requiredAtLeastOneWithTraitId = groupDef.required_at_least_one_weapon_with_trait_id;
            if (requiredAtLeastOneWithTraitId && weaponHasTrait(weaponAttachment.weapon_id, requiredAtLeastOneWithTraitId)) {
                const otherInstances = mech.weapons.filter((item) => {
                    const notSelf = weaponAttachment.id !== item.id;
                    const hasTrait = weaponHasTrait(item.weapon_id, requiredAtLeastOneWithTraitId);
                    const isPrevInstance = (item.display_order ?? 0) < (weaponAttachment.display_order ?? 0);

                    return notSelf &&
                        hasTrait &&
                        isPrevInstance;
                }).length;

                if (otherInstances === 0) {
                    const traitDisplayName = WEAPON_TRAITS[requiredAtLeastOneWithTraitId].display_name;

                    return {
                        required: true,
                        required_reason: `${teamGroupDisplayName}: Requires at least one weapon with the ${traitDisplayName} trait.`,
                    };
                }
            }

            return {
                required: false,
                required_reason: null,
            };
        }

        function getWeaponProhibited(mechId: number, weaponId: MECH_WEAPON, weaponAttachmentId?: number) {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const groupDef = getTeamGroupDef(teamId, groupId);
            const mech = mechStore.getMech(mechId);
            if (!mech) return { valid: true, validation_message: null };

            if (!groupDef.allow_duplicate_weapons) {
                // ignore self
                if (mech.weapons.some((item) => {
                    if (weaponAttachmentId !== undefined && item.id === weaponAttachmentId) {
                        return false;
                    }

                    return item.weapon_id === weaponId;
                })) {
                    const teamGroupDisplayName = getFullTeamGroupDisplayName(teamId, groupId);

                    return {
                        valid: false,
                        validation_message: `${teamGroupDisplayName}: Cannot have weapon duplicates`,
                    };
                }
            }

            return {
                valid: true,
                validation_message: null,
            };
        }

        function getWeaponTraitsProhibited(mechId: number, traits: Trait<WEAPON_TRAIT>[]) {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const groupDef = getTeamGroupDef(teamId, groupId);

            if (groupDef.prohibited_weapons_with_trait_ids?.length) {
                const prohibited = traits.find((trait) => groupDef.prohibited_weapons_with_trait_ids.includes(trait.id));
                if (prohibited) {
                    const teamGroupDisplayName = getFullTeamGroupDisplayName(teamId, groupId);
                    const prohibitedTraits = groupDef.prohibited_weapons_with_trait_ids.map(traitId => WEAPON_TRAITS[traitId].display_name);
                    return {
                        valid: false,
                        validation_message: `${teamGroupDisplayName}: cannot use weapons with the following traits: ${prohibitedTraits.join(', ')}`,
                    };
                }
            }

            if (groupDef.limited_weapons_with_at_least_one_of_trait_ids?.length) {
                const matched = traits.find((trait) => groupDef.limited_weapons_with_at_least_one_of_trait_ids.includes(trait.id));
                if (!matched) {
                    const teamGroupDisplayName = getFullTeamGroupDisplayName(teamId, groupId);
                    const requiredTraits = groupDef.limited_weapons_with_at_least_one_of_trait_ids.map(traitId => WEAPON_TRAITS[traitId].display_name);
                    return {
                        valid: false,
                        validation_message: `${teamGroupDisplayName}: can only use weapons with one of the following traits: ${requiredTraits.join(', ')}`,
                    };
                }
            }

            return {
                valid: true,
                validation_message: null,
            };
        }

        function getMechWeaponIsRequiredInfo(mechId: number, weaponId: MECH_WEAPON) {
            const groupDef = getMechTeamGroupDef(mechId);
            const teamDisplayName = getMechFullTeamGroupDisplayName(mechId);

            if (groupDef.required_weapon_ids.includes(weaponId)) {
                const weapons = groupDef.required_weapon_ids.map(weaponId => MECH_WEAPONS[weaponId].display_name);
                return {
                    required: true,
                    reason: `${teamDisplayName}: requires each of the following weapon(s): ${weapons.join(', ')}`,
                };
            }

            if (groupDef.required_at_least_one_of_weapon_ids.includes(weaponId)) {
                const weapons = groupDef.required_at_least_one_of_weapon_ids.map(weaponId => MECH_WEAPONS[weaponId].display_name);

                return {
                    required: true,
                    reason: `${teamDisplayName}: requires one of the following weapon(s): ${weapons.join(', ')}`,
                };
            }

            const requiredAtLeastOneWithTraitId = groupDef.required_at_least_one_weapon_with_trait_id;
            if (requiredAtLeastOneWithTraitId && weaponHasTrait(weaponId, requiredAtLeastOneWithTraitId)) {
                const traitDisplayName = WEAPON_TRAITS[requiredAtLeastOneWithTraitId].display_name;

                return {
                    required: true,
                    reason: `${teamDisplayName}: requires one weapon with the ${traitDisplayName} trait.`,
                };
            }

            return {
                required: false,
                reason: null,
            };
        }

        function getMechUpgradeIsRequired(mechId: number, upgradeId: MECH_UPGRADE) {
            const groupDef = getMechTeamGroupDef(mechId);
            return groupDef.required_upgrade_ids.includes(upgradeId);
        }

        function getMechTeamGroupDef(mechId: number) {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            return getTeamGroupDef(teamId, groupId);
        }

        function getMechTeamAndGroupIds(mechId: number) {
            let teamId: MECH_TEAM | null = null;
            let groupId: string | null = null;

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
        }

        function getAvailableMechSizes(mechId: number) {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const groupDef = getTeamGroupDef(teamId, groupId);

            return Object.values(MECH_SIZES).map(size => {
                return {
                    valid: groupDef.size_ids.includes(size.id),
                    ...size,
                };
            });
        }

        function getTeamMechCount(teamId: MECH_TEAM) {
            const team = findById(teams.value, teamId);
            return team ? sumBy(team.groups, (group) => group.mechs.length) : 0;
        }

        function getTeamUnitCount(teamId: MECH_TEAM) {
            const mechCount = getTeamMechCount(teamId);
            const def = getTeamDef(teamId);
            if (def.support_asset_units) {
                return mechCount + coordinatedAssetsTeamUnitsInfo.value.length;
            }

            return mechCount;
        }

        const coordinatedAssetsTeamUnitsInfo = computed(() => supportAssetUnitStore.support_asset_units_info.filter(v => v?.is_coordinated_asset_team));

        function getTeamGroupUnitCount(teamId: MECH_TEAM, groupId: string) {
            const group = findGroup(teamId, groupId);
            const def = getTeamDef(teamId);
            if (def.support_asset_units && groupId === SUPPORT_ASSET_UNITS_GROUP_ID) {
                return coordinatedAssetsTeamUnitsInfo.value.length;
            }

            return group?.mechs.length ?? 0;
        }

        function getTeamMechIds(teamId: MECH_TEAM) {
            const team = findById(teams.value, teamId);
            if (!team) return [];

            let mechIds: number[] = [];
            team.groups.forEach((group) => {
                mechIds = mechIds.concat(Object.values(group.mechs).map(v => v.mech_id));
            });
            return mechIds;
        }

        function getTeamGroupMechIds(teamId: MECH_TEAM, groupId: string) {
            const group = findGroup(teamId, groupId);
            return group ? Object.values(group.mechs).map(v => v.mech_id) : [];
        }

        function findTeam(teamId: MECH_TEAM) {
            return findById(teams.value, teamId);
        }

        function initTeam(teamId: MECH_TEAM) {
            if (!findTeam(teamId)) {
                addTeam(teamId);
            }
        }

        function findGroup(teamId: MECH_TEAM, groupId: string): MechGroupInstance | undefined {
            const team = findById(teams.value, teamId);
            return team ? findById(team.groups, groupId) : undefined;
        }

        function findGroupIdForSizeId(teamId: MECH_TEAM, sizeId: MechSizeId) {
            const teamDef = getTeamDef(teamId);
            const group = Object.values(teamDef.groups).find(groupDef => {
                return groupDef.size_ids.includes(sizeId);
            });

            if (group) {
                return group.id!;
            }

            return Object.keys(teamDef.groups)[0];
        }

        function getMechHasTeamPerkId(mechId: number, perkId: TEAM_PERK) {
            const mech = mechStore.getMech(mechId);
            if (!mech) return false;
            const sizeId = mech.size_id;
            const { teamId } = getMechTeamAndGroupIds(mechId);
            return getTeamPerkIdsByMechSize(teamId, sizeId).includes(perkId);
        }

        function getTeamPerksInfoByMech(mechId: number) {
            const mech = mechStore.getMech(mechId);
            if (!mech) return [];
            const sizeId = mech.size_id;
            const { teamId } = getMechTeamAndGroupIds(mechId);
            const perkIds = getTeamPerkIdsByMechSize(teamId, sizeId);
            return perkIdsToInfo(perkIds);
        }

        function getTeamGroupPerksInfo(teamId: MECH_TEAM, groupId: string) {
            const groupDef = getTeamGroupDef(teamId, groupId);
            let result = groupDef.size_ids.map(sizeId => {
                const perkIds = getTeamPerkIdsByMechSize(teamId, sizeId);
                return {
                    size_id: sizeId,
                    display_name: MECH_SIZES[sizeId].display_name,
                    perks: perkIdsToInfo(perkIds),
                };
            });

            // ugly hack to remove redundant data for table view
            if (
                (teamId === MECH_TEAM.RECON ||
                    teamId === MECH_TEAM.FIRE_SUPPORT) &&
                groupId === 'B'
            ) {
                const medium = findBy(result, 'size_id', SIZE.MEDIUM);
                if (medium) {
                    medium.display_name = MECH_SIZES[SIZE.MEDIUM].display_name + ' & ' + MECH_SIZES[SIZE.HEAVY].display_name;
                }
                result = result.filter(item => item.size_id !== SIZE.HEAVY);
            }

            return result;
        }

        function getUsedTeamAbilityPerkIds(teamId: MECH_TEAM): TEAM_PERK[] {
            const perkIdsSet = new Set<TEAM_PERK>();
            const mechIds = getTeamMechIds(teamId);

            mechIds.forEach((mechId) => {
                const mech = mechStore.getMech(mechId);
                if (!mech) return;
                const sizeId = mech.size_id;
                const perkIds = getTeamPerkIdsByMechSize(teamId, sizeId);

                perkIds.forEach(perkId => perkIdsSet.add(perkId));
            });

            return [...perkIdsSet.values()];
        }

        const allUsedTeamAbilityPerkIds = computed((): TEAM_PERK[] => {
            const perks = makeUniqueItemIdCollection(MECH_TEAM_PERKS);
            teams.value.forEach(team => {
                const perkIds = getUsedTeamAbilityPerkIds(team.id);
                perks.addIds(perkIds);
            });

            return perks.ids();
        });

        function getUsedTeamAbilityPerksInfo(teamId: MECH_TEAM) {

            const perkIds = getUsedTeamAbilityPerkIds(teamId);

            return perkIds.filter(perkId => MECH_TEAM_PERKS[perkId].visible_on_card)
                .map((perkId) => MECH_TEAM_PERKS[perkId]);
        }

        // internal
        function getTeamPerkIdsByMechSize(teamId: MECH_TEAM, sizeId: MechSizeId): TEAM_PERK[] {
            if (!isSpecialTeam(teamId)) {
                return [];
            }
            const columns = MECH_TEAMS[teamId].team_size_perk_columns;
            if (!columns) return [];

            const indexes: number[] = [];
            columns.forEach((column, index) => {
                if ('custom_perk_column' in column) return;

                if (column.includes(sizeId)) {
                    indexes.push(index);
                }
            });

            if (!indexes.length) return [];

            const teamSize = getTeamUnitCount(teamId);

            let perkIds: TEAM_PERK[] = [];

            indexes.forEach(index => {
                const rows = MECH_TEAMS[teamId].team_size_perk_rows;
                if (rows) {
                    Object.entries(rows).forEach(([count, row]) => {
                        if (Number(count) <= teamSize) {
                            perkIds = perkIds.concat(row[index]);
                        }
                    });
                }
            });

            return perkIds;
        }

        const used_teams_count = computed(() => special_teams.value.length);
        const max_teams_count = computed(() => armyListStore.game_size_info.max_teams);

        const max_team_size_info = computed(() => {
            const sizeId = armyListStore.game_size_id;
            return Object.entries(GAME_SIZES[sizeId].max_team_sizes).map(([teamSizeId, count]) => {
                return {
                    max_instance_count: count,
                    ...MECH_TEAM_SIZES[teamSizeId as MECH_TEAM_SIZE],
                };
            });
        });

        function addMechToTeam(
            teamId: MECH_TEAM,
            groupId: string,
            mechOptions: AddMechOptions = {},
            weaponIds: MECH_WEAPON[] = [],
            upgradeIds: MECH_UPGRADE[] = [],
        ) {
            initTeam(teamId);

            if (teamId !== MECH_TEAM.SHELF) {
                mechOptions.preferred_team_id = teamId;
            }

            const group = findGroup(teamId, groupId);

            if (!group) throw new Error(`invalid group: teamId: ${teamId}, groupId: ${groupId}`);
            const mechId = mechStore.addMech(mechOptions);

            group.mechs.push({
                id: mechId,
                mech_id: mechId,
                display_order: null,
            });
            setDisplayOrders(group.mechs);

            weaponIds.forEach((weaponId) => mechStore.addMechWeaponAttachment(mechId, weaponId));
            upgradeIds.forEach((upgradeId) => mechStore.addMechUpgradeAttachment(mechId, upgradeId));

            mechStore.removeInvalidArmorUpgrades(mechId);
            return mechId;
        }

        function normalizePreferredTeamId(teamId: MECH_TEAM): MECH_TEAM {
            if (teamId === MECH_TEAM.SHELF) {
                return MECH_TEAM.GENERAL;
            }
            return teamId;
        }

        function addMechToTeamFromLoadedFile(mechData: Omit<AddMechOptions, 'size_id'> & {
            size_id: MechSizeId,
            weapons: { weapon_id: MECH_WEAPON }[],
            upgrades: { upgrade_id: MECH_UPGRADE }[]
        }, teamId: MECH_TEAM) {
            initTeam(teamId);

            const {
                size_id,
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_ids,
                mobility_id,
                preferred_team_id,
                name,

                weapons,
                upgrades,
            } = mechData;

            const mechOptions = {
                size_id,
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_ids,
                mobility_id,
                preferred_team_id,
                name,
            };

            const weaponIds = weapons.map((weapon) => weapon.weapon_id);
            const upgradeIds = upgrades.map((upgrade) => upgrade.upgrade_id);
            const groupId = findGroupIdForSizeId(teamId, size_id);

            return addMechToTeam(
                teamId,
                groupId,
                mechOptions,
                weaponIds,
                upgradeIds,
            );
        }

        function addMechToTeamWithDefaults(teamId: MECH_TEAM, groupId: string) {

            const groupDef = getTeamGroupDef(teamId, groupId);

            const mechOptions: AddMechOptions = {
                preferred_team_id: normalizePreferredTeamId(teamId),
            };

            if (groupDef?.size_ids?.length) {
                mechOptions.size_id = groupDef.size_ids[0];
            }
            if (groupDef?.limited_structure_mod_ids?.length) {
                mechOptions.structure_mod_id = groupDef.limited_structure_mod_ids[0];
            }
            if (groupDef?.limited_armor_mod_ids?.length) {
                mechOptions.armor_mod_id = groupDef.limited_armor_mod_ids[0];
            }
            if (groupDef?.default_armor_upgrade_ids?.length) {
                // mechOptions.armor_upgrade_ids = [...groupDef.default_armor_upgrade_ids];
            } else if (groupDef?.required_at_least_one_of_armor_upgrade_ids?.length) {
                mechOptions.armor_upgrade_ids = [groupDef.required_at_least_one_of_armor_upgrade_ids[0]];
            }
            if (groupDef?.required_armor_or_structure_mod_id_once) {
                mechOptions.structure_mod_id = groupDef.required_armor_or_structure_mod_id_once;
            }

            if (groupDef?.default_aux_armor_upgrade_id) {
                // mechOptions.aux_armor_upgrade_id = groupDef.default_aux_armor_upgrade_id;
            }

            const weaponIds = [
                ...groupDef.required_weapon_ids,
            ];

            if (groupDef?.required_at_least_one_of_weapon_ids.length) {
                weaponIds.push(groupDef.required_at_least_one_of_weapon_ids[0]);
            }

            const upgradeIds = [
                ...groupDef.required_upgrade_ids,
            ];

            return addMechToTeam(
                teamId,
                groupId,
                mechOptions,
                weaponIds,
                upgradeIds,
            );
        }

        function removeMechFromTeam(mechId: number) {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const group = findGroup(teamId, groupId);
            if (group) {
                const index = group.mechs.findIndex(mech => mech.mech_id === mechId);
                group.mechs.splice(index, 1);
            }
            getTeamMechIds(teamId).forEach(mechId => {
                mechStore.removeInvalidArmorUpgrades(mechId);
            });
        }

        function removeTeam(teamId: MECH_TEAM) {
            const mechIds = getTeamMechIds(teamId);
            mechIds.forEach((mechId) => mechStore.removeMech(mechId));
            let index = findItemIndexById(teams.value, teamId);
            if (index !== false) teams.value.splice(index, 1);

            const def = getTeamDef(teamId);
            if (def.support_asset_units) {
                coordinatedAssetsTeamUnitsInfo.value.forEach((v) => {
                    supportAssetUnitStore.removeSupportAssetId(v.id);
                });
            }

        }

        function moveGroupMech(teamId: MECH_TEAM, groupId: string, mechId: number, toIndex: number) {
            const group = findGroup(teamId, groupId);
            if (group) {
                const index = group.mechs.findIndex(mech => mech.mech_id === mechId);
                move(group.mechs, index, toIndex);
            }
        }

        function moveMechToTeam(mechId: number, teamId: MECH_TEAM) {
            initTeam(teamId);
            const mech = mechStore.getMech(mechId);
            if (!mech) return { teamId, groupId: '' };
            let groupId = findGroupIdForSizeId(teamId, mech.size_id);

            moveMechToTeamGroup(teamId, groupId, mechId);

            return {
                teamId,
                groupId,
            };
        }

        function moveMechToTeamGroup(teamId: MECH_TEAM, groupId: string, mechId: number, newIndex: number | null = null) {
            initTeam(teamId);
            const mech = mechStore.getMech(mechId);
            if (!mech) return;

            removeMechFromTeam(mechId);

            const group = findGroup(teamId, groupId);
            if (!group) return;

            if (newIndex !== null) {
                group.mechs.splice(newIndex, 0, {
                    id: mech.id,
                    mech_id: mech.id,
                    display_order: null,
                });
            } else {
                group.mechs.push({
                    id: mech.id,
                    mech_id: mech.id,
                    display_order: null,
                });
            }

            if (teamId !== MECH_TEAM.SHELF) {
                mech.preferred_team_id = teamId;
            }
            setDisplayOrders(group.mechs);
        }

        function setGroupsOfTeamVisible(teamId: MECH_TEAM, visible: boolean) {
            const team = findTeam(teamId);
            if (team) team.groups.forEach((group) => group.visible = visible);
        }

        function setMechsOfTeamVisible(teamId: MECH_TEAM, visible: boolean) {
            getTeamMechIds(teamId).forEach((mechId) => mechStore.setMechVisible(mechId, visible));
        }

        function setUnitsOfGroupVisible(teamId: MECH_TEAM, groupId: string, visible: boolean) {
            const def = getTeamDef(teamId);
            if (def.support_asset_units && groupId === SUPPORT_ASSET_UNITS_GROUP_ID) {
                coordinatedAssetsTeamUnitsInfo.value.forEach((v) => {
                    supportAssetUnitStore.setUnitVisible(v.id, visible);
                });
            }
            getTeamGroupMechIds(teamId, groupId).forEach((mechId) => mechStore.setMechVisible(mechId, visible));
        }

        function getDroneSharedUpgradeTraits(mechId: number, upgradeId: MECH_UPGRADE): TraitInfo<UPGRADE_TRAIT>[] {
            const { teamId } = getMechTeamAndGroupIds(mechId);
            if (teamId !== MECH_TEAM.NETWORKED_AI) return [];
            if (!getMechHasTeamPerkId(mechId, TEAM_PERK.DRONE_SHARING)) return [];
            if (upgradeId !== MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM) return [];
            const hasDroneUpgrade = getTeamMechIds(teamId).some(mechId => {
                return mechStore.getMechUpgradeAttachments(mechId)
                    .some(v => v.upgrade_id === MECH_UPGRADE.DRONE_MINE_DIRECTOR);
            });
            if (!hasDroneUpgrade) return [];

            return [
                {
                    dependent_trait_ids: [],
                    ...UPGRADE_TRAITS[UPGRADE_TRAIT.DRONE_MINE_DIRECTOR_ATTACHED],
                },
            ];
        }

        function getDroneSharedWeaponTraits(mechId: number, weaponId: MECH_WEAPON): TraitInfo<WEAPON_TRAIT>[] {
            const { teamId } = getMechTeamAndGroupIds(mechId);
            if (teamId !== MECH_TEAM.NETWORKED_AI) return [];
            const traits: TraitInfo<WEAPON_TRAIT>[] = [];

            getTeamMechIds(teamId).forEach(mechId => {
                return mechStore.getMechUpgradeAttachments(mechId)
                    .forEach(v => {
                        const def = MECH_UPGRADES[v.upgrade_id];
                        if (def.drone_attach_type !== MechDroneUpgradeAttachType.WEAPON) return;
                        const targetId = v.drone_attachment_target_id;
                        if (targetId === null) return;
                        const targetWeaponId = mechStore.getMechWeaponAttachmentWeaponId(mechId, targetId);
                        if (targetWeaponId === weaponId) {
                            const trait = weaponTraitInfo({ id: def.drone_attached_trait_id! });
                            traits.push(trait);
                        }
                    });
            });

            return traits;
        }

        function getTeamGroupMinMaxCount(teamId: MECH_TEAM, groupId: string) {
            const teamDef = MECH_TEAMS[teamId];
            const { min_count, max_count } = teamDef.groups[groupId];

            if (teamId === MECH_TEAM.COORDINATED_ASSETS && groupId === SUPPORT_ASSET_UNITS_GROUP_ID) {
                if (getTeamUnitCount(teamId) >= 3) {
                    return {
                        min_count,
                        max_count: 2,
                    };
                }
            }

            return { min_count, max_count };
        }

        return {
            teams,
            addable_teams,
            max_team_size_info,
            used_teams_count,
            max_teams_count,
            special_teams,
            non_shelf_teams,
            coordinatedAssetsTeamUnitsInfo,

            allUsedTeamAbilityPerkIds,

            isSpecialTeam,

            findTeam,
            findGroup,
            getTeamUnitCount,
            getTeamMechCount,
            getTeamGroupUnitCount,
            getTeamDef,
            getTeamDisplayName,
            getTeamGroupDisplayName,
            getFullTeamGroupDisplayName,
            getTeamGroupDef,
            getTeamGroupMechIds,
            getWeaponAttachmentIsRequired,
            getArmorUpgradeIsRequired,
            getMechUpgradeIsRequired,
            getMechTeamAndGroupIds,
            getAvailableMechSizes,
            getWeaponProhibited,
            getWeaponTraitsProhibited,
            getMechWeaponIsRequiredInfo,
            getTeamPerksInfoByMech,
            getTeamGroupPerksInfo,
            getMechHasTeamPerkId,
            getUsedTeamAbilityPerksInfo,
            getMechTeamGroupDef,
            getTeamMechIds,
            getTeamGroupMinMaxCount,
            moveMechToTeam,
            moveMechToTeamGroup,

            getTeamVisibleComputed,
            getTeamGroupVisibleComputed,

            setGroupsOfTeamVisible,
            setMechsOfTeamVisible,
            setUnitsOfGroupVisible,

            normalizePreferredTeamId,
            afterHydrate,

            getDroneSharedUpgradeTraits,
            getDroneSharedWeaponTraits,
            addMechToTeamFromLoadedFile,
            addMechToTeam,
            addMechToTeamWithDefaults,
            removeMechFromTeam,
            moveGroupMech,
            addTeam,
            addTeamWithDefaultMechs,
            removeTeam,
            $reset,
        };
    }, (scope: string) => {
        return {
            persist: ifEmptyString(scope, {
                afterHydrate: (ctx) => {
                    ctx.store.afterHydrate();
                },
            }),
        };
    },
);

function makeGeneralTeam(): MechTeamInstance {
    return {
        id: MECH_TEAM.GENERAL,
        visible: true,
        groups: [
            {
                id: 'A',
                visible: true,
                mechs: [],
            },
        ],
    };
}

export function makeShelfTeam(): MechTeamInstance {
    return {
        id: MECH_TEAM.SHELF,
        visible: true,
        groups: [
            {
                id: 'A',
                visible: true,
                mechs: [],
            },
        ],
    };
}
