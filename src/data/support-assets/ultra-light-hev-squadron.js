import {SIZE_ULTRA_LIGHT} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';
import {
    CLUSTER_ROCKETS,
    MISSILE_POD,
    SHORT_RANGE_MISSILE_PACK,
    UL_ROCKET_PACK,
    VEH_AUTO_CANNON,
    VEH_SUBMUNITIONS,
} from '../unit-weapons.js';
import {
    TRAIT_ALL_TERRAIN,
    TRAIT_CLOSE_SUPPORT,
    TRAIT_MAGNETIC_GRAPPLES,
    TRAIT_MINE_SWEEPER,
    TRAIT_SQUADRON,
    TRAIT_SUPPRESSIVE_FIRE,
    TRAIT_UL_HEV_LAUNCH_GEAR,
    TRAIT_UNIT_SIZE_AND_TYPE,
} from '../unit-traits.js';
import {trait} from '../weapon-traits.js';
import {TYPE_HEV} from '../unit-types.js';

export const ULTRA_LIGHT_HEV_SQUADRON = 'ULTRA_LIGHT_HEV_SQUADRON';
export const ULTRA_LIGHT_HEV_SQUADRON_DATA = {
    [[ULTRA_LIGHT_HEV_SQUADRON]]: {
        unit_type_id: TYPE_HEV,
        size_id: SIZE_ULTRA_LIGHT,
        display_name: 'Ultra-Light HE-V Squadron',
        cost: 10,
        max_vehicles: 3,
        traits: [
            trait(TRAIT_UNIT_SIZE_AND_TYPE, null, 'UL HE-V'),
            trait(TRAIT_SQUADRON),
            trait(TRAIT_CLOSE_SUPPORT),
            trait(TRAIT_ALL_TERRAIN),
        ],
        upgrade_pods: makeStaticListIds({
            POD_MISSILE_PACK: {
                weapon_id: SHORT_RANGE_MISSILE_PACK,
            },
            POD_ROCKET_PACK: {
                weapon_id: UL_ROCKET_PACK,
            },
            POD_LAUNCH_GEAR: {
                trait: trait(TRAIT_UL_HEV_LAUNCH_GEAR),
            },
        }),
        vehicles: makeStaticListIds({
            BRAWLER: {
                move: 7,
                jump: 0,
                armor: 3,
                structure: 0,
                display_name: 'Brawler',
                weapon_ids: [
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(TRAIT_MAGNETIC_GRAPPLES),
                ],
            },
            FIRE_SUPPORT: {
                move: 8,
                jump: 0,
                armor: 2,
                structure: 0,
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
                jump: 0,
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
                jump: 0,
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