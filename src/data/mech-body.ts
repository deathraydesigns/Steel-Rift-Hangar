import { listToDropDown, makeFrozenStaticListIds } from './data-helpers';

export enum MECH_BODY_MOD {
    STRIPPED = 'MOD_STRIPPED',
    STANDARD = 'MOD_STANDARD',
    REINFORCED = 'MOD_REINFORCED',
}

export interface MechBody {
    id: MECH_BODY_MOD;
    display_name: string;
    modifier: number;
    max_tons: number;
}

export const MECH_BODY_MODS: Readonly<Record<MECH_BODY_MOD, MechBody>> = makeFrozenStaticListIds<MechBody>({
    [MECH_BODY_MOD.STRIPPED]: {
        display_name: 'Stripped',
        modifier: -2,
        max_tons: 2,
    },
    [MECH_BODY_MOD.STANDARD]: {
        display_name: 'Standard',
        modifier: 0,
        max_tons: 0,
    },
    [MECH_BODY_MOD.REINFORCED]: {
        display_name: 'Reinforced',
        modifier: 2,
        max_tons: -2,
    },
});

export const MECH_BODY_MODS_DROP_DOWN = listToDropDown(MECH_BODY_MODS);
