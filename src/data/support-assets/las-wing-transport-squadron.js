import {VEH_ROTARY_CANNON} from '../unit-weapons.js';
import {trait} from '../weapon-traits.js';
import {TRAIT_GARRISON, TRAIT_GROUP_COMMAND} from '../unit-traits.js';
import {SIZE_LIGHT} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';
import {
    INFANTRY_ANTI_TANK_SQUAD,
    INFANTRY_ARC_SUIT_SQUAD,
    INFANTRY_REAPER_SUIT_SQUAD,
    INFANTRY_RECON_SQUAD,
    INFANTRY_RIFLE_SQUAD,
    INFANTRY_VIPER_SUIT_SQUAD,
} from '../infantry-squads.js';

export const LAS_WING_TRANSPORT_SQUADRON = 'LAS_WING_TRANSPORT_SQUADRON';

const baseStats = {
    move: 12,
    armor: 3,
    structure: 0,
};

export const LAS_WING_TRANSPORT_SQUADRON_DATA = {
    [[LAS_WING_TRANSPORT_SQUADRON]]: {
        size_id: SIZE_LIGHT,
        display_name: 'LAS-Wing Transport Squadron',
        attached_element_label: 'Vehicle',
        cost: 10,
        max_vehicles: 1,
        vehicles: makeStaticListIds({
            INFANTRY_AIR_TRANSPORT: {
                ...baseStats,
                display_name: 'Infantry Air Transport',
                weapon_ids: [
                    VEH_ROTARY_CANNON,
                ],
                traits: [
                    trait(TRAIT_GROUP_COMMAND),
                    trait(TRAIT_GARRISON, 3, 'Air Infantry Squads'),
                ],
                garrison_choice_unit_ids: [
                    INFANTRY_RIFLE_SQUAD,
                    INFANTRY_ANTI_TANK_SQUAD,
                    INFANTRY_RECON_SQUAD,
                ],
            },
            POWER_SUIT_AIR_TRANSPORT: {
                ...baseStats,
                display_name: 'Power Suit Air Transport',
                weapon_ids: [
                    VEH_ROTARY_CANNON,
                ],
                traits: [
                    trait(TRAIT_GROUP_COMMAND),
                    trait(TRAIT_GARRISON, 2, 'Power Suit Squads'),
                ],
                garrison_choice_unit_ids: [
                    INFANTRY_ARC_SUIT_SQUAD,
                    INFANTRY_REAPER_SUIT_SQUAD,
                    INFANTRY_VIPER_SUIT_SQUAD,
                ],
            },

        }),
    },
};

export const UL_HEV_AIR_TRANSPORT_DEFINITION = {
    ...baseStats,
    display_name: 'UL HE-V Air Transport',
    weapon_ids: [
        VEH_ROTARY_CANNON,
    ],
    traits: [
        trait(TRAIT_GROUP_COMMAND),
        trait(TRAIT_GARRISON, 3, 'UL HE-Vs'),
    ],
};