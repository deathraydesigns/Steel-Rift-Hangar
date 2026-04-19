import { makeKeyedFrozenStaticListIds } from './data-helpers';
import type { SupportAssetUnitDef } from './support-assets/_support-asset-types';
import { ASSAULT_VEHICLE_SQUADRON, ASSAULT_VEHICLE_SQUADRON_DATA } from './support-assets/assault-vehicle-squadron';
import { HEAVY_TANK_SQUADRON, HEAVY_TANK_SQUADRON_DATA } from './support-assets/heavy-tank-squadron';
import { INFANTRY_OUTPOST, INFANTRY_OUTPOST_DATA } from './support-assets/infantry-outpost';
import { LAS_WING_ATTACK_SQUADRON, LAS_WING_ATTACK_SQUADRON_DATA } from './support-assets/las-wing-attack-squadron';
import {
    LAS_WING_TRANSPORT_SQUADRON,
    LAS_WING_TRANSPORT_SQUADRON_DATA,
} from './support-assets/las-wing-transport-squadron';
import { LIGHT_VEHICLE_SQUADRON, LIGHT_VEHICLE_SQUADRON_DATA } from './support-assets/light-vehicle-squadron';
import { SUPPORT_VEHICLE_SQUADRON, SUPPORT_VEHICLE_SQUADRON_DATA } from './support-assets/support-vehicle-squadron';
import { ULTRA_LIGHT_HEV_SQUADRON, ULTRA_LIGHT_HEV_SQUADRON_DATA } from './support-assets/ultra-light-hev-squadron';

export const SUPPORT_ASSET_UNITS = makeKeyedFrozenStaticListIds<SupportAssetUnitId, SupportAssetUnitDef>({
    ...ASSAULT_VEHICLE_SQUADRON_DATA,
    ...SUPPORT_VEHICLE_SQUADRON_DATA,
    ...LAS_WING_ATTACK_SQUADRON_DATA,
    ...HEAVY_TANK_SQUADRON_DATA,
    ...LIGHT_VEHICLE_SQUADRON_DATA,
    ...ULTRA_LIGHT_HEV_SQUADRON_DATA,
    ...INFANTRY_OUTPOST_DATA,
    ...LAS_WING_TRANSPORT_SQUADRON_DATA,
});

export type SupportAssetUnitId =
    | typeof ASSAULT_VEHICLE_SQUADRON
    | typeof ASSAULT_VEHICLE_SQUADRON
    | typeof SUPPORT_VEHICLE_SQUADRON
    | typeof LAS_WING_ATTACK_SQUADRON
    | typeof HEAVY_TANK_SQUADRON
    | typeof LIGHT_VEHICLE_SQUADRON
    | typeof ULTRA_LIGHT_HEV_SQUADRON
    | typeof INFANTRY_OUTPOST
    | typeof LAS_WING_TRANSPORT_SQUADRON
