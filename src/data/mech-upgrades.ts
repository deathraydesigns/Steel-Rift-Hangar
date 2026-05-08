import type { Optional } from '../_helpers';
import { type NumberBySize, type Trait, type TraitInfo, type TraitsBySize } from '../types';
import { DRONE_MINE_DIRECTOR, DRONE_TACTICAL_AWARENESS, DRONE_TARGETING_SUPPORT } from './_shared';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import { type MechSizeId, SIZE } from './unit-sizes';
import { UPGRADE_TRAIT, UPGRADE_TRAITS, upgradeTraitDisplayName } from './upgrade-traits';
import { WEAPON_TRAIT } from './weapon-traits';

export enum MECH_UPGRADE {
    ANTI_MISSILE_SYSTEM = 'ANTI_MISSILE_SYSTEM',
    ELECTRONIC_COUNTERMEASURES = 'ELECTRONIC_COUNTERMEASURES',
    HEAVY_REACTOR = 'HEAVY_REACTOR',
    JUMP_JETS = 'JUMP_JETS',
    MINEFIELD_DRONE_CARRIER_SYSTEM = 'MINEFIELD_DRONE_CARRIER_SYSTEM',
    MINEFIELD_DRONE_TRACKING_SYSTEM = 'MINEFIELD_DRONE_TRACKING_SYSTEM',
    OPTIC_CAMO = 'OPTIC_CAMO',
    TARGET_DESIGNATOR = 'TARGET_DESIGNATOR',
    COOLANT_TANKS = 'COOLANT_TANKS',
    DIRECTIONAL_THRUSTER = 'DIRECTIONAL_THRUSTER',
    HAPTIC_SUIT = 'HAPTIC_SUIT',
    HIGH_SPEED_SERVOS = 'HIGH_SPEED_SERVOS',
    NEURAL_INPUT = 'NEURAL_INPUT',
    NITRO_BOOST = 'NITRO_BOOST',
    COMBAT_SHIELD = 'COMBAT_SHIELD',

    DRONE_TARGETING_SUPPORT = 'DRONE_TARGETING_SUPPORT',
    DRONE_TACTICAL_AWARENESS = 'DRONE_TACTICAL_AWARENESS',
    DRONE_MINE_DIRECTOR = 'DRONE_MINE_DIRECTOR'
}

export enum MechDroneUpgradeAttachType {
    WEAPON = 'WEAPON',
    MINE_DRONE_CARRIER = 'MINE_DRONE_CARRIER'
}

export type MechUpgrade = {
    id: MECH_UPGRADE,
    display_name: string,
    description: string,
    cost_by_size: NumberBySize,
    traits: Trait<UPGRADE_TRAIT>[],
    traits_by_size: Partial<TraitsBySize<UPGRADE_TRAIT>>,
    limited_size_ids: MechSizeId[],
    slots: number,
} & ({
    drone_attach_type: MechDroneUpgradeAttachType.MINE_DRONE_CARRIER,
    drone_attached_trait_id: UPGRADE_TRAIT,
} | {
    drone_attach_type: MechDroneUpgradeAttachType.WEAPON,
    drone_attached_trait_id: WEAPON_TRAIT,
} | {
    drone_attach_type: null,
    drone_attached_trait_id: null,
})

type InputOmit = 'id' | 'cost' | 'cost_by_size'
type InputOptional =
    'drone_attach_type'
    | 'traits'
    | 'slots'
    | 'traits_by_size'
    | 'limited_size_ids'
    | 'drone_attached_trait_id';

type MakeUpgradeInput =
    Omit<
        Optional<MechUpgrade, InputOptional>,
        InputOmit
    >
    & ({
    cost: number,
    cost_by_size?: undefined,
} | {
    cost?: undefined,
    cost_by_size: NumberBySize
})

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
        slots,
        drone_attach_type: item.drone_attach_type ?? null,
        drone_attached_trait_id: item.drone_attached_trait_id ?? null,
    };
}

