import {MECH_SIZES, SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM, SIZE_ULTRA} from './unit-sizes.js';
import {DIRECTIONAL_THRUSTER, HAPTIC_SUIT, NITRO_BOOST, TARGET_DESIGNATOR} from './mech-upgrades.js';
import {HOWITZER, MELEE_WEAPON, MISSILES, ROCKET_PACK} from './mech-weapons.js';
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
    TEAM_PERK_COUNTER_ATTACK,
    TEAM_PERK_DIRECTIONAL_ASSETS,
    TEAM_PERK_EXTRA_MISSILE_AMMO,
    TEAM_PERK_EXTRA_NITRO,
    TEAM_PERK_EXTRA_TONNAGE,
    TEAM_PERK_FORWARD_DEPLOY_HEVS,
    TEAM_PERK_JUMP_BOOSTER,
    TEAM_PERK_MELEE_FLANK,
    TEAM_PERK_QUICKDRAW,
    TEAM_PERK_RECON_INITIATIVE,
    TEAM_PERK_SIDE_DEFENSE,
    TEAM_PERK_SMART_HOWITZERS,
    TEAM_PERK_SUPPORT_ASSET_DAMAGE,
} from './mech-team-perks.js';
import {MOD_REINFORCED, MOD_STANDARD, MOD_STRIPPED} from './mech-body.js';
import {makeStaticListIds} from './data-helpers.js';
import {
    ABLATIVE_ARMOR_UPGRADE,
    CERAMIC_ARMOR_UPGRADE,
    CLAYMORE_ARMOR_UPGRADE,
    EXTRA_PLATING_ARMOR_UPGRADE,
    HEAVY_PLATING_ARMOR_UPGRADE,
    REACTIVE_ARMOR_UPGRADE,
} from './mech-armor-upgrades.js';
import {
    SA_DEATH_FROM_ABOVE,
    SA_DONT_GIVE_AN_INCH,
    SA_DRIVE_THEM_OUT,
    SA_FIRE_FOR_EFFECT,
    SA_MISSION_MOMENTUM,
    SA_TARGET_ELIMINATED,
    SA_TROPHY_TAKERS,
} from './secondary-agendas.js';

import {TRAIT_MELEE, TRAIT_REACH, TRAIT_SHORT} from './weapon-traits.js';
import {each} from 'es-toolkit/compat';

export const TEAM_SIZE_SMALL = 'TEAM_SIZE_SMALL';
export const TEAM_SIZE_MEDIUM = 'TEAM_SIZE_MEDIUM';
export const TEAM_SIZE_LARGE = 'TEAM_SIZE_LARGE';

export const TEAM_GENERAL = 'TEAM_GENERAL';
export const TEAM_FIRE_SUPPORT = 'TEAM_FIRE_SUPPORT';
export const TEAM_RECON = 'TEAM_RECON';
export const TEAM_SECURITY = 'TEAM_SECURITY';
export const TEAM_TACTICAL = 'TEAM_TACTICAL';
export const TEAM_ASSASSIN = 'TEAM_ASSASSIN';
export const TEAM_BERSERKER = 'TEAM_BERSERKER';
export const TEAM_GUNSLINGER = 'TEAM_GUNSLINGER';

export const MECH_TEAM_SIZES = makeStaticListIds({
    [[TEAM_SIZE_SMALL]]: {
        display_name: 'Small',
        description: '2',
    },
    [[TEAM_SIZE_MEDIUM]]: {
        display_name: 'Medium',
        description: '2-3',
    },
    [[TEAM_SIZE_LARGE]]: {
        display_name: 'Large',
        description: '2-4',
    },
});

