import { groupBy } from 'es-toolkit';
import { findById } from '../store/helpers/collection-helper';
import type { TeamPerkInfo } from '../store/team-store';
import type { NumberBySize, Trait, TraitsBySize } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import type { FactionPerk } from './faction-perks';
import { type MechSizeId, SIZE } from './unit-sizes';
import {
    TRAIT_AP,
    TRAIT_BLAST,
    TRAIT_CONCUSSIVE,
    TRAIT_DISRUPTIVE,
    TRAIT_DRAG,
    TRAIT_DRAINING,
    TRAIT_FLAK,
    TRAIT_FRAG,
    TRAIT_KINETIC,
    TRAIT_LIGHT,
    TRAIT_LIMITED,
    TRAIT_MELEE,
    TRAIT_PARRY,
    TRAIT_REACH,
    TRAIT_SHORT,
    TRAIT_SMART,
    TRAIT_STAGGER,
    TRAIT_TETHER,
    type WeaponTraitId,
} from './weapon-traits';

export const AUTO_CANNON = 'AUTO_CANNON' as const;
export const HOWITZER = 'HOWITZER' as const;
export const LASER = 'LASER' as const;
export const MELEE_WEAPON = 'MELEE_WEAPON' as const;
export const MISSILES = 'MISSILES' as const;
export const PARTICLE_CANNON = 'PARTICLE_CANNON' as const;
export const RAIL_GUN = 'RAIL_GUN' as const;
export const ROCKET_PACK = 'ROCKET_PACK' as const;
export const ROTARY_CANNON = 'ROTARY_CANNON' as const;
export const SHOT_CANNON = 'SHOT_CANNON' as const;
export const SUBMUNITIONS = 'SUBMUNITIONS' as const;
export const ARC_GUN = 'ARC_GUN' as const;
export const COMBAT_BLADE = 'COMBAT_BLADE' as const;
export const DEMOLITION_CUTTER = 'DEMOLITION_CUTTER' as const;
export const HARPOON_GUN = 'HARPOON_GUN' as const;
export const IMPACT_HAMMER = 'IMPACT_HAMMER' as const;
export const MAG_TETHER = 'MAG_TETHER' as const;
export const MASS_TETSUBO = 'MASS_TETSUBO' as const;
export const MEGA_GLAIVE = 'MEGA_GLAIVE' as const;
export const PLASMA_BLADE = 'PLASMA_BLADE' as const;
export const PULSE_SALVO = 'PULSE_SALVO' as const;
export const SHOCK_NET = 'SHOCK_NET' as const;

export type MechWeaponId =
    | typeof AUTO_CANNON
    | typeof HOWITZER
    | typeof LASER
    | typeof MELEE_WEAPON
    | typeof MISSILES
    | typeof PARTICLE_CANNON
    | typeof RAIL_GUN
    | typeof ROCKET_PACK
    | typeof ROTARY_CANNON
    | typeof SHOT_CANNON
    | typeof SUBMUNITIONS
    | typeof ARC_GUN
    | typeof COMBAT_BLADE
    | typeof DEMOLITION_CUTTER
    | typeof HARPOON_GUN
    | typeof IMPACT_HAMMER
    | typeof MAG_TETHER
    | typeof MASS_TETSUBO
    | typeof MEGA_GLAIVE
    | typeof PLASMA_BLADE
    | typeof PULSE_SALVO
    | typeof SHOCK_NET;

export interface MechWeapon {
    id: MechWeaponId;
    display_name: string;
    damage_by_size: NumberBySize;
    traits_by_size: TraitsBySize<WeaponTraitId>;
    cost_by_size: NumberBySize;
    range: number | null;
    slots: number;
    limited_size_ids: MechSizeId[];
}

interface WeaponInput {
    display_name: string;
    damage?: number | null;
    damage_by_size?: Partial<NumberBySize>;
    traits?: Trait<WeaponTraitId>[];
    traits_by_size?: Partial<TraitsBySize<WeaponTraitId>>;
    slots?: number;
    cost?: number | null;
    cost_by_size?: Partial<NumberBySize>;
    limited_size_ids?: MechSizeId[];
}

export interface MechWeaponInfo {
    weapon_id: MechWeaponId,
    display_name: string,
    damage: number | null,
    slots: number,
    cost: number,
    range: number | null,
    range_modifier: number,
    range_total: number,
    melee_base_damage: number | null,
    melee_trait_damage: number,
    melee_total_damage: number,
    traits: Trait<WeaponTraitId>[],
    team_perks: TeamPerkInfo[],
    faction_perks: FactionPerk[],
    max_uses: number | null,
    valid: boolean,
    validation_message: string | null,
}

