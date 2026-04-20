import type { Order } from '../../types';
import { makeStaticListIds } from '../data-helpers';

export const ORDER_INFANTRY_MUSTER = 'ORDER_INFANTRY_MUSTER' as const;
export const ORDER_INFANTRY_MOVE = 'ORDER_INFANTRY_MOVE' as const;
export const ORDER_INFANTRY_LOCK_ON = 'ORDER_INFANTRY_LOCK_ON' as const;
export const ORDER_INFANTRY_ENGAGE = 'ORDER_INFANTRY_ENGAGE' as const;
export const ORDER_INFANTRY_DIG_IN = 'ORDER_INFANTRY_DIG_IN' as const;

export type InfantryOrderId =
    | typeof ORDER_INFANTRY_MUSTER
    | typeof ORDER_INFANTRY_DIG_IN
    | typeof ORDER_INFANTRY_MOVE
    | typeof ORDER_INFANTRY_LOCK_ON
    | typeof ORDER_INFANTRY_ENGAGE

export const INFANTRY_ORDERS_DATA = makeStaticListIds<Order>({
    [ORDER_INFANTRY_MUSTER]: {
        display_name: 'Muster',
        description: 'This is the only order that a Garrisoned Unit may perform. The Garrisoned Unit is placed within 1” of its Garrison. If the Garrisoned Unit has the Squadron Trait, place one model within 1” of the Garrison, then place the other models within 3” of that initial model. This Unit is no longer considered Garrisoned, and is now “Mustered”.',
    },
    [ORDER_INFANTRY_MOVE]: {
        display_name: 'Move',
        description: 'As normal, except that this unit may perform this order twice in one Activation.',
    },
    [ORDER_INFANTRY_LOCK_ON]: {
        display_name: 'Lock On',
        description: 'As normal',
    },
    [ORDER_INFANTRY_ENGAGE]: {
        display_name: 'Engage',
        description: 'As normal',
    },
    [ORDER_INFANTRY_DIG_IN]: {
        display_name: 'Dig In',
        description: 'This unit counts as being in Rough Terrain until the beginning of their next activation.',
    },
});

