import { deepFreeze, makeFrozenStaticListIds, makeStaticListIds } from './data-helpers';
import { MECH_ARMOR_UPGRADE } from './mech-armor-upgrades';
import { MECH_BODY_MOD } from './mech-body-mod';
import { TEAM_PERK } from './mech-team-perks';
import { MECH_UPGRADE } from './mech-upgrades';
import { MECH_WEAPON } from './mech-weapons';
import { SECONDARY_AGENDA } from './secondary-agendas';
import { SUPPORT_ASSET_UNITS } from './support-asset-units';
import { SUPPORT_ASSET_UNIT } from './support-assets/_support-asset-types';
import { MECH_SIZES, type MechSizeId, SIZE } from './unit-sizes';
import { WEAPON_TRAIT } from './weapon-traits';

export enum MECH_TEAM_SIZE {
    SMALL = 'TEAM_SIZE_SMALL',
    MEDIUM = 'TEAM_SIZE_MEDIUM',
    LARGE = 'TEAM_SIZE_LARGE',
}

export enum MECH_TEAM {
    SHELF = 'TEAM_SHELF',
    GENERAL = 'TEAM_GENERAL',
    FIRE_SUPPORT = 'TEAM_FIRE_SUPPORT',
    RECON = 'TEAM_RECON',
    SECURITY = 'TEAM_SECURITY',
    MULTIROLE = 'TEAM_MULTIROLE',
    ASSASSIN = 'TEAM_ASSASSIN',
    BERSERKER = 'TEAM_BERSERKER',
    GUNSLINGER = 'TEAM_GUNSLINGER',
    NETWORKED_AI = 'TEAM_NETWORKED_AI',
    COORDINATED_ASSETS = 'TEAM_COORDINATED_ASSETS',
}

export interface MechTeamSize {
    id: string;
    display_name: string;
    description: string;
}

export interface MechTeamGroup {
    id: string,
    display_name: string,
    min_count: number | boolean,
    max_count: number | boolean,
    size_ids: MechSizeId[],
    default_armor_upgrade_ids?: MECH_ARMOR_UPGRADE[],
    required_weapon_ids: MECH_WEAPON[],
    required_upgrade_ids: MECH_UPGRADE[],
    required_at_least_one_of_upgrade_ids: MECH_UPGRADE[],
    required_at_least_one_of_weapon_ids: MECH_WEAPON[],
    required_at_least_one_weapon_with_trait_id: WEAPON_TRAIT | null,
    required_armor_or_structure_mod_id_once: MECH_BODY_MOD | null,
    prohibited_weapons_with_trait_ids: WEAPON_TRAIT[],
    limited_weapons_with_at_least_one_of_trait_ids: WEAPON_TRAIT[],
    limited_structure_mod_ids: MECH_BODY_MOD[],
    limited_armor_mod_ids: MECH_BODY_MOD[],
    limited_armor_upgrade_ids: MECH_ARMOR_UPGRADE[],
    allow_duplicate_weapons: boolean,
}

export type MechTeamPerkColumn = MechSizeId[] | { custom_perk_column: string };

export interface MechTeam {
    id: MECH_TEAM,
    display_name: string,
    display_name_short?: string,
    icon: string,
    secondary_agenda_id?: SECONDARY_AGENDA,
    groups: Record<string, MechTeamGroup>,
    team_size_perk_columns?: MechTeamPerkColumn[],
    team_size_perk_rows?: Record<number, TEAM_PERK[][]>,
    support_asset_units?: {
        support_asset_unit_ids: SUPPORT_ASSET_UNIT[]
        max_support_asset_units: number,
    }
}

export const SUPPORT_ASSET_UNITS_GROUP_ID = 'SUPPORT_ASSET_UNITS_GROUP'

export const MECH_TEAM_SIZES: Readonly<Record<MECH_TEAM_SIZE, MechTeamSize>> = makeFrozenStaticListIds<MechTeamSize>({
    [MECH_TEAM_SIZE.SMALL]: {
        display_name: 'Small',
        description: '2',
    },
    [MECH_TEAM_SIZE.MEDIUM]: {
        display_name: 'Medium',
        description: '2-3',
    },
    [MECH_TEAM_SIZE.LARGE]: {
        display_name: 'Large',
        description: '2-4',
    },
});

