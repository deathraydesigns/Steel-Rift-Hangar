import { makeStaticListIds, trait } from '../data-helpers';
import { SIZE_ULTRA_LIGHT } from '../unit-sizes';
import {
    TRAIT_CLOSE_SUPPORT,
    TRAIT_MINE_SWEEPER,
    TRAIT_OUTRIDER,
    TRAIT_SQUADRON,
    TRAIT_SUPPRESSIVE_FIRE,
    TRAIT_TARGET_DESIGNATOR,
    TRAIT_UNIT_SIZE_AND_TYPE,
} from '../unit-traits';
import { TYPE_VEHICLE } from '../unit-types';
import { CLUSTER_ROCKETS, MISSILE_POD, VEH_AUTO_CANNON, VEH_SUBMUNITIONS } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

export const LIGHT_VEHICLE_SQUADRON = 'LIGHT_VEHICLE_SQUADRON' as const;

export const LIGHT_VEHICLE_SQUADRON_DATA: Record<string, Omit<SupportAssetUnitDef, 'id'>> = {
    [LIGHT_VEHICLE_SQUADRON]: {
        unit_type_id: TYPE_VEHICLE,
        size_id: SIZE_ULTRA_LIGHT,
        display_name: 'Light Unit Squadron',
        cost: 10,
        max_armor_tons: 10,
        defense: 3,
        unit_points_description: 'This Unit must have a total of 10 armor',
        traits: [
            trait(TRAIT_UNIT_SIZE_AND_TYPE, undefined, 'Light Vehicle'),
            trait(TRAIT_SQUADRON),
            trait(TRAIT_CLOSE_SUPPORT),
        ],
        vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
            RECON: {
                move: 12,
                armor: 0,
                structure: 1,
                display_name: 'Recon',
                weapon_ids: [
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(TRAIT_TARGET_DESIGNATOR),
                    trait(TRAIT_OUTRIDER),
                ],
            },
            FIRE_SUPPORT: {
                move: 8,
                armor: 1,
                structure: 1,
                display_name: 'Fire Support',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                weapon_choice_ids: {
                    choice_1: [
                        CLUSTER_ROCKETS,
                        MISSILE_POD,
                    ],
                },
                traits: [],
            },
            TACTICAL: {
                move: 10,
                armor: 1,
                structure: 1,
                display_name: 'Tactical',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                traits: [
                    trait(TRAIT_SUPPRESSIVE_FIRE),
                ],
            },
            ENGINEERING: {
                move: 8,
                armor: 2,
                structure: 1,
                display_name: 'Engineering',
                weapon_ids: [
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(TRAIT_MINE_SWEEPER),
                ],
            },
        }),
    },
};