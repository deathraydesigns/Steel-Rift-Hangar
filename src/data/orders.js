import {ORDER_SUPPORT_DEFINITION, SUPPORT_ORDERS_DATA} from './orders/support-orders.js';
import {MOBILITY_ORDER_DATA} from './orders/mobility-orders.js';
import {SPECIAL_ORDERS_DATA} from './orders/special-orders.js';
import {makeFrozenStaticListIds} from './data-helpers.js';
import {INFANTRY_ORDERS_DATA} from './orders/infantry-orders.js';

export const ORDERS = makeFrozenStaticListIds({
    ...SPECIAL_ORDERS_DATA,
    ...ORDER_SUPPORT_DEFINITION,
    ...SUPPORT_ORDERS_DATA,
    ...MOBILITY_ORDER_DATA,
    ...INFANTRY_ORDERS_DATA,
});