import { makeStaticListIds, trait } from '../data-helpers';
import { SIZE } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

const baseStats = {
    move: 12,
    armor: 2,
    structure: 0,
};

export const LAS_WING_ATTACK_SQUADRON_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.VEHICLE,
    size_id: SIZE.LIGHT,
    display_name: 'LAS-Wing Attack Squadron',
    cost: 10,
    max_vehicles: 4,
    defense: 3,
    traits: [
        trait(UNIT_TRAIT.UNIT_SIZE_AND_TYPE, undefined, 'Light Vehicle'),
        trait(UNIT_TRAIT.FLYING),
        trait(UNIT_TRAIT.FLYING_SQUADRON),
    ],
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        STRIKE_LAS_WING: {
            ...baseStats,
            display_name: 'Strike LAS-Wing',
            weapon_choice_ids: {
                choice_1: [
                    UNIT_WEAPON.VEH_LAS_AUTO_CANNON,
                    UNIT_WEAPON.VEH_ROTARY_CANNON,
                ],
                choice_2: [
                    UNIT_WEAPON.VEH_AGM_MISSILES,
                    UNIT_WEAPON.VEH_BARRAGE_ROCKETS,
                ],
            },
            traits: [],
        },
        RECON_LAS_WING: {
            ...baseStats,
            display_name: 'Recon and Disruption LAS-Wing',
            weapon_choice_ids: {
                choice_1: [
                    UNIT_WEAPON.VEH_LAS_AUTO_CANNON,
                    UNIT_WEAPON.VEH_ROTARY_CANNON,
                ],
            },
            traits: [
                trait(UNIT_TRAIT.MINE_SWEEPER),
                trait(UNIT_TRAIT.MSOE_LAUNCHER),
                trait(UNIT_TRAIT.SCRAMBLERS),
            ],
        },
    }),
};