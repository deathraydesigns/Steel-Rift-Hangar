import type { Trait, UnitSize } from '../../types';
import type { InfantrySquad } from '../infantry-squads';
import type { SupportAssetUnitId } from '../support-asset-units';
import type { UnitTraitId } from '../unit-traits';
import type { UnitType } from '../unit-types';
import type { UnitWeapon, UnitWeaponId } from '../unit-weapons';
import type { UpgradePodId } from './ultra-light-hev-squadron';

export type UnitVehicleId = number & { readonly __brandUnitVehicleId: unique symbol }

export interface VehicleAttachment {
    id: number;
    vehicle_id: UnitVehicleId;
    weapon_choices?: Record<string, string>;
    garrison_units?: string[];
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
    jump: number | null;
    armor: number;
    structure: number;
    garrison_ul_hev?: boolean;
    weapon_ids?: UnitWeaponId[];
    weapon_choice_ids?: Record<string, UnitWeaponId[]>;
    garrison_choice_unit_ids?: string[];
    garrison_unit_traits?: Trait[];
    traits: Trait<UnitTraitId>[];
}

export interface UpgradePod {
    id: string,
    weapon_id?: UnitWeaponId;
    trait?: Trait<UnitTraitId>;
}

export interface SupportAssetUnitDef {
    id: SupportAssetUnitId;
    display_name: string;
    unit_type: UnitType;
    size: UnitSize;
    cost: number;
    max_armor_tons: number | null;
    max_vehicles: number | null;
    max_duplicate_vehicles: number | null;
    unit_points_description: string | null;
    all_vehicle_must_be_the_same?: boolean;
    traits: Trait<UnitTraitId>[];
    defense: number | null;
    vehicles: Record<string, SupportAssetUnitVehicleDef>;
    upgrade_pods: Record<UpgradePodId, UpgradePod> | null;
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
    id: number,
    vehicle_id: string,
    support_asset_unit_id: SupportAssetUnitId,
    weapons: UnitWeaponInfo[],
    display_name: string,
    move: number,
    jump?: number,
    armor: number,
    structure: number,
    garrison_ul_hev?: boolean,
    garrison_units?: InfantrySquadInfo[],
    garrison_unit_traits?: Trait[],
    traits: Trait[],
    weapon_choices: UnitWeaponInfo[][]
}