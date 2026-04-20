import { makeFrozenStaticListIds } from './data-helpers';

export const SA_MISSION_MOMENTUM = 'SA_MISSION_MOMENTUM' as const;
export const SA_DONT_GIVE_AN_INCH = 'SA_DONT_GIVE_AN_INCH' as const;
export const SA_DEATH_FROM_ABOVE = 'SA_DEATH_FROM_ABOVE' as const;
export const SA_FIRE_FOR_EFFECT = 'SA_FIRE_FOR_EFFECT' as const;
export const SA_WILDCARDS = 'SA_WILDCARDS' as const;
export const SA_ASSET_PROTECTION = 'SA_ASSET_PROTECTION' as const;
export const SA_TERRITORIAL = 'SA_TERRITORIAL' as const;
export const SA_TARGET_ELIMINATED = 'SA_TARGET_ELIMINATED' as const;
export const SA_DRIVE_THEM_OUT = 'SA_DRIVE_THEM_OUT' as const;
export const SA_TROPHY_TAKERS = 'SA_TROPHY_TAKERS' as const;
export const SA_STALKERS = 'SA_STALKERS' as const;
export const SA_BRAWLERS = 'SA_BRAWLERS' as const;
export const SA_ENFORCERS = 'SA_ENFORCERS' as const;
export const SA_TITAN_KILLERS = 'SA_TITAN_KILLERS' as const;

export const SA_EXPAND_THE_NETWORK = 'SA_EXPAND_THE_NETWORK' as const;

export type SecondaryAgendaId =
    | typeof SA_MISSION_MOMENTUM
    | typeof SA_DONT_GIVE_AN_INCH
    | typeof SA_DEATH_FROM_ABOVE
    | typeof SA_FIRE_FOR_EFFECT
    | typeof SA_WILDCARDS
    | typeof SA_ASSET_PROTECTION
    | typeof SA_TERRITORIAL
    | typeof SA_TARGET_ELIMINATED
    | typeof SA_DRIVE_THEM_OUT
    | typeof SA_TROPHY_TAKERS
    | typeof SA_STALKERS
    | typeof SA_BRAWLERS
    | typeof SA_ENFORCERS
    | typeof SA_TITAN_KILLERS
    | typeof SA_EXPAND_THE_NETWORK

export interface SecondaryAgenda {
    id: SecondaryAgendaId;
    display_name: string;
    description: string;
    is_universal?: boolean;
    type_display_name?: string;
    subtype_display_name?: string;
}

