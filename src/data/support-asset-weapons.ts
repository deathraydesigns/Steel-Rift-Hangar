import type { TeamPerk, Trait } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import type { FactionPerk } from './faction-perks';
import {
    TRAIT_AP,
    TRAIT_BLAST,
    TRAIT_KINETIC,
    TRAIT_LIMITED,
    TRAIT_MINE_TOKENS,
    type WeaponTraitId,
} from './weapon-traits';

export const ARTILLERY_BARRAGE = 'ARTILLERY_BARRAGE' as const;
export const MASS_DRIVER = 'MASS_DRIVER' as const;
export const MINE_DRONE_BARRAGE = 'MINE_DRONE_BARRAGE' as const;
export const ORBITAL_LASER = 'ORBITAL_LASER' as const;

export type SupportAssetWeaponId =
    | typeof ARTILLERY_BARRAGE
    | typeof MASS_DRIVER
    | typeof MINE_DRONE_BARRAGE
    | typeof ORBITAL_LASER

export interface OffTableWeapon {
    damage?: number,
    traits: Trait<WeaponTraitId>[],
    damage_modifiers?: number[],
}

export interface OffTableWeaponInfo extends OffTableWeapon {
    damage_modifiers: number[],
}

export interface SupportAssetWeapon {
    id: SupportAssetWeaponId,
    display_name: string;
    description: string;
    cost: number;
    off_table_weapon: OffTableWeapon,
}

export type SupportAssetWeaponInfoNote = {
    display_name: string,
    description?: string,
} & (
    (FactionPerk & {
        is_faction_perk: true,
        is_team_perk?: undefined
    })
    | (TeamPerk & {
    is_team_perk: true,
    is_faction_perk?: undefined
})
    )

export interface SupportAssetWeaponInfo extends SupportAssetWeapon {
    notes: SupportAssetWeaponInfoNote[],
    damage_modifiers: number[],
}

export const SUPPORT_ASSET_WEAPONS = makeFrozenStaticListIds<SupportAssetWeapon>({
    [ARTILLERY_BARRAGE]: {
        display_name: 'Artillery Barrage',
        description: `Select an enemy Unit within LoS of a friendly Unit
                      with a Target Designator Marker, and remove the friendly Unit 's Marker. Perform an ENGAGE Order Targeting the enemy Unit. Do not apply modifiers for Side or Rear Arc, Covered, Blocking, Secondary Target or Bypassing Shot. LoS is drawn from the top of the Target Model’s Silhouette for any other purposes. The Weapon has Damage Rating 4, and has the Blast (6”) and Limited (3) traits.`,
        cost: 10,
        off_table_weapon: {
            damage: 4,
            traits: [
                trait(TRAIT_BLAST, 6),
                trait(TRAIT_LIMITED, 3),
            ],
        },
    },
    [MASS_DRIVER]: {
        display_name: 'Mass Driver',
        description: `Select an enemy Unit within LoS of a friendly Unit
                      with a Target Designator Marker, and remove the friendly Unit 's Marker. Perform an ENGAGE Order Targeting the enemy Unit. Do not apply modifiers for Bypassing Shot or Secondary Target. LoS is drawn from any point on the Active Commander’s Deployment Edge or Corner, but is not blocked by Blocking Terrain. The Weapon has Damage Rating 7, and has the Kinetic and Limited (3) traits. The Weapon counts as Ultraheavy for the purposes of Kinetic.`,
        cost: 10,
        off_table_weapon: {
            damage: 7,
            traits: [
                trait(TRAIT_KINETIC),
                trait(TRAIT_LIMITED, 3),
            ],
        },
    },
    [MINE_DRONE_BARRAGE]: {
        display_name: 'Mine-Drone Barrage',
        description: 'Select 3 points on the table within LoS of one friendly Unit with a Target Designator Marker, and remove the friendly Unit’s Marker. Place a Mine Drone Token on each point. No Mine Drone Token may be placed within 6” of an existing Mine Drone Token. See the Minelayer trait for rules on Mine Drone Tokens. This Support Asset has the Limited (3) trait, (i.e. a total of 9 Mine Drone Tokens placed during the game).',
        cost: 10,
        off_table_weapon: {
            traits: [
                trait(TRAIT_MINE_TOKENS, 3),
            ],
        },
    },
    [ORBITAL_LASER]: {
        display_name: 'Orbital Laser',
        description: `Select an enemy Unit within LoS of a friendly Unit
                      with a Target Designator Marker, and remove the friendly Unit 's Marker. Perform an ENGAGE Order Targeting the enemy Unit. Do not apply modifiers for Side or Rear Arc, Covered, Blocking, Secondary Target or Bypassing Shot. LoS is drawn from the top of the Target Model' s Silhouette for any other purposes.The Weapon has Damage Rating 3, and it has the AP (3) and Limited (3) traits.`,
        cost: 10,
        off_table_weapon: {
            damage: 3,
            traits: [
                trait(TRAIT_AP, 3),
                trait(TRAIT_LIMITED, 3),
            ],
        },
    },
});