import { type NumberBySize, type Trait, type TraitsBySize } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import { SUBMUNITIONS } from './mech-weapons';
import { type MechSizeId, SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM, SIZE_ULTRA } from './unit-sizes';
import {
    TRAIT_COMPACT,
    TRAIT_DASH,
    TRAIT_UPGRADE_LIMITED,
    UPGRADE_TRAITS,
    upgradeTraitDisplayName,
    type UpgradeTraitId,
} from './upgrade-traits';

export const ANTI_MISSILE_SYSTEM = 'ANTI_MISSILE_SYSTEM' as const;
export const ELECTRONIC_COUNTERMEASURES = 'ELECTRONIC_COUNTERMEASURES' as const;
export const HEAVY_REACTOR = 'HEAVY_REACTOR' as const;
export const JUMP_JETS = 'JUMP_JETS' as const;
export const MINEFIELD_DRONE_CARRIER_SYSTEM = 'MINEFIELD_DRONE_CARRIER_SYSTEM' as const;
export const MINEFIELD_DRONE_TRACKING_SYSTEM = 'MINEFIELD_DRONE_TRACKING_SYSTEM' as const;
export const OPTIC_CAMO = 'OPTIC_CAMO' as const;
export const TARGET_DESIGNATOR = 'TARGET_DESIGNATOR' as const;
export const COOLANT_TANKS = 'COOLANT_TANKS' as const;
export const DIRECTIONAL_THRUSTER = 'DIRECTIONAL_THRUSTER' as const;
export const HAPTIC_SUIT = 'HAPTIC_SUIT' as const;
export const HIGH_SPEED_SERVOS = 'HIGH_SPEED_SERVOS' as const;
export const NEURAL_INPUT = 'NEURAL_INPUT' as const;
export const NITRO_BOOST = 'NITRO_BOOST' as const;
export const COMBAT_SHIELD = 'COMBAT_SHIELD' as const;

export type MechUpgradeId =
    | typeof ANTI_MISSILE_SYSTEM
    | typeof ELECTRONIC_COUNTERMEASURES
    | typeof HEAVY_REACTOR
    | typeof JUMP_JETS
    | typeof MINEFIELD_DRONE_CARRIER_SYSTEM
    | typeof MINEFIELD_DRONE_TRACKING_SYSTEM
    | typeof OPTIC_CAMO
    | typeof TARGET_DESIGNATOR
    | typeof COOLANT_TANKS
    | typeof DIRECTIONAL_THRUSTER
    | typeof HAPTIC_SUIT
    | typeof HIGH_SPEED_SERVOS
    | typeof NEURAL_INPUT
    | typeof NITRO_BOOST
    | typeof COMBAT_SHIELD;

export interface MechUpgrade {
    id: MechUpgradeId;
    display_name: string;
    description: string;
    cost_by_size: NumberBySize;
    traits: Trait[];
    traits_by_size: Partial<TraitsBySize>;
    limited_size_ids: MechSizeId[];
    upgrade_required: string[];
    slots: number;
}

interface MakeUpgradeInput {
    display_name: string;
    description: string;
    cost?: number | null;
    cost_by_size?: Partial<NumberBySize>;
    traits?: Trait[];
    traits_by_size?: Partial<TraitsBySize>;
    limited_size_ids?: MechSizeId[];
    upgrade_required?: string[];
    slots?: number;
}

function makeUpgrade(item: MakeUpgradeInput): Omit<MechUpgrade, 'id'> {
    const cost_by_size: NumberBySize = {
        [SIZE_LIGHT]: item.cost_by_size?.[SIZE_LIGHT] ?? item.cost ?? null,
        [SIZE_MEDIUM]: item.cost_by_size?.[SIZE_MEDIUM] ?? item.cost ?? null,
        [SIZE_HEAVY]: item.cost_by_size?.[SIZE_HEAVY] ?? item.cost ?? null,
        [SIZE_ULTRA]: item.cost_by_size?.[SIZE_ULTRA] ?? item.cost ?? null,
    };

    const slots = item.slots !== undefined ? item.slots : 1;
    const limited_size_ids = item.limited_size_ids ?? [];

    return {
        display_name: item.display_name,
        description: item.description,
        cost_by_size,
        traits: item.traits ?? [],
        traits_by_size: item.traits_by_size ?? {},
        limited_size_ids,
        upgrade_required: item.upgrade_required ?? [],
        slots,
    };
}

