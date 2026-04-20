import { makeStaticListIds, trait } from '../data-helpers';
import { SIZE } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { TYPE_VEHICLE } from '../unit-types';
import { VEH_AGM_MISSILES, VEH_BARRAGE_ROCKETS, VEH_LAS_AUTO_CANNON, VEH_ROTARY_CANNON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

export const LAS_WING_ATTACK_SQUADRON = 'LAS_WING_ATTACK_SQUADRON' as const;

const baseStats = {
    move: 12,
    armor: 2,
    structure: 0,
};

export const LAS_WING_ATTACK_SQUADRON_DATA: Record<string, Omit<SupportAssetUnitDef, 'id'>> = {
    [LAS_WING_ATTACK_SQUADRON]: {
        unit_type_id: TYPE_VEHICLE,
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
                        VEH_LAS_AUTO_CANNON,
                        VEH_ROTARY_CANNON,
                    ],
                    choice_2: [
                        VEH_AGM_MISSILES,
                        VEH_BARRAGE_ROCKETS,
                    ],
                },
                traits: [],
            },
            RECON_LAS_WING: {
                ...baseStats,
                display_name: 'Recon and Disruption LAS-Wing',
                weapon_choice_ids: {
                    choice_1: [
                        VEH_LAS_AUTO_CANNON,
                        VEH_ROTARY_CANNON,
                    ],
                },
                traits: [
                    trait(UNIT_TRAIT.MINE_SWEEPER),
                    trait(UNIT_TRAIT.MSOE_LAUNCHER),
                    trait(UNIT_TRAIT.SCRAMBLERS),
                ],
            },
        }),
    },
};