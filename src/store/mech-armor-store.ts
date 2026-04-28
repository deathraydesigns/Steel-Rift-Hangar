import type { ValidationResult } from '../_types';
import { FACTION_PERK, FACTION_PERKS, type FactionPerk } from '../data/faction-perks';
import { MECH_BODY_MOD, MECH_BODY_MODS, type MechBodyModInfo } from '../data/mech-body-mod';
import { useFactionStore } from './faction-store';
import { useMechStore } from './mech-store';
import { useTeamStore } from './team-store';

export function useMechArmorStore(scope?: string) {
    const factionStore = useFactionStore(scope);
    const mechStore = useMechStore(scope);
    const teamStore = useTeamStore(scope);

    function getBodyModInfo(mechId: number, bodyModId: MECH_BODY_MOD, validator: (mechId: number, bodyModId: MECH_BODY_MOD) => ValidationResult): MechBodyModInfo {

        const bodyMod = MECH_BODY_MODS[bodyModId];
        const faction_perks: FactionPerk[] = [];

        const stockpilesPerk = factionStore.hasMaterielStockpilesInfo;
        let max_tons = bodyMod.max_tons;
        if (stockpilesPerk && bodyModId === MECH_BODY_MOD.REINFORCED) {
            faction_perks.push(FACTION_PERKS[FACTION_PERK.OI_MATERIEL_STOCKPILES]);
            max_tons += 1;
        }

        return {
            ...bodyMod,
            max_tons,
            faction_perks,
            ...validator(mechId, bodyModId),
        };
    }

    function getStructureBodyModInfo(mechId: number, bodyModId: MECH_BODY_MOD) {
        return getBodyModInfo(mechId, bodyModId, getMechStructureModValid);
    }

    function getArmorBodyModInfo(mechId: number, bodyModId: MECH_BODY_MOD) {
        return getBodyModInfo(mechId, bodyModId, getMechArmorModValid);
    }

    function getMechStructureModOptions(mechId: number) {
        return Object.values(MECH_BODY_MOD)
            .map((id) => getStructureBodyModInfo(mechId, id));
    }

    function getMechArmorModOptions(mechId: number) {
        return Object.values(MECH_BODY_MOD)
            .map((id) => getArmorBodyModInfo(mechId, id));
    }

    function getMechStructureModValid(mechId: number, modId: MECH_BODY_MOD): ValidationResult {
        const mech = mechStore.getMech(mechId);
        if (!mech) return { valid: true, validation_message: null };
        const { teamId, groupId } = teamStore.getMechTeamAndGroupIds(mechId);
        const teamDisplayName = teamStore.getTeamDisplayName(teamId);
        const groupDef = teamStore.getTeamGroupDef(teamId, groupId);

        if (!getBodyModValid(groupDef.limited_structure_mod_ids, modId)) {
            return {
                valid: false,
                validation_message: `Not available to ${teamDisplayName} ${groupDef.display_name}`,
            };
        }

        const requiredId = groupDef.required_armor_or_structure_mod_id_once;
        if (requiredId) {
            if (!requiredStructureOrArmorModValid(
                mech.structure_mod_id,
                mech.armor_mod_id,
                requiredId,
                modId,
            )) {
                const requiredDisplayName = MECH_BODY_MODS[requiredId].display_name;
                return {
                    valid: false,
                    validation_message: `${teamDisplayName} requires ${groupDef.display_name} structure or armor to be ${requiredDisplayName}`,
                };
            }
        }

        return {
            valid: true,
            validation_message: null,
        };
    }

    function getMechArmorModValid(mechId: number, modId: MECH_BODY_MOD): ValidationResult {
        const mech = mechStore.getMech(mechId);
        if (!mech) return { valid: true, validation_message: null };
        const { teamId, groupId } = teamStore.getMechTeamAndGroupIds(mechId);
        const teamDisplayName = teamStore.getTeamDisplayName(teamId);
        const groupDef = teamStore.getTeamGroupDef(teamId, groupId);

        if (!getBodyModValid(groupDef.limited_armor_mod_ids, modId)) {
            return {
                valid: false,
                validation_message: `Not available to ${teamDisplayName} ${groupDef.display_name}`,
            };
        }

        const requiredId = groupDef.required_armor_or_structure_mod_id_once;
        if (requiredId) {
            if (!requiredStructureOrArmorModValid(
                mech.armor_mod_id,
                mech.structure_mod_id,
                requiredId,
                modId,
            )) {
                return {
                    valid: false,
                    validation_message: `${teamDisplayName} requires ${groupDef.display_name} structure or armor to be Reinforced`,
                };
            }
        }

        return {
            valid: true,
            validation_message: null,
        };
    }

    function requiredStructureOrArmorModValid(currentModId: MECH_BODY_MOD, otherModId: MECH_BODY_MOD, requiredId: MECH_BODY_MOD, modId: MECH_BODY_MOD) {
        return !(otherModId !== requiredId &&
            currentModId === requiredId &&
            modId !== requiredId);
    }

    function getBodyModValid(limitedModIds: MECH_BODY_MOD[], modId: MECH_BODY_MOD) {
        if (!limitedModIds.length) return true;

        return limitedModIds.includes(modId);
    }

    return {
        getStructureBodyModInfo,
        getArmorBodyModInfo,
        getMechStructureModOptions,
        getMechArmorModOptions,
    };
}