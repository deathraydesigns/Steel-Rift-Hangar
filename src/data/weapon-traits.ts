import type { Trait, TraitInfo } from '../types';
import { inchFormater, xFormater, xyFormater } from './data-formatters';
import { makeTraits, type TraitDef } from './data-helpers';

export enum WEAPON_TRAIT {
    AP = 'TRAIT_AP',
    BLAST = 'TRAIT_BLAST',
    DISRUPTIVE = 'TRAIT_DISRUPTIVE',
    DRAINING = 'TRAIT_DRAINING',
    FLAK = 'TRAIT_FLAK',
    FRAG = 'TRAIT_FRAG',
    KINETIC = 'TRAIT_KINETIC',
    LIGHT = 'TRAIT_LIGHT',
    LIMITED = 'TRAIT_LIMITED',
    MELEE = 'TRAIT_MELEE',
    SHORT = 'TRAIT_SHORT',
    SMART = 'TRAIT_SMART',
    MINE_TOKENS = 'TRAIT_MINE_TOKENS',
    BULKY = 'TRAIT_BULKY',
    CONCUSSIVE = 'TRAIT_CONCUSSIVE',
    DRAG = 'TRAIT_DRAG',
    PARRY = 'TRAIT_PARRY',
    REACH = 'TRAIT_REACH',
    STAGGER = 'TRAIT_STAGGER',
    TETHER = 'TRAIT_TETHER',
    ANTI_AIR = 'TRAIT_ANTI_AIR',
    SMASHER = 'TRAIT_SMASHER',
}

export interface WeaponTraitDef extends TraitDef<WEAPON_TRAIT> {
}

