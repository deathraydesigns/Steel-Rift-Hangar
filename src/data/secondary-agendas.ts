import { makeFrozenStaticListIds } from './data-helpers';

export enum SECONDARY_AGENDA {
    MISSION_MOMENTUM = 'SA_MISSION_MOMENTUM',
    DONT_GIVE_AN_INCH = 'SA_DONT_GIVE_AN_INCH',
    DEATH_FROM_ABOVE = 'SA_DEATH_FROM_ABOVE',
    FIRE_FOR_EFFECT = 'SA_FIRE_FOR_EFFECT',
    WILDCARDS = 'SA_WILDCARDS',
    ASSET_PROTECTION = 'SA_ASSET_PROTECTION',
    TERRITORIAL = 'SA_TERRITORIAL',
    TARGET_ELIMINATED = 'SA_TARGET_ELIMINATED',
    DRIVE_THEM_OUT = 'SA_DRIVE_THEM_OUT',
    TROPHY_TAKERS = 'SA_TROPHY_TAKERS',
    STALKERS = 'SA_STALKERS',
    BRAWLERS = 'SA_BRAWLERS',
    ENFORCERS = 'SA_ENFORCERS',
    TITAN_KILLERS = 'SA_TITAN_KILLERS',
    EXPAND_THE_NETWORK = 'SA_EXPAND_THE_NETWORK',
    COMBINED_ARMS_ASSAULT = 'SA_COMBINED_ARMS_ASSAULT'
}

export interface SecondaryAgenda {
    id: SECONDARY_AGENDA;
    display_name: string;
    description: string;
    is_universal?: boolean;
    type_display_name?: string;
    subtype_display_name?: string;
}

