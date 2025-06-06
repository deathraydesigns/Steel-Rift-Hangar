import {makeFrozenStaticListIds} from './data-helpers.js';
import {ORDER_HUNKER_DOWN, ORDER_PLOW_THROUGH} from './orders/mobility-orders.js';

export const MOBILITY_BI_PEDAL = 'MOBILITY_BI_PEDAL';
export const MOBILITY_TRACKED = 'MOBILITY_TRACKED';
export const MOBILITY_MULTI_LIMB = 'MOBILITY_MULTI_LIMB';

export const MECH_MOBILITIES = makeFrozenStaticListIds({
    [[MOBILITY_BI_PEDAL]]: {
        display_name: 'Bi-Pedal',
        description: null,
        slots: 0,
        granted_order_ids: [],
    },
    [[MOBILITY_TRACKED]]: {
        display_name: 'Tracked',
        slots: 1,
        granted_order_ids: [ORDER_PLOW_THROUGH],
    },
    [[MOBILITY_MULTI_LIMB]]: {
        display_name: 'Multi-Limb',
        slots: 0,
        granted_order_ids: [ORDER_HUNKER_DOWN],
    },
});
