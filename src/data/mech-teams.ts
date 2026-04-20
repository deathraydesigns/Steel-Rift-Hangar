import type { MechTeam, MechTeamGroup, MechTeamSize } from '../types';
import { deepFreeze, makeFrozenStaticListIds, makeStaticListIds } from './data-helpers';
import {
    ABLATIVE_ARMOR_UPGRADE,
    CERAMIC_ARMOR_UPGRADE,
    CLAYMORE_ARMOR_UPGRADE,
    EXTRA_PLATING_ARMOR_UPGRADE,
    HEAVY_PLATING_ARMOR_UPGRADE,
    REACTIVE_ARMOR_UPGRADE,
} from './mech-armor-upgrades';
import { MOD_REINFORCED, MOD_STANDARD, MOD_STRIPPED } from './mech-body';
import { TEAM_PERK } from './mech-team-perks';
import { DIRECTIONAL_THRUSTER, HAPTIC_SUIT, NITRO_BOOST, TARGET_DESIGNATOR } from './mech-upgrades';
import { HOWITZER, MISSILES, ROCKET_PACK } from './mech-weapons';
import {
    SA_DEATH_FROM_ABOVE,
    SA_DONT_GIVE_AN_INCH,
    SA_DRIVE_THEM_OUT,
    SA_EXPAND_THE_NETWORK,
    SA_FIRE_FOR_EFFECT,
    SA_MISSION_MOMENTUM,
    SA_TARGET_ELIMINATED,
    SA_TROPHY_TAKERS,
} from './secondary-agendas';
import { MECH_SIZES, type MechSizeId, SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM, SIZE_ULTRA } from './unit-sizes';

import { TRAIT_MELEE, TRAIT_REACH, TRAIT_SHORT } from './weapon-traits';

export const TEAM_SIZE_SMALL = 'TEAM_SIZE_SMALL' as const;
export const TEAM_SIZE_MEDIUM = 'TEAM_SIZE_MEDIUM' as const;
export const TEAM_SIZE_LARGE = 'TEAM_SIZE_LARGE' as const;

export type MechTeamSizeId =
    | typeof TEAM_SIZE_SMALL
    | typeof TEAM_SIZE_MEDIUM
    | typeof TEAM_SIZE_LARGE;

export const TEAM_SHELF = 'TEAM_SHELF' as const;
export const TEAM_GENERAL = 'TEAM_GENERAL' as const;
export const TEAM_FIRE_SUPPORT = 'TEAM_FIRE_SUPPORT' as const;
export const TEAM_RECON = 'TEAM_RECON' as const;
export const TEAM_SECURITY = 'TEAM_SECURITY' as const;
export const TEAM_MULTIROLE = 'TEAM_MULTIROLE' as const;
export const TEAM_ASSASSIN = 'TEAM_ASSASSIN' as const;
export const TEAM_BERSERKER = 'TEAM_BERSERKER' as const;
export const TEAM_GUNSLINGER = 'TEAM_GUNSLINGER' as const;
export const TEAM_NETWORKED_AI = 'TEAM_NETWORKED_AI' as const;

export type MechTeamId =
    | typeof TEAM_SHELF
    | typeof TEAM_GENERAL
    | typeof TEAM_FIRE_SUPPORT
    | typeof TEAM_RECON
    | typeof TEAM_SECURITY
    | typeof TEAM_MULTIROLE
    | typeof TEAM_ASSASSIN
    | typeof TEAM_BERSERKER
    | typeof TEAM_GUNSLINGER
    | typeof TEAM_NETWORKED_AI

export const MECH_TEAM_SIZES: Readonly<Record<MechTeamSizeId, MechTeamSize>> = makeFrozenStaticListIds<MechTeamSize>({
    [TEAM_SIZE_SMALL]: {
        display_name: 'Small',
        description: '2',
    },
    [TEAM_SIZE_MEDIUM]: {
        display_name: 'Medium',
        description: '2-3',
    },
    [TEAM_SIZE_LARGE]: {
        display_name: 'Large',
        description: '2-4',
    },
});

