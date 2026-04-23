import { makeStaticListIds, trait } from '../data-helpers';
import { BASE_INFANTRY_TRAITS, INFANTRY } from '../infantry-squads';
import { SIZE, UNIT_SIZES } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

const baseStats = {
    move: 12,
    jump: 0,
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
        trait(UNIT_TRAIT.AUXILIARY_UNIT, UNIT_SIZES[SIZE.LIGHT].display_name),
        trait(UNIT_TRAIT.FLYING),
        trait(UNIT_TRAIT.FLYING_SQUADRON),
        trait(UNIT_TRAIT.YIELDING),
    ],
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        INFANTRY_AIR_TRANSPORT: {
            ...baseStats,
            display_name: 'Infantry Air Transport',
            weapon_ids: [
                UNIT_WEAPON.VEH_ROTARY_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.ASSET_COMMAND),
                trait(UNIT_TRAIT.GARRISON, 3, 'Air Infantry Squads'),
            ],
            garrison_choice_unit_ids: [
                INFANTRY.RIFLE_SQUAD,
                INFANTRY.ANTI_TANK_SQUAD,
                INFANTRY.RECON_SQUAD,
            ],
            garrison_unit_traits: [
                ...BASE_INFANTRY_TRAITS,
            ],
        },
        POWER_SUIT_AIR_TRANSPORT: {
            ...baseStats,
            display_name: 'Power Suit Air Transport',
            weapon_ids: [
                UNIT_WEAPON.VEH_ROTARY_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.ASSET_COMMAND),
                trait(UNIT_TRAIT.GARRISON, 2, 'Power Suit Squads'),
            ],
            garrison_choice_unit_ids: [
                INFANTRY.ARC_SUIT_SQUAD,
                INFANTRY.REAPER_SUIT_SQUAD,
                INFANTRY.VIPER_SUIT_SQUAD,
            ],
            garrison_unit_traits: [
                ...BASE_INFANTRY_TRAITS,
            ],
        },
        UL_HEV_AIR_TRANSPORT: {
            ...baseStats,
            display_name: 'UL HE-V Air Transport',
            weapon_ids: [
                UNIT_WEAPON.VEH_ROTARY_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.SQUADRON_GARRISON, 1, 'UL HE-Vs'),
            ],
            garrison_ul_hev: true,
        },
    }),
};
