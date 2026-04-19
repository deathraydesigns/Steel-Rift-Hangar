import { difference, each, find, groupBy, map, sortBy, sumBy } from 'es-toolkit/compat';
import { defineScopeableStore } from 'pinia-scope';
import { computed, ref } from 'vue';
import { GAME_SIZES } from '../data/game-sizes';
import { MECH_BODY_MODS, MECH_BODY_MODS_DROP_DOWN } from '../data/mech-body';
import { MECH_TEAM_PERKS, TEAM_PERK } from '../data/mech-team-perks';
import {
    MECH_TEAM_SIZES,
    MECH_TEAMS,
    type MechTeamId,
    type MechTeamSizeId,
    TEAM_FIRE_SUPPORT,
    TEAM_GENERAL,
    TEAM_RECON,
    TEAM_SHELF,
} from '../data/mech-teams';
import { MECH_WEAPONS, weaponHasTrait } from '../data/mech-weapons';
import { MECH_SIZES, type MechSizeId, SIZE_HEAVY, SIZE_MEDIUM } from '../data/unit-sizes';
import { WEAPON_TRAITS } from '../data/weapon-traits';
import type { Mech, MechGroupInstance, MechTeamInstance, MechWeaponAttachment } from '../types';
import { useArmyListStore } from './army-list-store';
import { findItemIndexById, move, setDisplayOrders } from './helpers/collection-helper';
import { ifEmptyString, makeUniqueItemIdCollection } from './helpers/helpers';
import { useMechStore } from './mech-store';

