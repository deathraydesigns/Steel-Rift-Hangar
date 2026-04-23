import type { Trait, TraitInfo } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import type { FactionPerk } from './faction-perks';
import type { TeamPerk } from './mech-team-perks';
import { WEAPON_TRAIT } from './weapon-traits';

export enum SUPPORT_ASSET_WEAPON {
    ARTILLERY_BARRAGE = 'ARTILLERY_BARRAGE',
    MASS_DRIVER = 'MASS_DRIVER',
    MINE_DRONE_BARRAGE = 'MINE_DRONE_BARRAGE',
    ORBITAL_LASER = 'ORBITAL_LASER',
}

export interface OffTableWeapon {
    damage?: number,
    traits: Trait<WEAPON_TRAIT>[],
    damage_modifiers?: number[],
}

export interface OffTableWeaponInfo extends Omit<OffTableWeapon, 'traits'> {
    traits: TraitInfo<WEAPON_TRAIT>[],
    damage_modifiers: number[],
}

export interface SupportAssetWeapon {
    id: SUPPORT_ASSET_WEAPON,
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

export interface SupportAssetWeaponInfo extends Omit<SupportAssetWeapon, 'off_table_weapon'> {
    notes: SupportAssetWeaponInfoNote[],
    off_table_weapon: OffTableWeaponInfo,
}

export const SUPPORT_ASSET_WEAPONS = makeFrozenStaticListIds<SupportAssetWeapon>({
    [SUPPORT_ASSET_WEAPON.ARTILLERY_BARRAGE]: {
        display_name: 'Artillery Barrage',
        description: `Select an enemy Unit within LoS of a friendly Unit
                      with a Target Designator Marker, and remove the friendly Unit 's Marker. Perform an ENGAGE Order Targeting the enemy Unit. Do not apply modifiers for Side or Rear Arc, Covered, Blocking, Secondary Target or Bypassing Shot. LoS is drawn from the top of the Target Model’s Silhouette for any other purposes. The Weapon has Damage Rating 4, and has the Blast (6”) and Limited (3) traits.`,
        cost: 10,
        off_table_weapon: {
            damage: 4,
            traits: [
                trait(WEAPON_TRAIT.BLAST, 6),
                trait(WEAPON_TRAIT.LIMITED, 3),
            ],
        },
    },
    [SUPPORT_ASSET_WEAPON.MASS_DRIVER]: {
        display_name: 'Mass Driver',
        description: `Select an enemy Unit within LoS of a friendly Unit with a Target Designator Marker, and remove the friendly Unit 's Marker. Perform an ENGAGE Order Targeting the enemy Unit. Do not apply modifiers for Bypassing Shot or Secondary Target. LoS is drawn from any point on the Active Commander’s Deployment Edge or Corner, but is not blocked by Blocking Terrain. The Weapon has Damage Rating 7, and has the Kinetic and Limited (3) traits. The Weapon counts as Ultraheavy for the purposes of Kinetic.`,
        cost: 10,
        off_table_weapon: {
            damage: 7,
            traits: [
                trait(WEAPON_TRAIT.KINETIC),
                trait(WEAPON_TRAIT.LIMITED, 3),
            ],
        },
    },
    [SUPPORT_ASSET_WEAPON.MINE_DRONE_BARRAGE]: {
        display_name: 'Mine-Drone Barrage',
        description: 'Select 3 points on the table within LoS of one friendly Unit with a Target Designator Marker, and remove the friendly Unit’s Marker. Place a Mine Drone Token on each point. No Mine Drone Token may be placed within 6” of an existing Mine Drone Token. See the Minelayer trait for rules on Mine Drone Tokens. This Support Asset has the Limited (3) trait, (i.e. a total of 9 Mine Drone Tokens placed during the game).',
        cost: 10,
        off_table_weapon: {
            traits: [
                trait(WEAPON_TRAIT.MINE_TOKENS, 3),
            ],
        },
    },
    [SUPPORT_ASSET_WEAPON.ORBITAL_LASER]: {
        display_name: 'Orbital Laser',
        description: `Select an enemy Unit within LoS of a friendly Unit with a Target Designator Marker, and remove the friendly Unit 's Marker. Perform an ENGAGE Order Targeting the enemy Unit. Do not apply modifiers for Side or Rear Arc, Covered, Blocking, Secondary Target or Bypassing Shot. LoS is drawn from the top of the Target Model' s Silhouette for any other purposes.The Weapon has Damage Rating 3, and it has the AP (3) and Limited (3) traits.`,
        cost: 10,
        off_table_weapon: {
            damage: 3,
            traits: [
                trait(WEAPON_TRAIT.AP, 3),
                trait(WEAPON_TRAIT.LIMITED, 3),
            ],
        },
    },
});