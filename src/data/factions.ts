import { makeFrozenStaticListIds } from './data-helpers';
import { FACTION_PERK } from './faction-perks';
import { SECONDARY_AGENDA } from './secondary-agendas';

export enum FACTION {
    NO_FACTION = 'NO_FACTION',
    AUTHORITIES = 'AUTHORITIES',
    CORPORATIONS = 'CORPORATIONS',
    FREELANCERS = 'FREELANCERS',
}

export const DWC_TOP_END_HARDWARE_BONUS_TONS = -2;
export const RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS = -1;

export enum FACTION_PERK_GROUP {
    MILITARY_TRAINING = 'MILITARY_TRAINING',
    POLITICAL_PRIORITY = 'POLITICAL_PRIORITY',
    OLD_INFRASTRUCTURE = 'OLD_INFRASTRUCTURE',
    ESPIONAGE = 'ESPIONAGE',
    RESEARCH_AND_DEVELOPMENT = 'RESEARCH_AND_DEVELOPMENT',
    DEEP_WAR_CHEST = 'DEEP_WAR_CHEST',
    ROGUE_AGENCY = 'ROGUE_AGENCY',
    UNDERWORLD_AFFILIATIONS = 'UNDERWORLD_AFFILIATIONS',
    BIG_LEAGUE_ORIGINS = 'BIG_LEAGUE_ORIGINS',
}

export interface FactionPerkGroup<ID extends Partial<FACTION_PERK_GROUP>> {
    id: ID;
    display_name: string;
    perk_ids: FACTION_PERK[];
}

export interface Faction {
    id: FACTION;
    display_name: string;
    secondary_agenda_id?: SECONDARY_AGENDA;
    faction_perk_groups: Readonly<Partial<Record<FACTION_PERK_GROUP, FactionPerkGroup<any>>>>;
}

function perkGroups<ID extends FACTION_PERK_GROUP>(
    obj: Record<ID, Omit<FactionPerkGroup<ID>, 'id'>>,
) {
    return makeFrozenStaticListIds<FactionPerkGroup<ID>, ID>(obj);
}

export const FACTIONS = makeFrozenStaticListIds<Faction>({
    [FACTION.NO_FACTION]: {
        display_name: 'None',
        faction_perk_groups: makeFrozenStaticListIds({}),
    },
    [FACTION.AUTHORITIES]: {
        display_name: 'Authorities',
        secondary_agenda_id: SECONDARY_AGENDA.TERRITORIAL,
        faction_perk_groups: perkGroups({
            [FACTION_PERK_GROUP.MILITARY_TRAINING]: {
                display_name: 'Military Training',
                perk_ids: [
                    FACTION_PERK.MT_COORDINATED_ASSAULTS,
                    FACTION_PERK.MT_COVERED_ADVANCES,
                    FACTION_PERK.MT_ELITE_PILOT_PROGRAM,
                ],
            },
            [FACTION_PERK_GROUP.POLITICAL_PRIORITY]: {
                display_name: 'Political Priority',
                perk_ids: [
                    FACTION_PERK.PP_EXPANSIONIST,
                    FACTION_PERK.PP_PROTECTIVIST,
                    FACTION_PERK.PP_IDEOLOGICAL,
                ],
            },
            [FACTION_PERK_GROUP.OLD_INFRASTRUCTURE]: {
                display_name: 'Old Infrastructure',
                perk_ids: [
                    FACTION_PERK.OI_ORBITAL_STOCKPILES,
                    FACTION_PERK.OI_STRATEGIC_ENERGY_RESERVES,
                    FACTION_PERK.OI_MATERIEL_STOCKPILES,
                ],
            },
        }),
    },
    [FACTION.CORPORATIONS]: {
        display_name: 'Corporations',
        secondary_agenda_id: SECONDARY_AGENDA.ASSET_PROTECTION,
        faction_perk_groups: perkGroups({
            [FACTION_PERK_GROUP.ESPIONAGE]: {
                display_name: 'Espionage',
                perk_ids: [
                    FACTION_PERK.E_EMBEDDED_INFORMANTS,
                    FACTION_PERK.E_PAID_SABOTEURS,
                    FACTION_PERK.E_EXHAUSTIVE_INTEL_GATHERING,
                ],
            },
            [FACTION_PERK_GROUP.RESEARCH_AND_DEVELOPMENT]: {
                display_name: 'Research and Development',
                perk_ids: [
                    FACTION_PERK.RD_ADVANCED_HARDPOINT_DESIGN,
                    FACTION_PERK.RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS,
                    FACTION_PERK.RD_ADVANCED_STRUCTURAL_COMPONENTS,
                ],
            },
            [FACTION_PERK_GROUP.DEEP_WAR_CHEST]: {
                display_name: 'Deep War Chest',
                perk_ids: [
                    FACTION_PERK.DWC_TOP_END_HARDWARE,
                    FACTION_PERK.DWC_OUTRAGEOUS_SUPPORT_BUDGET,
                    FACTION_PERK.DWC_PURCHASED_OUTCOMES,
                ],
            },
        }),
    },
    [FACTION.FREELANCERS]: {
        display_name: 'Freelancers',
        secondary_agenda_id: SECONDARY_AGENDA.WILDCARDS,
        faction_perk_groups: perkGroups({
            [FACTION_PERK_GROUP.ROGUE_AGENCY]: {
                display_name: 'Rogue Agency',
                perk_ids: [
                    FACTION_PERK.RA_UNPREDICTABLE_GAMBITS,
                    FACTION_PERK.RA_RECKLESS_PILOTING,
                    FACTION_PERK.RA_BAIT_AND_SWITCH,
                ],
            },
            [FACTION_PERK_GROUP.UNDERWORLD_AFFILIATIONS]: {
                display_name: 'Underworld Affiliations',
                perk_ids: [
                    FACTION_PERK.UA_NETWORK_HACKERS,
                    FACTION_PERK.UA_INTIMIDATION_TACTICS,
                    FACTION_PERK.UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN,
                    FACTION_PERK.UA_TECH_PIRATES_ADVANCED_ENERGY_MANAGEMENT_SYSTEM,
                    FACTION_PERK.UA_TECH_PIRATES_ADVANCED_STRUCTURAL_COMPONENTS,
                ],
            },
            [FACTION_PERK_GROUP.BIG_LEAGUE_ORIGINS]: {
                display_name: 'Big League Origins',
                perk_ids: [
                    FACTION_PERK.BLO_EX_MILITARY_VETERANS,
                    FACTION_PERK.BLO_POLITICAL_EXTREMISTS_EXPANSIONIST,
                    FACTION_PERK.BLO_POLITICAL_EXTREMISTS_PROTECTIVIST,
                    FACTION_PERK.BLO_POLITICAL_EXTREMISTS_IDEOLOGICAL,

                    FACTION_PERK.BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE,
                    FACTION_PERK.BLO_DISGRACED_TRILLIONAIRE_OUTRAGEOUS_SUPPORT_BUDGET,
                    FACTION_PERK.BLO_DISGRACED_TRILLIONAIRE_PURCHASED_OUTCOMES,
                ],
            },
        }),
    },
});
