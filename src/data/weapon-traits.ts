import type { Trait, TraitFormatter } from '../types';
import { inchFormater, numberFormater } from './data-formatters';
import { makeTraits, type TraitDef } from './data-helpers';

export const TRAIT_AP = 'TRAIT_AP' as const;
export const TRAIT_BLAST = 'TRAIT_BLAST' as const;
export const TRAIT_DISRUPTIVE = 'TRAIT_DISRUPTIVE' as const;
export const TRAIT_DRAINING = 'TRAIT_DRAINING' as const;
export const TRAIT_FLAK = 'TRAIT_FLAK' as const;
export const TRAIT_FRAG = 'TRAIT_FRAG' as const;
export const TRAIT_KINETIC = 'TRAIT_KINETIC' as const;
export const TRAIT_LIGHT = 'TRAIT_LIGHT' as const;
export const TRAIT_LIMITED = 'TRAIT_LIMITED' as const;
export const TRAIT_MELEE = 'TRAIT_MELEE' as const;
export const TRAIT_SHORT = 'TRAIT_SHORT' as const;
export const TRAIT_SMART = 'TRAIT_SMART' as const;
export const TRAIT_MINE_TOKENS = 'TRAIT_MINE_TOKENS' as const;
export const TRAIT_BULKY = 'TRAIT_BULKY' as const;
export const TRAIT_CONCUSSIVE = 'TRAIT_CONCUSSIVE' as const;
export const TRAIT_DRAG = 'TRAIT_DRAG' as const;
export const TRAIT_PARRY = 'TRAIT_PARRY' as const;
export const TRAIT_REACH = 'TRAIT_REACH' as const;
export const TRAIT_STAGGER = 'TRAIT_STAGGER' as const;
export const TRAIT_TETHER = 'TRAIT_TETHER' as const;
export const TRAIT_ANTI_AIR = 'TRAIT_ANTI_AIR' as const;

export type WeaponTraitId =
    | typeof TRAIT_AP
    | typeof TRAIT_BLAST
    | typeof TRAIT_DISRUPTIVE
    | typeof TRAIT_DRAINING
    | typeof TRAIT_FLAK
    | typeof TRAIT_FRAG
    | typeof TRAIT_KINETIC
    | typeof TRAIT_LIGHT
    | typeof TRAIT_LIMITED
    | typeof TRAIT_MELEE
    | typeof TRAIT_SHORT
    | typeof TRAIT_SMART
    | typeof TRAIT_MINE_TOKENS
    | typeof TRAIT_BULKY
    | typeof TRAIT_CONCUSSIVE
    | typeof TRAIT_DRAG
    | typeof TRAIT_PARRY
    | typeof TRAIT_REACH
    | typeof TRAIT_STAGGER
    | typeof TRAIT_TETHER
    | typeof TRAIT_ANTI_AIR;

export interface WeaponTraitDef extends TraitDef {
    id: WeaponTraitId;
    description: string;
    formatter?: TraitFormatter;
}