export const useTeamStore = defineScopeableStore('team', ({ scope }: { scope: string }) => {

        const mechStore = useMechStore(scope) as any;
        const armyListStore = useArmyListStore(scope) as any;

        const teams = ref<MechTeamInstance[]>([makeGeneralTeam(), makeShelfTeam()]);

        function $reset() {
            teams.value = [makeGeneralTeam(), makeShelfTeam()];
        }

        function afterHydrate() {
            if (!findTeam(TEAM_SHELF)) {
                teams.value.push(makeShelfTeam());
            }

            mechStore.mechs.forEach((mech: Mech) => {
                if (!mech.preferred_team_id) {
                    let { teamId } = getMechTeamAndGroupIds(mech.id);
                    mech.preferred_team_id = normalizePreferredTeamId(teamId);
                }
            });
        }

        function isSpecialTeam(teamId: MechTeamId) {
            return teamId !== TEAM_GENERAL && teamId !== TEAM_SHELF;
        }

        const non_shelf_teams = computed(() => teams.value.filter(team => team.id !== TEAM_SHELF));
        const special_teams = computed(() => teams.value.filter(item => isSpecialTeam(item.id)));

        const addable_teams = computed(() => {
            const currentTeamIds = map(teams.value, 'id');
            const teamIds = (Object.keys(MECH_TEAMS) as MechTeamId[]).filter(isSpecialTeam);
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

        function addTeam(teamId: MechTeamId) {
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

        function addTeamWithDefaultMechs(teamId: MechTeamId) {
            addTeam(teamId);

            const team = findTeam(teamId);
            if (!team) return;

            team.groups.forEach(group => {
                const min = getTeamGroupDef(teamId, group.id).min_count;
                if (typeof min === 'number' && min > 0) {
                    addMechToTeamWithDefaults(teamId, group.id);
                }
            });
        }

        function getTeamVisibleComputed(teamId: MechTeamId) {
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

        function getTeamGroupVisibleComputed(teamId: MechTeamId, groupId: string) {
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

        const getTeamDisplayName = (teamId: MechTeamId) => MECH_TEAMS[teamId].display_name;

        const getTeamGroupDisplayName = (teamId: MechTeamId, groupId: string) => MECH_TEAMS[teamId].groups[groupId].display_name;

        const getFullTeamGroupDisplayName = (teamId: MechTeamId, groupId: string) => {
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

        const getTeamDef = (teamId: MechTeamId) => MECH_TEAMS[teamId];

        const getTeamGroupDef = (teamId: MechTeamId, groupId: string) => MECH_TEAMS[teamId].groups[groupId];

        function getWeaponAttachmentIsRequired(teamId: MechTeamId, groupId: string, weaponAttachment: MechWeaponAttachment, mech: Mech) {
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
                    const atLeastOneWeapons = requiredAtLeastOne.map((weaponId) => (MECH_WEAPONS as any)[weaponId].display_name);

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
                    const traitDisplayName = (WEAPON_TRAITS as any)[requiredAtLeastOneWithTraitId].display_name;

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

        function getWeaponTraitIsProhibited(mechId: number, weaponId: string, traits: any[]) {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const groupDef = getTeamGroupDef(teamId, groupId);

            if (groupDef.prohibited_weapons_with_trait_ids?.length) {
                const prohibited = traits.find((trait) => groupDef.prohibited_weapons_with_trait_ids.includes(trait.id));
                if (prohibited) {
                    const teamGroupDisplayName = getFullTeamGroupDisplayName(teamId, groupId);
                    const prohibitedTraits = groupDef.prohibited_weapons_with_trait_ids.map(traitId => (WEAPON_TRAITS as any)[traitId].display_name);
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
                    const requiredTraits = groupDef.limited_weapons_with_at_least_one_of_trait_ids.map(traitId => (WEAPON_TRAITS as any)[traitId].display_name);
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

        function getMechWeaponIsRequiredInfo(mechId: number, weaponId: string) {
            const groupDef = getMechTeamGroupDef(mechId);
            const teamDisplayName = getMechFullTeamGroupDisplayName(mechId);

            if (groupDef.required_weapon_ids.includes(weaponId)) {
                const weapons = groupDef.required_weapon_ids.map(weaponId => (MECH_WEAPONS as any)[weaponId].display_name);
                return {
                    required: true,
                    reason: `${teamDisplayName}: requires each of the following weapon(s): ${weapons.join(', ')}`,
                };
            }

            if (groupDef.required_at_least_one_of_weapon_ids.includes(weaponId)) {
                const weapons = groupDef.required_at_least_one_of_weapon_ids.map(weaponId => (MECH_WEAPONS as any)[weaponId].display_name);

                return {
                    required: true,
                    reason: `${teamDisplayName}: requires one of the following weapon(s): ${weapons.join(', ')}`,
                };
            }

            const requiredAtLeastOneWithTraitId = groupDef.required_at_least_one_weapon_with_trait_id;
            if (requiredAtLeastOneWithTraitId && weaponHasTrait(weaponId, requiredAtLeastOneWithTraitId)) {
                const traitDisplayName = (WEAPON_TRAITS as any)[requiredAtLeastOneWithTraitId].display_name;

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

        function getMechUpgradeIsRequired(mechId: number, upgradeId: string) {
            const groupDef = getMechTeamGroupDef(mechId);
            return groupDef.required_upgrade_ids.includes(upgradeId);
        }

        function getMechTeamGroupDef(mechId: number) {
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            return getTeamGroupDef(teamId, groupId);
        }

        function getMechTeamAndGroupIds(mechId: number) {
            let teamId: MechTeamId | null = null;
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

            return (Object.values(MECH_SIZES) as any[]).map(size => {
                return {
                    valid: groupDef.size_ids.includes(size.id),
                    ...size,
                };
            });
        }

        // internal
        function getMechStructureModValid(mechId: number, modId: string) {
            const mech = mechStore.getMech(mechId);
            if (!mech) return { valid: true, validation_message: null };
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const teamDisplayName = getTeamDisplayName(teamId);
            const groupDef = getTeamGroupDef(teamId, groupId);

            if (!getBodyModValid(groupDef.limited_structure_mod_ids, modId)) {
                return {
                    valid: false,
                    validation_message: `Not available to ${teamDisplayName} ${groupDef.display_name}`,
                };
            }

            const requiredId = groupDef.required_armor_or_structure_mod_id_once;
            if (requiredId) {
                if (!requiredStructureOrArmorModValid(
                    mech.structure_mod_id,
                    mech.armor_mod_id,
                    requiredId,
                    modId,
                )) {
                    const requiredDisplayName = (MECH_BODY_MODS as any)[requiredId].display_name;
                    return {
                        valid: false,
                        validation_message: `${teamDisplayName} requires ${groupDef.display_name} structure or armor to be ${requiredDisplayName}`,
                    };
                }
            }

            return {
                valid: true,
                validation_message: null,
            };
        }

        // internal
        function getMechArmorModValid(mechId: number, modId: string) {
            const mech = mechStore.getMech(mechId);
            if (!mech) return { valid: true, validation_message: null };
            const { teamId, groupId } = getMechTeamAndGroupIds(mechId);
            const teamDisplayName = getTeamDisplayName(teamId);
            const groupDef = getTeamGroupDef(teamId, groupId);

            if (!getBodyModValid(groupDef.limited_armor_mod_ids, modId)) {
                return {
                    valid: false,
                    validation_message: `Not available to ${teamDisplayName} ${groupDef.display_name}`,
                };
            }

            const requiredId = groupDef.required_armor_or_structure_mod_id_once;
            if (requiredId) {
                if (!requiredStructureOrArmorModValid(
                    mech.armor_mod_id,
                    mech.structure_mod_id,
                    requiredId,
                    modId,
                )) {
                    return {
                        valid: false,
                        validation_message: `${teamDisplayName} requires ${groupDef.display_name} structure or armor to be Reinforced`,
                    };
                }
            }

            return {
                valid: true,
                validation_message: null,
            };
        }

        function requiredStructureOrArmorModValid(currentModId: string, otherModId: string, requiredId: string, modId: string) {
            return !(otherModId !== requiredId &&
                currentModId === requiredId &&
                modId !== requiredId);
        }

        function getBodyModValid(limitedModIds: string[], modId: string) {
            if (!limitedModIds || !limitedModIds.length) {
                return true;
            }

            return limitedModIds.includes(modId);
        }

        function getTeamMechCount(teamId: MechTeamId) {
            const team = find(teams.value, { id: teamId });
            return team ? sumBy(team.groups, (group) => group.mechs.length) : 0;
        }

        function getTeamGroupMechCount(teamId: MechTeamId, groupId: string) {
            const group = findGroup(teamId, groupId);
            return group ? group.mechs.length : 0;
        }

        function getTeamMechIds(teamId: MechTeamId) {
            const team = find(teams.value, { id: teamId });
            if (!team) return [];

            let mechIds: number[] = [];
            team.groups.forEach((group) => {
                mechIds = mechIds.concat(map(group.mechs, 'mech_id'));
            });
            return mechIds;
        }

        function getTeamGroupMechIds(teamId: MechTeamId, groupId: string) {
            const group = findGroup(teamId, groupId);
            return group ? map(group.mechs, 'mech_id') : [];
        }

        function findTeam(teamId: MechTeamId) {
            return find(teams.value, { id: teamId });
        }

        function initTeam(teamId: MechTeamId) {
            if (!findTeam(teamId)) {
                addTeam(teamId);
            }
        }

        function findGroup(teamId: MechTeamId, groupId: string): MechGroupInstance | undefined {
            const team = find(teams.value, { id: teamId });
            return team ? find(team.groups, { id: groupId }) : undefined;
        }

        function findGroupIdForSizeId(teamId: MechTeamId, sizeId: MechSizeId) {
            const teamDef = getTeamDef(teamId);
            const group = Object.values(teamDef.groups).find(groupDef => {
                return groupDef.size_ids.includes(sizeId);
            });

            if (group) {
                return group.id!;
            }

            return Object.keys(teamDef.groups)[0];
        }

        function getMechStructureModOptions(mechId: number) {
            return MECH_BODY_MODS_DROP_DOWN.map((item) => {
                const { valid, validation_message } = getMechStructureModValid(mechId, item.id);
                return {
                    ...item,
                    valid,
                    validation_message,
                };
            });
        }

        function getMechArmorModOptions(mechId: number) {
            return MECH_BODY_MODS_DROP_DOWN.map((item) => {
                const { valid, validation_message } = getMechArmorModValid(mechId, item.id);
                return {
                    ...item,
                    valid,
                    validation_message,
                };
            });
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

        function getTeamGroupPerksInfo(teamId: MechTeamId, groupId: string) {
            const groupDef = getTeamGroupDef(teamId, groupId);
            let result = groupDef.size_ids.map(sizeId => {
                const perkIds = getTeamPerkIdsByMechSize(teamId, sizeId);
                return {
                    size_id: sizeId,
                    display_name: (MECH_SIZES as any)[sizeId].display_name,
                    perks: perkIdsToInfo(perkIds),
                };
            });

            // ugly hack to remove redundant data for table view
            if (
                (teamId === TEAM_RECON ||
                    teamId === TEAM_FIRE_SUPPORT) &&
                groupId === 'B'
            ) {
                const medium = find(result, { size_id: SIZE_MEDIUM });
                if (medium) {
                    medium.display_name = (MECH_SIZES as any)[SIZE_MEDIUM].display_name + ' & ' + (MECH_SIZES as any)[SIZE_HEAVY].display_name;
                }
                result = result.filter(item => item.size_id !== SIZE_HEAVY);
            }

            return result;
        }

        function getUsedTeamAbilityPerkIds(teamId: MechTeamId) {
            const perkIdsMap: Record<string, boolean> = {};
            const mechIds = getTeamMechIds(teamId);

            mechIds.forEach((mechId) => {
                const mech = mechStore.getMech(mechId);
                if (!mech) return;
                const sizeId = mech.size_id;
                const perkIds = getTeamPerkIdsByMechSize(teamId, sizeId);
                perkIds.forEach(perkId => (perkIdsMap as any)[perkId] = true);
            });

            return Object.keys(perkIdsMap);
        }

        const allUsedTeamAbilityPerkIds = computed(() => {
            const perks = makeUniqueItemIdCollection(MECH_TEAM_PERKS);
            teams.value.forEach(team => {
                const perkIds = getUsedTeamAbilityPerkIds(team.id);
                perks.addIds(perkIds);
            });

            return perks.ids();
        });

        function getUsedTeamAbilityPerksInfo(teamId: MechTeamId) {

            const perkIds = getUsedTeamAbilityPerkIds(teamId);

            return perkIds.filter(perkId => (MECH_TEAM_PERKS as any)[perkId].visible_on_card)
                .map((perkId) => (MECH_TEAM_PERKS as any)[perkId]);
        }

        // internal
        function getTeamPerkIdsByMechSize(teamId: MechTeamId, sizeId: MechSizeId): TEAM_PERK[] {
            if (!isSpecialTeam(teamId)) {
                return [];
            }
            const columns = MECH_TEAMS[teamId].team_size_perk_columns;
            if (!columns) return [];

            const indexes: number[] = [];
            columns.forEach((sizeIds, index) => {
                if (sizeIds.includes(sizeId)) {
                    indexes.push(index);
                }
            });

            if (!indexes.length) {
                return [];
            }

            const teamSize = getTeamMechCount(teamId);

            let perkIds: TEAM_PERK[] = [];

            indexes.forEach(index => {
                const rows = MECH_TEAMS[teamId].team_size_perk_rows;
                if (rows) {
                    each(rows, (row, count) => {
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
                    ...MECH_TEAM_SIZES[teamSizeId as MechTeamSizeId],
                };
            });
        });

        function addMechToTeam(
            teamId: MechTeamId,
            groupId: string,
            mechOptions: any = {},
            weaponIds: string[] = [],
            upgradeIds: string[] = [],
        ) {
            initTeam(teamId);

            if (teamId !== TEAM_SHELF) {
                mechOptions.preferred_team_id = teamId;
            }

            const group = findGroup(teamId, groupId);
            if (!group) return;
            const mechId = mechStore.addMech(mechOptions);

            group.mechs.push({
                id: mechId,
                mech_id: mechId,
                display_order: null,
            });
            setDisplayOrders(group.mechs);

            weaponIds.forEach((weaponId) => mechStore.addMechWeaponAttachment(mechId, weaponId));
            upgradeIds.forEach((upgradeId) => mechStore.addMechUpgradeAttachment(mechId, upgradeId));

            return mechId;
        }

        function normalizePreferredTeamId(teamId: MechTeamId) {
            if (teamId === TEAM_SHELF) {
                return TEAM_GENERAL;
            }
            return teamId;
        }

        function addMechToTeamFromLoadedFile(mechData: any, teamId: MechTeamId) {
            initTeam(teamId);

            const {
                size_id,
                structure_mod_id,
                armor_mod_id,
                armor_upgrade_id,
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
                armor_upgrade_id,
                mobility_id,
                preferred_team_id,
                name,
            };

            const weaponIds = weapons.map((weapon: any) => weapon.weapon_id);
            const upgradeIds = upgrades.map((upgrade: any) => upgrade.upgrade_id);
            const groupId = findGroupIdForSizeId(teamId, size_id);

            return addMechToTeam(
                teamId,
                groupId,
                mechOptions,
                weaponIds,
                upgradeIds,
            );
        }

        function addMechToTeamWithDefaults(teamId: MechTeamId, groupId: string) {

            const groupDef = getTeamGroupDef(teamId, groupId);

            const mechOptions: any = {
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
            if (groupDef?.limited_armor_upgrade_ids?.length) {
                mechOptions.armor_upgrade_id = groupDef.limited_armor_upgrade_ids[0];
            }
            if (groupDef?.required_armor_or_structure_mod_id_once) {
                mechOptions.structure_mod_id = groupDef.required_armor_or_structure_mod_id_once;
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
        }

        function removeTeam(teamId: MechTeamId) {
            const mechIds = getTeamMechIds(teamId);
            mechIds.forEach((mechId) => mechStore.removeMech(mechId));
            let index = findItemIndexById(teams.value, teamId);
            if (index !== false) teams.value.splice(index, 1);
        }

        function moveGroupMech(teamId: MechTeamId, groupId: string, mechId: number, toIndex: number) {
            const group = findGroup(teamId, groupId);
            if (group) {
                const index = group.mechs.findIndex(mech => mech.mech_id === mechId);
                move(group.mechs, index, toIndex);
            }
        }

        function moveMechToTeam(mechId: number, teamId: MechTeamId) {
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

        function moveMechToTeamGroup(teamId: MechTeamId, groupId: string, mechId: number, newIndex: number | null = null) {
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

            if (teamId !== TEAM_SHELF) {
                mech.preferred_team_id = teamId;
            }
            setDisplayOrders(group.mechs);
        }

        function setGroupsOfTeamVisible(teamId: MechTeamId, visible: boolean) {
            const team = findTeam(teamId);
            if (team) team.groups.forEach((group) => group.visible = visible);
        }

        function setMechsOfTeamVisible(teamId: MechTeamId, visible: boolean) {
            getTeamMechIds(teamId).forEach((mechId) => mechStore.setMechVisible(mechId, visible));
        }

        function setMechsOfGroupVisible(teamId: MechTeamId, groupId: string, visible: boolean) {
            getTeamGroupMechIds(teamId, groupId).forEach((mechId) => mechStore.setMechVisible(mechId, visible));
        }

        return {
            teams,
            addable_teams,
            max_team_size_info,
            used_teams_count,
            max_teams_count,
            special_teams,
            non_shelf_teams,

            allUsedTeamAbilityPerkIds,

            isSpecialTeam,

            findTeam,
            findGroup,
            getTeamMechCount,
            getTeamGroupMechCount,
            getTeamDef,
            getTeamDisplayName,
            getTeamGroupDisplayName,
            getFullTeamGroupDisplayName,
            getTeamGroupDef,
            getTeamGroupMechIds,
            getWeaponAttachmentIsRequired,
            getMechUpgradeIsRequired,
            getMechTeamAndGroupIds,
            getAvailableMechSizes,
            getMechStructureModOptions,
            getMechArmorModOptions,
            getWeaponTraitIsProhibited,
            getMechWeaponIsRequiredInfo,
            getTeamPerksInfoByMech,
            getTeamGroupPerksInfo,
            getMechHasTeamPerkId,
            getUsedTeamAbilityPerksInfo,
            getMechTeamGroupDef,
            getTeamMechIds,
            moveMechToTeam,
            moveMechToTeamGroup,

            getTeamVisibleComputed,
            getTeamGroupVisibleComputed,

            setGroupsOfTeamVisible,
            setMechsOfTeamVisible,
            setMechsOfGroupVisible,

            normalizePreferredTeamId,
            afterHydrate,

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
                afterHydrate: (ctx: any) => {
                    ctx.store.afterHydrate();
                },
            }),
        };
    },
);

export interface TeamPerkInfo {
    id: string,
    display_name: string,
    display_name_short: string,
    description: string,
    stackable: boolean,
    display_order: number | null,
    value: number,
    visible_on_card: boolean,
    card_note: string,
}

function perkIdsToInfo(perkIds: TEAM_PERK[]): TeamPerkInfo[] {
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
            visible_on_card,
            card_note,
        } = perkInfo;

        if (repeatCount > 1 && stackable) {
            const newValue = (value ?? 1) * repeatCount;
            return {
                id,
                display_name: renderDisplayName!(value!, repeatCount),
                display_name_short,
                description: renderDesc!(value!, repeatCount),
                display_order,
                value: newValue,
                visible_on_card,
                card_note,
                repeatCount,
                stackable: stackable,
            } as TeamPerkInfo;
        }

        return {
            id,
            display_name,
            display_name_short,
            description,
            display_order,
            value,
            visible_on_card,
            card_note,
            repeatCount: 1,
            stackable,
        } as TeamPerkInfo;
    });

    return sortBy(result, (t) => t.display_order);
}

function makeGeneralTeam(): MechTeamInstance {
    return {
        id: TEAM_GENERAL,
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
        id: TEAM_SHELF,
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
