import {makeFrozenStaticListIds, makeStaticListIds} from './data-helpers.js';

export const MT_COORDINATED_ASSAULTS = 'MT_COORDINATED_ASSAULTS';
export const MT_COVERED_ADVANCES = 'MT_COVERED_ADVANCES';
export const MT_ELITE_PILOT_PROGRAM = 'MT_ELITE_PILOT_PROGRAM';
export const PP_EXPANSIONIST = 'PP_EXPANSIONIST';
export const PP_PROTECTIVIST = 'PP_PROTECTIVIST';
export const PP_IDEOLOGICAL = 'PP_IDEOLOGICAL';
export const OI_ORBITAL_STOCKPILES = 'OI_ORBITAL_STOCKPILES';
export const OI_STRATEGIC_ENERGY_RESERVES = 'OI_STRATEGIC_ENERGY_RESERVES';
export const OI_MATERIEL_STOCKPILES = 'OI_MATERIEL_STOCKPILES';
export const E_EMBEDDED_INFORMANTS = 'E_EMBEDDED_INFORMANTS';
export const E_PAID_SABOTEURS = 'E_PAID_SABOTEURS';
export const E_EXHAUSTIVE_INTEL_GATHERING = 'E_EXHAUSTIVE_INTEL_GATHERING';
export const RD_ADVANCED_HARDPOINT_DESIGN = 'RD_ADVANCED_HARDPOINT_DESIGN';
export const RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS = 'RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS';
export const RD_ADVANCED_STRUCTURAL_COMPONENTS = 'RD_ADVANCED_STRUCTURAL_COMPONENTS';
export const DWC_TOP_END_HARDWARE = 'DWC_TOP_END_HARDWARE';
export const DWC_OUTRAGEOUS_SUPPORT_BUDGET = 'DWC_OUTRAGEOUS_SUPPORT_BUDGET';
export const DWC_PURCHASED_OUTCOMES = 'DWC_PURCHASED_OUTCOMES';
export const RA_UNPREDICTABLE_GAMBITS = 'RA_UNPREDICTABLE_GAMBITS';
export const RA_RECKLESS_PILOTING = 'RA_RECKLESS_PILOTING';
export const RA_BAIT_AND_SWITCH = 'RA_BAIT_AND_SWITCH';
export const UA_NETWORK_HACKERS = 'UA_NETWORK_HACKERS';
export const UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN = 'UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN';
export const UA_TECH_PIRATES_ADVANCED_ENERGY_MANAGEMENT_SYSTEM = 'UA_TECH_PIRATES_ADVANCED_ENERGY_MANAGEMENT_SYSTEM';
export const UA_TECH_PIRATES_ADVANCED_STRUCTURAL_COMPONENTS = 'UA_TECH_PIRATES_ADVANCED_STRUCTURAL_COMPONENTS';
export const UA_INTIMIDATION_TACTICS = 'UA_INTIMIDATION_TACTICS';
export const BLO_EX_MILITARY_VETERANS = 'BLO_EX_MILITARY_VETERANS';
export const BLO_POLITICAL_EXTREMISTS_EXPANSIONIST = 'BLO_POLITICAL_EXTREMISTS_EXPANSIONIST';
export const BLO_POLITICAL_EXTREMISTS_PROTECTIVIST = 'BLO_POLITICAL_EXTREMISTS_PROTECTIVIST';
export const BLO_POLITICAL_EXTREMISTS_IDEOLOGICAL = 'BLO_POLITICAL_EXTREMISTS_IDEOLOGICAL';
export const BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE = 'BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE';
export const BLO_DISGRACED_TRILLIONAIRE_OUTRAGEOUS_SUPPORT_BUDGET = 'BLO_DISGRACED_TRILLIONAIRE_OUTRAGEOUS_SUPPORT_BUDGET';
export const BLO_DISGRACED_TRILLIONAIRE_PURCHASED_OUTCOMES = 'BLO_DISGRACED_TRILLIONAIRE_PURCHASED_OUTCOMES';

