import type { Trait } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import { getRangeFromShortTrait } from './mech-weapons';
import { WEAPON_TRAIT } from './weapon-traits';

export enum UNIT_WEAPON {
    VEH_AUTO_CANNON = 'VEH_AUTO_CANNON',
    VEH_LAS_AUTO_CANNON = 'VEH_LES_AUTO_CANNON',
    UL_AUTO_CANNON = 'UL_AUTO_CANNON',
    BUNKER_AUTO_CANNON = 'BUNKER_AUTO_CANNON',
    TANK_AUTOCANNON = 'TANK_AUTOCANNON',
    AA_ARRAY = 'AA_ARRAY',
    DOZER_BLADE = 'DOZER_BLADE',
    VEH_HOWITZER = 'VEH_HOWITZER',
    HEAVY_INCINERATORS = 'HEAVY_INCINERATORS',
    MISSILE_PACK = 'MISSILE_PACK',
    VEH_SUBMUNITIONS = 'VEH_SUBMUNITIONS',
    VEH_ROTARY_CANNON = 'VEH_ROTARY_CANNON',
    VEH_AGM_MISSILES = 'VEH_AGM_MISSILES',
    VEH_BARRAGE_ROCKETS = 'VEH_BARRAGE_ROCKETS',
    TANK_LASER = 'TANK_LASER',
    VEH_ROCKET_PACK = 'VEH_ROCKET_PACK',
    TANK_MISSILES = 'TANK_MISSILES',
    TANK_HOWITZER = 'TANK_HOWITZER',
    MISSILE_POD = 'MISSILE_POD',
    CLUSTER_ROCKETS = 'CLUSTER_ROCKETS',
    UL_MELEE_WEAPON = 'UL_MELEE_WEAPON',
    UL_GRENADES = 'UL_GRENADES',
    UL_INCINERATORS = 'UL_INCINERATORS',
    SHORT_RANGE_MISSILE_PACK = 'SHORT_RANGE_MISSILE_PACK',
    UL_ROCKET_PACK = 'UL_ROCKET_PACK',
    INFANTRY_RIFLES = 'INFANTRY_RIFLES',
    INFANTRY_MISSILE_LAUNCHER = 'INFANTRY_MISSILE_LAUNCHER',
    BUNKER_MISSILE_PACK = 'BUNKER_MISSILE_PACK',
    BUNKER_ROCKET_PACK = 'BUNKER_ROCKET_PACK',
    INFANTRY_ELECTRO_ARC_PULSERS = 'INFANTRY_ELECTRO_ARC_PULSERS',
    INFANTRY_HEAVY_MISSILE_LAUNCHER = 'INFANTRY_HEAVY_MISSILE_LAUNCHER',
    INFANTRY_HEAVY_RIFLES = 'INFANTRY_HEAVY_RIFLES',
}

export interface UnitWeapon {
    id: UNIT_WEAPON,
    display_name: string;
    range: number;
    damage: number | null;
    traits: Trait<WEAPON_TRAIT>[];
}

type UnitWeaponInput = Omit<UnitWeapon, 'range'>

