import {BUNKER_AUTO_CANNON, BUNKER_MISSILE_PACK, BUNKER_ROCKET_PACK} from '../unit-weapons.js';
import {trait} from '../weapon-traits.js';
import {TRAIT_BUNKER_MINE_DRONES, TRAIT_FORTIFICATION, TRAIT_GARRISON} from '../unit-traits.js';
import {SIZE_LIGHT} from '../unit-sizes.js';
import {makeStaticListIds} from '../data-helpers.js';
import {
    INFANTRY_ANTI_TANK_SQUAD,
    INFANTRY_ENGINEER_SQUAD,
    INFANTRY_RECON_SQUAD,
    INFANTRY_RIFLE_SQUAD,
} from '../infantry-squads.js';

export const INFANTRY_OUTPOST = 'INFANTRY_OUTPOST';

export const INFANTRY_OUTPOST_DATA = {
    [[INFANTRY_OUTPOST]]: {
        size_id: SIZE_LIGHT,
        display_name: 'Infantry Outpost',
        attached_element_label: 'Building',
        cost: 10,
        max_vehicles: 2,
        all_vehicle_must_be_the_same: true,
        vehicles: makeStaticListIds({
            BUNKER: {
                display_name: 'Bunker',
                armor: 0,
                structure: 10,
                weapon_choice_ids: {
                    choice_1: [
                        BUNKER_AUTO_CANNON,
                        BUNKER_MISSILE_PACK,
                        BUNKER_ROCKET_PACK,
                    ],
                },
                traits: [
                    trait(TRAIT_FORTIFICATION),
                    trait(TRAIT_GARRISON, 6, 'Infantry Squads'),
                    trait(TRAIT_BUNKER_MINE_DRONES, 2),
                ],
                garrison_choice_unit_ids: [
                    INFANTRY_RIFLE_SQUAD,
                    INFANTRY_ANTI_TANK_SQUAD,
                    INFANTRY_RECON_SQUAD,
                    INFANTRY_ENGINEER_SQUAD,
                ],
            },
        }),
        infantry_squads: makeStaticListIds({}),
    },
};