const PERKS = makeStaticListIds({
    // Military Training
    [MT_COORDINATED_ASSAULTS]: {
        display_name: 'Coordinated Assaults',
        description: 'Once per Game, after you have activated an HE-V (but not a Support Asset or Unit), you may remain the Active Player and immediately activate a different HE-V that does not have an Activated Marker. They may only complete a single Order. Play then passes as normal.',
    },
    [MT_COVERED_ADVANCES]: {
        display_name: 'Covered Advances',
        description: 'Once per Game Turn, if you are not the Active Player and an allied HE-V or Support Asset Unit is targeted by an Engage Order, another allied HE-V in Line of Sight of the Active Unit may Return Fire instead of the Target Unit. The targeted unit still makes the Defense Roll and may re-roll dice of 1 as if it were Returning Fire, but it is the covering HE-V which receives the Activated token and may interrupt to Engage the Active Unit once its Engage Order is resolved.',
    },
    [MT_ELITE_PILOT_PROGRAM]: {
        display_name: 'Elite Pilot Program',
        description: 'Once per Game Turn, after the opposing Commander selects a unit to Activate and declares their Order, you may rotate a single HE-V up to 90°.',
    },
    // Political Priority
    [PP_EXPANSIONIST]: {
        display_name: 'Expansionist',
        description: 'In any Mission that requires calculation of Tonnage destroyed during a turn, any destroyed enemy HE-Vs count as 5 Tons more for determining which Commander has destroyed more. In any Mission that requires calculation of Tonnage in a Mission area during a turn, all enemy HE-Vs that have sustained damage are considered to be 5 Tons lighter for determining which Commander achieves the objective.',
    },
    [PP_PROTECTIVIST]: {
        display_name: 'Protectivist',
        description: 'In any Mission that requires calculation of Tonnage in the Mission area during a turn, all allied HE-V’s are considered to be 5 Tons heavier for determining which Commander achieves the objective. In any Mission that requires calculation of Tonnage destroyed during a mission, any enemy HE-Vs which are more than 12” from all friendly deployment edges which took damage that turn count as 5 Tons destroyed each.',
    },
    [PP_IDEOLOGICAL]: {
        display_name: 'Ideological',
        description: 'Once per Game, when the Enemy Commander selects a Unit or Support Asset to Activate, you may use faction propaganda to cause them to hesitate. All numerical values of Movement, Jump, Smash and Engage Damage Rating and Traits are halved, rounding up, for the duration of that Order. If the Order does not have any numeric values (such as Lock On), then its effects are simply canceled instead.',
    },

    // Old Infrastructure
    [OI_ORBITAL_STOCKPILES]: {
        display_name: 'Orbital Stockpiles',
        description: 'Off-Table Support Assets with the Limited trait have this value increased by 1.',
        calculated_on_cards: true,
    },
    [OI_STRATEGIC_ENERGY_RESERVES]: {
        display_name: 'Strategic Energy Reserves',
        description: 'During the first Game Turn, increase the speed of all allied HE-V’s for the Move or Jump Order by 2”. For the duration of the first turn, the Move order may be taken twice.',
    },
    [OI_MATERIEL_STOCKPILES]: {
        display_name: 'Materiel Stockpiles',
        description: 'Increase the Limited trait of Mines, Rocket Packs and Missiles by 1 for all allied HE-Vs.',
        calculated_on_cards: true,
    },
    // Espionage
    [E_EMBEDDED_INFORMANTS]: {
        display_name: 'Embedded Informants',
        description: 'During Deployment, the enemy Commander must deploy 2 Units or Support Units for every 1 allied Unit your force deploys.',
    },
    [E_PAID_SABOTEURS]: {
        display_name: 'Paid Saboteurs',
        description: 'Any Off-Table Support Assets taken by the enemy Commander have their Limited trait reduced by 1, to a minimum of 0.',
        calculated_on_cards: true,
    },
    [E_EXHAUSTIVE_INTEL_GATHERING]: {
        display_name: 'Exhaustive Intel Gathering',
        description: 'Once per Game Turn, an allied Unit may take the Lock On Order without requiring a Target Designator upgrade.',
    },
    // Research and Development
    [RD_ADVANCED_HARDPOINT_DESIGN]: {
        display_name: 'Advanced Hardpoint Design',
        description: 'During Force Creation, all allied HE-Vs have one additional slot for Weapon Systems and Upgrades',
        calculated_on_cards: true,
    },
    [RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS]: {
        display_name: 'Advanced Energy Management Systems',
        description: 'Once per Game Turn, an allied HE-V may remove a Redline marker when it is selected to activate, but before declaring an Order. This may allow it to Redline again during the same turn.',
    },
    [RD_ADVANCED_STRUCTURAL_COMPONENTS]: {
        display_name: 'Advanced Structural Components',
        description: 'All allied HE-Vs count as having two more additional Structure remaining than they actually do for determining their Critical Damage status.',
        calculated_on_cards: true,
    },
    // Deep War Chest
    [DWC_TOP_END_HARDWARE]: {
        display_name: 'Top End Hardware',
        description: 'During Force Creation, all allied HE-Vs receive 2 additional Tons to spend on Weapon Systems and Upgrades. These Tons do not take them over their Class Tonnage if spent, and are not counted for any other game purpose other than what the HE-V is equipped with.',
        calculated_on_cards: true,
    },
    [DWC_OUTRAGEOUS_SUPPORT_BUDGET]: {
        display_name: 'Outrageous Support Budget',
        description: 'During Force Creation, you may take one Off-Table Support Asset with a cost of up to 10 tons, without having to pay its cost from your budget. Reduce all numerical values of this Asset (Damage Rating, number of Tokens placed and those of Traits) by 1, to a minimum of 1.',
        calculated_on_cards: true,
    },
    [DWC_PURCHASED_OUTCOMES]: {
        display_name: 'Purchased Outcomes',
        description: 'Once per game, when the enemy Commander declares an Order, you may cancel it. The Order still counts as having been issued for the purposes of any traits or limitations on use, but it has no effect and is not resolved.',
    },

    //rogue agency
    [RA_UNPREDICTABLE_GAMBITS]: {
        display_name: 'Unpredictable Gambits',
        description: 'Once each Game Turn, the first time you are eligible to activate a unit, instead of selecting one yourself you may elect to randomly determine one of your active HE-Vs instead. You can simply number them and roll a dice, or place numbered counters in a bag and randomly draw one. The randomly selected unit must then be activated, but may perform an additional Order this turn, which may be a duplicate of a previously issued Order that same activation.',
    },
    [RA_RECKLESS_PILOTING]: {
        display_name: 'Reckless Piloting',
        description: 'Once each Game Turn, when you have the option to Redline an HE-V, you may take two points of structural damage instead of one and perform two orders instead of the usual one. Heavy Reactors can reduce this damage as normal.',
    },
    [RA_BAIT_AND_SWITCH]: {
        display_name: 'Bait & Switch',
        description: 'After you have determined the Mission, but before deployment, you may secretly select one of the Core Rulebook missions not in use already. At the beginning of the 5th Turn, before the Initiative Phase, you may reveal this Mission Objective. For the remainder of the game, VPs will be scored for this Mission instead of the one previously active. If two Commanders have this ability, Roll Off on turn 5 to determine which Commander can use this Perk. The other Commander’s selection is discarded',
    },

    // underworld affiliations
    [UA_NETWORK_HACKERS]: {
        display_name: 'Network Hackers',
        description: 'Once per Mission, you may select to use one of your Opponent’s Off-Table Support Assets as if it was your own, without needing a Target Designator. The origin of the attack is considered to be any of your Deployment Edges. Alternatively, once per Mission you may use this Perk to roll an additional Dice in a Roll-Off and choose which result to apply.',
    },
    [UA_INTIMIDATION_TACTICS]: {
        display_name: 'Intimidation Tactics',
        description: 'Enemy units with 2 or more of your Allied HE-Vs within 6” suffer -1 from Defense Rolls when targeted by an Engage or Smash Order.',
    },
    //Big League Origins
    [BLO_EX_MILITARY_VETERANS]: {
        display_name: 'Ex-Military Veterans',
        description: 'Prior to deployment, select one of the Military Training Perks from the Authority Faction. This Perk is active for the duration of this Mission.',
        optional_perks: [
            MT_COORDINATED_ASSAULTS,
            MT_COVERED_ADVANCES,
            MT_ELITE_PILOT_PROGRAM,
        ],
    },
});

