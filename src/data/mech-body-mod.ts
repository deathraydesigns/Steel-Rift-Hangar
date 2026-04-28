import { listToDropDown, makeStaticListIds } from './data-helpers';
import type { FactionPerk } from './faction-perks';

export enum MECH_BODY_MOD {
    STRIPPED = 'MOD_STRIPPED',
    STANDARD = 'MOD_STANDARD',
    REINFORCED = 'MOD_REINFORCED',
}

export interface MechBodyMod {
    id: MECH_BODY_MOD,
    display_name: string,
    modifier: number,
    max_tons: number,
}

export interface MechBodyModInfo extends MechBodyMod {
    faction_perks: FactionPerk[],
    valid: boolean,
    validation_message: null | string,
}

export const MECH_BODY_MODS = makeStaticListIds<MechBodyMod>({
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
