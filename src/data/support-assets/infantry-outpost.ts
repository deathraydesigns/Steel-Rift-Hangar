import { makeStaticListIds, trait } from '../data-helpers';
import {
    INFANTRY_ANTI_TANK_SQUAD,
    INFANTRY_ENGINEER_SQUAD,
    INFANTRY_RECON_SQUAD,
    INFANTRY_RIFLE_SQUAD,
} from '../infantry-squads';
import { SIZE } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { TYPE_FORTIFICATION } from '../unit-types';
import { BUNKER_AUTO_CANNON, BUNKER_MISSILE_PACK, BUNKER_ROCKET_PACK } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

export const INFANTRY_OUTPOST = 'INFANTRY_OUTPOST' as const;

export const INFANTRY_OUTPOST_DATA: Record<string, Omit<SupportAssetUnitDef, 'id'>> = {
    [INFANTRY_OUTPOST]: {
        unit_type_id: TYPE_FORTIFICATION,
        size_id: SIZE.ULTRA,
        display_name: 'Infantry Outpost',
        cost: 10,
        max_vehicles: 2,
        all_vehicle_must_be_the_same: true,
        defense: 6,
        traits: [
            trait(UNIT_TRAIT.UNIT_SIZE_AND_TYPE, undefined, 'Fortification'),
            trait(UNIT_TRAIT.GROUP_COMMAND),
        ],
        vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
            BUNKER: {
                display_name: 'Bunker',
                armor: 0,
                structure: 10,
                move: 0,
                weapon_choice_ids: {
                    choice_1: [
                        BUNKER_AUTO_CANNON,
                        BUNKER_MISSILE_PACK,
                        BUNKER_ROCKET_PACK,
                    ],
                },
                traits: [
                    trait(UNIT_TRAIT.GARRISON, 6, 'Infantry Squads'),
                    trait(UNIT_TRAIT.BUNKER_MINE_DRONES, 2),
                ],
                garrison_choice_unit_ids: [
                    INFANTRY_RIFLE_SQUAD,
                    INFANTRY_ANTI_TANK_SQUAD,
                    INFANTRY_RECON_SQUAD,
                    INFANTRY_ENGINEER_SQUAD,
                ],
                garrison_unit_traits: [
                    trait(UNIT_TRAIT.SQUADRON),
                    trait(UNIT_TRAIT.ALL_TERRAIN),
                ],
            },
        }),
    },
};