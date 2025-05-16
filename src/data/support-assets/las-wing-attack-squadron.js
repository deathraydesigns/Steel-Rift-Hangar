import {VEH_AGM_MISSILES, VEH_BARRAGE_ROCKETS, VEH_LES_AUTO_CANNON, VEH_ROTARY_CANNON} from '../unit-weapons.js';
import {trait} from '../weapon-traits.js';
import {TRAIT_MINE_SWEEPER, TRAIT_MSOE_LAUNCHER, TRAIT_SCRAMBLERS} from '../unit-traits.js';
import {SIZE_LIGHT} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';

export const LAS_WING_ATTACK_SQUADRON = 'LAS_WING_ATTACK_SQUADRON';

const baseStats = {
    move: 12,
    armor: 2,
    structure: 0,
};

export const LAS_WING_ATTACK_SQUADRON_DATA = {
    [[LAS_WING_ATTACK_SQUADRON]]: {
        size_id: SIZE_LIGHT,
        display_name: 'LAS-Wing Attack Squadron',
        attached_element_label: 'Vehicle',
        cost: 10,
        max_vehicles: 4,
        vehicles: makeStaticListIds({
            STRIKE_LAS_WING: {
                ...baseStats,
                display_name: 'Strike LAS-Wing',
                weapon_choice_ids: {
                    choice_1: [
                        VEH_LES_AUTO_CANNON,
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
                        VEH_LES_AUTO_CANNON,
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