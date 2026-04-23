import { makeStaticListIds, trait } from '../data-helpers';
import { INFANTRY } from '../infantry-squads';
import { SIZE, UNIT_SIZES } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef } from './_support-asset-types';

const baseStats = {
    move: 6,
    jump: 0,
    armor: 8,
    structure: 8,
};

export const HEAVY_TANK_SQUADRON_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.VEHICLE,
    size_id: SIZE.HEAVY,
    display_name: 'Heavy Tank Troop',
    cost: 20,
    max_vehicles: 2,
    defense: 5,
    traits: [
        trait(UNIT_TRAIT.AUXILIARY_UNIT, UNIT_SIZES[SIZE.HEAVY].display_name),
        trait(UNIT_TRAIT.ASSET_COMMAND),
        trait(UNIT_TRAIT.ALL_TERRAIN),
    ],
    vehicles: makeStaticListIds({
        DIRECT_FIRE_TANK: {
            ...baseStats,
            display_name: 'Direct Fire Tank',
            weapon_ids: [
                UNIT_WEAPON.TANK_LASER,
                UNIT_WEAPON.VEH_SUBMUNITIONS,
            ],
            traits: [],
        },
        GENERAL_FIRE_TANK: {
            ...baseStats,
            display_name: 'General Fire Support Tank ',
            weapon_ids: [
                UNIT_WEAPON.TANK_AUTOCANNON,
                UNIT_WEAPON.VEH_ROCKET_PACK,
                UNIT_WEAPON.VEH_SUBMUNITIONS,
            ],
            traits: [],
        },
        MISSILE_BATTERY_TANK: {
            ...baseStats,
            display_name: 'Missile Battery Tank',
            weapon_ids: [
                UNIT_WEAPON.TANK_MISSILES,
                UNIT_WEAPON.TANK_MISSILES,
            ],
            traits: [],
        },
        INFANTRY_ASSAULT_TANK: {
            ...baseStats,
            display_name: 'Infantry Assault Tank',
            weapon_ids: [
                UNIT_WEAPON.TANK_HOWITZER,
                UNIT_WEAPON.VEH_ROTARY_CANNON,
                UNIT_WEAPON.DOZER_BLADE,
                UNIT_WEAPON.VEH_SUBMUNITIONS,
            ],
            traits: [
                trait(UNIT_TRAIT.GARRISON, 4, 'Infantry Squads'),
            ],
            garrison_choice_unit_ids: [
                INFANTRY.RIFLE_SQUAD,
                INFANTRY.ANTI_TANK_SQUAD,
                INFANTRY.RECON_SQUAD,
                INFANTRY.ENGINEER_SQUAD,
            ],
        },
    }),
};