export const WEAPON_TRAITS: Readonly<Record<WeaponTraitId, WeaponTraitDef>> = makeTraits<WeaponTraitDef>({
    [TRAIT_AP]: {
        display_name: 'AP',
        description: 'When a Target Unit suffers Damage from this Weapon, apply AP(Lt/Md/Hv/UH) Damage directly to the Target Unit’s Structure.',
        formatter: numberFormater,
    },
    [TRAIT_BLAST]: {
        display_name: 'Blast',
        description: 'All Units (friend or foe) within (X)” of the Target Model must also make a Defense Roll. The total Attack Pool is equal to the total Attack Pool for this Weapon against the Target. Note: The Defense Roll for each Unit is based on that Unit’s Weight Class, as usual for Engage Defense Rolls. Also, Units making these Defense Rolls are not considered “Targeted”.',
        formatter: inchFormater,
    },
    [TRAIT_DISRUPTIVE]: {
        display_name: 'Disruptive',
        description: 'When a Target Unit suffers Damage from this Weapon, the Active Commander rolls 1D6. On a 3+, mark the Target Unit with a Redline Marker. Note that if a Unit already has a Redline Marker, or cannot receive a Redline Marker, it receives 1 Structure Damage instead.',
    },
    [TRAIT_DRAINING]: {
        display_name: 'Draining',
        description: 'When a Unit uses this Weapon during its Activation, mark it with a Redline Marker after it has completed its Orders (in addition to an Activation Marker). A Unit that performs an Order while having a Redline Marker may not use this Weapon during that Order.',
    },
    [TRAIT_FLAK]: {
        display_name: 'Flak',
        description: 'When a Unit with this Weapon is Targeted by a Weapon with the word “Missile” or “Rocket” in the name, and the Active Unit is in this Model’s front 180°, reduce the Attack Pool from that Weapon by 1. If this Unit is Targeted by a Mine Drone, reduce the Attack Pool from that effect by 1.',
    },
    [TRAIT_FRAG]: {
        display_name: 'Frag',
        description: 'Targets of this Weapon are ‑1 to Defense Rolls caused by this Weapon.',
    },
    [TRAIT_KINETIC]: {
        display_name: 'Kinetic',
        formatter: (name, size) => {
            if (size) {
                return `${name}(${size})`;
            }
            return name;
        },
        description: 'When a Target Unit suffers Damage from this Weapon, roll 1D6. Add +1 to the roll for each Weight Class larger the Active Unit is than the Target Model. Subtract ‑1 from the roll for each Weight Class smaller the Active Unit is than the Target Unit. On a result of 4+, rotate the Target Unit 45° away from the Active Unit, in a direction chosen by the Active Commander.If the modifiers from Weight Class make the roll impossible, the Kinetic trait has no effect.',
    },
    [TRAIT_LIGHT]: {
        display_name: 'Light',
        description: 'When Applying Damage, the Damage suffered due to this Weapon or effect is halved, rounding down. Note: This includes Damage from the Blast effect.',
    },
    [TRAIT_LIMITED]: {
        display_name: 'Limited',
        description: 'This Weapon, Upgrade, or Asset may only be used (X) times during a Mission. Track the number of uses remaining.',
        formatter: numberFormater,
    },
    [TRAIT_MELEE]: {
        display_name: 'Melee',
        description: 'This Unit counts as one Weight Class larger during a SMASH Order. Add (X) to the Attack Pool of this Unit when it is performing a SMASH Order. This Weapon is not used in an ENGAGE Order. More than one Melee weapon does not grant this bonus multiple times.',
        formatter: numberFormater,
    },
    [TRAIT_SHORT]: {
        display_name: 'Short',
        description: 'This Weapon may only Target Units that are within (X)” of the Active Unit.',
    },
    [TRAIT_SMART]: {
        display_name: 'Smart',
        description: 'At the start of an ENGAGE Order, you may select a friendly Model with a Target Designator Marker. During that ENGAGE Order, when using this Weapon, the selected model may count as the Active Unit when drawing LoS, and determining Side or Rear Arc. When using the Smart trait in this way, this Weapon has its Attack Pool modified by ‑1. At the end of the ENGAGE Order, remove the Target Designator Marker from the selected Model.',
    },
    [TRAIT_MINE_TOKENS]: {
        display_name: 'Mine Tokens',
        description: '',
        formatter: numberFormater,
    },
    [TRAIT_BULKY]: {
        display_name: 'Bulky',
        description: 'This Weapon/Upgrade takes two of an HE‑V’s Weapon/Upgrade Slots to equip, rather than one.',
    },
    [TRAIT_CONCUSSIVE]: {
        display_name: 'Concussive',
        description: 'When a Target Unit suffers Damage from this Weapon, roll 1D6. Add +1 to the roll for each Weight Class larger the Active Unit is than the Target Unit. Subtract ‑1 from the roll for each Weight Class smaller the Active Unit is than the Target Unit. On a result of 4+, move the Target Unit up to (X)” directly away from the Active Unit. If, when the Target Unit is moved, it contacts any Blocking Terrain feature or another Unit, the Target Unit stops in base contact with the Terrain or Unit, and the Target Unit receives an additional 1 point of Damage with no Defense Roll. A Unit that is contacted by the Target Unit also receives 1 point of Damage with no Defense Roll. ',
        formatter: numberFormater,
    },
    [TRAIT_DRAG]: {
        display_name: 'Drag',
        description: 'When a Target Unit suffers Damage from this Weapon, roll 1D6 and add 4 to the result. Add +1 to the roll for each Class Size larger the Active Unit is than the Target Unit. Subtract ‑1 from the roll for each Class Size smaller the Active Unit is than the Target Unit. Move the Target Unit this many inches directly towards the Active Unit, stopping if it comes into base contact with the Active Unit. If, when the Target Unit is moved, it contacts any Blocking Terrain feature or another Unit, the Target Unit stops in base contact with the Terrain or Unit, and the Target Unit receives an additional 1 point of Damage with no Defense Roll. A Unit other than the Active Unit that is contacted by the Target Unit also receives 1 point of Damage with no Defense Roll. ',
    },
    [TRAIT_PARRY]: {
        display_name: 'Parry',
        description: 'Once per ENGAGE or SMASH Order where the Active Unit is in this Unit’s LoS, this Unit may re‑roll up to 2 Defense Dice.',
    },
    [TRAIT_REACH]: {
        display_name: 'Reach',
        description: 'When performing a SMASH Order using this Weapon, Units in Line of Sight and within (X)” of the Active Unit count as being in base contact for the purposes of this SMASH Order. In addition, while performing a SMASH Order, once the total Attack Pool has been determined, you may reduce the pool by 1 to nominate a secondary Unit in base contact and Line of Sight and divide the Attack Pool between the primary and secondary target. Defense Rolls are made as normal by the Target Units against those Attack Pools.',
        formatter: numberFormater,
    },
    [TRAIT_STAGGER]: {
        display_name: 'Stagger',
        description: 'When a Target Unit suffers Damage from this Weapon, the Target Unit receives a Stagger Marker at the end of the Order. A Unit with a Stagger Marker applies a ‑1 modifier to dice on Defense Rolls when Targeted by an ENGAGE or SMASH Order. After the ENGAGE or SMASH Order Targeting this Unit is completed, remove the Stagger Marker. If a Unit has a Stagger Marker at the start of its Activation, it may only perform one Order during that Activation, and may not perform a MOVE Order during that Activation. At the end of that Activation, remove the Stagger Marker.',
    },
    [TRAIT_TETHER]: {
        display_name: 'Tether',
        description: 'When a Target Unit suffers Damage from this Weapon, it receives a Tether Marker and the Active Unit receives a corresponding Anchor Marker. Units with a Tether Marker may not end a MOVE or JUMP Order further from the Unit with the corresponding Anchor Marker. At the end of an Activation of a Unit with a Tether Marker, roll a D6. On a 4+, remove the Tether Marker and the corresponding Anchor Marker. When a Unit with Anchor Marker(s) is destroyed, all corresponding Tether Markers are removed. Note that completing an Overdrive will not remove the Tether Marker. An Anchor Marker indicates what Unit a Tethered Unit may not move away from. See “Tether Marker” above.',
    },
    [TRAIT_ANTI_AIR]: {
        display_name: 'Anti-Air',
        description: 'When this Weapon targets a Unit with the Flying Trait, the Target is at ‑2 to Defense Rolls (i.e., if the Target Unit would normally remove damage from the Attack Pool on a 2+, it avoids Damage from this Weapon on a 4+). If a Weapon with this trait destroys the Target Model in a Squadron, you may apply remaining damage to another Model of the Squadron as if the Squadron was not a Flying Squadron.',
    },
});

export function weaponTraitDisplayName({ id, number, type }: Trait): string {

    const trait = WEAPON_TRAITS[id as WeaponTraitId];

    if (!trait) {
        throw new Error('trait not found: ' + id);
    }
    if (trait.formatter) {
        return trait.formatter(trait.display_name, number, type);
    }
    return trait.display_name;
}

export function freshWeaponTrait(trait: Trait) {
    const traitDef = WEAPON_TRAITS[trait.id as WeaponTraitId];
    return Object.assign(
        {},
        traitDef,
        trait,
        {
            display_name: weaponTraitDisplayName(trait),
        },
    );
}
