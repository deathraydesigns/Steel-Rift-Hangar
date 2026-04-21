import { makeFrozenStaticListIds } from './data-helpers';

export enum SIZE {
    ULTRA_LIGHT = 'SIZE_ULTRA_LIGHT',
    LIGHT = 'SIZE_LIGHT',
    MEDIUM = 'SIZE_MEDIUM',
    HEAVY = 'SIZE_HEAVY',
    ULTRA = 'SIZE_ULTRA',
}

export interface UnitSize {
    id: SIZE;
    display_name: string;
}

export const UNIT_SIZES = makeFrozenStaticListIds<UnitSize>({
    [SIZE.ULTRA_LIGHT]: {
        display_name: 'Ultra Light',
    },
    [SIZE.LIGHT]: {
        display_name: 'Light',
    },
    [SIZE.MEDIUM]: {
        display_name: 'Medium',
    },
    [SIZE.HEAVY]: {
        display_name: 'Heavy',
    },
    [SIZE.ULTRA]: {
        display_name: 'Ultra',
    },
});

export interface MechSize {
    id: MechSizeId,
    display_name: string,
    armor: number,
    structure: number,
    max_slots: number,
    max_tons: number,
    move: number,
    jump: number,
    defense: number,
    smash_damage: number,
    max_armor_upgrades: number,
}

export const MECH_SIZES = makeFrozenStaticListIds<MechSize>({
    [SIZE.LIGHT]: {
        display_name: UNIT_SIZES[SIZE.LIGHT].display_name,
        armor: 6,
        structure: 4,
        max_slots: 4,
        max_tons: 20,
        move: 12,
        jump: 10,
        defense: 3,
        smash_damage: 3,
        max_armor_upgrades: 1,
    },
    [SIZE.MEDIUM]: {
        display_name: UNIT_SIZES[SIZE.MEDIUM].display_name,
        armor: 8,
        structure: 6,
        max_slots: 5,
        max_tons: 30,
        move: 10,
        jump: 8,
        defense: 4,
        smash_damage: 4,
        max_armor_upgrades: 1,
    },
    [SIZE.HEAVY]: {
        display_name: UNIT_SIZES[SIZE.HEAVY].display_name,
        armor: 10,
        structure: 8,
        max_slots: 6,
        max_tons: 40,
        move: 8,
        jump: 6,
        defense: 5,
        smash_damage: 5,
        max_armor_upgrades: 1,
    },
    [SIZE.ULTRA]: {
        display_name: UNIT_SIZES[SIZE.ULTRA].display_name,
        armor: 12,
        structure: 10,
        max_slots: 7,
        max_tons: 50,
        move: 6,
        jump: 4,
        defense: 6,
        smash_damage: 6,
        max_armor_upgrades: 2,
    },
});

export type MechSizeId =
    | SIZE.LIGHT
    | SIZE.MEDIUM
    | SIZE.HEAVY
    | SIZE.ULTRA