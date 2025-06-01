import {SIZE_ULTRA_LIGHT} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';
import {
    SHORT_RANGE_MISSILE_PACK,
    UL_AUTO_CANNON,
    UL_GRENADES,
    UL_INCINERATORS,
    UL_ROCKET_PACK,
    VEH_SUBMUNITIONS,
} from '../unit-weapons.js';
import {
    TRAIT_ALL_TERRAIN,
    TRAIT_CLOSE_SUPPORT,
    TRAIT_INFERNO_GEAR,
    TRAIT_MAGNETIC_GRAPPLES,
    TRAIT_SCRAMBLERS,
    TRAIT_SQUADRON,
    TRAIT_SUPPRESSIVE_FIRE,
    TRAIT_TARGET_DESIGNATOR,
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
            PYRO: {
                move: 6,
                jump: 0,
                armor: 3,
                structure: 0,
                display_name: 'Pyro',
                weapon_ids: [
                    UL_INCINERATORS,
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(TRAIT_INFERNO_GEAR),
                ],
            },
            COMMANDO: {
                move: 7,
                jump: 0,
                armor: 3,
                structure: 0,
                display_name: 'Commando',
                weapon_ids: [
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(TRAIT_SCRAMBLERS),
                    trait(TRAIT_TARGET_DESIGNATOR),
                ],
            },
            RIFLEMAN: {
                move: 8,
                jump: 0,
                armor: 3,
                structure: 0,
                display_name: 'Rifleman',
                weapon_ids: [
                    UL_AUTO_CANNON,
                    UL_GRENADES,
                ],
                traits: [
                    trait(TRAIT_SUPPRESSIVE_FIRE),
                ],
            },
        }),
    },
};