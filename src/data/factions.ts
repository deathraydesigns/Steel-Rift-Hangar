import {makeFrozenStaticListIds} from './data-helpers';
import {SA_ASSET_PROTECTION, SA_TERRITORIAL, SA_WILDCARDS, type SecondaryAgendaId} from './secondary-agendas';
import {
    BLO_DISGRACED_TRILLIONAIRE_OUTRAGEOUS_SUPPORT_BUDGET,
    BLO_DISGRACED_TRILLIONAIRE_PURCHASED_OUTCOMES,
    BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE,
    BLO_EX_MILITARY_VETERANS,
    BLO_POLITICAL_EXTREMISTS_EXPANSIONIST,
    BLO_POLITICAL_EXTREMISTS_IDEOLOGICAL,
    BLO_POLITICAL_EXTREMISTS_PROTECTIVIST,
    DWC_OUTRAGEOUS_SUPPORT_BUDGET,
    DWC_PURCHASED_OUTCOMES,
    DWC_TOP_END_HARDWARE,
    E_EMBEDDED_INFORMANTS,
    E_EXHAUSTIVE_INTEL_GATHERING,
    E_PAID_SABOTEURS,
   type FactionPerkId,
    MT_COORDINATED_ASSAULTS,
    MT_COVERED_ADVANCES,
    MT_ELITE_PILOT_PROGRAM,
    OI_MATERIEL_STOCKPILES,
    OI_ORBITAL_STOCKPILES,
    OI_STRATEGIC_ENERGY_RESERVES,
    PP_EXPANSIONIST,
    PP_IDEOLOGICAL,
    PP_PROTECTIVIST,
    RA_BAIT_AND_SWITCH,
    RA_RECKLESS_PILOTING,
    RA_UNPREDICTABLE_GAMBITS,
    RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS,
    RD_ADVANCED_HARDPOINT_DESIGN,
    RD_ADVANCED_STRUCTURAL_COMPONENTS,
    UA_INTIMIDATION_TACTICS,
    UA_NETWORK_HACKERS,
    UA_TECH_PIRATES_ADVANCED_ENERGY_MANAGEMENT_SYSTEM,
    UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN,
    UA_TECH_PIRATES_ADVANCED_STRUCTURAL_COMPONENTS,
} from './faction-perks';

export const NO_FACTION = 'NO_FACTION' as const;
export const AUTHORITIES = 'AUTHORITIES' as const;
export const CORPORATIONS = 'CORPORATIONS' as const;
export const FREELANCERS = 'FREELANCERS' as const;

export const MILITARY_TRAINING = 'MILITARY_TRAINING' as const;
export const POLITICAL_PRIORITY = 'POLITICAL_PRIORITY' as const;
export const OLD_INFRASTRUCTURE = 'OLD_INFRASTRUCTURE' as const;
export const ESPIONAGE = 'ESPIONAGE' as const;
export const RESEARCH_AND_DEVELOPMENT = 'RESEARCH_AND_DEVELOPMENT' as const;
export const DEEP_WAR_CHEST = 'DEEP_WAR_CHEST' as const;
export const ROGUE_AGENCY = 'ROGUE_AGENCY' as const;
export const UNDERWORLD_AFFILIATIONS = 'UNDERWORLD_AFFILIATIONS' as const;
export const BIG_LEAGUE_ORIGINS = 'BIG_LEAGUE_ORIGINS' as const;

export const DWC_TOP_END_HARDWARE_BONUS_TONS = -2;
export const RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS = -1;

export type FactionId =
    | typeof NO_FACTION
    | typeof AUTHORITIES
    | typeof CORPORATIONS
    | typeof FREELANCERS;

export type FactionPerkGroupId =
    | typeof MILITARY_TRAINING
    | typeof POLITICAL_PRIORITY
    | typeof OLD_INFRASTRUCTURE
    | typeof ESPIONAGE
    | typeof RESEARCH_AND_DEVELOPMENT
    | typeof DEEP_WAR_CHEST
    | typeof ROGUE_AGENCY
    | typeof UNDERWORLD_AFFILIATIONS
    | typeof BIG_LEAGUE_ORIGINS;

export interface FactionPerkGroup {
    id: FactionPerkGroupId;
    display_name: string;
    perk_ids: FactionPerkId[];
}