export const MECH_UPGRADES: Record<MECH_UPGRADE, MechUpgrade> = makeFrozenStaticListIds<MechUpgrade>({
    [MECH_UPGRADE.ANTI_MISSILE_SYSTEM]: makeUpgrade({
        display_name: 'Anti-Missile System',
        description: 'This Unit may not be Targeted by a Weapon using the Smart trait if that Weapon is using the LoS of another Model.',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MECH_UPGRADE.ELECTRONIC_COUNTERMEASURES]: makeUpgrade({
        display_name: 'Electronic Countermeasures',
        description: 'This Unit may not be targeted by LOCK ON orders.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
    }),
    [MECH_UPGRADE.HEAVY_REACTOR]: makeUpgrade({
        display_name: 'Heavy Reactor',
        description: 'When this Unit would take Structure damage from Overdrive or receiving a Redline Marker, roll a D6. On a 4+ this Damage is ignored.',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MECH_UPGRADE.JUMP_JETS]: makeUpgrade({
        display_name: 'Jump Jets',
        description: 'This Unit may perform the JUMP Order.',
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MECH_UPGRADE.MINEFIELD_DRONE_CARRIER_SYSTEM]: makeUpgrade({
        display_name: 'Mine Drone Carrier System',
        description: 'This Unit has the Minelayer (MOVE) trait',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(UPGRADE_TRAIT.MINELAYER, 'MOVE'),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(UPGRADE_TRAIT.LIMITED, 1)],
            [SIZE.MEDIUM]: [trait(UPGRADE_TRAIT.LIMITED, 2)],
            [SIZE.HEAVY]: [trait(UPGRADE_TRAIT.LIMITED, 3)],
            [SIZE.ULTRA]: [trait(UPGRADE_TRAIT.LIMITED, 3)],
        },
    }),
    [MECH_UPGRADE.MINEFIELD_DRONE_TRACKING_SYSTEM]: makeUpgrade({
        display_name: 'Mine Drone Tracking Munitions',
        description: 'When making an ENGAGE Order, this Unit may target a Mine Drone Token. The Commander of the Target Mine Drone Token makes Defense Rolls on a 3+. If at least one point of Damage would be inflicted, remove the Token.',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MECH_UPGRADE.OPTIC_CAMO]: makeUpgrade({
        display_name: 'Optic Camouflage',
        description: 'Add +1 to Defense Rolls for this Unit when the Active Unit is outside of 10”.',
        cost_by_size: {
            [SIZE.LIGHT]: 5,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MECH_UPGRADE.TARGET_DESIGNATOR]: makeUpgrade({
        display_name: 'Target Designator',
        description: 'Once this Unit has completed an Activation, place a Target Designator Marker on it. This Marker may not be placed if this Unit performed a JUMP Order during its Activation. Remove this Marker at the start of the Unit’s next Activation.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
    }),
    [MECH_UPGRADE.COOLANT_TANKS]: makeUpgrade({
        display_name: 'Coolant Tanks',
        description: 'At any point during a turn, this Unit may remove one Redline Marker it currently has.',
        traits: [
            trait(UPGRADE_TRAIT.LIMITED, 2),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MECH_UPGRADE.DIRECTIONAL_THRUSTER]: makeUpgrade({
        display_name: 'Directional Thruster',
        description: 'This unit has the Dash (2) trait.',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 4,
        },
        traits: [
            trait(UPGRADE_TRAIT.DASH, 2),
        ],
    }),
    [MECH_UPGRADE.HAPTIC_SUIT]: makeUpgrade({
        display_name: 'Haptic Suit',
        description: 'When performing a Return Fire, you may re‑roll any dice in the Defense Roll (not just natural 1s).',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
        traits: [
            trait(UPGRADE_TRAIT.COMPACT),
        ],
        slots: 0,
    }),
    [MECH_UPGRADE.HIGH_SPEED_SERVOS]: makeUpgrade({
        display_name: 'High Speed Servos',
        description: 'After performing a SMASH Order, this Unit may perform a second SMASH Order. This does not count against the 2 Order Limit. Note: The second SMASH Order is now preceded by a SMASH Order and not a MOVE or JUMP Order and thus gets no bonuses for those conditions.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
    }),
    [MECH_UPGRADE.NEURAL_INPUT]: makeUpgrade({
        display_name: 'Neural Input',
        description: 'Reduce the Damage Rating of SMASH Orders targeting this Unit by 1.',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
        traits: [
            trait(UPGRADE_TRAIT.COMPACT),
        ],
        slots: 0,
    }),
    [MECH_UPGRADE.NITRO_BOOST]: makeUpgrade({
        display_name: 'Nitro Boost',
        description: 'At the beginning of a MOVE Order, you may move an additional 4”.',
        traits: [
            trait(UPGRADE_TRAIT.LIMITED, 1),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
    }),
    [MECH_UPGRADE.COMBAT_SHIELD]: makeUpgrade({
        display_name: 'Combat Shield',
        description: 'When this HE‑V is damaged by an ENGAGE or SMASH Order from its Front or Side Arcs, or makes a Defense Roll against a Blast effect, and it has more than 0 Armor remaining, roll 1D6 for each point of Damage it would receive. On a 5+, that point of Damage is ignored. Damage negated by this rule is treated as not having happened for the purposes of other weapon Trait effects, such as AP. When this HE‑V performs an ENGAGE Order, all of its Weapons receive a ‑1 to their Damage Rating.',
        cost_by_size: {
            [SIZE.LIGHT]: 0, // only available in medium with TEAM_PERK.COMBAT_BUCKLER
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        limited_size_ids: [SIZE.HEAVY, SIZE.ULTRA],
    }),
    [MECH_UPGRADE.DRONE_TARGETING_SUPPORT]: makeUpgrade({
        display_name: DRONE_TARGETING_SUPPORT.display_name,
        description: DRONE_TARGETING_SUPPORT.description,
        drone_attach_type: MechDroneUpgradeAttachType.WEAPON,
        drone_attached_trait_id: WEAPON_TRAIT.DRONE_TARGETING_SUPPORT_ATTACHED,
        cost: 1,
        slots: 0,
        traits: [
            trait(UPGRADE_TRAIT.COMPACT),
        ],
    }),
    [MECH_UPGRADE.DRONE_TACTICAL_AWARENESS]: makeUpgrade({
        display_name: DRONE_TACTICAL_AWARENESS.display_name,
        description: DRONE_TACTICAL_AWARENESS.description,
        drone_attach_type: MechDroneUpgradeAttachType.WEAPON,
        drone_attached_trait_id: WEAPON_TRAIT.DRONE_TACTICAL_AWARENESS_ATTACHED,
        cost: 1,
        slots: 0,
        traits: [
            trait(UPGRADE_TRAIT.COMPACT),
        ],

    }),
    [MECH_UPGRADE.DRONE_MINE_DIRECTOR]: makeUpgrade({
        display_name: DRONE_MINE_DIRECTOR.display_name,
        description: DRONE_MINE_DIRECTOR.description,
        drone_attach_type: MechDroneUpgradeAttachType.MINE_DRONE_CARRIER,
        drone_attached_trait_id: UPGRADE_TRAIT.DRONE_MINE_DIRECTOR_ATTACHED,
        cost: 1,
        slots: 0,
        limited_size_ids: [SIZE.MEDIUM, SIZE.HEAVY, SIZE.ULTRA],
        traits: [
            trait(UPGRADE_TRAIT.COMPACT),
        ],
    }),
});

export const upgradeDisplayName = (id: MECH_UPGRADE): string => MECH_UPGRADES[id].display_name;

export function getMechUpgradeTraitsInfo(
    upgradeId: MECH_UPGRADE,
    sizeId: MechSizeId,
): TraitInfo<UPGRADE_TRAIT>[] {
    const upgrade = MECH_UPGRADES[upgradeId];
    let traits: Trait<UPGRADE_TRAIT>[] = [];
    if (upgrade.traits.length > 0) {
        traits = upgrade.traits;
    }
    if (upgrade.traits_by_size[sizeId]) {
        traits = [...traits, ...upgrade.traits_by_size[sizeId]];
    }
    return traits.map(({ id, X, Y }) => ({
        dependent_trait_ids: [],
        ...UPGRADE_TRAITS[id],
        X,
        Y,
        display_name: upgradeTraitDisplayName({ id, X }),
    }));
}
