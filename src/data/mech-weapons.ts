import { groupBy } from 'es-toolkit';
import { findById } from '../store/helpers/collection-helper';
import type { NumberBySize, Trait, TraitInfo, TraitsBySize } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import type { FactionPerk } from './faction-perks';
import type { TeamPerkInfo } from './mech-team-perks';
import { type MechSizeId, SIZE } from './unit-sizes';
import { WEAPON_TRAIT } from './weapon-traits';

export enum MECH_WEAPON {
    AUTO_CANNON = 'AUTO_CANNON',
    HOWITZER = 'HOWITZER',
    LASER = 'LASER',
    MELEE_WEAPON = 'MELEE_WEAPON',
    MISSILES = 'MISSILES',
    PARTICLE_CANNON = 'PARTICLE_CANNON',
    RAIL_GUN = 'RAIL_GUN',
    ROCKET_PACK = 'ROCKET_PACK',
    ROTARY_CANNON = 'ROTARY_CANNON',
    SHOT_CANNON = 'SHOT_CANNON',
    SUBMUNITIONS = 'SUBMUNITIONS',
    ARC_GUN = 'ARC_GUN',
    COMBAT_BLADE = 'COMBAT_BLADE',
    DEMOLITION_CUTTER = 'DEMOLITION_CUTTER',
    HARPOON_GUN = 'HARPOON_GUN',
    IMPACT_HAMMER = 'IMPACT_HAMMER',
    MAG_TETHER = 'MAG_TETHER',
    MASS_TETSUBO = 'MASS_TETSUBO',
    MEGA_GLAIVE = 'MEGA_GLAIVE',
    PLASMA_BLADE = 'PLASMA_BLADE',
    PULSE_SALVO = 'PULSE_SALVO',
    SHOCK_NET = 'SHOCK_NET',
}

export interface MechWeapon {
    id: MECH_WEAPON;
    display_name: string;
    damage_by_size: NumberBySize;
    traits_by_size: TraitsBySize<WEAPON_TRAIT>;
    cost_by_size: NumberBySize;
    range: number | null;
    slots: number;
    limited_size_ids: MechSizeId[];
}

interface WeaponInput {
    display_name: string;
    damage?: number | null;
    damage_by_size?: Partial<NumberBySize>;
    traits?: Trait<WEAPON_TRAIT>[];
    traits_by_size?: Partial<TraitsBySize<WEAPON_TRAIT>>;
    slots?: number;
    cost?: number | null;
    cost_by_size?: Partial<NumberBySize>;
    limited_size_ids?: MechSizeId[];
}

export interface MechWeaponInfo {
    weapon_id: MECH_WEAPON,
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
    traits: TraitInfo<WEAPON_TRAIT>[],
    team_perks: TeamPerkInfo[],
    faction_perks: FactionPerk[],
    max_uses: number | null,
    valid: boolean,
    validation_message: string | null,
}

