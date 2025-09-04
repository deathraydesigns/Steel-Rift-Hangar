import {makeFrozenStaticListIds} from './data-helpers.js';

export const TYPE_HEV = 'TYPE_HEV';
export const TYPE_VEHICLE = 'TYPE_VEHICLE';
export const TYPE_INFANTRY = 'TYPE_INFANTRY';
export const TYPE_FORTIFICATION = 'TYPE_FORTIFICATION';

export const UNIT_TYPES = makeFrozenStaticListIds({
    [TYPE_HEV]: {
        display_name: 'HE-V',
    },
    [TYPE_VEHICLE]: {
        display_name: 'Vehicle',
    },
    [TYPE_INFANTRY]: {
        display_name: 'Infantry',
    },
    [TYPE_FORTIFICATION]: {
        display_name: 'Fortification',
    },
});