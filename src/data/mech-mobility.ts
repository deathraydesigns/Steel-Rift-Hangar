import { makeFrozenStaticListIds, makeKeyedFrozenStaticListIds } from './data-helpers';
import { type MobilityOrderId, ORDER_HUNKER_DOWN, ORDER_PLOW_THROUGH } from './orders/mobility-orders';

export const MOBILITY_BI_PEDAL = 'MOBILITY_BI_PEDAL' as const;
export const MOBILITY_TRACKED = 'MOBILITY_TRACKED' as const;
export const MOBILITY_MULTI_LIMB = 'MOBILITY_MULTI_LIMB' as const;

export type MechMobilityId =
    | typeof MOBILITY_BI_PEDAL
    | typeof MOBILITY_TRACKED
    | typeof MOBILITY_MULTI_LIMB

export interface MechMobility {
    id: MechMobilityId,
    display_name: string,
    slots: number,
    granted_order_ids: MobilityOrderId[],
}

export const MECH_MOBILITIES = makeKeyedFrozenStaticListIds<MechMobilityId, MechMobility>({
    [MOBILITY_BI_PEDAL]: {
        display_name: 'Bi-Pedal',
        slots: 0,
        granted_order_ids: [],
    },
    [MOBILITY_TRACKED]: {
        display_name: 'Tracked',
        slots: 1,
        granted_order_ids: [ORDER_PLOW_THROUGH],
    },
    [MOBILITY_MULTI_LIMB]: {
        display_name: 'Multi-Limb',
        slots: 1,
        granted_order_ids: [ORDER_HUNKER_DOWN],
    },
});
