import { makeStaticListIds, trait } from '../data-helpers';
import { INFANTRY } from '../infantry-squads';
import { SIZE } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

const baseStats = {
    move: 12,
    armor: 3,
    structure: 0,
};

export const LAS_WING_TRANSPORT_SQUADRON_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.VEHICLE,
    size_id: SIZE.LIGHT,
    display_name: 'LAS-Wing Transport Squadron',
    cost: 10,
    max_vehicles: 3,
    all_vehicle_must_be_the_same: true,
    defense: 3,
    traits: [
        trait(UNIT_TRAIT.UNIT_SIZE_AND_TYPE, undefined, 'Light Vehicle'),
        trait(UNIT_TRAIT.FLYING),
        trait(UNIT_TRAIT.FLYING_SQUADRON),
        trait(UNIT_TRAIT.HAULER),
    ],
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        INFANTRY_AIR_TRANSPORT: {
            ...baseStats,
            display_name: 'Infantry Air Transport',
            weapon_ids: [
                UNIT_WEAPON.VEH_ROTARY_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.GROUP_COMMAND),
                trait(UNIT_TRAIT.GARRISON, 3, 'Air Infantry Squads'),
            ],
            garrison_choice_unit_ids: [
                INFANTRY.RIFLE_SQUAD,
                INFANTRY.ANTI_TANK_SQUAD,
                INFANTRY.RECON_SQUAD,
            ],
            garrison_unit_traits: [
                trait(UNIT_TRAIT.SQUADRON),
                trait(UNIT_TRAIT.ALL_TERRAIN),
            ],
        },
        POWER_SUIT_AIR_TRANSPORT: {
            ...baseStats,
            display_name: 'Power Suit Air Transport',
            weapon_ids: [
                UNIT_WEAPON.VEH_ROTARY_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.GROUP_COMMAND),
                trait(UNIT_TRAIT.GARRISON, 2, 'Power Suit Squads'),
            ],
            garrison_choice_unit_ids: [
                INFANTRY.ARC_SUIT_SQUAD,
                INFANTRY.REAPER_SUIT_SQUAD,
                INFANTRY.VIPER_SUIT_SQUAD,
            ],
            garrison_unit_traits: [
                trait(UNIT_TRAIT.SQUADRON),
                trait(UNIT_TRAIT.ALL_TERRAIN),
            ],
        },
        UL_HEV_AIR_TRANSPORT: {
            ...baseStats,
            display_name: 'UL HE-V Air Transport',
            weapon_ids: [
                UNIT_WEAPON.VEH_ROTARY_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.GROUP_COMMAND),
                trait(UNIT_TRAIT.GARRISON, 1, 'UL HE-Vs'),
            ],
            garrison_ul_hev: true,
        },
    }),
};
