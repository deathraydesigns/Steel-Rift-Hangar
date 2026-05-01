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
    stat_modifier: number,
    tons: number,
}

export interface MechBodyModInfo extends MechBodyMod {
    faction_perks: FactionPerk[],
    valid: boolean,
    validation_message: null | string,
}

export const MECH_BODY_MODS = makeStaticListIds<MechBodyMod>({
    [MECH_BODY_MOD.STRIPPED]: {
        display_name: 'Stripped',
        stat_modifier: -2,
        tons: -2,
    },
    [MECH_BODY_MOD.STANDARD]: {
        display_name: 'Standard',
        stat_modifier: 0,
        tons: 0,
    },
    [MECH_BODY_MOD.REINFORCED]: {
        display_name: 'Reinforced',
        stat_modifier: 2,
        tons: 2,
    },
});

export const MECH_BODY_MODS_DROP_DOWN = listToDropDown(MECH_BODY_MODS);