export const MECH_WEAPONS: Readonly<Record<string, MechWeapon>> = makeFrozenStaticListIds<MechWeapon>({
    [MECH_WEAPON.AUTO_CANNON]: makeWeapon({
        display_name: 'Auto-Cannon',
        damage_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
        traits: [
            trait(WEAPON_TRAIT.KINETIC),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
    }),
    [MECH_WEAPON.HOWITZER]: makeWeapon({
        display_name: 'Howitzer',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.KINETIC),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
    }),
    [MECH_WEAPON.LASER]: makeWeapon({
        display_name: 'Laser',
        damage: 2,
        traits: [
            trait(WEAPON_TRAIT.DRAINING),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.AP, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.AP, 1)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.AP, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.AP, 3)],
        },
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 7,
        },
    }),
    [MECH_WEAPON.MELEE_WEAPON]: makeWeapon({
        display_name: 'Melee Weapon',
        damage: 0,
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 1)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 2)],
        },
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 4,
        },
    }),
    [MECH_WEAPON.MISSILES]: makeWeapon({
        display_name: 'Missiles',
        damage_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 7,
        },
        traits: [
            trait(WEAPON_TRAIT.SMART),
            trait(WEAPON_TRAIT.LIMITED, 3),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
    }),
    [MECH_WEAPON.PARTICLE_CANNON]: makeWeapon({
        display_name: 'Particle Cannon ',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 8,
        },
        traits: [
            trait(WEAPON_TRAIT.SHORT, 18),
            trait(WEAPON_TRAIT.DRAINING),
            trait(WEAPON_TRAIT.DISRUPTIVE),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
    }),
    [MECH_WEAPON.RAIL_GUN]: makeWeapon({
        display_name: 'Rail gun',
        damage: 1,
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(WEAPON_TRAIT.KINETIC),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.AP, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.AP, 1)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.AP, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.AP, 3)],
        },
    }),
    [MECH_WEAPON.ROCKET_PACK]: makeWeapon({
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
            trait(WEAPON_TRAIT.BLAST, 3),
            trait(WEAPON_TRAIT.LIMITED, 3),
        ],
    }),
    [MECH_WEAPON.ROTARY_CANNON]: makeWeapon({
        display_name: 'Rotary Cannon',
        damage_by_size: {
            [SIZE.LIGHT]: 6,
            [SIZE.MEDIUM]: 9,
            [SIZE.HEAVY]: 12,
            [SIZE.ULTRA]: 15,
        },
        traits: [
            trait(WEAPON_TRAIT.SHORT, 12),
            trait(WEAPON_TRAIT.LIGHT),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 8,
        },
    }),
    [MECH_WEAPON.SHOT_CANNON]: makeWeapon({
        display_name: 'Shot Cannon',
        damage_by_size: {
            [SIZE.LIGHT]: 6,
            [SIZE.MEDIUM]: 9,
            [SIZE.HEAVY]: 11,
            [SIZE.ULTRA]: 13,
        },
        traits: [
            trait(WEAPON_TRAIT.SHORT, 6),
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.FRAG),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
    }),
    [MECH_WEAPON.SUBMUNITIONS]: makeWeapon({
        display_name: 'Submunitions',
        damage_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(WEAPON_TRAIT.SHORT, 6),
            trait(WEAPON_TRAIT.FLAK),
        ],
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 3,
            [SIZE.ULTRA]: 4,
        },
    }),
    [MECH_WEAPON.ARC_GUN]: makeWeapon({
        display_name: 'Arc Gun',
        damage_by_size: {
            [SIZE.LIGHT]: 6,
        },
        traits: [
            trait(WEAPON_TRAIT.LIGHT),
            trait(WEAPON_TRAIT.SHORT, 6),
            trait(WEAPON_TRAIT.STAGGER),
        ],
        cost: 2,
        limited_size_ids: [SIZE.LIGHT],
    }),
    [MECH_WEAPON.COMBAT_BLADE]: makeWeapon({
        display_name: 'Combat Blade',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits: [
            trait(WEAPON_TRAIT.PARRY),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 1)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 2)],
        },
    }),
    [MECH_WEAPON.DEMOLITION_CUTTER]: makeWeapon({
        display_name: 'Demolition Cutter',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 3,
            [SIZE.HEAVY]: 4,
            [SIZE.ULTRA]: 5,
        },
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 1), trait(WEAPON_TRAIT.AP, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 1), trait(WEAPON_TRAIT.AP, 2)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 2), trait(WEAPON_TRAIT.AP, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 2), trait(WEAPON_TRAIT.AP, 3)],
        },
    }),
    [MECH_WEAPON.HARPOON_GUN]: makeWeapon({
        display_name: 'Harpoon Gun',
        damage: 6,
        cost: 7,
        traits: [
            trait(WEAPON_TRAIT.SHORT, 12),
            trait(WEAPON_TRAIT.DRAG),
            trait(WEAPON_TRAIT.TETHER),
        ],
        limited_size_ids: [SIZE.ULTRA],
    }),
    [MECH_WEAPON.IMPACT_HAMMER]: makeWeapon({
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
            trait(WEAPON_TRAIT.CONCUSSIVE, 4),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 2)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 2)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 3)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 3)],
        },
    }),
    [MECH_WEAPON.MAG_TETHER]: makeWeapon({
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
            trait(WEAPON_TRAIT.SHORT, 12),
            trait(WEAPON_TRAIT.TETHER),
        ],
    }),
    [MECH_WEAPON.MASS_TETSUBO]: makeWeapon({
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
            trait(WEAPON_TRAIT.CONCUSSIVE, 2),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 2)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 2), trait(WEAPON_TRAIT.REACH, 1)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 3), trait(WEAPON_TRAIT.REACH, 1)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 3), trait(WEAPON_TRAIT.REACH, 2)],
        },
    }),
    [MECH_WEAPON.MEGA_GLAIVE]: makeWeapon({
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
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 3), trait(WEAPON_TRAIT.REACH, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 3), trait(WEAPON_TRAIT.REACH, 2)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 4), trait(WEAPON_TRAIT.REACH, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 4), trait(WEAPON_TRAIT.REACH, 3)],
        },
    }),
    [MECH_WEAPON.PLASMA_BLADE]: makeWeapon({
        display_name: 'Plasma Blade ',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 4,
            [SIZE.MEDIUM]: 5,
            [SIZE.HEAVY]: 6,
            [SIZE.ULTRA]: 7,
        },
        traits: [
            trait(WEAPON_TRAIT.DISRUPTIVE),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 2), trait(WEAPON_TRAIT.AP, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 2), trait(WEAPON_TRAIT.AP, 2)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 3), trait(WEAPON_TRAIT.AP, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 3), trait(WEAPON_TRAIT.AP, 3)],
        },
    }),
    [MECH_WEAPON.PULSE_SALVO]: makeWeapon({
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
            trait(WEAPON_TRAIT.LIMITED, 2),
            trait(WEAPON_TRAIT.DISRUPTIVE),
        ],
    }),
    [MECH_WEAPON.SHOCK_NET]: makeWeapon({
        display_name: 'Shock Net',
        damage: 0,
        cost_by_size: {
            [SIZE.LIGHT]: 3,
            [SIZE.MEDIUM]: 4,
            [SIZE.HEAVY]: 5,
            [SIZE.ULTRA]: 6,
        },
        traits: [
            trait(WEAPON_TRAIT.STAGGER),
            trait(WEAPON_TRAIT.TETHER),
        ],
        traits_by_size: {
            [SIZE.LIGHT]: [trait(WEAPON_TRAIT.MELEE, 1)],
            [SIZE.MEDIUM]: [trait(WEAPON_TRAIT.MELEE, 1)],
            [SIZE.HEAVY]: [trait(WEAPON_TRAIT.MELEE, 2)],
            [SIZE.ULTRA]: [trait(WEAPON_TRAIT.MELEE, 2)],
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

    const final_traits_by_size: TraitsBySize<WEAPON_TRAIT> = {
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

export function getRangeFromShortTrait(traits: Trait<WEAPON_TRAIT>[]): number | null {
    let range: number | null = null;
    if (traits) {
        const result = findById(traits, WEAPON_TRAIT.SHORT);
        if (result) {
            range = result.X as number ?? null;
        }
    }
    return range;
}

export const MECH_WEAPONS_BY_TYPE = groupBy(
    Object.keys(MECH_WEAPONS) as MECH_WEAPON[],
    (weaponId) => {
        if (weaponHasTrait(weaponId, WEAPON_TRAIT.MELEE)) {
            return 'melee';
        }

        return 'ranged';
    },
);

export function weaponHasTrait(weaponId: string, traitId: WEAPON_TRAIT): boolean {
    const weapon = MECH_WEAPONS[weaponId];
    const sizes = Object.keys(weapon.traits_by_size) as MechSizeId[];

    return !!sizes.find(sizeId => {
        return findById(weapon.traits_by_size[sizeId], traitId);
    });
}
