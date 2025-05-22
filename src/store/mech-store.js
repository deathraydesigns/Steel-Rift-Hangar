import {defineStore} from 'pinia';
import {MECH_SIZES, SIZE_MEDIUM} from '../data/unit-sizes.js';
import {MECH_BODY_MODS, MOD_STANDARD} from '../data/mech-body.js';
import {MECH_ARMOR_UPGRADES, NO_ARMOR_UPGRADE} from '../data/mech-armor-upgrades.js';
import {updateObject} from '../data/data-helpers.js';
import {cloneDeep, find, groupBy, map, sortBy, sumBy} from 'es-toolkit/compat';
import {
    TRAIT_LIMITED,
    TRAIT_MELEE,
    TRAIT_SHORT,
    TRAIT_SMART,
    WEAPON_TRAITS,
    weaponTraitDisplayName,
} from '../data/weapon-traits.js';
import {HOWITZER, MECH_WEAPONS, MISSILES, ROCKET_PACK} from '../data/mech-weapons.js';
import {readonly} from 'vue';
import {
    COMBAT_SHIELD,
    DIRECTIONAL_THRUSTER,
    ELECTRONIC_COUNTERMEASURES,
    getUpgradeTraits,
    JUMP_JETS,
    MECH_UPGRADES,
    MINEFIELD_DRONE_CARRIER_SYSTEM,
    NITRO_BOOST,
    TARGET_DESIGNATOR,
} from '../data/mech-upgrades.js';
import {deleteItemById, findById, findItemIndex, moveItem} from './helpers/collection-helper.js';
import {useToastStore} from './toast-store.js';
import {useFactionStore} from './faction-store.js';
import {
    DWC_TOP_END_HARDWARE,
    OI_MATERIEL_STOCKPILES,
    RD_ADVANCED_HARDPOINT_DESIGN,
    UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN,
} from '../data/faction-perks.js';
import {useTeamStore} from './team-store.js';
import {
    TEAM_PERK_0_SLOT_ARMOR_UPGRADES,
    TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS,
    TEAM_PERK_0_SLOT_ECM,
    TEAM_PERK_0_SLOT_TARGET_DESIGNATORS,
    TEAM_PERK_0_TON_ARMOR_UPGRADES,
    TEAM_PERK_0_TON_ECM,
    TEAM_PERK_0_TON_TARGET_DESIGNATORS,
    TEAM_PERK_BARREL_EXTENSIONS,
    TEAM_PERK_COMBAT_BUCKLER,
    TEAM_PERK_EXTRA_MISSILE_AMMO,
    TEAM_PERK_EXTRA_NITRO,
    TEAM_PERK_EXTRA_TONNAGE,
    TEAM_PERK_JUMP_BOOSTER,
    TEAM_PERK_SMART_HOWITZERS,
} from '../data/mech-team-perks.js';
import {TRAIT_UPGRADE_LIMITED} from '../data/upgrade-traits.js';
import {DWC_TOP_END_HARDWARE_BONUS_TONS, RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS} from '../data/factions.js';
import {MOBILITY_BI_PEDAL} from '../data/mech-mobility.js';

