import { makeStaticListIds, trait } from '../data-helpers';
import { SIZE } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

export const LIGHT_VEHICLE_SQUADRON_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.VEHICLE,
    size_id: SIZE.ULTRA_LIGHT,
    display_name: 'Light Unit Squadron',
    cost: 10,
    max_armor_tons: 10,
    defense: 3,
    unit_points_description: 'This Unit must have a total of 10 armor',
    traits: [
        trait(UNIT_TRAIT.UNIT_SIZE_AND_TYPE, undefined, 'Light Vehicle'),
        trait(UNIT_TRAIT.SQUADRON),
        trait(UNIT_TRAIT.CLOSE_SUPPORT),
    ],
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        RECON: {
            move: 12,
            armor: 0,
            structure: 1,
            display_name: 'Recon',
            weapon_ids: [
                UNIT_WEAPON.VEH_SUBMUNITIONS,
            ],
            traits: [
                trait(UNIT_TRAIT.TARGET_DESIGNATOR),
                trait(UNIT_TRAIT.OUTRIDER),
            ],
        },
        FIRE_SUPPORT: {
            move: 8,
            armor: 1,
            structure: 1,
            display_name: 'Fire Support',
            weapon_ids: [
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            weapon_choice_ids: {
                choice_1: [
                    UNIT_WEAPON.CLUSTER_ROCKETS,
                    UNIT_WEAPON.MISSILE_POD,
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
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.SUPPRESSIVE_FIRE),
            ],
        },
        ENGINEERING: {
            move: 8,
            armor: 2,
            structure: 1,
            display_name: 'Engineering',
            weapon_ids: [
                UNIT_WEAPON.VEH_SUBMUNITIONS,
            ],
            traits: [
                trait(UNIT_TRAIT.MINE_SWEEPER),
            ],
        },
    }),
};