export const MECH_TEAMS = makeStaticListIds({
    [[TEAM_GENERAL]]: {
        display_name: 'General Team',
        display_name_short: 'General',
        groups: makeStaticListIds({
            'A': makeGroup({
                display_name: 'HE-Vs',
                size_ids: [
                    SIZE_LIGHT,
                    SIZE_MEDIUM,
                    SIZE_HEAVY,
                    SIZE_ULTRA,
                ],
                min_count: false,
                max_count: false,
            }),
        }),
    },
    [[TEAM_FIRE_SUPPORT]]: {
        display_name: 'Fire Support Team',
        display_name_short: 'Fire Support',
        icon: 'team-fire-support',
        secondary_agenda_id: SA_FIRE_FOR_EFFECT,
        groups: makeStaticListIds({
            'A': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_LIGHT],
                required_upgrade_ids: [TARGET_DESIGNATOR],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_MEDIUM, SIZE_HEAVY],
                required_weapon_ids: [
                    ROCKET_PACK,
                    HOWITZER,
                    MISSILES,
                ],
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT],
            [SIZE_MEDIUM, SIZE_HEAVY],
        ],
        team_size_perk_rows: {
            2: [
                [],
                [TEAM_PERK_EXTRA_MISSILE_AMMO],
            ],
            3: [
                [TEAM_PERK_0_SLOT_TARGET_DESIGNATORS],
                [TEAM_PERK_SMART_HOWITZERS],
            ],
            4: [
                [TEAM_PERK_0_TON_TARGET_DESIGNATORS],
                [TEAM_PERK_EXTRA_MISSILE_AMMO],
            ],
        },
    },
    [[TEAM_RECON]]: {
        display_name: 'Recon Team',
        display_name_short: 'Recon',
        icon: 'team-recon',
        secondary_agenda_id: SA_DEATH_FROM_ABOVE,
        groups: makeStaticListIds({
            'A': makeGroup({
                min_count: 1,
                max_count: 4,
                size_ids: [SIZE_LIGHT],
                required_upgrade_ids: [TARGET_DESIGNATOR],
            }),
            'B': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE_MEDIUM, SIZE_HEAVY],
                required_upgrade_ids: [TARGET_DESIGNATOR],
                limited_structure_mod_ids: [MOD_STRIPPED],
                limited_armor_mod_ids: [MOD_STRIPPED],
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT],
            [SIZE_MEDIUM, SIZE_HEAVY],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK_0_SLOT_ECM],
                [TEAM_PERK_RECON_INITIATIVE],
            ],
            3: [
                [TEAM_PERK_0_SLOT_TARGET_DESIGNATORS],
                [TEAM_PERK_SUPPORT_ASSET_DAMAGE],
            ],
            4: [
                [TEAM_PERK_0_TON_ECM, TEAM_PERK_0_TON_TARGET_DESIGNATORS],
                [TEAM_PERK_DIRECTIONAL_ASSETS],
            ],
        },
    },
    [[TEAM_SECURITY]]: {
        display_name: 'Security Team',
        display_name_short: 'Security',
        icon: 'team-security',
        secondary_agenda_id: SA_DONT_GIVE_AN_INCH,
        groups: makeStaticListIds({
            'A': makeGroup({
                min_count: 1,
                max_count: 4,
                size_ids: [SIZE_MEDIUM],
                limited_armor_upgrade_ids: [
                    ABLATIVE_ARMOR_UPGRADE,
                    REACTIVE_ARMOR_UPGRADE,
                    CERAMIC_ARMOR_UPGRADE,
                    CLAYMORE_ARMOR_UPGRADE,
                    EXTRA_PLATING_ARMOR_UPGRADE,
                    HEAVY_PLATING_ARMOR_UPGRADE,
                ],
                required_armor_or_structure_mod_id_once: MOD_REINFORCED,
                limited_structure_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
                limited_armor_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_HEAVY],
                limited_armor_upgrade_ids: [
                    ABLATIVE_ARMOR_UPGRADE,
                    REACTIVE_ARMOR_UPGRADE,
                    CERAMIC_ARMOR_UPGRADE,
                    CLAYMORE_ARMOR_UPGRADE,
                    EXTRA_PLATING_ARMOR_UPGRADE,
                    HEAVY_PLATING_ARMOR_UPGRADE,
                ],
                limited_structure_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
                limited_armor_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
            }),
            'C': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE_ULTRA],
                limited_armor_upgrade_ids: [
                    ABLATIVE_ARMOR_UPGRADE,
                    REACTIVE_ARMOR_UPGRADE,
                    CERAMIC_ARMOR_UPGRADE,
                    CLAYMORE_ARMOR_UPGRADE,
                    EXTRA_PLATING_ARMOR_UPGRADE,
                    HEAVY_PLATING_ARMOR_UPGRADE,
                ],
                limited_structure_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
                limited_armor_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
            }),
        }),
        team_size_perk_columns: [
            [SIZE_MEDIUM],
            [SIZE_HEAVY, SIZE_ULTRA],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK_0_SLOT_ARMOR_UPGRADES],
                [TEAM_PERK_0_SLOT_ARMOR_UPGRADES, TEAM_PERK_EXTRA_TONNAGE],
            ],
            3: [
                [TEAM_PERK_0_TON_ARMOR_UPGRADES, TEAM_PERK_EXTRA_TONNAGE],
                [TEAM_PERK_0_TON_ARMOR_UPGRADES, TEAM_PERK_SIDE_DEFENSE],
            ],
            4: [
                [TEAM_PERK_SIDE_DEFENSE],
                [],
            ],
        },
    },
    [[TEAM_TACTICAL]]: {
        display_name: 'Tactical Team',
        display_name_short: 'Tactical',
        icon: 'team-tactical',
        secondary_agenda_id: SA_MISSION_MOMENTUM,
        groups: makeStaticListIds({
            'A': makeGroup({
                min_count: 1,
                max_count: 1,
                size_ids: [SIZE_LIGHT],
                required_upgrade_ids: [TARGET_DESIGNATOR],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_MEDIUM],
                required_weapon_ids: [MELEE_WEAPON],
                limited_structure_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
                limited_armor_mod_ids: [MOD_STANDARD, MOD_REINFORCED],
            }),
            'C': makeGroup({
                min_count: 1,
                max_count: 1,
                size_ids: [SIZE_HEAVY],
                required_at_least_one_of_weapon_ids: [ROCKET_PACK, MISSILES],
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT],
            [SIZE_MEDIUM],
            [SIZE_HEAVY],
        ],
        team_size_perk_rows: {
            3: [
                [TEAM_PERK_0_SLOT_TARGET_DESIGNATORS],
                [TEAM_PERK_EXTRA_TONNAGE],
                [TEAM_PERK_EXTRA_MISSILE_AMMO],
            ],
            4: [
                [],
                [TEAM_PERK_SIDE_DEFENSE],
                [],
            ],
        },
    },
    [[TEAM_BERSERKER]]: {
        display_name: 'Berserker Team',
        display_name_short: 'Berserker',
        icon: 'team-berserker',
        secondary_agenda: SA_DRIVE_THEM_OUT,
        groups: makeStaticListIds({
            'A': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE_LIGHT],
                required_at_least_one_weapon_with_trait_id: TRAIT_MELEE,
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 3,
                size_ids: [SIZE_MEDIUM],
                required_at_least_one_weapon_with_trait_id: TRAIT_MELEE,
            }),
            'C': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_HEAVY],
                required_at_least_one_weapon_with_trait_id: TRAIT_MELEE,
                required_upgrade_ids: [NITRO_BOOST],
            }),
            'D': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE_ULTRA],
                limited_armor_upgrade_ids: [HEAVY_PLATING_ARMOR_UPGRADE],
                required_upgrade_ids: [NITRO_BOOST],
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT],
            [SIZE_MEDIUM],
            [SIZE_HEAVY],
            [SIZE_ULTRA],
        ],
        team_size_perk_rows: {
            2: [
                [],
                [TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS],
                [TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS],
                [],
            ],
            3: [
                [TEAM_PERK_0_SLOT_ARMOR_UPGRADES],
                [TEAM_PERK_COMBAT_BUCKLER],
                [],
                [TEAM_PERK_EXTRA_NITRO],
            ],
            4: [
                [TEAM_PERK_0_TON_ARMOR_UPGRADES],
                [],
                [TEAM_PERK_EXTRA_NITRO],
                [TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS],
            ],
        },
    },
    [[TEAM_GUNSLINGER]]: {
        display_name: 'Gunslinger Team',
        display_name_short: 'Gunslinger',
        icon: 'team-gunslinger',
        secondary_agenda: SA_TROPHY_TAKERS,
        groups: makeStaticListIds({
            'A': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE_LIGHT],
                required_upgrade_ids: [HAPTIC_SUIT],
                limited_weapons_with_at_least_one_of_trait_ids: [TRAIT_MELEE, TRAIT_SHORT],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_MEDIUM],
                required_upgrade_ids: [HAPTIC_SUIT],
                limited_weapons_with_at_least_one_of_trait_ids: [TRAIT_MELEE, TRAIT_SHORT],
            }),
            'C': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_HEAVY],
                required_upgrade_ids: [HAPTIC_SUIT],
                limited_weapons_with_at_least_one_of_trait_ids: [TRAIT_MELEE, TRAIT_SHORT],
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT],
            [SIZE_MEDIUM],
            [SIZE_HEAVY],
        ],
        team_size_perk_rows: {
            2: [
                [],
                [TEAM_PERK_QUICKDRAW],
                [TEAM_PERK_QUICKDRAW],
            ],
            3: [
                [TEAM_PERK_QUICKDRAW],
                [TEAM_PERK_BARREL_EXTENSIONS],
                [],
            ],
            4: [
                [TEAM_PERK_BARREL_EXTENSIONS],
                [],
                [TEAM_PERK_BARREL_EXTENSIONS],
            ],
        },
    },
    [[TEAM_ASSASSIN]]: {
        display_name: 'Assassination Team',
        display_name_short: 'Assassination',
        icon: 'team-assassination',
        secondary_agenda: SA_TARGET_ELIMINATED,
        groups: makeStaticListIds({
            'A': makeGroup({
                min_count: 1,
                max_count: 3,
                size_ids: [SIZE_LIGHT],
                required_upgrade_ids: [DIRECTIONAL_THRUSTER],
                required_at_least_one_weapon_with_trait_id: TRAIT_MELEE,
                prohibited_weapons_with_trait_ids: [TRAIT_REACH],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 3,
                size_ids: [SIZE_MEDIUM],
                required_upgrade_ids: [DIRECTIONAL_THRUSTER],
                required_at_least_one_weapon_with_trait_id: TRAIT_MELEE,
                prohibited_weapons_with_trait_ids: [TRAIT_REACH],
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT, SIZE_MEDIUM],
            [SIZE_LIGHT],
            [SIZE_MEDIUM],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK_FORWARD_DEPLOY_HEVS],
                [],
                [TEAM_PERK_JUMP_BOOSTER],
            ],
            3: [
                [TEAM_PERK_MELEE_FLANK, TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS],
                [TEAM_PERK_SIDE_DEFENSE],
                [],
            ],
            4: [
                [TEAM_PERK_COUNTER_ATTACK],
                [],
                [],
            ],
        },
    },
});

