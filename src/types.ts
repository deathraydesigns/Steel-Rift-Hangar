import type { FactionPerk } from './data/faction-perks';
import type { MECH_ARMOR_UPGRADE } from './data/mech-armor-upgrades';
import type { MECH_BODY_MOD, MechBody } from './data/mech-body';
import type { MECH_MOBILITY, MechMobility } from './data/mech-mobility';
import type { TeamPerkInfo } from './data/mech-team-perks';
import type { MECH_TEAM } from './data/mech-teams';
import type { MECH_UPGRADE } from './data/mech-upgrades';
import type { MECH_WEAPON, MechWeaponInfo } from './data/mech-weapons';
import type { ORDER } from './data/orders';
import type { InfantrySquadInfo } from './data/support-assets/_support-asset-types';
import { type MechSize, type MechSizeId, SIZE } from './data/unit-sizes';
import type { UNIT_TYPE } from './data/unit-types';
import type { UPGRADE_TRAIT } from './data/upgrade-traits';
import type { WEAPON_TRAIT } from './data/weapon-traits';
import type { HasDisplayOrder } from './store/helpers/collection-helper';

export interface MechWeaponAttachment {
    id: number,
    weapon_id: MECH_WEAPON,
    display_order: number | null,
}

export interface MechWeaponAttachmentInfo extends MechWeaponInfo {
    id: number,
    display_order: number | null,
    base_cost: number,
    duplicate_cost: number,
    required_by_group: boolean,
    required_by_group_reason: null | string,
    duplicate_percent: number,
    traits: TraitInfo<WEAPON_TRAIT>[],
    valid: boolean,
    validation_message: string | null,
    max_uses: number | null,
}

export interface MechUpgradeAttachment {
    id: number,
    upgrade_id: MECH_UPGRADE,
    display_order: number | null,
}

export interface MechUpgradeInfo {
    upgrade_id: MECH_UPGRADE,
    display_name: string,
    description: string,
    valid: boolean,
    validation_message: string | null,
    slots: number,
    cost: number | null,
    team_perks: TeamPerkInfo[],
    faction_perks: FactionPerk[],
    max_uses: number | null,
    traits: TraitInfo<UPGRADE_TRAIT>[],
    required_by_group: boolean,
}

export interface MechUpgradeAttachmentInfo extends MechUpgradeInfo {
    id: number,
    upgrade_id: MECH_UPGRADE,
}

export interface MechUpgradeTraitsInfo {
    used_team_perks: TeamPerkInfo[],
    faction_perks: FactionPerk[],
    traits: TraitInfo<UPGRADE_TRAIT>[],
    max_uses: number | null,
}

export interface Mech {
    id: number,
    name?: string,
    size_id: MechSizeId,
    structure_mod_id: MECH_BODY_MOD,
    armor_mod_id: MECH_BODY_MOD,
    armor_upgrade_ids: MECH_ARMOR_UPGRADE[],
    aux_armor_upgrade_id: MECH_ARMOR_UPGRADE,
    mobility_id: MECH_MOBILITY,
    preferred_team_id: MECH_TEAM,
    weapons: MechWeaponAttachment[],
    weapons_id_increment: number,
    upgrades: MechUpgradeAttachment[],
    upgrades_id_increment: number,
    display_order: number | null,
    unit_type_id: UNIT_TYPE.HEV,
    visible?: boolean,
}

export interface MechInstance extends HasDisplayOrder {
    id: number,
    mech_id: number,
    display_order: number | null,
}

export interface MechGroupInstance {
    id: string,
    visible: boolean,
    mechs: MechInstance[],
}

export interface MechTeamInstance {
    id: MECH_TEAM,
    visible: boolean,
    groups: MechGroupInstance[],
}

export interface NumberBySize {
    [SIZE.LIGHT]: number | null,
    [SIZE.MEDIUM]: number | null,
    [SIZE.HEAVY]: number | null,
    [SIZE.ULTRA]: number | null,
}

export interface TraitsBySize<T extends string = string> {
    [SIZE.LIGHT]: Trait<T>[],
    [SIZE.MEDIUM]: Trait<T>[],
    [SIZE.HEAVY]: Trait<T>[],
    [SIZE.ULTRA]: Trait<T>[],
}

export interface Trait<ID extends string> {
    id: ID,
    X?: number | string,
    Y?: number | string,
}

export interface TraitInfo<ID extends string> extends Trait<ID> {
    display_name: string,
    description: string,
    dependent_trait_ids: string[],
    granted_order_ids: ORDER[],
}

export interface GarrisonUnitInfo extends InfantrySquadInfo {
    card_ref_id?: number,
}

export type TraitFormatter = (name: string, number: number | string | undefined, type?: number | string | undefined) => string

export interface MechInfo {
    display_name: string,
    placeholder_name: string,
    size: MechSize,
    structure_mod: MechBody,
    armor_mod: MechBody,
    max_tons: number,
    used_tons: number,
    max_slots: number,
    used_slots: number,
    armor_stat: number,
    structure_stat: number,
    upgrade_used_tons: number,
    upgrade_used_slots: number,
    weapon_used_slots: number,
    weapon_used_tons: number,
    armor_upgrade_ids: MECH_ARMOR_UPGRADE[],
    mobility: MechMobility,
    move: number,
    jump: number,
    tonnage_stat: number,
    defense: number,
    smash_damage: number,
    preferred_team_id: MECH_TEAM,
}

export interface MechArmorUpgradeInfo {
    id: MECH_ARMOR_UPGRADE,
    valid: boolean,
    validation_message: string,
    cost: number | null,
    slots: number,
    display_name: string,
    card_upgrade_display_name?: string,
    description: string,
    team_perks: TeamPerkInfo[],
    armor_mod: number | null,
}