export const WEAPON_TRAITS: Readonly<Record<WEAPON_TRAIT, WeaponTraitDef>> = makeTraits<WeaponTraitDef>({
    [WEAPON_TRAIT.AP]: {
        display_name: 'AP',
        description: 'When a Target Unit suffers Damage from this Weapon, apply AP(Lt/Md/Hv/UH) Damage directly to the Target Unit’s Structure.',
        formatter: xFormater,
    },
    [WEAPON_TRAIT.BLAST]: {
        display_name: 'Blast',
        description: 'All Units (friend or foe) within (X)” of the Target Model must also make a Defense Roll. The total Attack Pool is equal to the total Attack Pool for this Weapon against the Target. Note: The Defense Roll for each Unit is based on that Unit’s Weight Class, as usual for Engage Defense Rolls. Also, Units making these Defense Rolls are not considered “Targeted”.',
        formatter: inchFormater,
    },
    [WEAPON_TRAIT.DISRUPTIVE]: {
        display_name: 'Disruptive',
        description: 'When a Target Unit suffers Damage from this Weapon, the Active Commander rolls 1D6. On a 3+, mark the Target Unit with a Redline Marker. Note that if a Unit already has a Redline Marker, or cannot receive a Redline Marker, it receives 1 Structure Damage instead.',
    },
    [WEAPON_TRAIT.DRAINING]: {
        display_name: 'Draining',
        description: 'When a Unit uses this Weapon during its Activation, mark it with a Redline Marker after it has completed its Orders (in addition to an Activation Marker). A Unit that performs an Order while having a Redline Marker may not use this Weapon during that Order.',
    },
    [WEAPON_TRAIT.FLAK]: {
        display_name: 'Flak',
        description: 'When a Unit with this Weapon is Targeted by a Weapon with the word “Missile” or “Rocket” in the name, and the Active Unit is in this Model’s front 180°, reduce the Attack Pool from that Weapon by 1. If this Unit is Targeted by a Mine Drone, reduce the Attack Pool from that effect by 1.',
    },
    [WEAPON_TRAIT.FRAG]: {
        display_name: 'Frag',
        description: 'Targets of this Weapon are ‑1 to Defense Rolls caused by this Weapon.',
    },
    [WEAPON_TRAIT.KINETIC]: {
        display_name: 'Kinetic',
        formatter: (name, size) => {
            if (size) {
                return `${name}(${size})`;
            }
            return name;
        },
        description: 'When a Target Unit suffers Damage from this Weapon, roll 1D6. Add +1 to the roll for each Weight Class larger the Active Unit is than the Target Model. Subtract ‑1 from the roll for each Weight Class smaller the Active Unit is than the Target Unit. On a result of 4+, rotate the Target Unit 45° away from the Active Unit, in a direction chosen by the Active Commander.If the modifiers from Weight Class make the roll impossible, the Kinetic trait has no effect.',
    },
    [WEAPON_TRAIT.LIGHT]: {
        display_name: 'Light',
        description: 'When Applying Damage, the Damage suffered due to this Weapon or effect is halved, rounding down. Note: This includes Damage from the Blast effect.',
    },
    [WEAPON_TRAIT.LIMITED]: {
        display_name: 'Limited',
        description: 'This Weapon, Upgrade, or Asset may only be used (X) times during a Mission. Track the number of uses remaining.',
        formatter: xFormater,
    },
    [WEAPON_TRAIT.MELEE]: {
        display_name: 'Melee',
        description: 'This Unit counts as one Weight Class larger during a SMASH Order. Add (X) to the Attack Pool of this Unit when it is performing a SMASH Order. This Weapon is not used in an ENGAGE Order. More than one Melee weapon does not grant this bonus multiple times.',
        formatter: xFormater,
    },
    [WEAPON_TRAIT.SHORT]: {
        display_name: 'Short',
        description: 'This Weapon may only Target Units that are within (X)” of the Active Unit.',
    },
    [WEAPON_TRAIT.SMART]: {
        display_name: 'Smart',
        description: 'At the start of an ENGAGE Order, you may select a friendly Model with a Target Designator Marker. During that ENGAGE Order, when using this Weapon, the selected model may count as the Active Unit when drawing LoS, and determining Side or Rear Arc. When using the Smart trait in this way, this Weapon has its Attack Pool modified by ‑1. At the end of the ENGAGE Order, remove the Target Designator Marker from the selected Model.',
    },
    [WEAPON_TRAIT.MINE_TOKENS]: {
        display_name: 'Mine Tokens',
        description: '',
        formatter: xFormater,
    },
    [WEAPON_TRAIT.BULKY]: {
        display_name: 'Bulky',
        description: 'This Weapon/Upgrade takes two of an HE‑V’s Weapon/Upgrade Slots to equip, rather than one.',
    },
    [WEAPON_TRAIT.CONCUSSIVE]: {
        display_name: 'Concussive',
        description: 'When a Target Unit suffers Damage from this Weapon, roll 1D6. Add +1 to the roll for each Weight Class larger the Active Unit is than the Target Unit. Subtract ‑1 from the roll for each Weight Class smaller the Active Unit is than the Target Unit. On a result of 4+, move the Target Unit up to (X)” directly away from the Active Unit. If, when the Target Unit is moved, it contacts any Blocking Terrain feature or another Unit, the Target Unit stops in base contact with the Terrain or Unit, and the Target Unit receives an additional 1 point of Damage with no Defense Roll. A Unit that is contacted by the Target Unit also receives 1 point of Damage with no Defense Roll. ',
        formatter: xFormater,
    },
    [WEAPON_TRAIT.DRAG]: {
        display_name: 'Drag',
        description: 'When a Target Unit suffers Damage from this Weapon, roll 1D6 and add 4 to the result. Add +1 to the roll for each Class Size larger the Active Unit is than the Target Unit. Subtract ‑1 from the roll for each Class Size smaller the Active Unit is than the Target Unit. Move the Target Unit this many inches directly towards the Active Unit, stopping if it comes into base contact with the Active Unit. If, when the Target Unit is moved, it contacts any Blocking Terrain feature or another Unit, the Target Unit stops in base contact with the Terrain or Unit, and the Target Unit receives an additional 1 point of Damage with no Defense Roll. A Unit other than the Active Unit that is contacted by the Target Unit also receives 1 point of Damage with no Defense Roll. ',
    },
    [WEAPON_TRAIT.PARRY]: {
        display_name: 'Parry',
        description: 'Once per ENGAGE or SMASH Order where the Active Unit is in this Unit’s LoS, this Unit may re‑roll up to 2 Defense Dice.',
    },
    [WEAPON_TRAIT.REACH]: {
        display_name: 'Reach',
        description: 'When performing a SMASH Order using this Weapon, Units in Line of Sight and within (X)” of the Active Unit count as being in base contact for the purposes of this SMASH Order. In addition, while performing a SMASH Order, once the total Attack Pool has been determined, you may reduce the pool by 1 to nominate a secondary Unit in base contact and Line of Sight and divide the Attack Pool between the primary and secondary target. Defense Rolls are made as normal by the Target Units against those Attack Pools.',
        formatter: xFormater,
    },
    [WEAPON_TRAIT.STAGGER]: {
        display_name: 'Stagger',
        description: 'When a Target Unit suffers Damage from this Weapon, the Target Unit receives a Stagger Marker at the end of the Order. A Unit with a Stagger Marker applies a ‑1 modifier to dice on Defense Rolls when Targeted by an ENGAGE or SMASH Order. After the ENGAGE or SMASH Order Targeting this Unit is completed, remove the Stagger Marker. If a Unit has a Stagger Marker at the start of its Activation, it may only perform one Order during that Activation, and may not perform a MOVE Order during that Activation. At the end of that Activation, remove the Stagger Marker.',
    },
    [WEAPON_TRAIT.TETHER]: {
        display_name: 'Tether',
        description: 'When a Target Unit suffers Damage from this Weapon, it receives a Tether Marker and the Active Unit receives a corresponding Anchor Marker. Units with a Tether Marker may not end a MOVE or JUMP Order further from the Unit with the corresponding Anchor Marker. At the end of an Activation of a Unit with a Tether Marker, roll a D6. On a 4+, remove the Tether Marker and the corresponding Anchor Marker. When a Unit with Anchor Marker(s) is destroyed, all corresponding Tether Markers are removed. Note that completing an Overdrive will not remove the Tether Marker. An Anchor Marker indicates what Unit a Tethered Unit may not move away from. See “Tether Marker” above.',
    },
    [WEAPON_TRAIT.ANTI_AIR]: {
        display_name: 'Anti-Air',
        description: 'When this Weapon targets a Unit with the Flying Trait, the Target is at ‑2 to Defense Rolls (i.e., if the Target Unit would normally remove damage from the Attack Pool on a 2+, it avoids Damage from this Weapon on a 4+). If a Weapon with this trait destroys the Target Model in a Squadron, you may apply remaining damage to another Model of the Squadron as if the Squadron was not a Flying Squadron.',
    },
    [WEAPON_TRAIT.SMASHER]: {
        display_name: 'Smasher',
        description: 'This Unit is permitted to make the SMASH Order, even if it has the Auxiliary Unit Trait. The Unit is considered of Weight Class X when making a SMASH Order. Add Y dice to the Attack Pool when performing a SMASH Order.',
        formatter: xyFormater,
    },
});

export function weaponTraitDisplayName({ id, X, Y }: Trait<WEAPON_TRAIT>): string {

    const trait = WEAPON_TRAITS[id as WEAPON_TRAIT];

    if (!trait) {
        throw new Error('trait not found: ' + id);
    }
    if (trait.formatter) {
        return trait.formatter(trait.display_name, X, Y);
    }
    return trait.display_name;
}

export function weaponTraitInfo(trait: Trait<WEAPON_TRAIT>): TraitInfo<WEAPON_TRAIT> {
    return {
        dependent_trait_ids: [],
        ...WEAPON_TRAITS[trait.id as WEAPON_TRAIT],
        ...trait,
        display_name: weaponTraitDisplayName(trait),
    };
}
