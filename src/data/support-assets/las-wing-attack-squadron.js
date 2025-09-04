import {VEH_AGM_MISSILES, VEH_BARRAGE_ROCKETS, VEH_LAS_AUTO_CANNON, VEH_ROTARY_CANNON} from '../unit-weapons.js';
import {
    TRAIT_FLYING,
    TRAIT_FLYING_SQUADRON,
    TRAIT_MINE_SWEEPER,
    TRAIT_MSOE_LAUNCHER,
    TRAIT_SCRAMBLERS,
    TRAIT_UNIT_SIZE_AND_TYPE,
} from '../unit-traits.js';
import {SIZE_LIGHT} from '../unit-sizes.js';
import {makeStaticListIds, trait} from '../data-helpers.js';
import {TYPE_VEHICLE} from '../unit-types.js';

export const LAS_WING_ATTACK_SQUADRON = 'LAS_WING_ATTACK_SQUADRON';

const baseStats = {
    move: 12,
    armor: 2,
    structure: 0,
};

export const LAS_WING_ATTACK_SQUADRON_DATA = {
    [LAS_WING_ATTACK_SQUADRON]: {
        unit_type_id: TYPE_VEHICLE,
        size_id: SIZE_LIGHT,
        display_name: 'LAS-Wing Attack Squadron',
        cost: 10,
        max_vehicles: 4,
        defense: 3,
        traits: [
            trait(TRAIT_UNIT_SIZE_AND_TYPE, null, 'Light Vehicle'),
            trait(TRAIT_FLYING),
            trait(TRAIT_FLYING_SQUADRON),
        ],
        vehicles: makeStaticListIds({
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
                    trait(TRAIT_MINE_SWEEPER),
                    trait(TRAIT_MSOE_LAUNCHER),
                    trait(TRAIT_SCRAMBLERS),
                ],
            },
        }),
    },
};