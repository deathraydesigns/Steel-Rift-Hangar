import {
    trait,
    TRAIT_AP,
    TRAIT_BLAST,
    TRAIT_CONCUSSIVE,
    TRAIT_DISRUPTIVE,
    TRAIT_FLAK,
    TRAIT_KINETIC,
    TRAIT_LIGHT,
    TRAIT_LIMITED,
    TRAIT_MELEE,
    TRAIT_SHORT,
    TRAIT_SMART, TRAIT_STAGGER,
} from './weapon-traits.js';
import {makeFrozenStaticListIds} from './data-helpers.js';
import {getRangeFromShortTrait} from './mech-weapons.js';

export const VEH_AUTO_CANNON = 'VEH_AUTO_CANNON';
export const VEH_LES_AUTO_CANNON = 'VEH_LES_AUTO_CANNON';
export const AA_ARRAY = 'AA_ARRAY';
export const DOZER_BLADE = 'DOZER_BLADE';
export const VEH_HOWITZER = 'VEH_HOWITZER';
export const HEAVY_INCINERATORS = 'HEAVY_INCINERATORS';
export const MISSILE_PACK = 'MISSILE_PACK';
export const VEH_SUBMUNITIONS = 'VEH_SUBMUNITIONS';
export const VEH_ROTARY_CANNON = 'VEH_ROTARY_CANNON';
export const VEH_AGM_MISSILES = 'VEH_AGM_MISSILES';
export const VEH_BARRAGE_ROCKETS = 'VEH_BARRAGE_ROCKETS';
export const TANK_LASER = 'TANK_LASER';
export const TANK_AUTOCANNON = 'TANK_AUTOCANNON';
export const VEH_ROCKET_PACK = 'VEH_ROCKET_PACK';
export const TANK_MISSILES = 'TANK_MISSILES';
export const TANK_HOWITZER = 'TANK_HOWITZER';
export const MISSILE_POD = 'MISSILE_POD';
export const CLUSTER_ROCKETS = 'CLUSTER_ROCKETS';
export const UL_MELEE_WEAPON = 'UL_MELEE_WEAPON';
export const UL_AUTO_CANNON = 'UL_AUTO_CANNON';
export const UL_GRENADES = 'UL_GRENADES';
export const UL_INCINERATORS = 'UL_INCINERATORS';
export const SHORT_RANGE_MISSILE_PACK = 'SHORT_RANGE_MISSILE_PACK';
export const UL_ROCKET_PACK = 'UL_ROCKET_PACK';
export const INFANTRY_RIFLES = 'INFANTRY_RIFLES';
export const INFANTRY_MISSILE_LAUNCHER = 'INFANTRY_MISSILE_LAUNCHER';
export const BUNKER_AUTO_CANNON = 'BUNKER_AUTO_CANNON';
export const BUNKER_MISSILE_PACK = 'BUNKER_MISSILE_PACK';
export const BUNKER_ROCKET_PACK = 'BUNKER_ROCKET_PACK';
export const INFANTRY_ELECTRO_ARC_PULSERS = 'INFANTRY_ELECTRO_ARC_PULSERS';
export const INFANTRY_HEAVY_MISSILE_LAUNCHER = 'INFANTRY_HEAVY_MISSILE_LAUNCHER';
export const INFANTRY_HEAVY_RIFLES = 'INFANTRY_HEAVY_RIFLES';