export const SECONDARY_AGENDAS: Record<SECONDARY_AGENDA, SecondaryAgenda> = makeSecondaryAgendas({
    [SECONDARY_AGENDA.MISSION_MOMENTUM]: {
        display_name: 'Mission Momentum',
        description: 'When checking for Victory, if your Force scored VP from the primary Mission Objective on turns 2 and 3, score 1 VP.',
    },
    [SECONDARY_AGENDA.DONT_GIVE_AN_INCH]: {
        display_name: 'Don’t Give an Inch',
        description: 'When checking for Victory, if there are more friendly HE‑Vs than Enemy HE‑Vs within 12” of your Deployment Corners or Edge, score 1 VP. In the case of multiple Corners, there must be a friendly HE‑V in range of all of them for this Agenda to be scored.',
    },
    [SECONDARY_AGENDA.DEATH_FROM_ABOVE]: {
        display_name: 'Death from Above',
        description: 'When checking for Victory, if 2 or more enemy HE‑Vs have been Destroyed while resolving an Off‑Table Asset called in using a Target Designator from a Unit on this Team, score 1 VP.',
    },
    [SECONDARY_AGENDA.FIRE_FOR_EFFECT]: {
        display_name: 'Fire for Effect',
        description: 'When checking for Victory, if 2 or more enemy HE‑Vs have been Destroyed by a Weapon on a member of this team actively using the Smart Trait for Line of Sight, score 1 VP.',
    },
    [SECONDARY_AGENDA.WILDCARDS]: {
        display_name: 'Wildcards',
        description: 'Every time a friendly HE‑V Destroys an enemy HE‑V, and the friendly HE‑V is under the effect of any of the following Perks: Unpredictable Gambits, Reckless Piloting, Network Hackers or Intimidation Tactics, mark a Wildcard Kill. When checking for Victory, if you have earned 2 or more Wildcard kills, score 1 VP',
    },
    [SECONDARY_AGENDA.ASSET_PROTECTION]: {
        display_name: 'Asset Protection',
        description: 'When checking for Victory, if the opposing Force has had more overall Tonnage in Units Destroyed than your Force has, score 1 VP.',
    },
    [SECONDARY_AGENDA.TERRITORIAL]: {
        display_name: 'Territorial',
        description: 'When checking for Victory, if there are no active enemy Units within 10” of any of your Deployment Edges or Corners, score 1 VP.',
    },
    [SECONDARY_AGENDA.TARGET_ELIMINATED]: {
        display_name: 'Target Eliminated',
        description: 'When checking for Victory, if the heaviest HE‑V deployed by the opposing Commander has been Destroyed by a member of this Team, score 1 VP. If the enemy Commander has multiple HE‑Vs in that size class, select one and note that after Forces are Deployed.',
    },
    [SECONDARY_AGENDA.DRIVE_THEM_OUT]: {
        display_name: 'Drive Them Out',
        description: 'When checking for Victory, if 40 Tons or more of opposing HE‑Vs have been Destroyed with a SMASH Order while within 18” of the enemy Commander’s Deployment Edge or Corner, score 1 VP.',
    },
    [SECONDARY_AGENDA.TROPHY_TAKERS]: {
        display_name: 'Trophy Takers',
        description: ' When any Unit in this Team, that is not within 18” of your Deployment Edge or Corner, Destroys an HE‑V, mark a Kill for that Unit. If any Units in this Team with a marked Kill are not Destroyed and within 8” of a friendly Deployment Edge or Corner at the end of the mission, score 1 VP.',
    },
    [SECONDARY_AGENDA.STALKERS]: {
        display_name: 'Stalkers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Light HE-Vs. Every time a Light HE‑V Destroys an HE‑V or Unit with the Fortification trait, mark a Kill. If Light HE-Vs you control have earned 2 or more Kills when you check for Victory, and at least one of your Light HE‑Vs is not Destroyed, score 1 VP.',
        is_universal: true,
    },
    [SECONDARY_AGENDA.BRAWLERS]: {
        display_name: 'Brawlers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Medium HE-Vs. Every time a Medium HE‑V Destroys an HE‑V or Unit with the Fortification trait, mark a Kill. If Medium HE‑Vs you control have earned 3 or more Kills when you check for Victory, and at least one of your Medium HE‑Vs is not Destroyed, score 1 VP.',
        is_universal: true,
    },
    [SECONDARY_AGENDA.ENFORCERS]: {
        display_name: 'Enforcers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Heavy HE-Vs. Every time a Heavy HE‑V Destroys an HE‑V or Unit with the Fortification trait, mark a Kill. If Heavy HE‑Vs you control have earned 3 or more Kills when you check for Victory, and at least one of your Heavy HE‑Vs is not Destroyed, score 1 VP.',
        is_universal: true,
    },
    [SECONDARY_AGENDA.TITAN_KILLERS]: {
        display_name: 'Titan-Killers',
        description: 'You may select this Secondary Agenda if your Opponent’s Force contains two or more Heavy HE-Vs or at least one Ultra-Heavy HE-V. Every time an HE‑V in your force of a Class Medium or smaller Destroys a Heavy HE‑V, mark a Kill. Every time an HE‑V in your Force of a Class Heavy or smaller destroys an Ultraheavy HE‑V, mark two Kills. If your force has earned 2 or more Kills when you check for Victory and there are any HE‑Vs you control of a Class smaller than Heavy or Ultraheavy that are not Destroyed, score 1 VP.',
        is_universal: true,
        subtype_display_name: 'Opponent Eligible',
    },
    [SECONDARY_AGENDA.EXPAND_THE_NETWORK]: {
        display_name: 'Expand the Network',
        description: 'When checking for Victory, if a) at least 2 member Units of the team are not Destroyed and b) each remaining member of the team is in a different quarter of the Mission Area, score 1 VP.',
    },
    [SECONDARY_AGENDA.COMBINED_ARMS_ASSAULT]: {
        display_name: 'Combined Arms Assault',
        description: `When any member of this team destroys an enemy HE-V, before it is removed, the Commander of this unit places an Objective token in base to base with the Destroyed HE-V.` +
            ` • If a Support Asset member of this team Destroyed the HE-V, an HE-V member of this team may CAPTURE it.` +
            ` • If an HE-V member of this team Destroyed the HE-V, a Support Asset member of this team may CAPTURE it (Note: the Support Asset member may Control and CAPTURE an Objective for the purpose of this Agenda only).` +
            ` • No other units may CAPTURE it.` +
            ` If you CAPTURED this Objective token, when checking for Victory, score 1 VP.`,
    },
});

function makeSecondaryAgendas(items: Record<SECONDARY_AGENDA, Omit<SecondaryAgenda, 'id'>>): Record<SECONDARY_AGENDA, SecondaryAgenda> {
    const result = {} as Record<SECONDARY_AGENDA, SecondaryAgenda>;
    for (const [id, item] of Object.entries(items)) {
        result[id as SECONDARY_AGENDA] = {
            ...item,
            id: id as SECONDARY_AGENDA,
            type_display_name: item.is_universal ? 'Universal' : undefined,
        };
    }

    return makeFrozenStaticListIds<SecondaryAgenda>(result) as Readonly<Record<SECONDARY_AGENDA, SecondaryAgenda>>;
}
