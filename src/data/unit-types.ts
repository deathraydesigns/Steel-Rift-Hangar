import { makeFrozenStaticListIds } from './data-helpers';

export type UnitType = {
    id: string,
    display_name: string
}

export const TYPE_HEV = 'TYPE_HEV' as const;
export const TYPE_VEHICLE = 'TYPE_VEHICLE' as const;
export const TYPE_INFANTRY = 'TYPE_INFANTRY' as const;
export const TYPE_FORTIFICATION = 'TYPE_FORTIFICATION' as const;

export type UnitTypeId =
    | typeof TYPE_HEV
    | typeof TYPE_VEHICLE
    | typeof TYPE_INFANTRY
    | typeof TYPE_FORTIFICATION

export const UNIT_TYPES = makeFrozenStaticListIds<UnitType>({
    [TYPE_HEV]: {
        display_name: 'HE-V',
    },
    [TYPE_VEHICLE]: {
        display_name: 'Vehicle',
    },
    [TYPE_INFANTRY]: {
        display_name: 'Infantry',
    },
    [TYPE_FORTIFICATION]: {
        display_name: 'Fortification',
    },
});