function makeGroup(obj) {

    const defaults = {
        required_weapon_ids: [],
        required_upgrade_ids: [],
        required_at_least_one_of_weapon_ids: [],
        required_at_least_one_weapon_with_trait_id: null,
        required_armor_or_structure_mod_id_once: null,
        prohibited_weapons_with_trait_ids: [],
        limited_weapons_with_at_least_one_of_trait_ids: [],
        limited_structure_mod_ids: [],
        limited_armor_mod_ids: [],
        limited_armor_upgrade_ids: [],
    };
    const result = Object.assign(defaults, obj);

    if (!obj.display_name) {
        result.display_name = obj.size_ids.map((sizeId) => MECH_SIZES[sizeId].display_name)
            .join(' & ');
    }

    each(result.groups, (group) => {
        const mechOptions = {};

        if (group?.size_ids.length) {
            mechOptions.size_id = group.size_ids[0];
        }
        if (group?.limited_structure_mod_ids.length) {
            mechOptions.structure_mod_id = group.limited_structure_mod_ids[0];
        }
        if (group?.limited_armor_mod_ids.length) {
            mechOptions.armor_mod_id = group.limited_armor_mod_ids[0];
        }
        if (group?.limited_armor_upgrade_ids.length) {
            mechOptions.armor_upgrade_id = group.limited_armor_upgrade_ids[0];
        }

        group.new_mech_defaults = mechOptions;
    });

    return result;
}
