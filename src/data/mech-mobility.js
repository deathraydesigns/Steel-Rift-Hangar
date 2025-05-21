import {listToDropDown, makeFrozenStaticListIds} from './data-helpers.js';

export const MOBILITY_BI_PEDAL = 'MOBILITY_BI_PEDAL';
export const MOBILITY_TRACKED = 'MOBILITY_TRACKED';
export const MOBILITY_MULTI_LIMB = 'MOBILITY_MULTI_LIMB';

export const MECH_MOBILITIES = makeFrozenStaticListIds({
    [[MOBILITY_BI_PEDAL]]: {
        display_name: 'Bi-Pedal',
        description: null,
    },
    [[MOBILITY_TRACKED]]: {
        display_name: 'Tracked',
        description: 'Plow Through (ORDER): Pivot this HE-V up to 90° and then move up to its current move speed in a straight line while ignoring Rough terrain. This HE-Vs Facing does not change at the end of this Order.'
    },
    [[MOBILITY_MULTI_LIMB]]: {
        display_name: 'Multi-Limb',
        description: 'Hunkered Down (ORDER): Place a ‘Hunkered Down’ Token next to the HE-V. While this HE-V is ‘Hunkered Down’ any attacks on this Unit originating from attackers within Line of Sight must count the Hunkered Unit as being obscured by Covering Terrain. If the Hunkered Unit was already obscured by Covering Terrain, it must be treated as being obscured by Blocking Terrain. There is no additional benefit to a Unit already obscured by Blocking Terrain. The ‘Hunkered Down’ Token is removed if this Unit performs any Order other than an Engage Order, or is the target of a Smash Order.'
    },
});

export const MECH_MOBILITIES_DROP_DOWN = listToDropDown(MECH_MOBILITIES);