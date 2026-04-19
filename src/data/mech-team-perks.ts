import type { TeamPerk } from '../types';
import {
    DIRECTIONAL_THRUSTER,
    ELECTRONIC_COUNTERMEASURES,
    TARGET_DESIGNATOR,
    upgradeDisplayName,
} from './mech-upgrades';

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
    EXTRA_MISSILE_AMMO = 'EXTRA_MISSILE_AMMO',
    _0_SLOT_TARGET_DESIGNATORS = '_0_SLOT_TARGET_DESIGNATORS',
    _0_TON_TARGET_DESIGNATORS = '_0_TON_TARGET_DESIGNATORS',
    SMART_HOWITZERS = 'SMART_HOWITZERS',
    _0_SLOT_ECM = '_0_SLOT_ECM',
    _0_TON_ECM = '_0_TON_ECM',
    RECON_INITIATIVE = 'RECON_INITIATIVE',
    SUPPORT_ASSET_DAMAGE = 'SUPPORT_ASSET_DAMAGE',
    DIRECTIONAL_ASSETS = 'DIRECTIONAL_ASSETS',
    _0_SLOT_ARMOR_UPGRADES = '_0_SLOT_ARMOR_UPGRADES',
    _0_TON_ARMOR_UPGRADES = '_0_TON_ARMOR_UPGRADES',
    EXTRA_TONNAGE = 'EXTRA_TONNAGE',
    SIDE_DEFENSE = 'SIDE_DEFENSE',
    FORWARD_DEPLOY_HEVS = 'FORWARD_DEPLOY_HEVS',
    MELEE_FLANK = 'MELEE_FLANK',
    _0_SLOT_DIRECTIONAL_THRUSTERS = '_0_SLOT_DIRECTIONAL_THRUSTERS',
    COUNTER_ATTACK = 'COUNTER_ATTACK',
    JUMP_BOOSTER = 'JUMP_BOOSTER',
    COMBAT_BUCKLER = 'COMBAT_BUCKLER',
    EXTRA_NITRO = 'EXTRA_NITRO',
    QUICKDRAW = 'QUICKDRAW',
    BARREL_EXTENSIONS = 'BARREL_EXTENSIONS',
}

export const MECH_TEAM_PERKS = makeTeamPerks({
    [TEAM_PERK._0_SLOT_TARGET_DESIGNATORS]: makeMini(upgradeDisplayName(TARGET_DESIGNATOR)),
    [TEAM_PERK._0_TON_TARGET_DESIGNATORS]: makeLightWeight(upgradeDisplayName(TARGET_DESIGNATOR)),
    [TEAM_PERK._0_SLOT_ECM]: makeMini(upgradeDisplayName(ELECTRONIC_COUNTERMEASURES)),
    [TEAM_PERK._0_TON_ECM]: makeLightWeight(upgradeDisplayName(ELECTRONIC_COUNTERMEASURES)),
    [TEAM_PERK._0_SLOT_ARMOR_UPGRADES]: makeMini('Armor Upgrades'),
    [TEAM_PERK._0_TON_ARMOR_UPGRADES]: makeLightWeight('Armor Upgrades'),
    [TEAM_PERK._0_SLOT_DIRECTIONAL_THRUSTERS]: makeMini(upgradeDisplayName(DIRECTIONAL_THRUSTER)),
    [TEAM_PERK.SMART_HOWITZERS]: {
        display_name: 'Smart Howitzers',
        description: 'Howitzers gain the Smart Trait.',
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
        description: 'Returning Fire generates a Redline Marker instead of an Activation Marker.',
        visible_on_card: true,
    },
    [TEAM_PERK.EXTRA_MISSILE_AMMO]: {
        renderDisplayName: makeRenderDisplayName('Extra Guided Ammo'),
        renderDesc(baseValue, repeatCount = 1) {
            let repeatStr = renderDescriptionRepeat(baseValue, repeatCount);
            return `All Rocket Packs and Missiles gain +${baseValue}${repeatStr} to their Limited Trait`;
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