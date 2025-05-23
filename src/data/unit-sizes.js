import {listToDropDown, makeFrozenStaticListIds} from './data-helpers.js';

export const SIZE_ULTRA_LIGHT = 'SIZE_ULTRA_LIGHT';

export const SIZE_LIGHT = 'SIZE_LIGHT';
export const SIZE_MEDIUM = 'SIZE_MEDIUM';
export const SIZE_HEAVY = 'SIZE_HEAVY';
export const SIZE_ULTRA = 'SIZE_ULTRA';

export const UNIT_SIZES = makeFrozenStaticListIds({
    [[SIZE_ULTRA_LIGHT]]: {
        display_name: 'Ultra Light',
    },
    [[SIZE_LIGHT]]: {
        display_name: 'Light',
    },
    [[SIZE_MEDIUM]]: {
        display_name: 'Medium',
    },
    [[SIZE_HEAVY]]: {
        display_name: 'Heavy',
    },
    [[SIZE_ULTRA]]: {
        display_name: 'Ultra',
    },
});

export const MECH_SIZES = makeFrozenStaticListIds({
    [[SIZE_LIGHT]]: {
        display_name: UNIT_SIZES[SIZE_LIGHT].display_name,
        armor: 6,
        structure: 4,
        max_slots: 4,
        max_tons: 20,
        move: 12,
        jump: 10,
        defense: 3,
        smash_damage: 3,
    },
    [[SIZE_MEDIUM]]: {
        display_name: UNIT_SIZES[SIZE_MEDIUM].display_name,
        armor: 8,
        structure: 6,
        max_slots: 5,
        max_tons: 30,
        move: 10,
        jump: 8,
        defense: 4,
        smash_damage: 4,
    },
    [[SIZE_HEAVY]]: {
        display_name: UNIT_SIZES[SIZE_HEAVY].display_name,
        armor: 10,
        structure: 8,
        max_slots: 6,
        max_tons: 40,
        move: 8,
        jump: 6,
        defense: 5,
        smash_damage: 5,
    },
    [[SIZE_ULTRA]]: {
        display_name: UNIT_SIZES[SIZE_ULTRA].display_name,
        armor: 12,
        structure: 10,
        max_slots: 7,
        max_tons: 50,
        move: 6,
        jump: 4,
        defense: 6,
        smash_damage: 6,
    },
});

export function getUnitSize(sizeId) {
    return Object.assign({}, UNIT_SIZES[sizeId]);
}

export const MECH_SIZES_DROP_DOWN = listToDropDown(MECH_SIZES);