export const MECH_UPGRADES: Readonly<Record<MechUpgradeId, MechUpgrade>> = makeFrozenStaticListIds<MechUpgrade>({
    [ANTI_MISSILE_SYSTEM]: makeUpgrade({
        display_name: 'Anti-Missile System',
        description: 'This unit may not be targeted by a Weapon System using the Smart trait to Engage them from outside of Line of Sight of the Active Model.',
        cost_by_size: {
            [SIZE_LIGHT]: 1,
            [SIZE_MEDIUM]: 1,
            [SIZE_HEAVY]: 2,
            [SIZE_ULTRA]: 2,
        },
    }),
    [ELECTRONIC_COUNTERMEASURES]: makeUpgrade({
        display_name: 'Electronic Countermeasures',
        description: 'The Lock On order may not be taken against this model.',
        cost_by_size: {
            [SIZE_LIGHT]: 2,
            [SIZE_MEDIUM]: 2,
            [SIZE_HEAVY]: 1,
            [SIZE_ULTRA]: 1,
        },
    }),
    [HEAVY_REACTOR]: makeUpgrade({
        display_name: 'Heavy Reactor',
        description: 'Roll 1D6 when this model would take Structure damage from Redlining, on a 4+ this damage is ignored.',
        cost_by_size: {
            [SIZE_LIGHT]: 1,
            [SIZE_MEDIUM]: 1,
            [SIZE_HEAVY]: 2,
            [SIZE_ULTRA]: 2,
        },
    }),
    [JUMP_JETS]: makeUpgrade({
        display_name: 'Jump Jets',
        description: 'This model may take the Jump Jet action.',
        cost_by_size: {
            [SIZE_LIGHT]: 3,
            [SIZE_MEDIUM]: 3,
            [SIZE_HEAVY]: 2,
            [SIZE_ULTRA]: 2,
        },
    }),
    [MINEFIELD_DRONE_CARRIER_SYSTEM]: makeUpgrade({
        display_name: 'Minefield Drone Carrier System',
        description: 'ORDER: Place a Mine Drone token (as per the Support Asset) within 3” of the Active model and not within 6” of another Mine Drone token.',
        cost_by_size: {
            [SIZE_LIGHT]: null,
            [SIZE_MEDIUM]: 3,
            [SIZE_HEAVY]: 6,
            [SIZE_ULTRA]: 6,
        },
        traits_by_size: {
            [SIZE_MEDIUM]: [trait(TRAIT_UPGRADE_LIMITED, 1)],
            [SIZE_HEAVY]: [trait(TRAIT_UPGRADE_LIMITED, 2)],
            [SIZE_ULTRA]: [trait(TRAIT_UPGRADE_LIMITED, 2)],
        },
        limited_size_ids: [SIZE_MEDIUM, SIZE_HEAVY, SIZE_ULTRA],
    }),
    [MINEFIELD_DRONE_TRACKING_SYSTEM]: makeUpgrade({
        display_name: 'Minefield Drone Tracking Submunitions',
        description: 'ORDER: This model makes an immediate Engage order against a Mine Field token in range. The Commander of the target Minefield makes a Defense Roll on a 3+. If at least one point of Damage would be inflicted, remove the Token.',
        cost_by_size: {
            [SIZE_LIGHT]: 1,
            [SIZE_MEDIUM]: 1,
            [SIZE_HEAVY]: 2,
            [SIZE_ULTRA]: 2,
        },
        upgrade_required: [SUBMUNITIONS],
    }),
    [OPTIC_CAMO]: makeUpgrade({
        display_name: 'Optic Camouflage',
        description: 'Add +1 to Defense Rolls for this unit when the attacker is outside of 10”',
        cost_by_size: {
            [SIZE_LIGHT]: 5,
            [SIZE_MEDIUM]: 4,
            [SIZE_HEAVY]: 3,
            [SIZE_ULTRA]: 2,
        },
    }),
    [TARGET_DESIGNATOR]: makeUpgrade({
        display_name: 'Target Designator',
        description: 'Once per turn, friendly models in the same force may use this vehicle to draw Line of Sight for Weapon Systems using the Smart trait. Use this model for determining the AttackPool and Line of Sight. This Upgrade may also be required for certain Support Assets. Its use can be canceled by Electronic Counter measures.',
        cost: 1,
    }),
    [COOLANT_TANKS]: makeUpgrade({
        display_name: 'Coolant Tanks',
        description: 'Twice per game, before issuing an Order you may remove a Redline Marker from this HE-V.',
        traits: [trait(TRAIT_UPGRADE_LIMITED, 2)],
        cost_by_size: {
            [SIZE_LIGHT]: 1,
            [SIZE_MEDIUM]: 1,
            [SIZE_HEAVY]: 2,
            [SIZE_ULTRA]: 2,
        },
    }),
    [DIRECTIONAL_THRUSTER]: makeUpgrade({
        display_name: 'Directional Thruster',
        description: 'This unit gains the Dash Order',
        cost_by_size: {
            [SIZE_LIGHT]: 1,
            [SIZE_MEDIUM]: 2,
            [SIZE_HEAVY]: 3,
            [SIZE_ULTRA]: 4,
        },
        traits: [trait(TRAIT_DASH, 2)],
    }),
    [HAPTIC_SUIT]: makeUpgrade({
        display_name: 'Haptic Suit',
        description: 'When performing Return Fire, you may reroll all failed Defense Rolls.',
        cost_by_size: {
            [SIZE_LIGHT]: 2,
            [SIZE_MEDIUM]: 2,
            [SIZE_HEAVY]: 1,
            [SIZE_ULTRA]: 1,
        },
        traits: [trait(TRAIT_COMPACT)],
        slots: 0,
    }),
    [HIGH_SPEED_SERVOS]: makeUpgrade({
        display_name: 'High Speed Servos',
        description: 'After performing a Smash Order, this Unit may perform a second Smash Order for free.',
        cost_by_size: {
            [SIZE_LIGHT]: 2,
            [SIZE_MEDIUM]: 3,
            [SIZE_HEAVY]: 4,
            [SIZE_ULTRA]: 5,
        },
    }),
    [NEURAL_INPUT]: makeUpgrade({
        display_name: 'Neural Input',
        description: 'Reduce the Damage Rating of Smash Orders targeting this Unit by 1.',
        cost_by_size: {
            [SIZE_LIGHT]: 2,
            [SIZE_MEDIUM]: 2,
            [SIZE_HEAVY]: 1,
            [SIZE_ULTRA]: 1,
        },
        traits: [trait(TRAIT_COMPACT)],
        slots: 0,
    }),
    [NITRO_BOOST]: makeUpgrade({
        display_name: 'Nitro Boost',
        description: 'Once per game, at the beginning of a Move Order, you may move an additional 4”',
        traits: [trait(TRAIT_UPGRADE_LIMITED, 1)],
        cost_by_size: {
            [SIZE_LIGHT]: 1,
            [SIZE_MEDIUM]: 1,
            [SIZE_HEAVY]: 2,
            [SIZE_ULTRA]: 2,
        },
    }),
    [COMBAT_SHIELD]: makeUpgrade({
        display_name: 'Combat Shield',
        description: 'When this HE-V is damaged by an Attack originating from its front or side arcs, and it has more than 0 Armor remaining, roll 1D6 for each point of Damage it would receive. On a 5+, that point of Damage is ignored. Damage negated by this rule is treated as not having happened for the purposes of other weapon Trait effects, such as AP. If this HE-V performs an Engage Order, all of its Weapon Systems receive a -1 to their Damage Rating.',
        cost_by_size: {
            [SIZE_LIGHT]: 0, // only available in medium with TEAM_PERK_COMBAT_BUCKLER
            [SIZE_MEDIUM]: 3,
            [SIZE_HEAVY]: 4,
            [SIZE_ULTRA]: 5,
        },
        limited_size_ids: [SIZE_HEAVY, SIZE_ULTRA],
    }),
});

export function upgradeDisplayName(id: MechUpgradeId): string {
    return MECH_UPGRADES[id].display_name;
}

export function getUpgradeTraits(
    upgradeId: MechUpgradeId,
    sizeId: MechSizeId,
): Array<{ id: UpgradeTraitId; number?: number | string; display_name: string; description: string }> {
    const upgrade = MECH_UPGRADES[upgradeId];
    let traits: Trait[] = [];
    if (upgrade.traits.length > 0) {
        traits = upgrade.traits;
    } else if (upgrade.traits_by_size[sizeId]) {
        traits = upgrade.traits_by_size[sizeId]!;
    }
    return traits.map(({ id, number }) => ({
        ...UPGRADE_TRAITS[id as UpgradeTraitId],
        number,
        display_name: upgradeTraitDisplayName({ id, number }),
    }));
}