export const useMechStore = defineStore('mech', {
        state() {
            return {
                mechs: [],
                mechs_id_increment: 1,
            };
        },
        actions: {
            addMech({
                        size_id,
                        structure_mod_id,
                        armor_mod_id,
                        armor_upgrade_id,
                    }) {

                size_id = size_id ?? SIZE_MEDIUM;
                structure_mod_id = structure_mod_id ?? MOD_STANDARD;
                armor_mod_id = armor_mod_id ?? MOD_STANDARD;
                armor_upgrade_id = armor_upgrade_id ?? NO_ARMOR_UPGRADE;

                let id = this.mechs_id_increment++;
                let mech = {
                    id,
                    name: null,
                    size_id,
                    structure_mod_id,
                    armor_mod_id,
                    armor_upgrade_id,
                    weapons: [],
                    weapons_id_increment: 1,
                    upgrades: [],
                    upgrades_id_increment: 1,
                    display_order: null,
                    mobility_id: MOBILITY_BI_PEDAL,
                };

                this.mechs.push(mech);
                mech.display_order = findItemIndex(this.mechs, mech);

                return mech;
            },
            updateMech(mechId, data) {
                let mech = findById(this.mechs, mechId);
                updateObject(mech, data, [
                    'name',
                    'size_id',
                    'structure_mod_id',
                    'armor_mod_id',
                    'armor_upgrade_id',
                ]);

                if (data.size_id) {
                    this.removeInvalidMechAttachments(mechId);
                }
            },
            moveMech(mech, toIndex) {
                moveItem(this.mechs, mech, toIndex);
            },
            duplicateMech(mechId) {
                const teamStore = useTeamStore();

                const mech = this.getMech(mechId);
                const {
                    teamId,
                    groupId,
                } = teamStore.getMechTeamAndGroupIds(mechId);

                const newMechId = teamStore.addMechToTeam(teamId, groupId, false);

                const {
                    structure_mod_id,
                    armor_mod_id,
                    armor_upgrade_id,
                    weapons,
                    upgrades,
                } = mech;

                this.updateMech(newMechId, {
                    structure_mod_id,
                    armor_mod_id,
                    armor_upgrade_id,
                });

                weapons.forEach(weapon => {
                    this.addMechWeaponAttachment(newMechId, weapon.weapon_id);
                });

                upgrades.forEach(upgrade => {
                    this.addMechUpgradeAttachment(newMechId, upgrade.upgrade_id);
                });
            },
            removeMech(mechId) {
                const teamStore = useTeamStore();
                teamStore.removeMechFromTeam(mechId);
                deleteItemById(this.mechs, mechId);
            },
            addMechWeaponAttachment(mechId, weaponId) {
                let mech = findById(this.mechs, mechId);
                let id = mech.weapons_id_increment++;
                let weapon = {
                    id,
                    weapon_id: weaponId,
                    display_order: null,
                };
                mech.weapons.push(weapon);
                weapon.display_order = findItemIndex(mech.weapons, weapon);
            },
            removeMechWeaponAttachment(mechId, mechWeaponAttachmentId) {
                let mech = findById(this.mechs, mechId);
                deleteItemById(mech.weapons, mechWeaponAttachmentId);
            },
            moveMechWeaponAttachment(mechId, weaponAttachment, toIndex) {
                let mech = findById(this.mechs, mechId);
                moveItem(mech.weapons, weaponAttachment, toIndex);
            },
            addMechUpgradeAttachment(mechId, upgradeId) {
                let mech = findById(this.mechs, mechId);
                let id = mech.upgrades_id_increment++;
                let upgrade = {
                    id,
                    upgrade_id: upgradeId,
                    display_order: null,
                };
                mech.upgrades.push(upgrade);
                upgrade.display_order = findItemIndex(mech.upgrades, upgrade);
            },
            removeMechUpgradeAttachment(mechId, mechUpgradeAttachmentId) {
                let mech = findById(this.mechs, mechId);
                deleteItemById(mech.upgrades, mechUpgradeAttachmentId);
            },
            moveMechUpgradeAttachment(mechId, upgradeAttachment, toIndex) {
                let mech = findById(this.mechs, mechId);
                moveItem(mech.upgrades, upgradeAttachment, toIndex);
            },
            removeInvalidMechAttachments(mechId) {
                let mech = findById(this.mechs, mechId);
                let mechInfo = this.getMechInfo(mechId);
                mech.upgrades.forEach((upgradeAttachment) => {
                    const info = this.getMechUpgradeAttachmentInfo(mechId, upgradeAttachment.id);
                    if (!info.valid) {
                        const {toastInfo} = useToastStore();

                        toastInfo(`${mechInfo.size.display_name} HE-V (${mechInfo.display_name})`,
                            `${info.display_name} removed: (${info.validation_message})`);
                        this.removeMechUpgradeAttachment(mechId, upgradeAttachment.id);
                    }
                });

                mech.weapons.forEach((weaponAttachment) => {
                    const info = this.getMechWeaponAttachmentInfo(mechId, weaponAttachment.id);
                    if (!info.valid) {
                        const {toastInfo} = useToastStore();

                        toastInfo(`${mechInfo.size.display_name} HE-V (${mechInfo.display_name})`,
                            `${info.display_name} removed: (${info.validation_message})`);
                        this.removeMechWeaponAttachment(mechId, weaponAttachment.id);
                    }
                });

            },
        },
        getters: {
            totalTons(state) {
                let tons = 0;
                state.mechs.forEach((mech) => {
                    const {size} = this.getMechInfo(mech.id);
                    tons += size.max_tons;
                });
                return tons;
            },
            getMech(state) {
                return (mechId) => findById(state.mechs, mechId);
            },
            getMechInfo(state) {
                return function (mechId) {
                    const factionStore = useFactionStore();
                    const teamStore = useTeamStore();

                    let {
                        name,
                        size_id,
                        structure_mod_id,
                        armor_mod_id,
                        armor_upgrade_id,
                        weapons,
                        upgrades,
                    } = this.getMech(mechId);

                    const placeholder_name = ('HE-V-' + mechId).padStart(1);

                    const upgradesInfo = upgrades.map((item) => this.getMechUpgradeAttachmentInfo(mechId, item.id));
                    const weaponsInfo = weapons.map((item) => this.getMechWeaponAttachmentInfo(mechId, item.id));

                    const armorUpgradeInfo = this.getMechArmorUpgradeInfo(mechId, armor_upgrade_id);

                    const size = MECH_SIZES[size_id];
                    const structure_mod = MECH_BODY_MODS[structure_mod_id];
                    const armor_mod = MECH_BODY_MODS[armor_mod_id];

                    let {
                        defense,
                        max_tons,
                        max_slots,
                        smash_damage,
                    } = size;

                    let armor_stat = size.armor + armor_mod.modifier;
                    const structure_stat = size.structure + structure_mod.modifier;

                    const weapon_used_slots = sumBy(weaponsInfo, 'slots');
                    const weapon_used_tons = sumBy(weaponsInfo, 'cost');

                    const upgrade_used_slots = sumBy(upgradesInfo, 'slots');
                    const upgrade_used_tons = sumBy(upgradesInfo, 'cost');

                    let used_slots = weapon_used_slots +
                        upgrade_used_slots +
                        armorUpgradeInfo.slots;

                    if (factionStore.hasPerk(RD_ADVANCED_HARDPOINT_DESIGN) ||
                        factionStore.hasPerk(UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN)) {
                        used_slots += RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS;
                    }

                    let used_tons = weapon_used_tons +
                        upgrade_used_tons +
                        armor_stat +
                        structure_stat +
                        armorUpgradeInfo.cost;

                    if (factionStore.hasPerk(DWC_TOP_END_HARDWARE)) {
                        used_tons += DWC_TOP_END_HARDWARE_BONUS_TONS;
                    }

                    let display_name = name || placeholder_name;

                    let {move, jump} = MECH_SIZES[size_id];
                    const jumpJets = find(upgrades, {upgrade_id: JUMP_JETS});

                    if (jumpJets) {
                        const hasJumpBooster = teamStore.getMechHasTeamPerkId(mechId, TEAM_PERK_JUMP_BOOSTER);
                        if (hasJumpBooster) {
                            jump += 1;
                        }
                    } else {
                        jump = 0;
                    }

                    if (armorUpgradeInfo.armor_mod) {
                        armor_stat += armorUpgradeInfo.armor_mod;
                    }

                    let tonnage_stat = MECH_SIZES[size_id].max_tons;
                    const extraTonnage = teamStore.getMechHasTeamPerkId(mechId, TEAM_PERK_EXTRA_TONNAGE);
                    if (extraTonnage) {
                        tonnage_stat += 5;
                    }

                    return readonly({
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
                        armor_upgrade_id,
                        move,
                        jump,
                        tonnage_stat,
                        defense,
                        smash_damage,
                    });
                };
            },
            getWeaponInfo(state) {
                return (mechId, weaponId) => {
                    const teamStore = useTeamStore();
                    const mech = this.getMech(mechId);
                    const size_id = mech.size_id;
                    const weapon = MECH_WEAPONS[weaponId];
                    const damage = weapon.damage_by_size[size_id];
                    const cost = weapon.cost_by_size[size_id];

                    const {
                        range,
                        display_name,
                        slots,
                        limited_size_ids,
                    } = weapon;

                    let range_formatted = '-';
                    if (range) {
                        range_formatted = range + '"';
                    }

                    const {traits, team_perks, faction_perks} = this.getWeaponTraitInfo(mechId, weaponId);
                    const traitLimited = find(traits, {id: TRAIT_LIMITED});

                    let max_uses = null;
                    if (traitLimited) {
                        max_uses = traitLimited.number;
                    }

                    let validation_message = null;
                    let valid = true;

                    if (limited_size_ids) {
                        valid = limited_size_ids.includes(size_id);
                        if (!valid) {
                            const sizeDisplayNames = limited_size_ids.map(sizeId => MECH_SIZES[sizeId].display_name).join('/');
                            validation_message = `Only available for ${sizeDisplayNames} HE-Vs`;
                        }
                    }

                    if (valid) {
                        const prohibited = teamStore.getWeaponIsProhibited(mechId, weaponId, traits);
                        valid = prohibited.valid;
                        validation_message = prohibited.validation_message;
                    }

                    return readonly({
                        weapon_id: weaponId,
                        display_name,
                        damage,
                        slots,
                        cost,
                        range,
                        range_formatted,
                        traits,
                        team_perks,
                        faction_perks,
                        max_uses,
                        valid,
                        validation_message,
                    });
                };
            },
            getWeaponTraitInfo(state) {
                return (mechId, weaponId) => {
                    const teamStore = useTeamStore();
                    const factionStore = useFactionStore();

                    const mech = this.getMech(mechId);
                    const size_id = mech.size_id;
                    const weapon = MECH_WEAPONS[weaponId];
                    const traits = cloneDeep(weapon.traits_by_size[size_id]);
                    const perks = teamStore.getTeamPerksInfoByMech(mechId);

                    const faction_perks = [];
                    const team_perks = [];

                    if (weaponId === ROCKET_PACK || weaponId === MISSILES) {
                        const perk = find(perks, {id: TEAM_PERK_EXTRA_MISSILE_AMMO});
                        const traitLimited = find(traits, {id: TRAIT_LIMITED});

                        if (perk) {
                            traitLimited.number += perk.value;
                            team_perks.push(perk);
                        }

                        if (factionStore.hasPerk(OI_MATERIEL_STOCKPILES)) {
                            traitLimited.number += 1;
                            faction_perks.push(factionStore.materielStockpilesPerk);
                        }
                    }

                    const perk = find(perks, {id: TEAM_PERK_BARREL_EXTENSIONS});
                    if (perk) {
                        const match = find(traits, {id: TRAIT_SHORT});
                        if (match) {
                            match.number += perk.value;
                            team_perks.push(perk);
                        }
                    }

                    if (weaponId === HOWITZER) {
                        const perk = find(perks, {id: TEAM_PERK_SMART_HOWITZERS});
                        if (perk) {
                            traits.push({id: TRAIT_SMART});
                            team_perks.push(perk);
                        }
                    }

                    traits.forEach(trait => Object.assign(
                        trait,
                        WEAPON_TRAITS[trait.id],
                        {display_name: weaponTraitDisplayName(trait)},
                    ));

                    return {traits, team_perks, faction_perks};
                };
            },
            getMechWeaponsAttachmentInfo(state) {
                return (mechId) => {
                    const mech = this.getMech(mechId);

                    return mech.weapons.map(({id}) => this.getMechWeaponAttachmentInfo(mechId, id));
                };
            },
            getMechWeaponAttachmentInfo(state) {
                return (mechId, mechWeaponAttachmentId) => {
                    const teamStore = useTeamStore();

                    const mech = this.getMech(mechId);
                    const weaponAttachment = findById(mech.weapons, mechWeaponAttachmentId);
                    const weapon_id = weaponAttachment.weapon_id;
                    const weaponInfo = this.getWeaponInfo(mechId, weapon_id);

                    const previousWeaponInstances = mech.weapons.filter((item) => {
                        return item.weapon_id === weapon_id && item.display_order < weaponAttachment.display_order;
                    }).length;

                    let cost = weaponInfo.cost;
                    const duplicate_cost = Math.floor(previousWeaponInstances * cost * 0.5);
                    const {teamId, groupId} = teamStore.getMechTeamAndGroupIds(mechId);

                    let required_by_group = false;
                    let required_by_group_reason = false;

                    let {
                        required,
                        required_reason,
                    } = teamStore.getWeaponIsRequired(teamId, groupId, weaponAttachment, mech);
                    if (required) {
                        required_by_group = true;
                        required_by_group_reason = required_reason;
                    }

                    const result = Object.assign({}, weaponInfo, {
                        base_cost: cost,
                        cost: cost + duplicate_cost,
                        duplicate_cost,
                        required_by_group,
                        required_by_group_reason,
                        duplicate_percent: previousWeaponInstances * 50,
                    });

                    return readonly(result);
                };
            },
            getMechAvailableWeaponsInfo(state) {
                const groups = groupBy(Object.keys(MECH_WEAPONS), weaponId => {
                    const sizes = Object.keys(MECH_WEAPONS[weaponId].traits_by_size);
                    for (let i = 0; i < sizes.length; i++) {
                        const sizeId = sizes[i];
                        const result = find(MECH_WEAPONS[weaponId].traits_by_size[sizeId], {id: TRAIT_MELEE});
                        if (result) {
                            return 'melee';
                        }
                    }

                    return 'ranged';
                });

                return (mechId) => {

                    let melee = groups.melee.map((weaponId) => this.getWeaponInfo(mechId, weaponId));
                    let ranged = groups.ranged.map((weaponId) => this.getWeaponInfo(mechId, weaponId));

                    melee = sortBy(melee, ['display_name']);
                    ranged = sortBy(ranged, ['display_name']);

                    return {
                        melee,
                        ranged,
                    };
                };
            },
            getUpgradeInfo: function (state) {
                return (mechId, upgradeId) => {
                    const teamStore = useTeamStore();
                    const factionStore = useFactionStore();

                    const upgrade = MECH_UPGRADES[upgradeId];
                    let {size_id} = this.getMech(mechId);
                    let {
                        slots,
                        description,
                        cost_by_size,
                    } = upgrade;

                    let traits = getUpgradeTraits(upgradeId, size_id);
                    let cost = cost_by_size[size_id];
                    let validation_message = null;
                    let valid = true;

                    const traitLimited = find(traits, {id: TRAIT_UPGRADE_LIMITED});

                    if (upgrade.prohibited_by_sizes) {
                        valid = !upgrade.prohibited_by_sizes.includes(size_id);
                        if (!valid) {
                            validation_message = `Not available for ${MECH_SIZES[size_id].display_name} HE-Vs`;
                        }
                    }

                    const perks = teamStore.getTeamPerksInfoByMech(mechId);
                    const team_perks = [];

                    if (upgradeId === TARGET_DESIGNATOR) {
                        let perk = find(perks, {id: TEAM_PERK_0_SLOT_TARGET_DESIGNATORS});
                        if (perk) {
                            slots = 0;
                            team_perks.push(perk);
                        }

                        perk = find(perks, {id: TEAM_PERK_0_TON_TARGET_DESIGNATORS});
                        if (perk) {
                            cost = 0;
                            team_perks.push(perk);
                        }
                    }

                    if (upgradeId === DIRECTIONAL_THRUSTER) {
                        let perk = find(perks, {id: TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS});
                        if (perk) {
                            slots = 0;
                            team_perks.push(perk);
                        }
                    }

                    if (upgradeId === ELECTRONIC_COUNTERMEASURES) {
                        let perk = find(perks, {id: TEAM_PERK_0_SLOT_ECM});
                        if (perk) {
                            slots = 0;
                            team_perks.push(perk);
                        }

                        perk = find(perks, {id: TEAM_PERK_0_TON_ECM});
                        if (perk) {
                            cost = 0;
                            team_perks.push(perk);
                        }
                    }

                    if (upgradeId === COMBAT_SHIELD) {
                        let perk = find(perks, {id: TEAM_PERK_COMBAT_BUCKLER});
                        if (perk) {
                            cost = 3;
                            team_perks.push(perk);
                        }
                    }

                    if (upgradeId === NITRO_BOOST) {
                        let perk = find(perks, {id: TEAM_PERK_EXTRA_NITRO});
                        if (perk) {
                            if (traitLimited) {
                                traitLimited.number += 1;
                            }
                            team_perks.push(perk);
                        }
                    }

                    const faction_perks = [];
                    if (upgradeId === MINEFIELD_DRONE_CARRIER_SYSTEM) {
                        if (factionStore.hasPerk(OI_MATERIEL_STOCKPILES)) {
                            if (traitLimited) {
                                traitLimited.number += 1;
                            }
                            faction_perks.push(factionStore.materielStockpilesPerk);
                        }
                    }

                    let max_uses = null;
                    if (traitLimited) {
                        max_uses = traitLimited.number;
                    }

                    return readonly({
                        upgrade_id: upgradeId,
                        display_name: upgrade.display_name,
                        description,
                        valid,
                        validation_message,
                        slots,
                        cost,
                        team_perks,
                        faction_perks,
                        max_uses,
                        traits,
                    });
                };
            },
            getMechUpgradesAttachmentInfo(state) {
                return (mechId) => {
                    const mech = this.getMech(mechId);

                    return mech.upgrades.map(({id}) => this.getMechUpgradeAttachmentInfo(mechId, id));
                };
            },
            getMechUpgradeAttachmentInfo(state) {
                return (mechId, mechUpgradeAttachmentId) => {
                    const teamStore = useTeamStore();
                    const mech = findById(state.mechs, mechId);
                    const upgradeAttachment = findById(mech.upgrades, mechUpgradeAttachmentId);

                    const upgrade_id = upgradeAttachment.upgrade_id;
                    const info = this.getUpgradeInfo(mechId, upgrade_id);
                    const {teamId, groupId} = teamStore.getMechTeamAndGroupIds(mechId);
                    const isRequired = teamStore.getUpgradeIsRequired(teamId, groupId, upgrade_id);

                    return Object.assign({}, info, {required_by_group: isRequired});
                };
            },
            getMechAvailableUpgradesInfo(state) {
                return (mechId) => {
                    const mech = findById(state.mechs, mechId);
                    const existingUpgradeIds = mech.upgrades.map((item) => item.upgrade_id);

                    return Object.keys(MECH_UPGRADES)
                        .filter((upgradeId) => {
                            return !existingUpgradeIds.includes(upgradeId);
                        })
                        .map((upgradeId) => this.getUpgradeInfo(mechId, upgradeId));
                };
            },

            getMechArmorUpgradeInfo(state) {
                return function (mechId, armorUpgradeId) {
                    const teamStore = useTeamStore();

                    let {
                        size_id,
                    } = this.getMech(mechId);

                    const {teamId, groupId} = teamStore.getMechTeamAndGroupIds(mechId);
                    const teamDisplayName = teamStore.getTeamInfo(teamId).display_name;
                    const groupInfo = teamStore.getTeamGroupInfo(teamId, groupId);

                    let {
                        slots,
                        cost_by_size,
                        display_name,
                        armor_mod,
                        limited_size_ids,
                        description,
                    } = MECH_ARMOR_UPGRADES[armorUpgradeId];

                    let cost = cost_by_size[size_id];
                    let valid = true;
                    let validation_message = null;

                    if (groupInfo.limited_armor_upgrade_ids.length) {
                        if (!groupInfo.limited_armor_upgrade_ids.includes(armorUpgradeId)) {
                            valid = false;
                            validation_message = `Not available to ${teamDisplayName} ${groupInfo.display_name}`;
                        }
                    }

                    if (limited_size_ids && !limited_size_ids.includes(size_id)) {
                        valid = false;
                        const sizeDisplayNames = limited_size_ids.map(sizeId => MECH_SIZES[sizeId].display_name).join(', ');
                        validation_message = `Only available to HE-V size(s): ${sizeDisplayNames}`;
                    }

                    const perks = teamStore.getTeamPerksInfoByMech(mechId);
                    const team_perks = [];

                    if (slots !== 0) {
                        const perk = find(perks, {id: TEAM_PERK_0_SLOT_ARMOR_UPGRADES});
                        if (perk) {
                            slots = 0;
                            team_perks.push(perk);
                        }
                    }

                    if (cost !== 0) {
                        const perk = find(perks, {id: TEAM_PERK_0_TON_ARMOR_UPGRADES});
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
                        description,
                        valid,
                        validation_message,
                        team_perks,
                        armor_mod,
                    };
                };
            },
            getMechAvailableArmorUpgrades(state) {
                return (mechId) => {
                    return Object.keys(MECH_ARMOR_UPGRADES).map(armorUpgradeId => this.getMechArmorUpgradeInfo(mechId, armorUpgradeId));
                };
            },
            getUsedWeaponTraitIds(state) {
                const traitIdMap = {};
                state.mechs.forEach(mech => {
                    mech.weapons.forEach(weapon => {
                        const traitInfo = this.getWeaponTraitInfo(mech.id, weapon.weapon_id);
                        const traitIds = map(traitInfo.traits, 'id');
                        traitIds.forEach(traitId => traitIdMap[traitId] = true);
                    });
                });
                return Object.keys(traitIdMap);
            },
            getUsedUpgradeIds(state) {
                const idMap = {};
                state.mechs.forEach(mech => {
                    mech.upgrades.forEach(upgrade => {
                        idMap[upgrade.upgrade_id] = true;
                    });
                });
                return Object.keys(idMap);
            },
        },
        persist: {
            enabled: true,
            afterHydrate: (ctx) => {
                // console.log(`hydrated '${ctx.store.$id}'`);
            },
        },
    },
);