export interface Faction {
    id: FactionId;
    display_name: string;
    secondary_agenda_id?: SecondaryAgendaId;
    faction_perk_groups: Readonly<Record<FactionPerkGroupId, FactionPerkGroup>>;
}

export const FACTIONS: Readonly<Record<FactionId, Faction>> = makeFrozenStaticListIds<Faction>({
    [NO_FACTION]: {
        display_name: 'None',
        faction_perk_groups: makeFrozenStaticListIds<FactionPerkGroup>({}),
    },
    [AUTHORITIES]: {
        display_name: 'Authorities',
        secondary_agenda_id: SA_TERRITORIAL,
        faction_perk_groups: makeFrozenStaticListIds<FactionPerkGroup>({
            [MILITARY_TRAINING]: {
                display_name: 'Military Training',
                perk_ids: [
                    MT_COORDINATED_ASSAULTS,
                    MT_COVERED_ADVANCES,
                    MT_ELITE_PILOT_PROGRAM,
                ],
            },
            [POLITICAL_PRIORITY]: {
                display_name: 'Political Priority',
                perk_ids: [
                    PP_EXPANSIONIST,
                    PP_PROTECTIVIST,
                    PP_IDEOLOGICAL,
                ],
            },
            [OLD_INFRASTRUCTURE]: {
                display_name: 'Old Infrastructure',
                perk_ids: [
                    OI_ORBITAL_STOCKPILES,
                    OI_STRATEGIC_ENERGY_RESERVES,
                    OI_MATERIEL_STOCKPILES,
                ],
            },
        }),
    },
    [CORPORATIONS]: {
        display_name: 'Corporations',
        secondary_agenda_id: SA_ASSET_PROTECTION,
        faction_perk_groups: makeFrozenStaticListIds<FactionPerkGroup>({
            [ESPIONAGE]: {
                display_name: 'Espionage',
                perk_ids: [
                    E_EMBEDDED_INFORMANTS,
                    E_PAID_SABOTEURS,
                    E_EXHAUSTIVE_INTEL_GATHERING,
                ],
            },
            [RESEARCH_AND_DEVELOPMENT]: {
                display_name: 'Research and Development',
                perk_ids: [
                    RD_ADVANCED_HARDPOINT_DESIGN,
                    RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS,
                    RD_ADVANCED_STRUCTURAL_COMPONENTS,
                ],
            },
            [DEEP_WAR_CHEST]: {
                display_name: 'Deep War Chest',
                perk_ids: [
                    DWC_TOP_END_HARDWARE,
                    DWC_OUTRAGEOUS_SUPPORT_BUDGET,
                    DWC_PURCHASED_OUTCOMES,
                ],
            },
        }),
    },
    [FREELANCERS]: {
        display_name: 'Freelancers',
        secondary_agenda_id: SA_WILDCARDS,
        faction_perk_groups: makeFrozenStaticListIds<FactionPerkGroup>({
            [ROGUE_AGENCY]: {
                display_name: 'Rogue Agency',
                perk_ids: [
                    RA_UNPREDICTABLE_GAMBITS,
                    RA_RECKLESS_PILOTING,
                    RA_BAIT_AND_SWITCH,
                ],
            },
            [UNDERWORLD_AFFILIATIONS]: {
                display_name: 'Underworld Affiliations',
                perk_ids: [
                    UA_NETWORK_HACKERS,
                    UA_INTIMIDATION_TACTICS,
                    UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN,
                    UA_TECH_PIRATES_ADVANCED_ENERGY_MANAGEMENT_SYSTEM,
                    UA_TECH_PIRATES_ADVANCED_STRUCTURAL_COMPONENTS,
                ],
            },
            [BIG_LEAGUE_ORIGINS]: {
                display_name: 'Big League Origins',
                perk_ids: [
                    BLO_EX_MILITARY_VETERANS,
                    BLO_POLITICAL_EXTREMISTS_EXPANSIONIST,
                    BLO_POLITICAL_EXTREMISTS_PROTECTIVIST,
                    BLO_POLITICAL_EXTREMISTS_IDEOLOGICAL,

                    BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE,
                    BLO_DISGRACED_TRILLIONAIRE_OUTRAGEOUS_SUPPORT_BUDGET,
                    BLO_DISGRACED_TRILLIONAIRE_PURCHASED_OUTCOMES,
                ],
            },
        }),
    },
});