export const UNIT_WEAPONS = makeFrozenStaticListIds<UnitWeaponInput>({
    [UNIT_WEAPON.VEH_AUTO_CANNON]: makeWeapon({
        display_name: 'Veh. Auto-Cannon',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.KINETIC),
        ],
    }),
    [UNIT_WEAPON.VEH_LAS_AUTO_CANNON]: makeWeapon({
        display_name: 'Veh. Auto-Cannon',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.KINETIC, 'UL'),
        ],
    }),
    [UNIT_WEAPON.BUNKER_AUTO_CANNON]: makeWeapon({
        display_name: 'Auto-Cannon',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 12),
            trait(WEAPON_TRAIT.KINETIC),
        ],
    }),
    [UNIT_WEAPON.TANK_AUTOCANNON]: makeWeapon({
        display_name: 'Tank Auto-Cannon',
        damage: 4,
        traits: [
            trait(WEAPON_TRAIT.KINETIC),
        ],
    }),
    [UNIT_WEAPON.UL_AUTO_CANNON]: makeWeapon({
        display_name: 'UL Auto-Cannon',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 10),
            trait(WEAPON_TRAIT.KINETIC),
        ],
    }),
    [UNIT_WEAPON.AA_ARRAY]: makeWeapon({
        display_name: 'AA Array',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.FLAK),
            trait(WEAPON_TRAIT.KINETIC),
            trait(WEAPON_TRAIT.ANTI_AIR),
        ],
    }),
    [UNIT_WEAPON.DOZER_BLADE]: makeWeapon({
        display_name: 'Dozer Blade',
        damage: null,
        traits: [
            trait(WEAPON_TRAIT.MELEE, 'X'),
            trait(WEAPON_TRAIT.CONCUSSIVE, 2),
        ],
    }),
    [UNIT_WEAPON.VEH_HOWITZER]: makeWeapon({
        display_name: 'Veh. Howitzer',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.KINETIC, 'M'),
        ],
    }),
    [UNIT_WEAPON.HEAVY_INCINERATORS]: makeWeapon({
        display_name: 'Heavy Incinerators',
        damage: 5,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 8),
            trait(WEAPON_TRAIT.DISRUPTIVE),
            trait(WEAPON_TRAIT.LIGHT),
        ],
    }),
    [UNIT_WEAPON.MISSILE_PACK]: makeWeapon({
        display_name: 'Missile Pack',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.LIMITED, 3),
        ],
    }),
    [UNIT_WEAPON.BUNKER_MISSILE_PACK]: makeWeapon({
        display_name: 'Missile Pack',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.LIMITED, 3),
        ],
    }),
    [UNIT_WEAPON.VEH_SUBMUNITIONS]: makeWeapon({
        display_name: 'Submunitions',
        damage: 1,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 6),
            trait(WEAPON_TRAIT.FLAK),
        ],
    }),
    [UNIT_WEAPON.VEH_ROTARY_CANNON]: makeWeapon({
        display_name: 'Rotary Cannon',
        damage: 5,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 12),
            trait(WEAPON_TRAIT.LIGHT),
        ],
    }),
    [UNIT_WEAPON.VEH_AGM_MISSILES]: makeWeapon({
        display_name: 'AGM Missiles',
        damage: 5,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 18),
            trait(WEAPON_TRAIT.LIMITED, 2),
        ],
    }),
    [UNIT_WEAPON.VEH_BARRAGE_ROCKETS]: makeWeapon({
        display_name: 'Barrage Rockets',
        damage: 7,
        traits: [
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.LIMITED, 2),
        ],
    }),
    [UNIT_WEAPON.TANK_LASER]: makeWeapon({
        display_name: 'Tank Laser',
        damage: 4,
        traits: [
            trait(WEAPON_TRAIT.AP, 1),
        ],
    }),
    [UNIT_WEAPON.TANK_MISSILES]: makeWeapon({
        display_name: 'Tank Missiles',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.LIMITED, 3),
        ],
    }),
    [UNIT_WEAPON.TANK_HOWITZER]: makeWeapon({
        display_name: 'Tank Howitzer',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.KINETIC),
        ],
    }),
    [UNIT_WEAPON.VEH_ROCKET_PACK]: makeWeapon({
        display_name: 'Veh. Rocket Pack',
        damage: 4,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.LIMITED, 2),
        ],
    }),
    [UNIT_WEAPON.BUNKER_ROCKET_PACK]: makeWeapon({
        display_name: 'Rocket Pack',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.LIMITED, 3),
        ],
    }),
    [UNIT_WEAPON.MISSILE_POD]: makeWeapon({
        display_name: 'Missile Pod',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.SHORT, 12),
            trait(WEAPON_TRAIT.LIMITED, 2),
        ],
    }),
    [UNIT_WEAPON.CLUSTER_ROCKETS]: makeWeapon({
        display_name: 'Cluster Rockets',
        damage: 4,
        traits: [
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.LIMITED, 2),
        ],
    }),
    [UNIT_WEAPON.UL_MELEE_WEAPON]: makeWeapon({
        display_name: 'UL Melee Weapon',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.MELEE, 'X'),
            trait(WEAPON_TRAIT.AP, 'X'),
        ],
    }),
    [UNIT_WEAPON.UL_GRENADES]: makeWeapon({
        display_name: 'UL Grenades',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 6),
            trait(WEAPON_TRAIT.BLAST, 2),
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.LIMITED, 1),
        ],
    }),
    [UNIT_WEAPON.UL_INCINERATORS]: makeWeapon({
        display_name: 'UL Incinerators',
        damage: 4,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 4),
            trait(WEAPON_TRAIT.DISRUPTIVE),
            trait(WEAPON_TRAIT.LIGHT),
        ],
    }),
    [UNIT_WEAPON.SHORT_RANGE_MISSILE_PACK]: makeWeapon({
        display_name: 'Short Range Missile Pack',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.LIMITED, 2),
            trait(WEAPON_TRAIT.SHORT, 12),
        ],
    }),
    [UNIT_WEAPON.UL_ROCKET_PACK]: makeWeapon({
        display_name: 'Cluster Rockets',
        damage: 5,
        traits: [
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.LIMITED, 2),
            trait(WEAPON_TRAIT.BLAST, 3),
        ],
    }),
    [UNIT_WEAPON.INFANTRY_RIFLES]: makeWeapon({
        display_name: 'Rifles',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 6),
            trait(WEAPON_TRAIT.LIGHT),
        ],
    }),
    [UNIT_WEAPON.INFANTRY_MISSILE_LAUNCHER]: makeWeapon({
        display_name: 'Missile Launcher',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.LIMITED, 2),
            trait(WEAPON_TRAIT.SHORT, 12),
        ],
    }),
    [UNIT_WEAPON.INFANTRY_ELECTRO_ARC_PULSERS]: makeWeapon({
        display_name: 'Electro-Arc Pulser',
        damage: 1,
        traits: [
            trait(WEAPON_TRAIT.STAGGER),
            trait(WEAPON_TRAIT.SHORT, 6),
        ],
    }),
    [UNIT_WEAPON.INFANTRY_HEAVY_MISSILE_LAUNCHER]: makeWeapon({
        display_name: 'Heavy Missile Launcher',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 12),
            trait(WEAPON_TRAIT.LIMITED, 2),
            trait(WEAPON_TRAIT.AP, 2),
        ],
    }),
    [UNIT_WEAPON.INFANTRY_HEAVY_RIFLES]: makeWeapon({
        display_name: 'Heavy Rifles',
        damage: 3,
        traits: [
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.SHORT, 6),
        ],
    }),
});

function makeWeapon(
    {
        display_name,
        damage,
        traits,
    }: Omit<UnitWeaponInput, 'id'>,
) {

    let range = getRangeFromShortTrait(traits);

    return {
        display_name,
        range,
        damage,
        traits,
    };
}