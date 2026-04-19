import type { Trait, UnitSize } from '../../types';
import type { InfantrySquad } from '../infantry-squads';
import type { SupportAssetUnitId } from '../support-asset-units';
import type { UnitSizeId } from '../unit-sizes';
import type { UnitTraitId } from '../unit-traits';
import type { UnitType, UnitTypeId } from '../unit-types';
import type { UnitWeapon, UnitWeaponId } from '../unit-weapons';
import type { UpgradePodId } from './ultra-light-hev-squadron';

export type UnitVehicleId = number & { readonly __brandUnitVehicleId: unique symbol }

export function makeSupportAssetVehicle() {

}

export interface VehicleAttachment {
    id: number;
    vehicle_id: UnitVehicleId;
    weapon_choices?: Record<string, string>;
    garrison_units?: string[]; // Array of infantrySquadId
}

export interface SupportAssetUnitAttachment {
    id: number;
    support_asset_unit_id: SupportAssetUnitId;
    vehicles_id_increment: number;
    vehicles: VehicleAttachment[];
    upgrade_pod_id?: UpgradePodId;
}

export interface SupportAssetUnitVehicleDef {
    id: string;
    display_name: string;
    move: number;
    jump?: number;
    armor: number;
    structure: number;
    garrison_ul_hev?: boolean;
    weapon_ids?: UnitWeaponId[];
    weapon_choice_ids?: Record<string, UnitWeaponId[]>;
    garrison_choice_unit_ids?: string[];
    garrison_unit_traits?: Trait[];
    traits?: Trait<UnitTraitId>[];
}

export interface UpgradePod {
    id: string,
    weapon_id?: UnitWeaponId;
    trait?: Trait<UnitTraitId>;
}

export interface SupportAssetUnitDef {
    id: SupportAssetUnitId;
    display_name: string;
    unit_type_id: UnitTypeId;
    size_id: UnitSizeId;
    cost: number;
    max_armor_tons?: number;
    max_vehicles?: number;
    max_duplicate_vehicles?: number;
    unit_points_description?: string;
    all_vehicle_must_be_the_same?: boolean;
    traits?: Trait<UnitTraitId>[];
    defense: number | null;
    vehicles: Record<string, SupportAssetUnitVehicleDef>;
    upgrade_pods?: Record<UpgradePodId, UpgradePod>;
}

export interface SupportAssetUnitInfo {
    id: SupportAssetUnitId;
    display_name: string;
    unit_type_id: string;
    size_id: UnitSizeId;
    cost: number;
    max_armor_tons?: number;
    max_vehicles?: number;
    max_duplicate_vehicles?: number;
    unit_points_description?: string;
    all_vehicle_must_be_the_same?: boolean;
    traits: Trait<UnitTraitId>[];
    defense: number | null;
    vehicles: Record<string, UnitVehicleInfo>;
    upgrade_pods?: Record<UpgradePodId, UpgradePod>;
    unit_type?: UnitType;
    size: UnitSize;
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
    vehicles: UnitVehicleInfo[],
    traits: Trait[],
    defense: number | null,
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
    vehicle_id: string,
    support_asset_unit_id: SupportAssetUnitId,
    weapons?: UnitWeaponInfo[],
    display_name: string,
    move: number,
    jump?: number,
    armor: number,
    structure: number,
    garrison_ul_hev?: boolean,
    garrison_units?: InfantrySquadInfo[],
    garrison_unit_traits?: Trait[],
    traits: Trait[],
    weapon_choices?: UnitWeaponInfo[][]
}

export interface UnitVehicleAttachmentInfo {
    id: number,
}