import type { Order } from '../types';
import { makeFrozenStaticListIds } from './data-helpers';
import { INFANTRY_ORDERS_DATA, type InfantryOrderId } from './orders/infantry-orders';
import { MOBILITY_ORDER_DATA, type MobilityOrderId } from './orders/mobility-orders';
import { SPECIAL_ORDERS_DATA, type SpecialOrderId } from './orders/special-orders';
import { ORDER_SUPPORT_DEFINITION, SUPPORT_ORDERS_DATA, type SupportOrderId } from './orders/support-orders';

export const ORDERS = makeFrozenStaticListIds<Order>({
    ...SPECIAL_ORDERS_DATA,
    ...ORDER_SUPPORT_DEFINITION,
    ...SUPPORT_ORDERS_DATA,
    ...MOBILITY_ORDER_DATA,
    ...INFANTRY_ORDERS_DATA,
});

export type OrderId =
    | SpecialOrderId
    | InfantryOrderId
    | MobilityOrderId
    | SupportOrderId