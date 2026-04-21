import { makeFrozenStaticListIds } from './data-helpers';
import { type MobilityOrderId, ORDER } from './orders';

export enum MECH_MOBILITY {
    BI_PEDAL = 'MOBILITY_BI_PEDAL',
    TRACKED = 'MOBILITY_TRACKED',
    MULTI_LIMB = 'MOBILITY_MULTI_LIMB',
}

export interface MechMobility {
    id: MECH_MOBILITY,
    display_name: string,
    slots: number,
    granted_order_ids: MobilityOrderId[],
}

export const MECH_MOBILITIES = makeFrozenStaticListIds<MechMobility>({
    [MECH_MOBILITY.BI_PEDAL]: {
        display_name: 'Bi-Pedal',
        slots: 1,
        granted_order_ids: [],
    },
    [MECH_MOBILITY.TRACKED]: {
        display_name: 'Tracked',
        slots: 1,
        granted_order_ids: [ORDER.PLOW_THROUGH],
    },
    [MECH_MOBILITY.MULTI_LIMB]: {
        display_name: 'Multi-Limb',
        slots: 1,
        granted_order_ids: [ORDER.HUNKER_DOWN],
    },
});