export const MECH_WEAPONS: Readonly<Record<string, MechWeapon>> = makeFrozenStaticListIds<MechWeapon>({
    [AUTO_CANNON]: makeWeapon({
        display_name: 'Auto-Cannon',
        damage_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
        traits: [
            trait(TRAIT_KINETIC),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
    }),
    [HOWITZER]: makeWeapon({
        display_name: 'Howitzer',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_KINETIC),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
    }),
    [LASER]: makeWeapon({
        display_name: 'Laser',
        damage: 2,
        traits: [
            trait(TRAIT_DRAINING),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_AP, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_AP, 1)],
            [SIZE.HEAVY]: [trait(TRAIT_AP, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_AP, 3)],
        },
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 7,
        },
    }),
    [MELEE_WEAPON]: makeWeapon({
        display_name: 'Melee Weapon',
        damage: 0,
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 1)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 2)],
        },
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 4,
        },
    }),
    [MISSILES]: makeWeapon({
        display_name: 'Missiles',
        damage_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 7,
        },
        traits: [
            trait(TRAIT_SMART),
            trait(TRAIT_LIMITED, 3),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
    }),
    [PARTICLE_CANNON]: makeWeapon({
        display_name: 'Particle Cannon ',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 8,
        },
        traits: [
            trait(TRAIT_SHORT, 18),
            trait(TRAIT_DRAINING),
            trait(TRAIT_DISRUPTIVE),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
    }),
    [RAIL_GUN]: makeWeapon({
        display_name: 'Rail gun',
        damage: 1,
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(TRAIT_KINETIC),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_AP, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_AP, 1)],
            [SIZE.HEAVY]: [trait(TRAIT_AP, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_AP, 3)],
        },
    }),
    [ROCKET_PACK]: makeWeapon({
        display_name: 'Rocket Pack',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 7,
        },
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(TRAIT_BLAST, 3),
            trait(TRAIT_LIMITED, 3),
        ],
    }),
    [ROTARY_CANNON]: makeWeapon({
        display_name: 'Rotary Cannon',
        damage_by_size: {
            [SIZE.LIGHT]: 6,
            [SIZE.MEDIUM]: 9,
            [SIZE.HEAVY]: 12,
            [SIZE.ULTRA]: 15,
        },
        traits: [
            trait(TRAIT_SHORT, 12),
            trait(TRAIT_LIGHT),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 8,
        },
    }),
    [SHOT_CANNON]: makeWeapon({
        display_name: 'Shot Cannon',
        damage_by_size: {
            [SIZE.LIGHT]: 6,
            [SIZE.MEDIUM]: 9,
            [SIZE.HEAVY]: 11,
            [SIZE.ULTRA]: 13,
        },
        traits: [
            trait(TRAIT_SHORT, 6),
            trait(TRAIT_LIGHT),
            trait(TRAIT_FRAG),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
    }),
    [SUBMUNITIONS]: makeWeapon({
        display_name: 'Submunitions',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(TRAIT_SHORT, 6),
            trait(TRAIT_FLAK),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 4,
        },
    }),
    [ARC_GUN]: makeWeapon({
        display_name: 'Arc Gun',
        damage_by_size: {
            [SIZE.LIGHT]: 6,
        },
        traits: [
            trait(TRAIT_LIGHT),
            trait(TRAIT_SHORT, 6),
            trait(TRAIT_STAGGER),
        ],
        cost: 2,
        limited_size_ids: [SIZE.LIGHT],
    }),
    [COMBAT_BLADE]: makeWeapon({
        display_name: 'Combat Blade',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(TRAIT_PARRY),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 1)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 2)],
        },
    }),
    [DEMOLITION_CUTTER]: makeWeapon({
        display_name: 'Demolition Cutter',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 1), trait(TRAIT_AP, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 1), trait(TRAIT_AP, 2)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 2), trait(TRAIT_AP, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 2), trait(TRAIT_AP, 3)],
        },
    }),
    [HARPOON_GUN]: makeWeapon({
        display_name: 'Harpoon Gun',
        damage: 6,
        cost: 7,
        traits: [
            trait(TRAIT_SHORT, 12),
            trait(TRAIT_DRAG),
            trait(TRAIT_TETHER),
        ],
        limited_size_ids: [SIZE.ULTRA],
    }),
    [IMPACT_HAMMER]: makeWeapon({
        display_name: 'Impact Hammer',
        damage: 0,
        slots: 2,
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
        traits: [
            trait(TRAIT_CONCUSSIVE, 4),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 2)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 2)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 3)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 3)],
        },
    }),
    [MAG_TETHER]: makeWeapon({
        display_name: 'Mag Tether',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
        traits: [
            trait(TRAIT_SHORT, 12),
            trait(TRAIT_TETHER),
        ],
    }),
    [MASS_TETSUBO]: makeWeapon({
        display_name: 'Mass Tetsubo',
        damage: 0,
        slots: 2,
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
        traits: [
            trait(TRAIT_CONCUSSIVE, 2),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 2)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 2), trait(TRAIT_REACH, 1)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 3), trait(TRAIT_REACH, 1)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 3), trait(TRAIT_REACH, 2)],
        },
    }),
    [MEGA_GLAIVE]: makeWeapon({
        display_name: 'Mega Glaive',
        damage: 0,
        slots: 2,
        cost_by_size: {
            [SIZE.LIGHT]: 4,
            [SIZE.MEDIUM]: 5,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 7,
        },
        traits: [],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 3), trait(TRAIT_REACH, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 3), trait(TRAIT_REACH, 2)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 4), trait(TRAIT_REACH, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 4), trait(TRAIT_REACH, 3)],
        },
    }),
    [PLASMA_BLADE]: makeWeapon({
        display_name: 'Plasma Blade ',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 4,
            [SIZE.MEDIUM]: 5,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 7,
        },
        traits: [
            trait(TRAIT_DISRUPTIVE),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 2), trait(TRAIT_AP, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 2), trait(TRAIT_AP, 2)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 3), trait(TRAIT_AP, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 3), trait(TRAIT_AP, 3)],
        },
    }),
    [PULSE_SALVO]: makeWeapon({
        display_name: 'Pulse Salvo',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 8,
        },
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(TRAIT_LIMITED, 2),
            trait(TRAIT_DISRUPTIVE),
        ],
    }),
    [SHOCK_NET]: makeWeapon({
        display_name: 'Shock Net',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
        traits: [
            trait(TRAIT_STAGGER),
            trait(TRAIT_TETHER),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(TRAIT_MELEE, 1)],
            [SIZE.MEDIUM]: [trait(TRAIT_MELEE, 1)],
            [SIZE.HEAVY]: [trait(TRAIT_MELEE, 2)],
            [SIZE.ULTRA]: [trait(TRAIT_MELEE, 2)],
        },
    }),
});

