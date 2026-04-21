import type { TeamPerk } from '../types';
import { MECH_UPGRADE, upgradeDisplayName } from './mech-upgrades';

interface TeamPerkInput {
    display_name?: string;
    description?: string;
    display_name_short?: string;
    visible_on_card?: boolean;
    card_note?: string;
    value?: number;
    stackable?: boolean;
    renderDisplayName?: (value: number, repeatCount?: number) => string;
    renderDesc?: (baseValue: number, repeatCount?: number) => string;
}

export enum TEAM_PERK {
    GUIDED_ROCKETS = 'TEAM_PERK_GUIDED_ROCKETS',
    _0_SLOT_TARGET_DESIGNATORS = 'TEAM_PERK__0_SLOT_TARGET_DESIGNATORS',
    _0_TON_TARGET_DESIGNATORS = 'TEAM_PERK__0_TON_TARGET_DESIGNATORS',
    HOMING = 'TEAM_PERK_HOMING',
    EXTRA_CLUSTER_ROCKET_AMMO = 'TEAM_PERK_EXTRA_CLUSTER_ROCKET_AMMO',
    _0_SLOT_ECM = 'TEAM_PERK__0_SLOT_ECM',
    _0_TON_ECM = 'TEAM_PERK__0_TON_ECM',
    RECON_INITIATIVE = 'TEAM_PERK_RECON_INITIATIVE',
    SUPPORT_ASSET_DAMAGE = 'TEAM_PERK_SUPPORT_ASSET_DAMAGE',
    DIRECTIONAL_ASSETS = 'TEAM_PERK_DIRECTIONAL_ASSETS',
    _0_SLOT_ARMOR_UPGRADES = 'TEAM_PERK__0_SLOT_ARMOR_UPGRADES',
    _0_TON_ARMOR_UPGRADES = 'TEAM_PERK__0_TON_ARMOR_UPGRADES',
    EXTRA_TONNAGE = 'TEAM_PERK_EXTRA_TONNAGE',
    SIDE_DEFENSE = 'TEAM_PERK_SIDE_DEFENSE',
    FORWARD_DEPLOY_HEVS = 'TEAM_PERK_FORWARD_DEPLOY_HEVS',
    MELEE_FLANK = 'TEAM_PERK_MELEE_FLANK',
    _0_SLOT_DIRECTIONAL_THRUSTERS = 'TEAM_PERK__0_SLOT_DIRECTIONAL_THRUSTERS',
    COUNTER_ATTACK = 'TEAM_PERK_COUNTER_ATTACK',
    JUMP_BOOSTER = 'TEAM_PERK_JUMP_BOOSTER',
    COMBAT_BUCKLER = 'TEAM_PERK_COMBAT_BUCKLER',
    EXTRA_NITRO = 'TEAM_PERK_EXTRA_NITRO',
    QUICKDRAW = 'TEAM_PERK_QUICKDRAW',
    BARREL_EXTENSIONS = 'TEAM_PERK_BARREL_EXTENSIONS',

    LIGHT_STABILIZER = 'TEAM_PERK_LIGHT_STABILIZER',
    DRAIN_RESISTANT = 'TEAM_PERK_DRAIN_RESISTANT',
    AIR_BURST = 'TEAM_PERK_AIR_BURST',
    IMPACT_ROUNDS = 'TEAM_PERK_IMPACT_ROUNDS',
    MELEE_SPECIALIST = 'TEAM_PERK_MELEE_SPECIALIST',

    DRONE_RACK = 'TEAM_PERK_DRONE_RACK',
    DRONE_SHARING = 'TEAM_PERK_DRONE_SHARING',
    TARGETING_LINK = 'TEAM_PERK_TARGETING_LINK',

    AUX_DEFENSE_CONFIG = 'TEAM_PERK_AUX_DEFENSE_CONFIG',
    GRANTED_SUPPRESSIVE_FIRE = 'TEAM_PERK_GRANTED_SUPPRESSIVE_FIRE',
}

