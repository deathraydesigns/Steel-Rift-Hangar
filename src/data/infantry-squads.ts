import { type Trait } from '../types';
import { makeFrozenStaticListIds, trait } from './data-helpers';
import { SIZE } from './unit-sizes';
import { UNIT_TRAIT } from './unit-traits';
import { UNIT_TYPE } from './unit-types';
import { UNIT_WEAPON } from './unit-weapons';

export enum INFANTRY {
    RIFLE_SQUAD = 'INFANTRY_RIFLE_SQUAD',
    ANTI_TANK_SQUAD = 'INFANTRY_ANTI_TANK_SQUAD',
    RECON_SQUAD = 'INFANTRY_RECON_SQUAD',
    ENGINEER_SQUAD = 'INFANTRY_ENGINEER_SQUAD',
    ARC_SUIT_SQUAD = 'INFANTRY_ARC_SUIT_SQUAD',
    REAPER_SUIT_SQUAD = 'INFANTRY_REAPER_SUIT_SQUAD',
    VIPER_SUIT_SQUAD = 'INFANTRY_VIPER_SUIT_SQUAD',
}

const baseInfantryStats = {
    unit_type_id: UNIT_TYPE.INFANTRY,
    size_id: SIZE.ULTRA_LIGHT,
    move: 3,
    armor: 0,
    structure: 3,
} as const;

const baseSuitStats = {
    unit_type_id: UNIT_TYPE.INFANTRY,
    size_id: SIZE.ULTRA_LIGHT,
} as const;

export interface InfantrySquad {
    id: INFANTRY,
    unit_type_id: UNIT_TYPE.INFANTRY,
    size_id: SIZE,
    move: number,
    armor: number,
    structure: number,
    display_name: string,
    weapon_ids: UNIT_WEAPON[],
    traits: Trait[]
}

export const INFANTRY_SQUADS = makeFrozenStaticListIds<InfantrySquad>({
    [INFANTRY.RIFLE_SQUAD]: {
        ...baseInfantryStats,
        display_name: 'Rifle',
        weapon_ids: [
            UNIT_WEAPON.INFANTRY_RIFLES,
        ],
        traits: [
            trait(UNIT_TRAIT.SUPPRESSIVE_FIRE),
        ],
    },
    [INFANTRY.ANTI_TANK_SQUAD]: {
        ...baseInfantryStats,
        display_name: 'Anti-Tank',
        weapon_ids: [
            UNIT_WEAPON.INFANTRY_RIFLES,
            UNIT_WEAPON.INFANTRY_MISSILE_LAUNCHER,
        ],
        traits: [],
    },
    [INFANTRY.RECON_SQUAD]: {
        ...baseInfantryStats,
        display_name: 'Recon',
        weapon_ids: [
            UNIT_WEAPON.INFANTRY_RIFLES,
        ],
        traits: [
            trait(UNIT_TRAIT.TARGET_DESIGNATOR),
        ],
    },
    [INFANTRY.ENGINEER_SQUAD]: {
        ...baseInfantryStats,
        display_name: 'Engineers',
        weapon_ids: [
            UNIT_WEAPON.INFANTRY_RIFLES,
        ],
        traits: [
            trait(UNIT_TRAIT.MINE_SWEEPER),
        ],
    },
    [INFANTRY.ARC_SUIT_SQUAD]: {
        ...baseSuitStats,
        move: 4,
        armor: 2,
        structure: 2,
        display_name: 'Arc Suits',
        weapon_ids: [
            UNIT_WEAPON.INFANTRY_RIFLES,
            UNIT_WEAPON.INFANTRY_ELECTRO_ARC_PULSERS,
        ],
        traits: [
            trait(UNIT_TRAIT.SUPPRESSIVE_FIRE),
        ],
    },
    [INFANTRY.REAPER_SUIT_SQUAD]: {
        ...baseSuitStats,
        move: 4,
        armor: 2,
        structure: 2,
        display_name: 'Reaper Suits',
        weapon_ids: [
            UNIT_WEAPON.INFANTRY_RIFLES,
            UNIT_WEAPON.INFANTRY_HEAVY_MISSILE_LAUNCHER,
        ],
        traits: [],
    },
    [INFANTRY.VIPER_SUIT_SQUAD]: {
        ...baseSuitStats,
        move: 5,
        armor: 2,
        structure: 2,
        display_name: 'Viper Suits',
        weapon_ids: [
            UNIT_WEAPON.INFANTRY_HEAVY_RIFLES,
        ],
        traits: [
            trait(UNIT_TRAIT.TARGET_DESIGNATOR),
        ],
    },
});

export function getInfantrySquad(id: keyof typeof INFANTRY_SQUADS): InfantrySquad {
    return Object.assign({}, INFANTRY_SQUADS[id]);
}