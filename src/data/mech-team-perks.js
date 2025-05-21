import {each} from 'lodash';
import {
    DIRECTIONAL_THRUSTER,
    ELECTRONIC_COUNTERMEASURES,
    TARGET_DESIGNATOR,
    upgradeDisplayName,
} from './mech-upgrades.js';

export const TEAM_PERK_EXTRA_MISSILE_AMMO = 'TEAM_PERK_EXTRA_MISSILE_AMMO';
export const TEAM_PERK_0_SLOT_TARGET_DESIGNATORS = 'TEAM_PERK_0_SLOT_TARGET_DESIGNATORS';
export const TEAM_PERK_0_TON_TARGET_DESIGNATORS = 'TEAM_PERK_0_TON_TARGET_DESIGNATORS';
export const TEAM_PERK_SMART_HOWITZERS = 'TEAM_PERK_SMART_HOWITZERS';
export const TEAM_PERK_0_SLOT_ECM = 'TEAM_PERK_0_SLOT_ECM';
export const TEAM_PERK_0_TON_ECM = 'TEAM_PERK_0_TON_ECM';
export const TEAM_PERK_RECON_INITIATIVE = 'TEAM_PERK_RECON_INITIATIVE';
export const TEAM_PERK_SUPPORT_ASSET_DAMAGE = 'TEAM_PERK_SUPPORT_ASSET_DAMAGE';
export const TEAM_PERK_DIRECTIONAL_ASSETS = 'TEAM_PERK_DIRECTIONAL_ASSETS';
export const TEAM_PERK_0_SLOT_ARMOR_UPGRADES = 'TEAM_PERK_0_SLOT_ARMOR_UPGRADES';
export const TEAM_PERK_0_TON_ARMOR_UPGRADES = 'TEAM_PERK_0_TON_ARMOR_UPGRADES';
export const TEAM_PERK_EXTRA_TONNAGE = 'TEAM_PERK_EXTRA_TONNAGE';
export const TEAM_PERK_SIDE_DEFENSE = 'TEAM_PERK_SIDE_DEFENSE';
export const TEAM_PERK_FORWARD_DEPLOY_HEVS = 'TEAM_PERK_FORWARD_DEPLOY_HEVS';
export const TEAM_PERK_MELEE_FLANK = 'TEAM_PERK_MELEE_FLANK';
export const TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS = 'TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS';
export const TEAM_PERK_COUNTER_ATTACK = 'TEAM_PERK_COUNTER_ATTACK';
export const TEAM_PERK_JUMP_BOOSTER = 'TEAM_PERK_JUMP_BOOSTER';
export const TEAM_PERK_COMBAT_BUCKLER = 'TEAM_PERK_COMBAT_BUCKLER';
export const TEAM_PERK_EXTRA_NITRO = 'TEAM_PERK_EXTRA_NITRO';
export const TEAM_PERK_QUICKDRAW = 'TEAM_PERK_QUICKDRAW';
export const TEAM_PERK_BARREL_EXTENSIONS = 'TEAM_PERK_BARREL_EXTENSIONS';

