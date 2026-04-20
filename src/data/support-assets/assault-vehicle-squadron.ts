import { makeStaticListIds, trait } from '../data-helpers';
import {
    INFANTRY_ANTI_TANK_SQUAD,
    INFANTRY_ENGINEER_SQUAD,
    INFANTRY_RECON_SQUAD,
    INFANTRY_RIFLE_SQUAD,
} from '../infantry-squads';
import { SIZE } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { TYPE_VEHICLE } from '../unit-types';
import {
    AA_ARRAY,
    DOZER_BLADE,
    HEAVY_INCINERATORS,
    MISSILE_PACK,
    VEH_AUTO_CANNON,
    VEH_HOWITZER,
    VEH_SUBMUNITIONS,
} from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

export const ASSAULT_VEHICLE_SQUADRON = 'ASSAULT_VEHICLE_SQUADRON' as const;

const baseStats = {
    move: 8,
    armor: 3,
    structure: 2,
};

export const ASSAULT_VEHICLE_SQUADRON_DATA: Record<string, Omit<SupportAssetUnitDef, 'id'>> = {
    [ASSAULT_VEHICLE_SQUADRON]: {
        unit_type_id: TYPE_VEHICLE,
        size_id: SIZE.MEDIUM,
        display_name: 'Assault Vehicle Squadron',
        cost: 20,
        max_vehicles: 4,
        defense: 4,
        traits: [
            trait(UNIT_TRAIT.UNIT_SIZE_AND_TYPE, undefined, 'Medium Vehicle'),
            trait(UNIT_TRAIT.SQUADRON),
            trait(UNIT_TRAIT.ALL_TERRAIN),
        ],
        vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
            NETTER_VEHICLE: {
                ...baseStats,
                display_name: 'Netter Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(UNIT_TRAIT.MAGNETIC_GRAPPLES),
                    trait(UNIT_TRAIT.CLOSE_SUPPORT),
                ],
            },
            DEMOLITION_VEHICLE: {
                ...baseStats,
                display_name: 'Demolition Vehicle',
                weapon_ids: [
                    DOZER_BLADE,
                    HEAVY_INCINERATORS,
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(UNIT_TRAIT.INFERNO_GEAR),
                ],
            },
            INFANTRY_FIGHTING_VEHICLE: {
                ...baseStats,
                display_name: 'Infantry Fighting Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(UNIT_TRAIT.GROUP_COMMAND),
                    trait(UNIT_TRAIT.GARRISON, 3, 'Infantry Squads'),
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
            COMBAT_ENGINEERING_VEHICLE: {
                ...baseStats,
                display_name: 'Combat Engineering Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(UNIT_TRAIT.MINE_SWEEPER),
                ],
            },
            SHIELD_PROJECTOR_VEHICLE: {
                ...baseStats,
                display_name: 'Shield Projector Vehicle',
                weapon_ids: [
                    VEH_SUBMUNITIONS,
                ],
                traits: [
                    trait(UNIT_TRAIT.SHIELD_PROJECTOR),
                ],
            },
            FIRE_SUPPORT_VEHICLE: {
                ...baseStats,
                display_name: 'Fire Support Vehicle',
                weapon_ids: [
                    VEH_AUTO_CANNON,
                    MISSILE_PACK,
                ],
            },
            AA_VEHICLE: {
                ...baseStats,
                display_name: 'Anti-Air Vehicle',
                weapon_ids: [
                    AA_ARRAY,
                ],
            },
            ARTILLERY_VEHICLE: {
                ...baseStats,
                display_name: 'Artillery Vehicle',
                weapon_ids: [
                    VEH_HOWITZER,
                    VEH_SUBMUNITIONS,
                ],
            },
        }),
    },
};