export const FACTION_PERKS = makeFrozenStaticListIds(
    Object.assign(
        {},
        PERKS,
        {
            [UA_TECH_PIRATES_ADVANCED_HARDPOINT_DESIGN]: makePerkCopy('Tech Pirates', RD_ADVANCED_HARDPOINT_DESIGN),
            [UA_TECH_PIRATES_ADVANCED_ENERGY_MANAGEMENT_SYSTEM]: makePerkCopy('Tech Pirates', RD_ADVANCED_ENERGY_MANAGEMENT_SYSTEMS),
            [UA_TECH_PIRATES_ADVANCED_STRUCTURAL_COMPONENTS]: makePerkCopy('Tech Pirates', RD_ADVANCED_STRUCTURAL_COMPONENTS),

            [BLO_POLITICAL_EXTREMISTS_EXPANSIONIST]: makePerkCopy('Political Extremists', PP_EXPANSIONIST),
            [BLO_POLITICAL_EXTREMISTS_PROTECTIVIST]: makePerkCopy('Political Extremists', PP_PROTECTIVIST),
            [BLO_POLITICAL_EXTREMISTS_IDEOLOGICAL]: makePerkCopy('Political Extremists', PP_IDEOLOGICAL),

            [BLO_DISGRACED_TRILLIONAIRE_TOP_END_HARDWARE]: makePerkCopy('Disgraced Trillionaire', DWC_TOP_END_HARDWARE),
            [BLO_DISGRACED_TRILLIONAIRE_OUTRAGEOUS_SUPPORT_BUDGET]: makePerkCopy('Disgraced Trillionaire', DWC_OUTRAGEOUS_SUPPORT_BUDGET),
            [BLO_DISGRACED_TRILLIONAIRE_PURCHASED_OUTCOMES]: makePerkCopy('Disgraced Trillionaire', DWC_PURCHASED_OUTCOMES),
        },
    ),
);

function makePerkCopy(prefix, perkId) {

    const {
        display_name,
        description,
    } = PERKS[perkId];

    return {
        prefix,
        display_name: prefix + ': ' + display_name,
        description,
        copied_perk_id: perkId,
    };
}

export function isMatchingPerkOrCopy(equalToPerkId, targetPerkId) {
    if (!targetPerkId) {
        return false;
    }
    if (equalToPerkId === targetPerkId) {
        return true;
    }

    const {copied_perk_id} = FACTION_PERKS[targetPerkId];
    return equalToPerkId === copied_perk_id;
}
