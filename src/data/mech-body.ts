import {listToDropDown, makeFrozenStaticListIds} from './data-helpers';

export const MOD_STRIPPED = 'MOD_STRIPPED' as const;
export const MOD_STANDARD = 'MOD_STANDARD' as const;
export const MOD_REINFORCED = 'MOD_REINFORCED' as const;

export type MechBodyModId =
    | typeof MOD_STRIPPED
    | typeof MOD_STANDARD
    | typeof MOD_REINFORCED;

export interface MechBody {
    id: MechBodyModId
    display_name: string
    modifier: number
    max_tons: number
}

export const MECH_BODY_MODS: Readonly<Record<MechBodyModId, MechBody>> = makeFrozenStaticListIds<MechBody>({
    [MOD_STRIPPED]: {
        display_name: 'Stripped',
        modifier: -2,
        max_tons: 2,
    },
    [MOD_STANDARD]: {
        display_name: 'Standard',
        modifier: 0,
        max_tons: 0,
    },
    [MOD_REINFORCED]: {
        display_name: 'Reinforced',
        modifier: 2,
        max_tons: -2,
    },
});

export const MECH_BODY_MODS_DROP_DOWN = listToDropDown(MECH_BODY_MODS);
