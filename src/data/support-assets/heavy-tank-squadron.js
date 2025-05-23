import {SIZE_HEAVY} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';
import {
    DOZER_BLADE,
    TANK_AUTOCANNON,
    TANK_HOWITZER,
    TANK_LASER,
    TANK_MISSILES,
    VEH_ROCKET_PACK,
    VEH_ROTARY_CANNON,
    VEH_SUBMUNITIONS,
} from '../unit-weapons.js';
import {SUBMUNITIONS} from '../mech-weapons.js';
import {TRAIT_HEAVY_SUPPORT_ASSET, TRAIT_ALL_TERRAIN, TRAIT_GARRISON, TRAIT_GROUP_COMMAND} from '../unit-traits.js';
import {trait} from '../weapon-traits.js';
import {
    INFANTRY_ANTI_TANK_SQUAD,
    INFANTRY_ENGINEER_SQUAD,
    INFANTRY_RECON_SQUAD,
    INFANTRY_RIFLE_SQUAD,
} from '../infantry-squads.js';
import {TYPE_VEHICLE} from '../unit-types.js';

export const HEAVY_TANK_SQUADRON = 'HEAVY_TANK_SQUADRON';

const baseStats = {
    move: 6,
    armor: 8,
    structure: 8,
};

export const HEAVY_TANK_SQUADRON_DATA = {
    [[HEAVY_TANK_SQUADRON]]: {
        unit_type_id: TYPE_VEHICLE,
        size_id: SIZE_HEAVY,
        display_name: 'Heavy Tank Troop',
        cost: 20,
        max_vehicles: 2,
        traits: [
            trait(TRAIT_HEAVY_SUPPORT_ASSET),
            trait(TRAIT_GROUP_COMMAND),
            trait(TRAIT_ALL_TERRAIN),
        ],
        vehicles: makeStaticListIds({
            DIRECT_FIRE_TANK: {
                ...baseStats,
                display_name: 'Direct Fire Tank',
                weapon_ids: [
                    TANK_LASER,
                    SUBMUNITIONS,
                ],
                traits: [],
            },
            GENERAL_FIRE_TANK: {
                ...baseStats,
                display_name: 'General Fire Support Tank ',
                weapon_ids: [
                    TANK_AUTOCANNON,
                    VEH_ROCKET_PACK,
                    VEH_SUBMUNITIONS,
                ],
                traits: [],
            },
            MISSILE_BATTERY_TANK: {
                ...baseStats,
                display_name: 'Missile Battery Tank',
                weapon_ids: [
                    TANK_MISSILES,
                    TANK_MISSILES,
                ],
                traits: [],
            },
            INFANTRY_ASSAULT_TANK: {
                ...baseStats,
                display_name: 'Infantry Assault Tank',
                weapon_ids: [
                    TANK_HOWITZER,
                    VEH_ROTARY_CANNON,
                    DOZER_BLADE,
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(TRAIT_GARRISON, 4, 'Infantry Squads'),
                ],
                garrison_choice_unit_ids: [
                    INFANTRY_RIFLE_SQUAD,
                    INFANTRY_ANTI_TANK_SQUAD,
                    INFANTRY_RECON_SQUAD,
                    INFANTRY_ENGINEER_SQUAD,
                ],
            },
        }),
    },
};