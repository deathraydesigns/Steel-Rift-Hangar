import {makeFrozenStaticListIds} from './data-helpers.js';
import {ASSAULT_VEHICLE_SQUADRON_DATA} from './support-assets/assault-vehicle-squadron.js';
import {SUPPORT_VEHICLE_SQUADRON_DATA} from './support-assets/support-vehicle-squadron.js';
import {LAS_WING_ATTACK_SQUADRON_DATA} from './support-assets/las-wing-attack-squadron.js';
import {HEAVY_TANK_SQUADRON_DATA} from './support-assets/heavy-tank-squadron.js';
import {LIGHT_VEHICLE_SQUADRON_DATA} from './support-assets/light-vehicle-squadron.js';
import {ULTRA_LIGHT_HEV_SQUADRON_DATA} from './support-assets/ultra-light-hev-squadron.js';
import {INFANTRY_OUTPOST_DATA} from './support-assets/infantry-outpost.js';
import {LAS_WING_TRANSPORT_SQUADRON_DATA} from './support-assets/las-wing-transport-squadron.js';

export const SUPPORT_ASSET_UNITS = makeFrozenStaticListIds({
    ...ASSAULT_VEHICLE_SQUADRON_DATA,
    ...SUPPORT_VEHICLE_SQUADRON_DATA,
    ...LAS_WING_ATTACK_SQUADRON_DATA,
    ...HEAVY_TANK_SQUADRON_DATA,
    ...LIGHT_VEHICLE_SQUADRON_DATA,
    ...ULTRA_LIGHT_HEV_SQUADRON_DATA,
    ...INFANTRY_OUTPOST_DATA,
    ...LAS_WING_TRANSPORT_SQUADRON_DATA,
});