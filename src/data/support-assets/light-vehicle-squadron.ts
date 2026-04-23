import { makeStaticListIds, trait } from '../data-helpers';
import { SIZE, UNIT_SIZES } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

export const LIGHT_VEHICLE_SQUADRON_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.VEHICLE,
    size_id: SIZE.ULTRA_LIGHT,
    display_name: 'Light Unit Squadron',
    cost: 10,
    max_vehicle_tons: 10,
    defense: 3,
    unit_points_description: 'This Unit must have a total of 10 Tons',
    traits: [
        trait(UNIT_TRAIT.AUXILIARY_UNIT, UNIT_SIZES[SIZE.LIGHT].display_name),
        trait(UNIT_TRAIT.SQUADRON),
        trait(UNIT_TRAIT.CLOSE_SUPPORT),
        trait(UNIT_TRAIT.VULNERABLE),
    ],
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        RECON: {
            move: 12,
            jump: 0,
            armor: 0,
            structure: 1,
            tons: 1,
            display_name: 'Recon',
            max_vehicle_instances: 4,
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
            jump: 0,
            armor: 1,
            structure: 1,
            tons: 2,
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
            jump: 0,
            armor: 1,
            structure: 1,
            tons: 2,
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
            jump: 0,
            armor: 2,
            structure: 1,
            tons: 2,
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