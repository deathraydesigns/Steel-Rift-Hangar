import { makeFrozenStaticListIds } from './data-helpers';

export type UnitType = {
    id: string,
    display_name: string
}

export enum UNIT_TYPE {
    HEV = 'TYPE_HEV',
    VEHICLE = 'TYPE_VEHICLE',
    INFANTRY = 'TYPE_INFANTRY',
    FORTIFICATION = 'TYPE_FORTIFICATION',
}

export const UNIT_TYPES = makeFrozenStaticListIds<UnitType>({
    [UNIT_TYPE.HEV]: {
        display_name: 'HE-V',
    },
    [UNIT_TYPE.VEHICLE]: {
        display_name: 'Vehicle',
    },
    [UNIT_TYPE.INFANTRY]: {
        display_name: 'Infantry',
    },
    [UNIT_TYPE.FORTIFICATION]: {
        display_name: 'Fortification',
    },
});