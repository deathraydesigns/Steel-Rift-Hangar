import type { GarrisonUnitInfo, Trait } from '../../types';
import type { InfantrySquad, InfantrySquadId } from '../infantry-squads';
import type { SupportAssetUnitId } from '../support-asset-units';
import type { SIZE, UnitSize } from '../unit-sizes';
import type { UNIT_TRAIT } from '../unit-traits';
import type { UnitType, UnitTypeId } from '../unit-types';
import type { UnitWeapon, UnitWeaponId } from '../unit-weapons';
import type { UpgradePodId } from './ultra-light-hev-squadron';

export type UnitVehicleId = number & { readonly __brandUnitVehicleId: unique symbol }

export interface VehicleAttachment {
    id: number;
    vehicle_id: UnitVehicleId,
    weapon_choices?: Record<string, UnitWeaponId>,
    garrison_units?: InfantrySquadId[],
}

export interface SupportAssetUnitAttachment {
    id: number,
    support_asset_unit_id: SupportAssetUnitId,
    vehicles_id_increment: number,
    vehicles: VehicleAttachment[],
    upgrade_pod_id?: UpgradePodId,
}

export interface SupportAssetUnitVehicleDef {
    id: UnitVehicleId,
    display_name: string,
    move: number,
    jump?: number,
    armor: number,
    structure: number,
    garrison_ul_hev?: boolean,
    weapon_ids?: UnitWeaponId[],
    // each key is a slot to choose one weapon,
    // each value is weapons to choose from in that slot
    weapon_choice_ids?: Record<string, UnitWeaponId[]>,
    // units to choose from, based on garrison trait
    garrison_choice_unit_ids?: InfantrySquadId[],
    // added to all garrison units
    garrison_unit_traits?: Trait[],
    traits?: Trait<UNIT_TRAIT>[],
}

export interface UpgradePod {
    id: UpgradePodId,
    weapon_id?: UnitWeaponId,
    trait?: Trait<UNIT_TRAIT>,
}

export interface SupportAssetUnitDef {
    id: SupportAssetUnitId,
    display_name: string,
    unit_type_id: UnitTypeId,
    size_id: SIZE,
    cost: number,
    max_armor_tons?: number,
    max_vehicles?: number,
    max_duplicate_vehicles?: number,
    unit_points_description?: string,
    all_vehicle_must_be_the_same?: boolean,
    traits?: Trait<UNIT_TRAIT>[],
    defense: number,
    vehicles: Record<string, SupportAssetUnitVehicleDef>,
    upgrade_pods?: Record<UpgradePodId, UpgradePod>,
}

export interface SupportAssetUnitInfo {
    id: SupportAssetUnitId,
    display_name: string,
    unit_type_id: string,
    size_id: SIZE,
    cost: number,
    max_armor_tons?: number,
    max_vehicles?: number,
    max_duplicate_vehicles?: number,
    unit_points_description?: string,
    all_vehicle_must_be_the_same?: boolean,
    traits: Trait<UNIT_TRAIT>[],
    defense: number,
    vehicles: Record<string, UnitVehicleInfo>,
    upgrade_pods?: Record<UpgradePodId, UpgradePod>,
    unit_type?: UnitType,
    size: UnitSize,
}

export interface UnitAttachmentInfo {
    id: number,
    support_asset_unit_id: SupportAssetUnitId,
    unit_type: UnitType,
    display_name: string,
    size: UnitSize,
    cost: number,
    max_armor_tons?: number,
    max_vehicles?: number,
    max_duplicate_vehicles?: number,
    unit_points_description?: string,
    upgrade_pod_id?: UpgradePodId,
    vehicles: UnitAttachmentVehicleInfo[],
    traits: Trait[],
    defense: number,
    all_vehicle_must_be_the_same?: boolean,
}

export interface UnitWeaponInfo extends UnitWeapon {
    max_uses: number,
}

export interface InfantrySquadInfo extends InfantrySquad {
    unit_type: UnitType,
    size: UnitSize,
    weapons: UnitWeaponInfo[],
}

export interface UnitVehicleInfo {
    id: UnitVehicleId,
    support_asset_unit_id: SupportAssetUnitId,
    weapons: UnitWeaponInfo[],
    display_name: string,
    move: number,
    jump?: number,
    armor: number,
    structure: number,
    garrison_ul_hev?: boolean,
    garrison_units?: GarrisonUnitInfo[],
    garrison_unit_traits?: Trait[],
    traits: Trait[],
    weapon_choices?: UnitWeaponInfo[][],
    valid: boolean,
    validation_message: string,
}

export interface UnitAttachmentVehicleInfo extends Omit<UnitVehicleInfo, 'id'> {
    id: number,
    vehicle_id: UnitVehicleId,
    valid: boolean,
    validation_message: string,
}