function makeWeapon({
                        display_name,
                        damage,
                        damage_by_size,
                        traits = [],
                        traits_by_size,
                        slots = 1,
                        cost,
                        cost_by_size,
                        limited_size_ids = [],
                    }: WeaponInput): Omit<MechWeapon, 'id'> {

    const final_cost_by_size: NumberBySize = {
        [SIZE.LIGHT]: cost_by_size?.[SIZE.LIGHT] ?? cost ?? null,
        [SIZE.MEDIUM]: cost_by_size?.[SIZE.MEDIUM] ?? cost ?? null,
        [SIZE.HEAVY]: cost_by_size?.[SIZE.HEAVY] ?? cost ?? null,
        [SIZE.ULTRA]: cost_by_size?.[SIZE.ULTRA] ?? cost ?? null,
    };

    const final_traits_by_size: TraitsBySize<WeaponTraitId> = {
        [SIZE.LIGHT]: [...(traits_by_size?.[SIZE.LIGHT] ?? []), ...traits],
        [SIZE.MEDIUM]: [...(traits_by_size?.[SIZE.MEDIUM] ?? []), ...traits],
        [SIZE.HEAVY]: [...(traits_by_size?.[SIZE.HEAVY] ?? []), ...traits],
        [SIZE.ULTRA]: [...(traits_by_size?.[SIZE.ULTRA] ?? []), ...traits],
    };

    const final_damage_by_size: NumberBySize = {
        [SIZE.LIGHT]: damage_by_size?.[SIZE.LIGHT] ?? damage ?? null,
        [SIZE.MEDIUM]: damage_by_size?.[SIZE.MEDIUM] ?? damage ?? null,
        [SIZE.HEAVY]: damage_by_size?.[SIZE.HEAVY] ?? damage ?? null,
        [SIZE.ULTRA]: damage_by_size?.[SIZE.ULTRA] ?? damage ?? null,
    };

    let range = getRangeFromShortTrait(traits);

    return {
        display_name,
        damage_by_size: final_damage_by_size,
        traits_by_size: final_traits_by_size,
        cost_by_size: final_cost_by_size,
        range,
        slots,
        limited_size_ids,
    };
}

export function getRangeFromShortTrait(traits: Trait[]): number | null {
    let range: number | null = null;
    if (traits) {
        const result = findById(traits, TRAIT_SHORT);
        if (result) {
            range = result.number as number ?? null;
        }
    }
    return range;
}

export const MECH_WEAPONS_BY_TYPE = groupBy(
    Object.keys(MECH_WEAPONS) as MechWeaponId[],
    (weaponId) => {
        if (weaponHasTrait(weaponId, TRAIT_MELEE)) {
            return 'melee';
        }

        return 'ranged';
    },
);

export function weaponHasTrait(weaponId: string, traitId: WeaponTraitId): boolean {
    const weapon = MECH_WEAPONS[weaponId];
    const sizes = Object.keys(weapon.traits_by_size) as MechSizeId[];

    return !!sizes.find(sizeId => {
        return findById(weapon.traits_by_size[sizeId], traitId);
    });
}
