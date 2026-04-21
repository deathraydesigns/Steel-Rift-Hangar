import { makeFrozenStaticListIds } from './data-helpers';
import { SUPPORT_ASSET_UNIT, type SupportAssetUnitDef } from './support-assets/_support-asset-types';
import { ASSAULT_VEHICLE_SQUADRON_DATA } from './support-assets/assault-vehicle-squadron';
import { HEAVY_TANK_SQUADRON_DATA } from './support-assets/heavy-tank-squadron';
import { INFANTRY_OUTPOST_DATA } from './support-assets/infantry-outpost';
import { LAS_WING_ATTACK_SQUADRON_DATA } from './support-assets/las-wing-attack-squadron';
import { LAS_WING_TRANSPORT_SQUADRON_DATA } from './support-assets/las-wing-transport-squadron';
import { LIGHT_VEHICLE_SQUADRON_DATA } from './support-assets/light-vehicle-squadron';
import { SUPPORT_VEHICLE_SQUADRON_DATA } from './support-assets/support-vehicle-squadron';
import { ULTRA_LIGHT_HEV_SQUADRON_DATA } from './support-assets/ultra-light-hev-squadron';

export const SUPPORT_ASSET_UNITS = makeFrozenStaticListIds<SupportAssetUnitDef>({
    [SUPPORT_ASSET_UNIT.ASSAULT_VEHICLE_SQUADRON]: ASSAULT_VEHICLE_SQUADRON_DATA,
    [SUPPORT_ASSET_UNIT.SUPPORT_VEHICLE_SQUADRON]: SUPPORT_VEHICLE_SQUADRON_DATA,
    [SUPPORT_ASSET_UNIT.LAS_WING_ATTACK_SQUADRON]: LAS_WING_ATTACK_SQUADRON_DATA,
    [SUPPORT_ASSET_UNIT.LIGHT_VEHICLE_SQUADRON]: LIGHT_VEHICLE_SQUADRON_DATA,
    [SUPPORT_ASSET_UNIT.INFANTRY_OUTPOST]: INFANTRY_OUTPOST_DATA,
    [SUPPORT_ASSET_UNIT.LAS_WING_TRANSPORT_SQUADRON]: LAS_WING_TRANSPORT_SQUADRON_DATA,
    [SUPPORT_ASSET_UNIT.HEAVY_TANK_SQUADRON]: HEAVY_TANK_SQUADRON_DATA,
    [SUPPORT_ASSET_UNIT.ULTRA_LIGHT_HEV_SQUADRON]: ULTRA_LIGHT_HEV_SQUADRON_DATA,
});