export const MECH_TEAM_PERKS = makeTeamPerks({
    [TEAM_PERK._0_SLOT_TARGET_DESIGNATORS]: makeMini(upgradeDisplayName(MECH_UPGRADE.TARGET_DESIGNATOR)),
    [TEAM_PERK._0_TON_TARGET_DESIGNATORS]: makeLightWeight(upgradeDisplayName(MECH_UPGRADE.TARGET_DESIGNATOR)),
    [TEAM_PERK._0_SLOT_ECM]: makeMini(upgradeDisplayName(MECH_UPGRADE.ELECTRONIC_COUNTERMEASURES)),
    [TEAM_PERK._0_TON_ECM]: makeLightWeight(upgradeDisplayName(MECH_UPGRADE.ELECTRONIC_COUNTERMEASURES)),
    [TEAM_PERK._0_SLOT_ARMOR_UPGRADES]: makeMini('Armor Upgrades'),
    [TEAM_PERK._0_TON_ARMOR_UPGRADES]: makeLightWeight('Armor Upgrades'),
    [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS]: makeMini(upgradeDisplayName(MECH_UPGRADE.DIRECTIONAL_THRUSTER)),
    [TEAM_PERK.EXTRA_CLUSTER_ROCKET_AMMO]: {
        display_name: 'Extra Cluster Rocket Ammo',
        description: 'Cluster Rockets gain +1 to their Limited Trait.',
    },
    [TEAM_PERK.RECON_INITIATIVE]: {
        display_name: 'Recon Initiative',
        description: 'If one or more HE-Vs from this Team is within 18" of an enemy Deployment Edge or Corner, you gain +1 to the Initiative Roll.',
        visible_on_card: true,
    },
    [TEAM_PERK.SUPPORT_ASSET_DAMAGE]: {
        display_name: 'OT Asset Damage',
        description: 'Off-Table Support Assets gain +1 to their Damage Rating.',
        visible_on_card: true,
    },
    [TEAM_PERK.DIRECTIONAL_ASSETS]: {
        display_name: 'Mobile OT Assets',
        description: 'When determining the origin of direction for an Off-Table Support Asset directed by a member of this team, it can be from any direction.',
        visible_on_card: true,
    },
    [TEAM_PERK.EXTRA_TONNAGE]: {
        display_name: `Objective Tonnage (5)`,
        description: 'Team Units count as 5 Tons heavier for the purpose of the Security Objective.',
    },
    [TEAM_PERK.SIDE_DEFENSE]: {
        display_name: 'Side Defense',
        description: 'Enemy Units do not gain bonuses to their Damage Rating for Side Arcs.',
        visible_on_card: true,
    },
    [TEAM_PERK.FORWARD_DEPLOY_HEVS]: {
        display_name: 'Forward Deploy HE-Vs',
        description: 'HE-Vs in this Team may deploy as Support Assets.',
        visible_on_card: true,
    },
    [TEAM_PERK.MELEE_FLANK]: {
        display_name: 'Melee Flank',
        description: 'Weapons with the Melee Trait targeting opposing HE-Vs that are base to base with 2 or more Units in this Team receive the Frag trait.',
        visible_on_card: true,
    },
    [TEAM_PERK.COUNTER_ATTACK]: {
        display_name: 'Counter Attack',
        description: 'When targeted by an Engage or Smash Order, an HE-V in this Team without an Activated Marker may gain an Activated Marker. If they do, they may make a Smash Order before resolving the Opposing Commander’s Order.',
        visible_on_card: true,
    },
    [TEAM_PERK.JUMP_BOOSTER]: {
        display_name: 'Jump Boost',
        description: '+1” Jump Distance',
    },
    [TEAM_PERK.COMBAT_BUCKLER]: {
        display_name: 'Combat Buckler',
        description: 'Medium HE-V may purchase a Combat Shield for 3 Tons.',
    },
    [TEAM_PERK.EXTRA_NITRO]: {
        display_name: 'Extra Nitro',
        description: 'Nitro Boost may be used a second time during the game.',
    },
    [TEAM_PERK.QUICKDRAW]: {
        display_name: 'Quickdraw',
        description: 'This Unit may choose to Return Fire when it has an Activation Marker.After completing a Return Fire, the Unit is marked with a Redline Marker instead of an Activation Marker.',
        visible_on_card: true,
    },
    [TEAM_PERK.GUIDED_ROCKETS]: {
        renderDisplayName: makeRenderDisplayName('Guided Rockets'),
        renderDesc(baseValue, repeatCount = 1) {
            let repeatStr = renderDescriptionRepeat(baseValue, repeatCount);
            return `All Rocket Packs gain the Smart and Short (16") traits`;
        },
        value: 1,
        stackable: true,
    },
    [TEAM_PERK.BARREL_EXTENSIONS]: {
        renderDisplayName: makeRenderDisplayName('Barrel Extensions'),
        renderDesc(baseValue, repeatCount = 1) {
            let repeatStr = renderDescriptionRepeat(baseValue, repeatCount);
            return `Short(X) weapons gain +${baseValue}${repeatStr} to their range.`;
        },
        card_note: '+2 applied',
        value: 2,
        visible_on_card: true,
    },
    [TEAM_PERK.LIGHT_STABILIZER]: {
        display_name: 'Premium Light Weapons',
        description: `Light Weapons cause 1 Damage for every 2 damage not evaded, rounding up (instead of down).`,
    },
    [TEAM_PERK.DRAIN_RESISTANT]: {
        display_name: 'Drain Resistant',
        description: `When marking this Unit with a Redline Marker due to Draining, roll 1D6. On a 4+, do not mark this Unit.`,
    },
    [TEAM_PERK.AIR_BURST]: {
        display_name: 'Air Burst',
        description: `Blast Weapons add +1 to their Blast (X) value.`,
    },
    [TEAM_PERK.IMPACT_ROUNDS]: {
        display_name: 'Mass Driver',
        description: `Kinetic Weapons add +1 to the D6 to determine if the Target is rotated.`,
    },
    [TEAM_PERK.MELEE_SPECIALIST]: {
        display_name: 'Melee Specialist',
        description: `Melee (X) weapons add +1 to their X value.`,
    },
    [TEAM_PERK.DRONE_RACK]: {
        display_name: 'Drone Rack',
        // drones loose the compact trait but still cost 0 slots
        description: 'All Companion Drones may be taken more than once on each member HE-V (ignore the restriction on the number of Compact upgrades). No Weapon or Upgrade on an HE-V may be assigned more than one Companion Drone.',
    },
    [TEAM_PERK.DRONE_SHARING]: {
        display_name: 'Drone Share',
        // equipment drones are attached to, benefit all team members with the same equipment
        description: 'If a Weapon or Upgrade on this HE-V is assigned to a Companion Drone, and any other member of this team has the same Weapon or Upgrade assigned to a Companion Drone, this Weapon or Upgrade receives the benefit of all Companion Drones assigned to the same Weapon or Upgrade in this team.',
    },
    [TEAM_PERK.TARGETING_LINK]: {
        display_name: 'Targeting Link',
        description: 'When a member of this team performs an ENGAGE Order, if another member of this team has LoS to the Target, and is within 12” of the Active Unit, the Active Unit may be counted as in either member’s position for the purposes of determining Side or Rear modifiers for that ENGAGE Order.',
        visible_on_card: true,
    },
    [TEAM_PERK.AUX_DEFENSE_CONFIG]: {
        display_name: 'Aux. Defense Config',
        description: 'This HE-V may equip an additional Defensive Configuration. This uses an Upgrade slot.',
    },
    [TEAM_PERK.GRANTED_SUPPRESSIVE_FIRE]: {},
    [TEAM_PERK.HOMING]: {
        display_name: 'Homing',
        description: 'Any Weapon with the SMART trait may select a Target that is not in LoS of the Active Unit. This Weapon has the Short (6”) trait when doing so. Attack Pools are not modified for Side or Rear Arc.',
    },
});