export const MECH_TEAM_PERKS = makeTeamPerks({
    [[TEAM_PERK_0_SLOT_TARGET_DESIGNATORS]]: makeMini(upgradeDisplayName(TARGET_DESIGNATOR)),
    [[TEAM_PERK_0_TON_TARGET_DESIGNATORS]]: makeLightWeight(upgradeDisplayName(TARGET_DESIGNATOR)),
    [[TEAM_PERK_0_SLOT_ECM]]: makeMini(upgradeDisplayName(ELECTRONIC_COUNTERMEASURES)),
    [[TEAM_PERK_0_TON_ECM]]: makeLightWeight(upgradeDisplayName(ELECTRONIC_COUNTERMEASURES)),
    [[TEAM_PERK_0_SLOT_ARMOR_UPGRADES]]: makeMini('Armor Upgrades'),
    [[TEAM_PERK_0_TON_ARMOR_UPGRADES]]: makeLightWeight('Armor Upgrades'),
    [[TEAM_PERK_0_SLOT_DIRECTIONAL_THRUSTERS]]: makeMini(upgradeDisplayName(DIRECTIONAL_THRUSTER)),
    [[TEAM_PERK_SMART_HOWITZERS]]: {
        display_name: 'Smart Howitzers',
        description: 'Howitzers gain the Smart Trait.',
    },
    [[TEAM_PERK_RECON_INITIATIVE]]: {
        display_name: 'Recon Initiative',
        description: 'If one or more HE-Vs from this Team is within 18" of an enemy Deployment Edge or Corner, you gain +1 to the Initiative Roll.',
        is_ability: true,
    },
    [[TEAM_PERK_SUPPORT_ASSET_DAMAGE]]: {
        display_name: 'OT Asset Damage',
        description: 'Off-Table Support Assets gain +1 to their Damage Rating.',
        is_ability: true,
    },
    [[TEAM_PERK_DIRECTIONAL_ASSETS]]: {
        display_name: 'Mobile OT Assets',
        description: 'When determining the origin of direction for an Off-Table Support Asset directed by a member of this team, it can be from any direction.',
        is_ability: true,
    },
    [[TEAM_PERK_EXTRA_TONNAGE]]: {
        display_name: `Objective Tonnage (5)`,
        description: 'Team Units count as 5 Tons heavier for the purpose of the Security Objective.',
    },
    [[TEAM_PERK_SIDE_DEFENSE]]: {
        display_name: 'Side Defense',
        description: 'Enemy Units do not gain bonuses to their Damage Rating for Side Arcs.',
        is_ability: true,
    },
    [[TEAM_PERK_FORWARD_DEPLOY_HEVS]]: {
        display_name: 'Forward Deploy HE-Vs',
        description: 'HE-Vs in this Team may deploy as Support Assets.',
        is_ability: true,
    },
    [[TEAM_PERK_MELEE_FLANK]]: {
        display_name: 'Melee Flank',
        description: 'Weapons with the Melee Trait targeting opposing HE-Vs that are base to base with 2 or more Units in this Team receive the Frag trait.',
        is_ability: true,
    },
    [[TEAM_PERK_COUNTER_ATTACK]]: {
        display_name: 'Counter Attack',
        description: 'When targeted by an Engage or Smash Order, an HE-V in this Team without an Activated Marker may gain an Activated Marker. If they do, they may make a Smash Order before resolving the Opposing Commander’s Order.',
        is_ability: true,
    },
    [[TEAM_PERK_JUMP_BOOSTER]]: {
        display_name: 'Jump Boost',
        description: '+1” Jump Distance',
    },
    [[TEAM_PERK_COMBAT_BUCKLER]]: {
        display_name: 'Combat Buckler',
        description: 'May purchase a Shield for 3 Tons.',
    },
    [[TEAM_PERK_EXTRA_NITRO]]: {
        display_name: 'Extra Nitro',
        description: 'Nitro Boost may be used a second time during the game.',
    },
    [[TEAM_PERK_QUICKDRAW]]: {
        display_name: 'Quickdraw',
        description: 'Returning Fire generates a Redline Marker instead of an Activation Marker.',
        is_ability: true,
    },
    [[TEAM_PERK_EXTRA_MISSILE_AMMO]]: {
        renderDisplayName: makeRenderDisplayName('Extra Guided Ammo'),
        renderDesc(baseValue, repeatCount = 1) {
            let repeatStr = renderDescriptionRepeat(baseValue, repeatCount);

            return `All Rocket Packs and Missiles gain +${baseValue}${repeatStr} to their Limited Trait`;
        },
        value: 1,
        stackable: true,
    },
    [[TEAM_PERK_BARREL_EXTENSIONS]]: {
        renderDisplayName: makeRenderDisplayName('Barrel Extensions'),
        renderDesc(baseValue, repeatCount = 1) {
            let repeatStr = renderDescriptionRepeat(baseValue, repeatCount);

            return `Short(X) weapons gain +${baseValue}${repeatStr} to their range.`;
        },
        value: 2,
        stackable: true,
    },
});

function makeRenderDisplayName(prefix) {
    return function renderDisplayName(value, repeatCount = 1) {

        let repeatStr = '';
        if (repeatCount > 1) {
            repeatStr = ` (x${repeatCount})`;
        }

        return `${prefix}${repeatStr}`;
    };
}

function renderDescriptionRepeat(baseValue, repeatCount = 1) {
    let value = baseValue * repeatCount;
    if (repeatCount > 1) {
        return ` (+${baseValue} x ${repeatCount} = +${value})`;
    }
    return '';
}

function makeMini(name) {
    return {
        display_name: `Mini ${name}`,
        display_name_short: 'Mini',
        description: `Cost 0 Slots.`,
    };
}

function makeLightWeight(name) {
    return {
        display_name: `Lightweight ${name}`,
        display_name_short: 'Lightweight',
        description: `Cost 0 Tons.`,
    };
}

function makeTeamPerks(perks) {

    let display_order = 0;
    each(perks, (perk, perkId, index) => {
        perk.id = perkId;
        if (perk.renderDisplayName) {
            perk.display_name = perk.renderDisplayName(perk.value);
        }
        if (perk.renderDesc) {
            perk.description = perk.renderDesc(perk.value);
        }

        perk.display_order = display_order++;
        Object.freeze(perk);
    });

    return Object.freeze(perks);
}