export const MECH_TEAMS: Readonly<Record<MechTeamId, MechTeam>> = makeFrozenStaticListIds<MechTeam>({
    [TEAM_SHELF]: {
        display_name: 'Shelved HE-Vs',
        icon: 'hev',
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                display_name: 'Shelved HE-Vs',
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
    [TEAM_GENERAL]: {
        display_name: 'HE-Vs',
        icon: 'hev',
        groups: makeStaticListIds<MechTeamGroup>({
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
    [TEAM_FIRE_SUPPORT]: {
        display_name: 'Fire Support Team',
        display_name_short: 'Fire Support',
        icon: 'team-fire-support',
        secondary_agenda_id: SA_FIRE_FOR_EFFECT,
        groups: makeStaticListIds<MechTeamGroup>({
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
                [TEAM_PERK._0_SLOT_TARGET_DESIGNATORS, TEAM_PERK.EXTRA_CLUSTER_ROCKET_AMMO],
                [TEAM_PERK.GUIDED_ROCKETS],
            ],
            3: [
                [TEAM_PERK._0_TON_TARGET_DESIGNATORS],
                [TEAM_PERK.HOMING],
            ],
            4: [
                [TEAM_PERK._0_TON_TARGET_DESIGNATORS],
                [],
            ],
        },
    },
    [TEAM_RECON]: {
        display_name: 'Recon Team',
        display_name_short: 'Recon',
        icon: 'team-recon',
        secondary_agenda_id: SA_DEATH_FROM_ABOVE,
        groups: makeStaticListIds<MechTeamGroup>({
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
                [TEAM_PERK._0_SLOT_ECM],
                [TEAM_PERK.RECON_INITIATIVE],
            ],
            3: [
                [TEAM_PERK._0_SLOT_TARGET_DESIGNATORS],
                [TEAM_PERK.SUPPORT_ASSET_DAMAGE],
            ],
            4: [
                [TEAM_PERK._0_TON_ECM, TEAM_PERK._0_TON_TARGET_DESIGNATORS],
                [TEAM_PERK.DIRECTIONAL_ASSETS],
            ],
        },
    },
    [TEAM_SECURITY]: {
        display_name: 'Security Team',
        display_name_short: 'Security',
        icon: 'team-security',
        secondary_agenda_id: SA_DONT_GIVE_AN_INCH,
        groups: makeStaticListIds<MechTeamGroup>({
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
            [SIZE_MEDIUM, SIZE_HEAVY, SIZE_ULTRA],
            [SIZE_MEDIUM],
            [SIZE_HEAVY, SIZE_ULTRA],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK.AUX_DEFENSE_CONFIG],
                [TEAM_PERK._0_SLOT_ARMOR_UPGRADES],
                [TEAM_PERK._0_SLOT_ARMOR_UPGRADES, TEAM_PERK.EXTRA_TONNAGE],
            ],
            3: [
                [TEAM_PERK._0_TON_ARMOR_UPGRADES],
                [TEAM_PERK._0_TON_ARMOR_UPGRADES, TEAM_PERK.EXTRA_TONNAGE],
                [TEAM_PERK._0_TON_ARMOR_UPGRADES, TEAM_PERK.SIDE_DEFENSE],
            ],
            4: [
                [TEAM_PERK.GRANTED_SUPPRESSIVE_FIRE],
                [TEAM_PERK.SIDE_DEFENSE],
                [],
            ],
        },
    },
    [TEAM_MULTIROLE]: {
        display_name: 'Multirole Team',
        display_name_short: 'Multirole',
        icon: 'team-multirole',
        secondary_agenda_id: SA_MISSION_MOMENTUM,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 1,
                max_count: 1,
                size_ids: [SIZE_LIGHT],
                allow_duplicate_weapons: false,
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_MEDIUM],
                allow_duplicate_weapons: false,
            }),
            'C': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE_HEAVY],
                allow_duplicate_weapons: false,
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT],
            [SIZE_MEDIUM],
            [SIZE_HEAVY],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK.LIGHT_STABILIZER, TEAM_PERK.DRAIN_RESISTANT],
                [TEAM_PERK.AIR_BURST, TEAM_PERK.IMPACT_ROUNDS],
                [TEAM_PERK.MELEE_SPECIALIST, TEAM_PERK.BARREL_EXTENSIONS],
            ],
            3: [
                [TEAM_PERK.MELEE_SPECIALIST, TEAM_PERK.IMPACT_ROUNDS],
                [TEAM_PERK.BARREL_EXTENSIONS, TEAM_PERK.DRAIN_RESISTANT],
                [TEAM_PERK.LIGHT_STABILIZER, TEAM_PERK.AIR_BURST],
            ],
            4: [
                [TEAM_PERK.BARREL_EXTENSIONS, TEAM_PERK.AIR_BURST],
                [TEAM_PERK.LIGHT_STABILIZER, TEAM_PERK.MELEE_SPECIALIST],
                [TEAM_PERK.DRAIN_RESISTANT, TEAM_PERK.IMPACT_ROUNDS],
            ],
        },
    },
    [TEAM_BERSERKER]: {
        display_name: 'Berserker Team',
        display_name_short: 'Berserker',
        icon: 'team-berserker',
        secondary_agenda_id: SA_DRIVE_THEM_OUT,
        groups: makeStaticListIds<MechTeamGroup>({
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
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
                [],
            ],
            3: [
                [TEAM_PERK._0_SLOT_ARMOR_UPGRADES],
                [TEAM_PERK.COMBAT_BUCKLER],
                [],
                [TEAM_PERK.EXTRA_NITRO],
            ],
            4: [
                [TEAM_PERK._0_TON_ARMOR_UPGRADES],
                [],
                [TEAM_PERK.EXTRA_NITRO],
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
            ],
        },
    },
    [TEAM_GUNSLINGER]: {
        display_name: 'Gunslinger Team',
        display_name_short: 'Gunslinger',
        icon: 'team-gunslinger',
        secondary_agenda_id: SA_TROPHY_TAKERS,
        groups: makeStaticListIds<MechTeamGroup>({
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
                [TEAM_PERK.QUICKDRAW],
                [TEAM_PERK.QUICKDRAW],
            ],
            3: [
                [TEAM_PERK.QUICKDRAW],
                [TEAM_PERK.BARREL_EXTENSIONS],
                [],
            ],
            4: [
                [TEAM_PERK.BARREL_EXTENSIONS],
                [],
                [TEAM_PERK.BARREL_EXTENSIONS],
            ],
        },
    },
    [TEAM_ASSASSIN]: {
        display_name: 'Assassination Team',
        display_name_short: 'Assassination',
        icon: 'team-assassination',
        secondary_agenda_id: SA_TARGET_ELIMINATED,
        groups: makeStaticListIds<MechTeamGroup>({
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
                [TEAM_PERK.FORWARD_DEPLOY_HEVS],
                [],
                [TEAM_PERK.JUMP_BOOSTER],
            ],
            3: [
                [TEAM_PERK.MELEE_FLANK],
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
                [],
            ],
            4: [
                [TEAM_PERK.COUNTER_ATTACK],
                [],
                [],
            ],
        },
    },
    [TEAM_NETWORKED_AI]: {
        display_name: 'Networked AI Team',
        display_name_short: 'Networked AI',
        icon: 'team-ai',
        secondary_agenda_id: SA_EXPAND_THE_NETWORK,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE_LIGHT],
                requires_at_least_one_companion_drone: true,
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_MEDIUM],
                requires_at_least_one_companion_drone: true,
            }),
            'C': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE_HEAVY],
                requires_at_least_one_companion_drone: true,
            }),
            'D': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE_ULTRA],
                requires_at_least_one_companion_drone: true,
            }),
        }),
        team_size_perk_columns: [
            [SIZE_LIGHT, SIZE_MEDIUM, SIZE_HEAVY, SIZE_ULTRA],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK.DRONE_RACK],
            ],
            3: [
                [TEAM_PERK.DRONE_SHARING],
            ],
            4: [
                [TEAM_PERK.TARGETING_LINK],
            ],
        },
    },
});

export const MECH_TEAM_ARRAY: readonly MechTeam[] = deepFreeze(Object.values(MECH_TEAMS));

function makeGroup(obj: Partial<MechTeamGroup> & { size_ids: MechSizeId[] }): Omit<MechTeamGroup, 'id'> {

    const defaults: Omit<MechTeamGroup, 'id' | 'size_ids' | 'min_count' | 'max_count' | 'display_name'> = {
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
        allow_duplicate_weapons: true,
        requires_at_least_one_companion_drone: false,
    };
    const result = Object.assign(defaults, obj);

    if (!obj.display_name) {
        result.display_name = obj.size_ids.map((sizeId) => MECH_SIZES[sizeId].display_name)
            .join(' & ');
    }

    return result as Omit<MechTeamGroup, 'id'>;
}