function makeRenderDisplayName(prefix: string) {
    return function renderDisplayName(value: number, repeatCount = 1): string {
        let repeatStr = '';
        if (repeatCount > 1) {
            repeatStr = ` (x${repeatCount})`;
        }
        return `${prefix}${repeatStr}`;
    };
}

function renderDescriptionRepeat(baseValue: number, repeatCount = 1): string {
    let value = baseValue * repeatCount;
    if (repeatCount > 1) {
        return ` (+${baseValue} x ${repeatCount} = +${value})`;
    }
    return '';
}

function makeMini(name: string) {
    return {
        display_name: `Mini ${name}`,
        display_name_short: 'Mini',
        description: `Cost 0 Slots.`,
    };
}

function makeLightWeight(name: string) {
    return {
        display_name: `Lightweight ${name}`,
        display_name_short: 'Lightweight',
        description: `Cost 0 Tons.`,
    };
}

function makeTeamPerks(perks: Record<string, TeamPerkInput>): Readonly<Record<string, TeamPerk>> {
    let display_order = 0;

    Object.entries(perks).forEach(([perkId, perk]) => {
        const mutablePerk = perk as TeamPerkInput & { id?: string; display_order?: number };
        mutablePerk.id = perkId;
        if (mutablePerk.renderDisplayName) {
            mutablePerk.display_name = mutablePerk.renderDisplayName(mutablePerk.value!);
        }
        if (mutablePerk.renderDesc) {
            mutablePerk.description = mutablePerk.renderDesc(mutablePerk.value!);
        }
        mutablePerk.display_order = display_order++;
        Object.freeze(mutablePerk);
    });

    return Object.freeze(perks) as Readonly<Record<string, TeamPerk>>;
}