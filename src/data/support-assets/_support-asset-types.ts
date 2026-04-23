import type { GarrisonUnitInfo, Trait, TraitInfo } from '../../types';
import type { INFANTRY, InfantrySquad } from '../infantry-squads';
import type { SIZE, UnitSize } from '../unit-sizes';
import type { UNIT_TRAIT } from '../unit-traits';
import type { UNIT_TYPE, UnitType } from '../unit-types';
import type { UNIT_WEAPON, UnitWeapon } from '../unit-weapons';
import { WEAPON_TRAIT } from '../weapon-traits';
import { type UpgradePodId } from './ultra-light-hev-squadron';

export type UnitVehicleId = string & { readonly __brandUnitVehicleId: unique symbol }

export interface VehicleAttachment {
    id: number;
    vehicle_id: UnitVehicleId,
    weapon_choices?: Record<string, UNIT_WEAPON>,
    garrison_units?: INFANTRY[],
}

export interface SupportAssetUnitAttachment {
    id: number,
    support_asset_unit_id: SUPPORT_ASSET_UNIT,
    vehicles_id_increment: number,
    vehicles: VehicleAttachment[],
    upgrade_pod_id?: UpgradePodId,
}

export interface UpgradePod {
    id: UpgradePodId,
    weapon_id?: UNIT_WEAPON,
    trait?: Trait<UNIT_TRAIT>,
}

export enum SUPPORT_ASSET_UNIT {
    ASSAULT_VEHICLE_SQUADRON = 'ASSAULT_VEHICLE_SQUADRON',
    HEAVY_TANK_SQUADRON = 'HEAVY_TANK_SQUADRON',
    SUPPORT_VEHICLE_SQUADRON = 'SUPPORT_VEHICLE_SQUADRON',
    LAS_WING_ATTACK_SQUADRON = 'LAS_WING_ATTACK_SQUADRON',
    LIGHT_VEHICLE_SQUADRON = 'LIGHT_VEHICLE_SQUADRON',
    INFANTRY_OUTPOST = 'INFANTRY_OUTPOST',
    LAS_WING_TRANSPORT_SQUADRON = 'LAS_WING_TRANSPORT_SQUADRON',
    ULTRA_LIGHT_HEV_SQUADRON = 'ULTRA_LIGHT_HEV_SQUADRON',
}

export interface SupportAssetUnitDef {
    id: SUPPORT_ASSET_UNIT,
    display_name: string,
    unit_type_id: UNIT_TYPE,
    size_id: SIZE,
    cost: number,
    max_vehicle_tons?: number,
    max_vehicles?: number,
    max_duplicate_vehicles?: number,
    unit_points_description?: string,
    all_vehicle_must_be_the_same?: boolean,
    traits?: Trait<UNIT_TRAIT>[],
    defense: number,
    vehicles: Record<UnitVehicleId, SupportAssetUnitVehicleDef>,
    upgrade_pods?: Record<UpgradePodId, UpgradePod>,
}

export interface SupportAssetUnitInfo extends Omit<SupportAssetUnitDef, 'size_id' | 'traits' | 'vehicles' | 'unit_type_id'> {
    traits: TraitInfo<UNIT_TRAIT>[],
    vehicles: Record<UnitVehicleId, UnitVehicleInfo>,
    unit_type: UnitType,
    size: UnitSize,
}

export interface UnitAttachmentInfo extends Omit<SupportAssetUnitInfo, 'id' | 'vehicles' | 'upgrade_pods'> {
    id: number,
    support_asset_unit_id: SUPPORT_ASSET_UNIT,
    upgrade_pod_id?: UpgradePodId,
    vehicles: UnitAttachmentVehicleInfo[],
}

export interface UnitWeaponInfo extends UnitWeapon {
    max_uses: number,
    traits: TraitInfo<WEAPON_TRAIT>[];
}

export interface InfantrySquadInfo extends Omit<InfantrySquad, 'traits'> {
    unit_type: UnitType,
    size: UnitSize,
    weapons: UnitWeaponInfo[],
    traits: TraitInfo<UNIT_TRAIT>[]
}

export interface SupportAssetUnitVehicleDef {
    id: UnitVehicleId,
    display_name: string,
    move: number,
    jump: number,
    armor: number,
    structure: number,
    // used with max_tons
    tons?: number,
    max_vehicle_instances?: number,
    garrison_ul_hev?: boolean,
    weapon_ids?: UNIT_WEAPON[],
    // each key is a slot to choose one weapon,
    // each value is weapons to choose from in that slot
    weapon_choice_ids?: Record<string, UNIT_WEAPON[]>,
    // units to choose from, based on garrison trait
    garrison_choice_unit_ids?: INFANTRY[],
    // added to all garrison units
    garrison_unit_traits?: Trait<UNIT_TRAIT>[],
    traits?: Trait<UNIT_TRAIT>[],
}

export interface UnitVehicleInfo extends Omit<SupportAssetUnitVehicleDef, 'weapon_ids' | 'weapon_choice_ids' | 'garrison_choice_unit_ids' | 'garrison_unit_traits'> {
    support_asset_unit_id: SUPPORT_ASSET_UNIT,
    weapons: UnitWeaponInfo[],
    display_name: string,
    garrison_units: GarrisonUnitInfo[],
    garrison_unit_traits: TraitInfo<UNIT_TRAIT>[],
    traits: TraitInfo<UNIT_TRAIT>[],
    weapon_choices: UnitWeaponInfo[][],
    valid: boolean,
    validation_message: string | null,
    tons?: number,
}

export interface UnitAttachmentVehicleInfo extends Omit<UnitVehicleInfo, 'id' | 'weapon_choices'> {
    id: number,
    vehicle_id: UnitVehicleId,
}