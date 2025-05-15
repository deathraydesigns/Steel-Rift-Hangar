import {VEH_AUTO_CANNON} from '../vehicle-weapons.js';
import {trait} from '../weapon-traits.js';
import {
    TRAIT_OUTRIDER,
    TRAIT_SUPPORT_GUIDANCE_SUITE,
    TRAIT_SUPPORT_MINE_DRONE_LAYER,
    TRAIT_SUPPORT_ORDER_CNC,
    TRAIT_SUPPORT_ORDER_COMBAT_SUPPLIES,
    TRAIT_TARGET_DESIGNATOR,
} from '../unit-traits.js';
import {SIZE_MEDIUM} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';

export const SUPPORT_VEHICLE_SQUADRON = 'SUPPORT_VEHICLE_SQUADRON';

const baseStats = {
    move: 8,
    armor: 2,
    structure: 2,
};

export const SUPPORT_VEHICLE_SQUADRON_DATA = {
    [[SUPPORT_VEHICLE_SQUADRON]]: {
        display_name: 'Support Vehicle Squadron',
        size_id: SIZE_MEDIUM,
        cost: 20,
        max_duplicate_vehicles: 2,
        max_vehicles: 4,
        vehicles: makeStaticListIds({
            RECON_VEHICLE: {
                ...baseStats,
                display_name: 'Recon Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                traits: [
                    trait(TRAIT_TARGET_DESIGNATOR),
                    trait(TRAIT_OUTRIDER),
                ],
            },
            COMMAND_VEHICLE: {
                ...baseStats,
                display_name: 'Command Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                traits: [
                    trait(TRAIT_SUPPORT_ORDER_CNC),
                ],
            },
            RESUPPLY_VEHICLE: {
                ...baseStats,
                display_name: 'Resupply Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                traits: [
                    trait(TRAIT_SUPPORT_ORDER_COMBAT_SUPPLIES),
                ],
            },
            TARGETING_VEHICLE: {
                ...baseStats,
                display_name: 'Targeting Support Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                traits: [
                    trait(TRAIT_SUPPORT_GUIDANCE_SUITE),
                ],
            },
            MINELAYER_VEHICLE: {
                ...baseStats,
                display_name: 'Minelayer',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                traits: [
                    trait(TRAIT_SUPPORT_MINE_DRONE_LAYER, 4),
                ],
            },
            SCRAMBLER_VEHICLE: {
                ...baseStats,
                display_name: 'Scrambler Projector Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                ],
                traits: [
                    trait(TRAIT_SUPPORT_MINE_DRONE_LAYER, 4),
                ],
            },
        }),
    },
};