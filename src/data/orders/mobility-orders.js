export const ORDER_PLOW_THROUGH = 'ORDER_PLOW_THROUGH';
export const ORDER_HUNKER_DOWN = 'ORDER_HUNKER_DOWN';

export const MOBILITY_ORDER_DATA = {
    [ORDER_PLOW_THROUGH]: {
        display_name: 'Plow Through',
        description: 'Pivot this HE-V up to 90° and then move up to its current move speed in a straight line while ignoring Rough terrain. This HE-Vs Facing does not change at the end of this Order.',
    },
    [ORDER_HUNKER_DOWN]: {
        display_name: 'Hunker Down',
        description: 'Place a ‘Hunkered Down’ Token next to the HE-V. While this HE-V is ‘Hunkered Down’ any attacks on this Unit originating from attackers within Line of Sight must count the Hunkered Unit as being obscured by Covering Terrain. If the Hunkered Unit was already obscured by Covering Terrain, it must be treated as being obscured by Blocking Terrain. There is no additional benefit to a Unit already obscured by Blocking Terrain. The ‘Hunkered Down’ Token is removed if this Unit performs any Order other than an Engage Order, or is the target of a Smash Order.',
    },
};