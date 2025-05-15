import {listToDropDown, makeFrozenStaticListIds} from './data-helpers.js';

export const MOBILITY_BI_PEDAL = 'MOBILITY_BI_PEDAL';
export const MOBILITY_TRACKED = 'MOBILITY_TRACKED';
export const MOBILITY_MULTI_LIMB = 'MOBILITY_MULTI_LIMB';

export const MECH_MOBILITIES = makeFrozenStaticListIds({
    [[MOBILITY_BI_PEDAL]]: {
        display_name: 'Bi-Pedal',
    },
    [[MOBILITY_TRACKED]]: {
        display_name: 'Tracked',
    },
    [[MOBILITY_MULTI_LIMB]]: {
        display_name: 'Multi-Limb',
    },
});

export const MECH_MOBILITIES_DROP_DOWN = listToDropDown(MECH_MOBILITIES);