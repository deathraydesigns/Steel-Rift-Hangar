import {makeFrozenStaticListIds} from './data-helpers.js';
export const SA_MISSION_MOMENTUM = 'SA_MISSION_MOMENTUM';
export const SA_DONT_GIVE_AN_INCH = 'SA_DONT_GIVE_AN_INCH';
export const SA_DEATH_FROM_ABOVE = 'SA_DEATH_FROM_ABOVE';
export const SA_FIRE_FOR_EFFECT = 'SA_FIRE_FOR_EFFECT';
export const SA_WILDCARDS = 'SA_WILDCARDS';
export const SA_ASSET_PROTECTION = 'SA_ASSET_PROTECTION';
export const SA_TERRITORIAL = 'SA_TERRITORIAL';
export const SA_TARGET_ELIMINATED = 'SA_TARGET_ELIMINATED';
export const SA_DRIVE_THEM_OUT = 'SA_DRIVE_THEM_OUT';
export const SA_TROPHY_TAKERS = 'SA_TROPHY_TAKERS';
export const SA_STALKERS = 'SA_STALKERS';
export const SA_BRAWLERS = 'SA_BRAWLERS';
export const SA_ENFORCERS = 'SA_ENFORCERS';
export const SA_TITAN_KILLERS = 'SA_TITAN_KILLERS';

export const SECONDARY_AGENDAS = makeSecondaryAgendas({
    [[SA_MISSION_MOMENTUM]]: {
        display_name: 'Mission Momentum',
        description: 'At the end of the Mission, score an additional 1 VP on turns 2 and 3 if your Force scored VP from the primary Mission Objective.',
    },
    [[SA_DONT_GIVE_AN_INCH]]: {
        display_name: 'Don’t Give an Inch',
        description: 'At the end of the Mission, score 1 VP if there are more Friendly HE-Vs than Enemy HE-Vs within 12” of your Deployment Corners or Edge. In the case of multiple Corners, there must be a friendly HE-V in range of all of them for this Agenda to be scored.',
    },
    [[SA_DEATH_FROM_ABOVE]]: {
        display_name: 'Death from Above',
        description: 'At the end of the Mission, score 1 VP if 2 or more enemy HE-Vs have been destroyed while resolving an Off-Table Asset called in using a Target Designator from a Unit on this Team.',
    },
    [[SA_FIRE_FOR_EFFECT]]: {
        display_name: 'Fire for Effect',
        description: 'At the end of the Mission, score 1 VP if 2 or more enemy HE-Vs have been destroyed while resolving a Weapon System actively using the Smart Trait for Line of Sight.',
    },
    [[SA_WILDCARDS]]: {
        display_name: 'Wildcards',
        description: 'Score 1 VP at the end of the Mission if over the course of the game two or more enemy HE-Vs were destroyed during an Order while you are the Active Player under the effect of any of the following Perks: Unpredictable Gambits, Reckless Piloting, Network Hackers or Intimidation Tactics.',
    },
    [[SA_ASSET_PROTECTION]]: {
        display_name: 'Asset Protection',
        description: 'Score 1 VP at the end of the Mission if the opposing Force has had more overall Tonnage in Units destroyed than your Force has.',
    },
    [[SA_TERRITORIAL]]: {
        display_name: 'Territorial',
        description: 'Score 1 VP if there are no active enemy Units within 10” of any of your deployment edges or corners at the end of the Mission.',
    },
    [[SA_TARGET_ELIMINATED]]: {
        display_name: 'Target Eliminated',
        description: 'At the end of the mission, score 1 VP if the heaviest HE-V deployed by the opposing Commander has been destroyed by a member of this Team. If the Opposing Commander has multiple HE-Vs in that size class, select one and note that secretly after forces are deployed.',
    },
    [[SA_DRIVE_THEM_OUT]]: {
        display_name: 'Drive Them Out',
        description: 'At the end of the mission, score an additional 1 VP if 40 Tons or more of opposing HE-Vs have been destroyed within 18” of an Opposing Commander’s Deployment edge or corner with a Smash Order.',
    },
    [[SA_TROPHY_TAKERS]]: {
        display_name: 'Trophy Takers',
        description: 'When any Unit in this Team, that is not within 18” of your deployment edge or corner, destroys an HE-V of weight class Light or heavier, secretly mark a kill for that Unit. If any Units in this Team with a marked kill are alive and within 8” of a friendly deployment edge or corner at the end of the mission, score 1 VP.',
    },
    [[SA_STALKERS]]: {
        display_name: 'Stalkers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Light HE-Vs. Every time a Light HE-V destroys a non-Support Asset Unit, or any unit with the Unit Type: Fortification trait, mark a Kill. If Light HE-Vs you control have earned 2 or more Kills over the course of the MIssion, and at least one of your Light HE-Vs is still Operational, score 1 VP.',
        is_universal: true,
    },
    [[SA_BRAWLERS]]: {
        display_name: 'Brawlers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Medium HE-Vs. Every time a Medium HE-V destroys a non-Support Asset Unit or any Unit with the Unit Type: Fortification trait, mark a Kill. If Medium HE-Vs you control have earned 3 or more Kills over the course of the Mission, and at least one of your Medium HE-Vs is still operational, score 1 VP.',
        is_universal: true,
    },
    [[SA_ENFORCERS]]: {
        display_name: 'Enforcers',
        description: 'You may select this Secondary Agenda if your Force contains two or more Heavy HE-Vs. Every time a Heavy HE-V destroys a non-Support Asset Unit or any Unit with the Unit Type: Fortification trait, mark a Kill. If Heavy HE-Vs you control have earned 3 or more Kills over the course of the Mission, and at least one of your Heavy HE-Vs is still operational, score 1 VP.',
        is_universal: true,
    },
    [[SA_TITAN_KILLERS]]: {
        display_name: 'Titan-Killers',
        description: 'You may select this Secondary Agenda if your Opponent’s Force contains two or more Heavy HE-Vs or at least one Ultra-Heavy HE-V. Every time an HE-V in your force of a Class Medium or smaller destroys a Heavy HE-V, mark a Kill. Every time an HE-V in your Force of a Class Heavy or smaller destroys an Ultra-Heavy HE-V, mark two Kills. If your force has earned 2 or more Kills over the course of the Mission and there are any HE-Vs you control surviving of a Class smaller than Heavy or Ultra-Heavy, score 1 VP.',
        is_universal: true,
        subtype_display_name: 'Opponent Eligible',
    },
});

function makeSecondaryAgendas(items) {
    Object.values(items).forEach(item => {
        if (item.is_universal) {
            item.type_display_name = 'Universal';
        }
    });

    return makeFrozenStaticListIds(items);
}