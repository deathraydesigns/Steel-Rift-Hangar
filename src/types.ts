import type { FactionPerk } from './data/faction-perks';
import type { MechArmorUpgradeId } from './data/mech-armor-upgrades';
import type { MECH_BODY_MOD, MechBody } from './data/mech-body';
import type { MECH_MOBILITY, MechMobility } from './data/mech-mobility';
import { type TEAM_PERK } from './data/mech-team-perks';
import type { MechTeamId } from './data/mech-teams';
import type { MechUpgradeId } from './data/mech-upgrades';
import type { MechWeaponId, MechWeaponInfo } from './data/mech-weapons';
import type { OrderId } from './data/orders';
import type { SecondaryAgendaId } from './data/secondary-agendas';
import type { InfantrySquadInfo } from './data/support-assets/_support-asset-types';
import { type MechSize, type MechSizeId, SIZE } from './data/unit-sizes';
import type { WeaponTraitId } from './data/weapon-traits';
import type { HasDisplayOrder } from './store/helpers/collection-helper';
import type { TeamPerkInfo } from './store/team-store';

export interface MechTeamSize {
    id: string;
    display_name: string;
    description: string;
}

export interface MechTeamGroup {
    id: string,
    display_name: string,
    min_count: number | boolean,
    max_count: number | boolean,
    size_ids: MechSizeId[],
    required_weapon_ids: MechWeaponId[],
    required_upgrade_ids: MechUpgradeId[],
    required_at_least_one_of_weapon_ids: MechWeaponId[],
    required_at_least_one_weapon_with_trait_id: WeaponTraitId | null,
    required_armor_or_structure_mod_id_once: MECH_BODY_MOD | null,
    prohibited_weapons_with_trait_ids: WeaponTraitId[],
    limited_weapons_with_at_least_one_of_trait_ids: WeaponTraitId[],
    limited_structure_mod_ids: MECH_BODY_MOD[],
    limited_armor_mod_ids: MECH_BODY_MOD[],
    limited_armor_upgrade_ids: MechArmorUpgradeId[],
    allow_duplicate_weapons: boolean,
    requires_at_least_one_companion_drone: boolean
}

export interface MechTeam {
    id: MechTeamId,
    display_name: string,
    display_name_short?: string,
    icon: string,
    secondary_agenda_id?: SecondaryAgendaId,
    groups: Record<string, MechTeamGroup>,
    team_size_perk_columns?: MechSizeId[][],
    team_size_perk_rows?: Record<number, TEAM_PERK[][]>,
}

export interface MechWeaponAttachment {
    id: number,
    weapon_id: MechWeaponId,
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
    traits: Trait<WeaponTraitId>[],
    valid: boolean,
    validation_message: string | null,
    max_uses: number | null,
}

export interface MechUpgradeAttachment {
    id: number,
    upgrade_id: MechUpgradeId,
    display_order: number | null,
}

export interface MechUpgradeInfo {
    upgrade_id: MechUpgradeId,
    display_name: string,
    description: string,
    valid: boolean,
    validation_message: string | null,
    slots: number,
    cost: number | null,
    team_perks: TeamPerkInfo[],
    faction_perks: FactionPerk[],
    max_uses: number | null,
    traits: Trait[],
    required_by_group: boolean,
}

export interface MechUpgradeAttachmentInfo extends MechUpgradeInfo {
    id: number,
    upgrade_id: MechUpgradeId,
}

export interface MechUpgradeTraitsInfo {
    used_team_perks: TeamPerkInfo[],
    faction_perks: FactionPerk[],
    traits: Trait[],
    max_uses: number | null,
}

export interface Mech {
    id: number,
    name?: string,
    size_id: MechSizeId,
    structure_mod_id: MECH_BODY_MOD,
    armor_mod_id: MECH_BODY_MOD,
    armor_upgrade_id: MechArmorUpgradeId,
    mobility_id: MECH_MOBILITY,
    preferred_team_id: MechTeamId,
    weapons: MechWeaponAttachment[],
    weapons_id_increment: number,
    upgrades: MechUpgradeAttachment[],
    upgrades_id_increment: number,
    display_order: number | null,
    unit_type_id: string,
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
    id: MechTeamId,
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

export interface Trait<ID extends string = string> {
    id: ID,
    number?: number | string,
    type?: string,
    display_name?: string,
    description?: string,
    dependent_trait_ids?: string[],
    granted_order_ids?: OrderId[],
}

export interface GarrisonUnitInfo extends InfantrySquadInfo {
    card_ref_id?: number,
}

export interface Order {
    id: string,
    display_name: string,
    description: string,
}

export type TraitFormatter = (name: string, number: number | string | undefined, type?: string) => string

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
    armor_upgrade_id: MechArmorUpgradeId,
    mobility: MechMobility,
    move: number,
    jump: number,
    tonnage_stat: number,
    defense: number,
    smash_damage: number,
    preferred_team_id: MechTeamId,
}

export interface TeamPerk {
    readonly id: TEAM_PERK,
    display_name: string,
    description: string,
    display_order: number,
    display_name_short?: string,
    visible_on_card?: boolean,
    card_note?: string,
    value?: number,
    stackable?: boolean,
    renderDisplayName?: (value: number, repeatCount?: number) => string,
    renderDesc?: (baseValue: number, repeatCount?: number) => string,
}

export interface MechArmorUpgradeInfo {
    id: MechArmorUpgradeId,
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