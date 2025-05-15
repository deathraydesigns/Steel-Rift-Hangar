import {SIZE_ULTRA_LIGHT} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';
import {MISSILE_POD, ROCKET_POD, VEH_AUTO_CANNON, VEH_SUBMUNITIONS} from '../vehicle-weapons.js';
import {TRAIT_MINE_SWEEPER, TRAIT_OUTRIDER, TRAIT_SUPPRESSIVE_FIRE, TRAIT_TARGET_DESIGNATOR} from '../unit-traits.js';
import {trait} from '../weapon-traits.js';

export const LIGHT_VEHICLE_SQUADRON = 'LIGHT_VEHICLE_SQUADRON';

export const LIGHT_VEHICLE_SQUADRON_DATA = {
    [[LIGHT_VEHICLE_SQUADRON]]: {
        size_id: SIZE_ULTRA_LIGHT,
        display_name: 'Heavy Tank Troop',
        cost: 20,
        max_armor_tons: 10,
        vehicles: makeStaticListIds({
            RECON: {
                move: 12,
                armor: 1,
                structure: 0,
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
                armor: 2,
                structure: 0,
                display_name: 'Fire Support',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                weapon_choice_ids: {
                    choice_1: [
                        ROCKET_POD,
                        MISSILE_POD,
                    ],
                },
                traits: [],
            },
            TACTICAL: {
                move: 10,
                armor: 2,
                structure: 0,
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
                armor: 3,
                structure: 0,
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