export const VEHICLE_WEAPONS = makeFrozenStaticListIds({
    [[VEH_AUTO_CANNON]]: makeWeapon({
        display_name: 'Veh. Auto-Cannon',
        damage: 2,
        traits: [
            trait(TRAIT_KINETIC),
        ],
    }),
    [[VEH_LES_AUTO_CANNON]]: makeWeapon({
        display_name: 'Veh. Auto-Cannon',
        damage: 2,
        traits: [
            trait(TRAIT_KINETIC, 'UL'),
        ],
    }),
    [[BUNKER_AUTO_CANNON]]: makeWeapon({
        display_name: 'Auto-Cannon',
        damage: 2,
        traits: [
            trait(TRAIT_SHORT, 12),
            trait(TRAIT_KINETIC),
        ],
    }),
    [[AA_ARRAY]]: makeWeapon({
        display_name: 'AA Array',
        damage: 2,
        traits: [
            trait(TRAIT_LIGHT),
            trait(TRAIT_FLAK),
            trait(TRAIT_KINETIC),
        ],
    }),
    [[DOZER_BLADE]]: makeWeapon({
        display_name: 'Dozer Blade',
        damage: null,
        traits: [
            trait(TRAIT_MELEE, 'X'),
            trait(TRAIT_CONCUSSIVE, 2),
        ],
    }),
    [[VEH_HOWITZER]]: makeWeapon({
        display_name: 'Veh. Howitzer',
        damage: 3,
        traits: [
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_KINETIC, 'M'),
        ],
    }),
    [[HEAVY_INCINERATORS]]: makeWeapon({
        display_name: 'Heavy Incinerators',
        damage: 5,
        traits: [
            trait(TRAIT_SHORT, 8),
            trait(TRAIT_DISRUPTIVE),
            trait(TRAIT_LIGHT),
        ],
    }),
    [[MISSILE_PACK]]: makeWeapon({
        display_name: 'Missile Pack',
        damage: 3,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_LIMITED, 3),
        ],
    }),
    [[BUNKER_MISSILE_PACK]]: makeWeapon({
        display_name: 'Missile Pack',
        damage: 3,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_LIMITED, 3),
        ],
    }),
    [[VEH_SUBMUNITIONS]]: makeWeapon({
        display_name: 'Submunitions',
        damage: 1,
        traits: [
            trait(TRAIT_SHORT, 6),
            trait(TRAIT_FLAK),
        ],
    }),
    [[VEH_ROTARY_CANNON]]: makeWeapon({
        display_name: 'Rotary Cannon',
        damage: 5,
        traits: [
            trait(TRAIT_SHORT, 12),
            trait(TRAIT_LIGHT),
        ],
    }),
    [[VEH_AGM_MISSILES]]: makeWeapon({
        display_name: 'AGM Missiles',
        damage: 5,
        traits: [
            trait(TRAIT_SHORT, 18),
            trait(TRAIT_LIMITED, 2),
        ],
    }),
    [[VEH_BARRAGE_ROCKETS]]: makeWeapon({
        display_name: 'Barrage Rockets',
        damage: 7,
        traits: [
            trait(TRAIT_LIGHT),
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_LIMITED, 2),
        ],
    }),
    [[TANK_LASER]]: makeWeapon({
        display_name: 'Tank Laser',
        damage: 4,
        traits: [
            trait(TRAIT_AP, 1),
        ],
    }),
    [[TANK_AUTOCANNON]]: makeWeapon({
        display_name: 'Tank Auto-Cannon',
        damage: 4,
        traits: [
            trait(TRAIT_KINETIC),
        ],
    }),
    [[TANK_MISSILES]]: makeWeapon({
        display_name: 'Tank Missiles',
        damage: 4,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_LIMITED, 2),
        ],
    }),
    [[TANK_HOWITZER]]: makeWeapon({
        display_name: 'Tank Howitzer',
        damage: 4,
        traits: [
            trait(TRAIT_BLAST, 2),
            trait(TRAIT_KINETIC),
        ],
    }),
    [[VEH_ROCKET_PACK]]: makeWeapon({
        display_name: 'Veh. Rocket Pack',
        damage: 4,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_LIMITED, 2),
        ],
    }),
    [[BUNKER_ROCKET_PACK]]: makeWeapon({
        display_name: 'Rocket Pack',
        damage: 3,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_LIMITED, 2),
        ],
    }),
    [[MISSILE_POD]]: makeWeapon({
        display_name: 'Missile Pod',
        damage: 2,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_SHORT, 12),
            trait(TRAIT_LIMITED, 2),
        ],
    }),
    [[CLUSTER_ROCKETS]]: makeWeapon({
        display_name: 'Cluster Rockets',
        damage: 3,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_LIGHT),
            trait(TRAIT_LIMITED, 2),
        ],
    }),
    [[UL_MELEE_WEAPON]]: makeWeapon({
        display_name: 'UL Melee Weapon',
        damage: 3,
        traits: [
            trait(TRAIT_MELEE, 'X'),
            trait(TRAIT_AP, 'X'),
        ],
    }),
    [[UL_AUTO_CANNON]]: makeWeapon({
        display_name: 'UL Auto-Cannon',
        damage: 2,
        traits: [
            trait(TRAIT_SHORT, 10),
            trait(TRAIT_KINETIC),
        ],
    }),
    [[UL_GRENADES]]: makeWeapon({
        display_name: 'UL Grenades',
        damage: 3,
        traits: [
            trait(TRAIT_SHORT, 6),
            trait(TRAIT_BLAST, 2),
            trait(TRAIT_LIGHT),
            trait(TRAIT_LIMITED, 1),
        ],
    }),
    [[UL_INCINERATORS]]: makeWeapon({
        display_name: 'UL Incinerators',
        damage: 3,
        traits: [
            trait(TRAIT_SHORT, 4),
            trait(TRAIT_DISRUPTIVE),
            trait(TRAIT_LIGHT),
        ],
    }),
    [[SHORT_RANGE_MISSILE_PACK]]: makeWeapon({
        display_name: 'Short Range Missile Pack',
        damage: 3,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_LIMITED, 2),
            trait(TRAIT_SHORT, 12),
        ],
    }),
    [[UL_ROCKET_PACK]]: makeWeapon({
        display_name: 'Rocket Pack',
        damage: 2,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_LIMITED, 2),
            trait(TRAIT_BLAST, 3),
        ],
    }),
    [[INFANTRY_RIFLES]]: makeWeapon({
        display_name: 'Infantry Rifles',
        damage: 2,
        traits: [
            trait(TRAIT_SHORT, 6),
            trait(TRAIT_LIGHT),
        ],
    }),
    [[INFANTRY_MISSILE_LAUNCHER]]: makeWeapon({
        display_name: 'Missile Launcher',
        damage: 2,
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_LIMITED, 2),
            trait(TRAIT_SHORT, 12),
        ],
    }),
    [[INFANTRY_ELECTRO_ARC_PULSERS]]: makeWeapon({
        display_name: 'Electro-Arc Pulser',
        damage: 1,
        traits: [
            trait(TRAIT_STAGGER),
            trait(TRAIT_SHORT, 6),
        ],
    }),
    [[INFANTRY_HEAVY_MISSILE_LAUNCHER]]: makeWeapon({
        display_name: 'Heavy Missile Launcher',
        damage: 2,
        traits: [
            trait(TRAIT_STAGGER),
            trait(TRAIT_SHORT, 12),
            trait(TRAIT_LIMITED, 2),
            trait(TRAIT_AP, 2),
        ],
    }),
    [[INFANTRY_HEAVY_RIFLES]]: makeWeapon({
        display_name: 'Heavy Infantry Rifles',
        damage: 3,
        traits: [
            trait(TRAIT_LIGHT),
            trait(TRAIT_SHORT, 6),
        ],
    }),
});

function makeWeapon({
                        display_name,
                        damage,
                        traits,
                    }) {

    traits = traits || [];

    let range = getRangeFromShortTrait(traits);

    return {
        display_name,
        range,
        damage,
        traits,
    };
}