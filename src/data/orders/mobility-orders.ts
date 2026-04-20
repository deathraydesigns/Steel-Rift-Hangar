import type { Order } from '../../types';
import { makeStaticListIds } from '../data-helpers';

export const ORDER_PLOW_THROUGH = 'ORDER_PLOW_THROUGH' as const;
export const ORDER_HUNKER_DOWN = 'ORDER_HUNKER_DOWN' as const;

export type MobilityOrderId =
    | typeof ORDER_PLOW_THROUGH
    | typeof ORDER_HUNKER_DOWN

export const MOBILITY_ORDER_DATA = makeStaticListIds<Order>({
    [ORDER_PLOW_THROUGH]: {
        display_name: 'Plow Through',
        description: 'Pivot this HE‑V up to 90°, then move up to its current move speed in a straight line, ignoring Rough Terrain. This HE‑V’s facing may not change at the end of this Order. This does not count as a MOVE Order.',
    },
    [ORDER_HUNKER_DOWN]: {
        display_name: 'Hunker Down',
        description: ' Move this HE‑V following all rules for a MOVE Order, except the move distance is 10”/8”/6”/4”. This Order counts as a MOVE Order. This Unit receives a Hunkered Down Marker next to the HE‑V.' +
            'Hunkered Down Marker: When this Unit is the Target of an ENGAGE Order, the Attack Pool is modified for Covered. If this Unit would already benefit from Covered, modify for Blocked. If this Unit would already benefit from Blocked, there is no further modification. The Hunkered Down Marker is removed if this Unit is moved or placed in any way, or is the Target of a SMASH Order.',
    },
});

