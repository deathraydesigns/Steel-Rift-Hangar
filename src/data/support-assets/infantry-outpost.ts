import { makeStaticListIds, trait } from '../data-helpers';
import { INFANTRY } from '../infantry-squads';
import { SIZE, UNIT_SIZES } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

export const INFANTRY_OUTPOST_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.FORTIFICATION,
    size_id: SIZE.ULTRA,
    display_name: 'Infantry Outpost',
    cost: 10,
    max_vehicles: 2,
    all_vehicle_must_be_the_same: true,
    defense: 6,
    traits: [
        trait(UNIT_TRAIT.AUXILIARY_UNIT, UNIT_SIZES[SIZE.ULTRA].display_name),
        trait(UNIT_TRAIT.ASSET_COMMAND),
        trait(UNIT_TRAIT.FORTIFICATION),
        trait(UNIT_TRAIT.GARRISON, 6, 'Infantry Squads'),
        trait(UNIT_TRAIT.MINELAYER, 'ENGAGE', 3),
    ],
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        BUNKER: {
            display_name: 'Bunker',
            armor: 2,
            structure: 8,
            move: 0,
            jump: 0,
            weapon_choice_ids: {
                choice_1: [
                    UNIT_WEAPON.BUNKER_AUTO_CANNON,
                    UNIT_WEAPON.BUNKER_MISSILE_PACK,
                    UNIT_WEAPON.BUNKER_ROCKET_PACK,
                ],
            },
            garrison_choice_unit_ids: [
                INFANTRY.RIFLE_SQUAD,
                INFANTRY.ANTI_TANK_SQUAD,
                INFANTRY.RECON_SQUAD,
                INFANTRY.ENGINEER_SQUAD,
            ],
            garrison_unit_traits: [
                trait(UNIT_TRAIT.SQUADRON),
                trait(UNIT_TRAIT.ALL_TERRAIN),
            ],
        },
    }),
};