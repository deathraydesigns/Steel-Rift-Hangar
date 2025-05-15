import {listToDropDown, makeFrozenStaticListIds} from './data-helpers.js';
import {SA_ASSET_PROTECTION, SA_TERRITORIAL, SA_WILDCARDS} from './secondary-agendas.js';
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
} from './faction-perks.js';

export const NO_FACTION = 'NO_FACTION';
export const AUTHORITIES = 'AUTHORITIES';
export const CORPORATIONS = 'CORPORATIONS';
export const FREELANCERS = 'FREELANCERS';
export const MILITARY_TRAINING = 'MILITARY_TRAINING';
export const POLITICAL_PRIORITY = 'POLITICAL_PRIORITY';
export const OLD_INFRASTRUCTURE = 'OLD_INFRASTRUCTURE';
export const ESPIONAGE = 'ESPIONAGE';
export const RESEARCH_AND_DEVELOPMENT = 'RESEARCH_AND_DEVELOPMENT';
export const DEEP_WAR_CHEST = 'DEEP_WAR_CHEST';
export const ROGUE_AGENCY = 'ROGUE_AGENCY';
export const UNDERWORLD_AFFILIATIONS = 'UNDERWORLD_AFFILIATIONS';
export const BIG_LEAGUE_ORIGINS = 'BIG_LEAGUE_ORIGINS';
export const DWC_TOP_END_HARDWARE_BONUS_TONS = -2;
export const RD_ADVANCED_HARDPOINT_DESIGN_BONUS_SLOTS = -1;
export const FACTIONS = makeFrozenStaticListIds({
    [[NO_FACTION]]: {
        display_name: 'None',
        faction_perk_groups: makeFrozenStaticListIds({}),
    },
    [[AUTHORITIES]]: {
        display_name: 'Authorities',
        secondary_agenda_id: SA_TERRITORIAL,
        faction_perk_groups: makeFrozenStaticListIds({
            [[MILITARY_TRAINING]]: {
                display_name: 'Military Training',
                perk_ids: [
                    MT_COORDINATED_ASSAULTS,
                    MT_COVERED_ADVANCES,
                    MT_ELITE_PILOT_PROGRAM,
                ],
            },
            [[POLITICAL_PRIORITY]]: {
                display_name: 'Political Priority',
                perk_ids: [
                    PP_EXPANSIONIST,
                    PP_PROTECTIVIST,
                    PP_IDEOLOGICAL,
                ],
            },
            [[OLD_INFRASTRUCTURE]]: {
                display_name: 'Old Infrastructure',
                perk_ids: [
                    OI_ORBITAL_STOCKPILES,
                    OI_STRATEGIC_ENERGY_RESERVES,
                    OI_MATERIEL_STOCKPILES,
                ],
            },
        }),
    },
    [[CORPORATIONS]]: {
        display_name: 'Corporations',
        secondary_agenda_id: SA_ASSET_PROTECTION,
        faction_perk_groups: makeFrozenStaticListIds({
            [[ESPIONAGE]]: {
                display_name: 'Espionage',
                perk_ids: [
                    E_EMBEDDED_INFORMANTS,
                    E_PAID_SABOTEURS,
                    E_EXHAUSTIVE_INTEL_GATHERING,
                ],
            },
            [[RESEARCH_AND_DEVELOPMENT]]: {
                display_name: 'Research and Development',
                perk_ids: [
                    RD_ADVANCED_HARDPOINT_DESIGN,
                    RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS,
                    RD_ADVANCED_STRUCTURAL_COMPONENTS,
                ],
            },
            [[DEEP_WAR_CHEST]]: {
                display_name: 'Deep War Chest',
                perk_ids: [
                    DWC_TOP_END_HARDWARE,
                    DWC_OUTRAGEOUS_SUPPORT_BUDGET,
                    DWC_PURCHASED_OUTCOMES,
                ],
            },
        }),
    },
    [[FREELANCERS]]: {
        display_name: 'Freelancers',
        secondary_agenda_id: SA_WILDCARDS,
        faction_perk_groups: makeFrozenStaticListIds({
            [[ROGUE_AGENCY]]: {
                display_name: 'Rogue Agency',
                perk_ids: [
                    RA_UNPREDICTABLE_GAMBITS,
                    RA_RECKLESS_PILOTING,
                    RA_BAIT_AND_SWITCH,
                ],
            },
            [[UNDERWORLD_AFFILIATIONS]]: {
                display_name: 'Underworld Affiliations',
                perk_ids: [
                    UA_NETWORK_HACKERS,
                    UA_INTIMIDATION_TACTICS,
                    UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN,
                    UA_TECH_PIRATES_ADVANCED_ENERGY_MANAGEMENT_SYSTEM,
                    UA_TECH_PIRATES_ADVANCED_STRUCTURAL_COMPONENTS,
                ],
            },
            [[BIG_LEAGUE_ORIGINS]]: {
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

export const FACTIONS_DROP_DOWN = listToDropDown(FACTIONS);