export const MECH_TEAMS: Readonly<Record<MECH_TEAM, MechTeam>> = makeFrozenStaticListIds<MechTeam>({
    [MECH_TEAM.SHELF]: {
        display_name: 'Shelved HE-Vs',
        icon: 'hev',
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                display_name: 'Shelved HE-Vs',
                size_ids: [
                    SIZE.LIGHT,
                    SIZE.MEDIUM,
                    SIZE.HEAVY,
                    SIZE.ULTRA,
                ],
                min_count: false,
                max_count: false,
            }),
        }),
    },
    [MECH_TEAM.GENERAL]: {
        display_name: 'HE-Vs',
        icon: 'hev',
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                display_name: 'HE-Vs',
                size_ids: [
                    SIZE.LIGHT,
                    SIZE.MEDIUM,
                    SIZE.HEAVY,
                    SIZE.ULTRA,
                ],
                min_count: false,
                max_count: false,
            }),
        }),
    },
    [MECH_TEAM.FIRE_SUPPORT]: {
        display_name: 'Fire Support Team',
        display_name_short: 'Fire Support',
        icon: 'team-fire-support',
        secondary_agenda_id: SECONDARY_AGENDA.FIRE_FOR_EFFECT,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.LIGHT],
                required_upgrade_ids: [MECH_UPGRADE.TARGET_DESIGNATOR],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.MEDIUM, SIZE.HEAVY],
                required_weapon_ids: [
                    MECH_WEAPON.ROCKET_PACK,
                    MECH_WEAPON.HOWITZER,
                    MECH_WEAPON.MISSILES,
                ],
            }),
        }),
        team_size_perk_columns: [
            [SIZE.LIGHT],
            [SIZE.MEDIUM, SIZE.HEAVY],
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
    [MECH_TEAM.RECON]: {
        display_name: 'Recon Team',
        display_name_short: 'Recon',
        icon: 'team-recon',
        secondary_agenda_id: SECONDARY_AGENDA.DEATH_FROM_ABOVE,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 1,
                max_count: 4,
                size_ids: [SIZE.LIGHT],
                required_upgrade_ids: [MECH_UPGRADE.TARGET_DESIGNATOR],
            }),
            'B': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE.MEDIUM, SIZE.HEAVY],
                required_upgrade_ids: [MECH_UPGRADE.TARGET_DESIGNATOR],
                limited_structure_mod_ids: [MECH_BODY_MOD.STRIPPED],
                limited_armor_mod_ids: [MECH_BODY_MOD.STRIPPED],
            }),
        }),
        team_size_perk_columns: [
            [SIZE.LIGHT, SIZE.MEDIUM, SIZE.HEAVY],
            [SIZE.LIGHT],
            [SIZE.MEDIUM, SIZE.HEAVY],
        ],
        team_size_perk_rows: {
            2: [
                [],
                [TEAM_PERK._0_SLOT_ECM],
                [TEAM_PERK.RECON_INITIATIVE],
            ],
            3: [
                [TEAM_PERK.SUPPORT_ASSET_DAMAGE],
                [TEAM_PERK._0_SLOT_TARGET_DESIGNATORS],
                [],
            ],
            4: [
                [],
                [TEAM_PERK._0_TON_ECM],
                [TEAM_PERK.GRANTED_GUIDANCE_SUITE_MOVE],
            ],
        },
    },
    [MECH_TEAM.SECURITY]: {
        display_name: 'Security Team',
        display_name_short: 'Security',
        icon: 'team-security',
        secondary_agenda_id: SECONDARY_AGENDA.DONT_GIVE_AN_INCH,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 1,
                max_count: 4,
                size_ids: [SIZE.MEDIUM],
                limited_armor_upgrade_ids: [
                    MECH_ARMOR_UPGRADE.ABLATIVE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.REACTIVE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.CERAMIC_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.CLAYMORE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.EXTRA_PLATING_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.HEAVY_PLATING_ARMOR_UPGRADE,
                ],

                required_armor_or_structure_mod_id_once: MECH_BODY_MOD.REINFORCED,
                limited_structure_mod_ids: [MECH_BODY_MOD.STANDARD, MECH_BODY_MOD.REINFORCED],
                limited_armor_mod_ids: [MECH_BODY_MOD.STANDARD, MECH_BODY_MOD.REINFORCED],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.HEAVY],
                limited_armor_upgrade_ids: [
                    MECH_ARMOR_UPGRADE.ABLATIVE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.REACTIVE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.CERAMIC_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.CLAYMORE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.EXTRA_PLATING_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.HEAVY_PLATING_ARMOR_UPGRADE,
                ],
                limited_structure_mod_ids: [MECH_BODY_MOD.STANDARD, MECH_BODY_MOD.REINFORCED],
                limited_armor_mod_ids: [MECH_BODY_MOD.STANDARD, MECH_BODY_MOD.REINFORCED],
            }),
            'C': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE.ULTRA],
                limited_armor_upgrade_ids: [
                    MECH_ARMOR_UPGRADE.ABLATIVE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.REACTIVE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.CERAMIC_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.CLAYMORE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.EXTRA_PLATING_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.HEAVY_PLATING_ARMOR_UPGRADE,
                ],
                limited_structure_mod_ids: [MECH_BODY_MOD.STANDARD, MECH_BODY_MOD.REINFORCED],
                limited_armor_mod_ids: [MECH_BODY_MOD.STANDARD, MECH_BODY_MOD.REINFORCED],
                default_armor_upgrade_ids: [
                    MECH_ARMOR_UPGRADE.ABLATIVE_ARMOR_UPGRADE,
                    MECH_ARMOR_UPGRADE.REACTIVE_ARMOR_UPGRADE,
                ],
            }),
        }),
        team_size_perk_columns: [
            [SIZE.MEDIUM, SIZE.HEAVY, SIZE.ULTRA],
            [SIZE.MEDIUM],
            [SIZE.HEAVY, SIZE.ULTRA],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK.AUX_DEFENSE_CONFIG],
                [],
                [TEAM_PERK.EXTRA_TONNAGE],
            ],
            3: [
                [TEAM_PERK._0_TON_ARMOR_UPGRADES],
                [TEAM_PERK.EXTRA_TONNAGE],
                [TEAM_PERK.SIDE_DEFENSE],
            ],
            4: [
                [TEAM_PERK.GRANTED_SUPPRESSIVE_FIRE],
                [TEAM_PERK.SIDE_DEFENSE],
                [],
            ],
        },
    },
    [MECH_TEAM.MULTIROLE]: {
        display_name: 'Multirole Team',
        display_name_short: 'Multirole',
        icon: 'team-multirole',
        secondary_agenda_id: SECONDARY_AGENDA.MISSION_MOMENTUM,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 1,
                max_count: 1,
                size_ids: [SIZE.LIGHT],
                allow_duplicate_weapons: false,
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.MEDIUM],
                allow_duplicate_weapons: false,
            }),
            'C': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE.HEAVY],
                allow_duplicate_weapons: false,
            }),
        }),
        team_size_perk_columns: [
            [SIZE.LIGHT],
            [SIZE.MEDIUM],
            [SIZE.HEAVY],
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
    [MECH_TEAM.BERSERKER]: {
        display_name: 'Berserker Team',
        display_name_short: 'Berserker',
        icon: 'team-berserker',
        secondary_agenda_id: SECONDARY_AGENDA.DRIVE_THEM_OUT,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE.LIGHT],
                required_at_least_one_weapon_with_trait_id: WEAPON_TRAIT.MELEE,
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 3,
                size_ids: [SIZE.MEDIUM],
                required_at_least_one_weapon_with_trait_id: WEAPON_TRAIT.MELEE,
            }),
            'C': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.HEAVY],
                required_at_least_one_weapon_with_trait_id: WEAPON_TRAIT.MELEE,
                required_upgrade_ids: [MECH_UPGRADE.NITRO_BOOST],
            }),
            'D': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE.ULTRA],
                limited_armor_upgrade_ids: [MECH_ARMOR_UPGRADE.HEAVY_PLATING_ARMOR_UPGRADE],
                required_upgrade_ids: [MECH_UPGRADE.NITRO_BOOST],
            }),
        }),
        team_size_perk_columns: [
            [SIZE.LIGHT],
            [SIZE.MEDIUM],
            [SIZE.HEAVY],
            [SIZE.ULTRA],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK._0_TON_ARMOR_UPGRADES],
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
                [],
            ],
            3: [
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
                [TEAM_PERK.COMBAT_BUCKLER],
                [],
                [TEAM_PERK.EXTRA_NITRO],
            ],
            4: [
                [],
                [],
                [TEAM_PERK.EXTRA_NITRO],
                [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS],
            ],
        },
    },
    [MECH_TEAM.GUNSLINGER]: {
        display_name: 'Gunslinger Team',
        display_name_short: 'Gunslinger',
        icon: 'team-gunslinger',
        secondary_agenda_id: SECONDARY_AGENDA.TROPHY_TAKERS,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 0,
                max_count: 2,
                size_ids: [SIZE.LIGHT],
                required_upgrade_ids: [MECH_UPGRADE.HAPTIC_SUIT],
                limited_weapons_with_at_least_one_of_trait_ids: [WEAPON_TRAIT.MELEE, WEAPON_TRAIT.SHORT],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.MEDIUM],
                required_upgrade_ids: [MECH_UPGRADE.HAPTIC_SUIT],
                limited_weapons_with_at_least_one_of_trait_ids: [WEAPON_TRAIT.MELEE, WEAPON_TRAIT.SHORT],
            }),
            'C': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.HEAVY],
                required_upgrade_ids: [MECH_UPGRADE.HAPTIC_SUIT],
                limited_weapons_with_at_least_one_of_trait_ids: [WEAPON_TRAIT.MELEE, WEAPON_TRAIT.SHORT],
            }),
        }),
        team_size_perk_columns: [
            [SIZE.LIGHT, SIZE.MEDIUM, SIZE.HEAVY],
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK.QUICKDRAW],
            ],
            3: [
                [TEAM_PERK.BARREL_EXTENSIONS],
            ],
            4: [
                [TEAM_PERK.RETURN_SMASH],
            ],
        },
    },
    [MECH_TEAM.ASSASSIN]: {
        display_name: 'Assassination Team',
        display_name_short: 'Assassination',
        icon: 'team-assassination',
        secondary_agenda_id: SECONDARY_AGENDA.TARGET_ELIMINATED,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 1,
                max_count: 3,
                size_ids: [SIZE.LIGHT],
                required_upgrade_ids: [MECH_UPGRADE.DIRECTIONAL_THRUSTER],
                required_at_least_one_weapon_with_trait_id: WEAPON_TRAIT.MELEE,
                prohibited_weapons_with_trait_ids: [WEAPON_TRAIT.REACH],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 3,
                size_ids: [SIZE.MEDIUM],
                required_upgrade_ids: [MECH_UPGRADE.DIRECTIONAL_THRUSTER],
                required_at_least_one_weapon_with_trait_id: WEAPON_TRAIT.MELEE,
                prohibited_weapons_with_trait_ids: [WEAPON_TRAIT.REACH],
            }),
        }),
        team_size_perk_columns: [
            [SIZE.LIGHT, SIZE.MEDIUM],
            [SIZE.LIGHT],
            [SIZE.MEDIUM],
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
    [MECH_TEAM.NETWORKED_AI]: {
        display_name: 'Networked AI Team',
        display_name_short: 'Networked AI',
        icon: 'team-ai',
        secondary_agenda_id: SECONDARY_AGENDA.EXPAND_THE_NETWORK,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE.LIGHT],
                required_at_least_one_of_upgrade_ids: [
                    MECH_UPGRADE.DRONE_MINE_DIRECTOR,
                    MECH_UPGRADE.DRONE_TARGETING_SUPPORT,
                    MECH_UPGRADE.DRONE_TACTICAL_AWARENESS,
                ],
            }),
            'B': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.MEDIUM],
                required_at_least_one_of_upgrade_ids: [
                    MECH_UPGRADE.DRONE_MINE_DIRECTOR,
                    MECH_UPGRADE.DRONE_TARGETING_SUPPORT,
                    MECH_UPGRADE.DRONE_TACTICAL_AWARENESS,
                ],
            }),
            'C': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.HEAVY],
                required_at_least_one_of_upgrade_ids: [
                    MECH_UPGRADE.DRONE_MINE_DIRECTOR,
                    MECH_UPGRADE.DRONE_TARGETING_SUPPORT,
                    MECH_UPGRADE.DRONE_TACTICAL_AWARENESS,
                ],
            }),
            'D': makeGroup({
                min_count: 0,
                max_count: 1,
                size_ids: [SIZE.ULTRA],
                required_at_least_one_of_upgrade_ids: [
                    MECH_UPGRADE.DRONE_MINE_DIRECTOR,
                    MECH_UPGRADE.DRONE_TARGETING_SUPPORT,
                    MECH_UPGRADE.DRONE_TACTICAL_AWARENESS,
                ],
            }),
        }),
        team_size_perk_columns: [
            [SIZE.LIGHT, SIZE.MEDIUM, SIZE.HEAVY, SIZE.ULTRA],
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
    [MECH_TEAM.COORDINATED_ASSETS]: {
        display_name: 'Coordinated Assets Team',
        display_name_short: 'Coordinated Assets',
        icon: 'team-coordinated',
        secondary_agenda_id: SECONDARY_AGENDA.COMBINED_ARMS_ASSAULT,
        groups: makeStaticListIds<MechTeamGroup>({
            'A': makeGroup({
                min_count: 1,
                max_count: 2,
                size_ids: [SIZE.LIGHT, SIZE.MEDIUM, SIZE.HEAVY, SIZE.ULTRA],
                prohibited_weapons_with_trait_ids: [WEAPON_TRAIT.BLAST],
            }),
            [SUPPORT_ASSET_UNITS_GROUP_ID]: makeGroup({
                size_ids: [],
                min_count: 1,
                max_count: 1,
                display_name: 'Support Asset Units'
            }),
        }),
        support_asset_units: {
            support_asset_unit_ids: [SUPPORT_ASSET_UNIT.ULTRA_LIGHT_HEV_SQUADRON, SUPPORT_ASSET_UNIT.ASSAULT_VEHICLE_SQUADRON],
            max_support_asset_units: 1,
        },
        team_size_perk_columns: [
            [SIZE.LIGHT, SIZE.MEDIUM, SIZE.HEAVY, SIZE.ULTRA],
            {
                custom_perk_column: [
                    SUPPORT_ASSET_UNITS[SUPPORT_ASSET_UNIT.ULTRA_LIGHT_HEV_SQUADRON].display_name,
                    SUPPORT_ASSET_UNITS[SUPPORT_ASSET_UNIT.ASSAULT_VEHICLE_SQUADRON].display_name,
                ].join(' or '),
            },
        ],
        team_size_perk_rows: {
            2: [
                [TEAM_PERK.SQUEEZE],
                [TEAM_PERK.SQUEEZE],
            ],
            3: [
                [],
                [TEAM_PERK.CONVOY],
            ],
            4: [
                [TEAM_PERK.SYNCHRONIZED_STRIKE],
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
        required_at_least_one_of_upgrade_ids: [],
    };
    const result = Object.assign(defaults, obj);

    if (!obj.display_name) {
        if (hasAllHevSizes(obj.size_ids)) {
            result.display_name = 'All';
        } else {
            result.display_name = obj.size_ids.map((sizeId) => MECH_SIZES[sizeId].display_name)
                .join(' & ');
        }
    }

    return result as Omit<MechTeamGroup, 'id'>;
}

function hasAllHevSizes(sizeIds: MechSizeId[]): boolean {
    return (
        sizeIds.length === 4 &&
        sizeIds.includes(SIZE.LIGHT) &&
        sizeIds.includes(SIZE.MEDIUM) &&
        sizeIds.includes(SIZE.HEAVY) &&
        sizeIds.includes(SIZE.ULTRA)
    );
}