export const SECONDARY_AGENDAS: Readonly<Record<SecondaryAgendaId, SecondaryAgenda>> = makeSecondaryAgendas({
    [SA_MISSION_MOMENTUM]: {
        display_name: 'Mission Momentum',
        description: 'When checking for Victory, if your Force scored VP from the primary Mission Objective on turns 2 and 3, score 1 VP.',
    },
    [SA_DONT_GIVE_AN_INCH]: {
        display_name: 'Don’t Give an Inch',
        description: 'When checking for Victory, if there are more friendly HE‑Vs than Enemy HE‑Vs within 12” of your Deployment Corners or Edge, score 1 VP. In the case of multiple Corners, there must be a friendly HE‑V in range of all of them for this Agenda to be scored.',
    },
    [SA_DEATH_FROM_ABOVE]: {
        display_name: 'Death from Above',
        description: 'When checking for Victory, if 2 or more enemy HE‑Vs have been Destroyed while resolving an Off‑Table Asset called in using a Target Designator from a Unit on this Team, score 1 VP.',
    },
    [SA_FIRE_FOR_EFFECT]: {
        display_name: 'Fire for Effect',
        description: 'When checking for Victory, if 2 or more enemy HE‑Vs have been Destroyed by a Weapon on a member of this team actively using the Smart Trait for Line of Sight, score 1 VP.',
    },
    [SA_WILDCARDS]: {
        display_name: 'Wildcards',
        description: 'Every time a friendly HE‑V Destroys an enemy HE‑V, and the friendly HE‑V is under the effect of any of the following Perks: Unpredictable Gambits, Reckless Piloting, Network Hackers or Intimidation Tactics, mark a Wildcard Kill. When checking for Victory, if you have earned 2 or more Wildcard kills, score 1 VP',
    },
    [SA_ASSET_PROTECTION]: {
        display_name: 'Asset Protection',
        description: 'When checking for Victory, if the opposing Force has had more overall Tonnage in Units Destroyed than your Force has, score 1 VP.',
    },
    [SA_TERRITORIAL]: {
        display_name: 'Territorial',
        description: 'When checking for Victory, if there are no active enemy Units within 10” of any of your Deployment Edges or Corners, score 1 VP.',
    },
    [SA_TARGET_ELIMINATED]: {
        display_name: 'Target Eliminated',
        description: 'When checking for Victory, if the heaviest HE‑V deployed by the opposing Commander has been Destroyed by a member of this Team, score 1 VP. If the enemy Commander has multiple HE‑Vs in that size class, select one and note that after Forces are Deployed.',
    },
    [SA_DRIVE_THEM_OUT]: {
        display_name: 'Drive Them Out',
        description: 'When checking for Victory, if 40 Tons or more of opposing HE‑Vs have been Destroyed with a SMASH Order while within 18” of the enemy Commander’s Deployment Edge or Corner, score 1 VP.',
    },
    [SA_TROPHY_TAKERS]: {
        display_name: 'Trophy Takers',
        description: ' When any Unit in this Team, that is not within 18” of your Deployment Edge or Corner, Destroys an HE‑V, mark a Kill for that Unit. If any Units in this Team with a marked Kill are not Destroyed and within 8” of a friendly Deployment Edge or Corner at the end of the mission, score 1 VP.',
    },
    [SA_STALKERS]: {
        display_name: 'Stalkers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Light HE-Vs. Every time a Light HE‑V Destroys an HE‑V or Unit with the Fortification trait, mark a Kill. If Light HE-Vs you control have earned 2 or more Kills when you check for Victory, and at least one of your Light HE‑Vs is not Destroyed, score 1 VP.',
        is_universal: true,
    },
    [SA_BRAWLERS]: {
        display_name: 'Brawlers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Medium HE-Vs. Every time a Medium HE‑V Destroys an HE‑V or Unit with the Fortification trait, mark a Kill. If Medium HE‑Vs you control have earned 3 or more Kills when you check for Victory, and at least one of your Medium HE‑Vs is not Destroyed, score 1 VP.',
        is_universal: true,
    },
    [SA_ENFORCERS]: {
        display_name: 'Enforcers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Heavy HE-Vs. Every time a Heavy HE‑V Destroys an HE‑V or Unit with the Fortification trait, mark a Kill. If Heavy HE‑Vs you control have earned 3 or more Kills when you check for Victory, and at least one of your Heavy HE‑Vs is not Destroyed, score 1 VP.',
        is_universal: true,
    },
    [SA_TITAN_KILLERS]: {
        display_name: 'Titan-Killers',
        description: 'You may select this Secondary Agenda if your Opponent’s Force contains two or more Heavy HE-Vs or at least one Ultra-Heavy HE-V. Every time an HE‑V in your force of a Class Medium or smaller Destroys a Heavy HE‑V, mark a Kill. Every time an HE‑V in your Force of a Class Heavy or smaller destroys an Ultraheavy HE‑V, mark two Kills. If your force has earned 2 or more Kills when you check for Victory and there are any HE‑Vs you control of a Class smaller than Heavy or Ultraheavy that are not Destroyed, score 1 VP.',
        is_universal: true,
        subtype_display_name: 'Opponent Eligible',
    },
    [SA_EXPAND_THE_NETWORK]: {
        display_name: 'Expand the Network',
        description: 'When checking for Victory, if a) at least 2 member Units of the team are not Destroyed and b) each remaining member of the team is in a different quarter of the Mission Area, score 1 VP.',
    },
});

function makeSecondaryAgendas(items: Record<string, Omit<SecondaryAgenda, 'id'>>): Record<SecondaryAgendaId, SecondaryAgenda> {
    const result = {} as Record<SecondaryAgendaId, SecondaryAgenda>;
    for (const [id, item] of Object.entries(items)) {
        result[id as SecondaryAgendaId] = {
            ...item,
            id: id as SecondaryAgendaId,
            type_display_name: item.is_universal ? 'Universal' : undefined,
        };
    }

    return makeFrozenStaticListIds<SecondaryAgenda>(result) as Readonly<Record<SecondaryAgendaId, SecondaryAgenda>>;
}
