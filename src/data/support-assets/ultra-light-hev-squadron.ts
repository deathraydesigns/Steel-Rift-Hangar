import { makeStaticListIds, trait } from '../data-helpers';
import { SIZE } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef, UpgradePod } from './_support-asset-types';

export const ULTRA_LIGHT_HEV_SQUADRON = 'ULTRA_LIGHT_HEV_SQUADRON' as const;

const baseStats = {
    armor: 3,
    structure: 0,
};

export const POD_MISSILE_PACK = 'POD_MISSILE_PACK' as const;
export const POD_ROCKET_PACK = 'POD_ROCKET_PACK' as const;
export const POD_LAUNCH_GEAR = 'POD_LAUNCH_GEAR' as const;

export type UpgradePodId =
    | typeof POD_MISSILE_PACK
    | typeof POD_ROCKET_PACK
    | typeof POD_LAUNCH_GEAR

export const ULTRA_LIGHT_HEV_SQUADRON_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.HEV,
    size_id: SIZE.ULTRA_LIGHT,
    display_name: 'Ultra-Light HE-V Squadron',
    cost: 10,
    max_vehicles: 3,
    defense: 2,
    traits: [
        trait(UNIT_TRAIT.UNIT_SIZE_AND_TYPE, undefined, 'UL HE-V'),
        trait(UNIT_TRAIT.SQUADRON),
        trait(UNIT_TRAIT.CLOSE_SUPPORT),
        trait(UNIT_TRAIT.ALL_TERRAIN),
    ],
    upgrade_pods: makeStaticListIds<UpgradePod>({
        [POD_MISSILE_PACK]: {
            weapon_id: UNIT_WEAPON.SHORT_RANGE_MISSILE_PACK,
        },
        [POD_ROCKET_PACK]: {
            weapon_id: UNIT_WEAPON.UL_ROCKET_PACK,
        },
        [POD_LAUNCH_GEAR]: {
            trait: trait(UNIT_TRAIT.UL_HEV_LAUNCH_GEAR),
        },
    }),
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        BRAWLER: {
            move: 7,
            jump: 0,
            ...baseStats,
            display_name: 'Brawler',
            weapon_ids: [
                UNIT_WEAPON.VEH_SUBMUNITIONS,
                UNIT_WEAPON.UL_MELEE_WEAPON,
            ],
            traits: [
                trait(UNIT_TRAIT.MAGNETIC_GRAPPLES),
            ],
        },
        PYRO: {
            move: 6,
            jump: 0,
            ...baseStats,
            display_name: 'Pyro',
            weapon_ids: [
                UNIT_WEAPON.UL_INCINERATORS,
                UNIT_WEAPON.VEH_SUBMUNITIONS,
            ],
            traits: [
                trait(UNIT_TRAIT.INFERNO_GEAR),
            ],
        },
        COMMANDO: {
            move: 7,
            jump: 0,
            ...baseStats,
            display_name: 'Commando',
            weapon_ids: [
                UNIT_WEAPON.VEH_SUBMUNITIONS,
            ],
            traits: [
                trait(UNIT_TRAIT.SCRAMBLERS),
                trait(UNIT_TRAIT.TARGET_DESIGNATOR),
            ],
        },
        RIFLEMAN: {
            move: 6,
            jump: 0,
            ...baseStats,
            display_name: 'Rifleman',
            weapon_ids: [
                UNIT_WEAPON.UL_AUTO_CANNON,
                UNIT_WEAPON.UL_GRENADES,
            ],
            traits: [
                trait(UNIT_TRAIT.SUPPRESSIVE_FIRE),
            ],
        },
    }),
};