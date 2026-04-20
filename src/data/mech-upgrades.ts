import { type NumberBySize, type Trait, type TraitsBySize } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import { SUBMUNITIONS } from './mech-weapons';
import { type MechSizeId, SIZE } from './unit-sizes';
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
        [SIZE.LIGHT]: item.cost_by_size?.[SIZE.LIGHT] ?? item.cost ?? null,
        [SIZE.MEDIUM]: item.cost_by_size?.[SIZE.MEDIUM] ?? item.cost ?? null,
        [SIZE.HEAVY]: item.cost_by_size?.[SIZE.HEAVY] ?? item.cost ?? null,
        [SIZE.ULTRA]: item.cost_by_size?.[SIZE.ULTRA] ?? item.cost ?? null,
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
        description: 'This Unit may not be Targeted by a Weapon using the Smart trait if that Weapon is using the LoS of another Model.',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [ELECTRONIC_COUNTERMEASURES]: makeUpgrade({
        display_name: 'Electronic Countermeasures',
        description: 'This Unit may not be targeted by LOCK ON orders.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
    }),
    [HEAVY_REACTOR]: makeUpgrade({
        display_name: 'Heavy Reactor',
        description: 'When this Unit would take Structure damage from Overdrive or receiving a Redline Marker, roll a D6. On a 4+ this Damage is ignored.',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [JUMP_JETS]: makeUpgrade({
        display_name: 'Jump Jets',
        description: 'This Unit may perform the JUMP Order.',
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MINEFIELD_DRONE_CARRIER_SYSTEM]: makeUpgrade({
        display_name: 'Minefield Drone Carrier System',
        description: 'This Unit has the Minelayer (MOVE) trait. Limited (1/2/3/3)',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 6,
        },
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_UPGRADE_LIMITED, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_UPGRADE_LIMITED, 2)],
            [SIZE.HEAVY]: [trait(TRAIT_UPGRADE_LIMITED, 3)],
            [SIZE.ULTRA]: [trait(TRAIT_UPGRADE_LIMITED, 3)],
        },
        limited_size_ids: [SIZE.MEDIUM, SIZE.HEAVY, SIZE.ULTRA],
    }),
    [MINEFIELD_DRONE_TRACKING_SYSTEM]: makeUpgrade({
        display_name: 'Minefield Drone Tracking Submunitions',
        description: 'When making an ENGAGE Order, this Unit may target a Mine Drone Token. The Commander of the Target Mine Drone Token makes Defense Rolls on a 3+. If at least one point of Damage would be inflicted, remove the Token.',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
        upgrade_required: [SUBMUNITIONS],
    }),
    [OPTIC_CAMO]: makeUpgrade({
        display_name: 'Optic Camouflage',
        description: 'Add +1 to Defense Rolls for this Unit when the Active Unit is outside of 10”.',
        cost_by_size: {
            [SIZE.LIGHT]: 5,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 2,
        },
    }),
    [TARGET_DESIGNATOR]: makeUpgrade({
        display_name: 'Target Designator',
        description: 'Once this Unit has completed an Activation, place a Target Designator Marker on it. This Marker may not be placed if this Unit performed a JUMP Order during its Activation. Remove this Marker at the start of the Unit’s next Activation.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
    }),
    [COOLANT_TANKS]: makeUpgrade({
        display_name: 'Coolant Tanks',
        description: 'At any point during a turn, this Unit may remove one Redline Marker it currently has.',
        traits: [
            trait(TRAIT_UPGRADE_LIMITED, 2),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [DIRECTIONAL_THRUSTER]: makeUpgrade({
        display_name: 'Directional Thruster',
        description: 'Dash (2)',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 4,
        },
        traits: [
            trait(TRAIT_DASH, 2),
        ],
    }),
    [HAPTIC_SUIT]: makeUpgrade({
        display_name: 'Haptic Suit',
        description: 'When performing a Return Fire, you may re‑roll any dice in the Defense Roll (not just natural 1s).',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
        traits: [
            trait(TRAIT_COMPACT),
        ],
        slots: 0,
    }),
    [HIGH_SPEED_SERVOS]: makeUpgrade({
        display_name: 'High Speed Servos',
        description: 'After performing a SMASH Order, this Unit may perform a second SMASH Order. This does not count against the 2 Order Limit. Note: The second SMASH Order is now preceded by a SMASH Order and not a MOVE or JUMP Order and thus gets no bonuses for those conditions.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
    }),
    [NEURAL_INPUT]: makeUpgrade({
        display_name: 'Neural Input',
        description: 'Reduce the Damage Rating of SMASH Orders targeting this Unit by 1.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
        traits: [
            trait(TRAIT_COMPACT),
        ],
        slots: 0,
    }),
    [NITRO_BOOST]: makeUpgrade({
        display_name: 'Nitro Boost',
        description: 'At the beginning of a MOVE Order, you may move an additional 4”.',
        traits: [
            trait(TRAIT_UPGRADE_LIMITED, 1),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [COMBAT_SHIELD]: makeUpgrade({
        display_name: 'Combat Shield',
        description: 'When this HE‑V is damaged by an ENGAGE or SMASH Order from its Front or Side Arcs, or makes a Defense Roll against a Blast effect, and it has more than 0 Armor remaining, roll 1D6 for each point of Damage it would receive. On a 5+, that point of Damage is ignored. Damage negated by this rule is treated as not having happened for the purposes of other weapon Trait effects, such as AP. When this HE‑V performs an ENGAGE Order, all of its Weapons receive a ‑1 to their Damage Rating.',
        cost_by_size: {
            [SIZE.LIGHT]: 0, // only available in medium with TEAM_PERK_COMBAT_BUCKLER
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        limited_size_ids: [SIZE.HEAVY, SIZE.ULTRA],
    }),
});

export const upgradeDisplayName = (id: MechUpgradeId): string => MECH_UPGRADES[id].display_name;

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
