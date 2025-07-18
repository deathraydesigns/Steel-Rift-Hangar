import {makeFrozenStaticListIds, trait} from './data-helpers.js';
import {
    INFANTRY_ELECTRO_ARC_PULSERS,
    INFANTRY_HEAVY_MISSILE_LAUNCHER,
    INFANTRY_HEAVY_RIFLES,
    INFANTRY_MISSILE_LAUNCHER,
    INFANTRY_RIFLES,
} from './unit-weapons.js';
import {TRAIT_MINE_SWEEPER, TRAIT_SUPPRESSIVE_FIRE, TRAIT_TARGET_DESIGNATOR} from './unit-traits.js';
import {SIZE_ULTRA_LIGHT} from './unit-sizes.js';
import {TYPE_INFANTRY} from './unit-types.js';

export const INFANTRY_RIFLE_SQUAD = 'INFANTRY_RIFLE_SQUAD';
export const INFANTRY_ANTI_TANK_SQUAD = 'INFANTRY_ANTI_TANK_SQUAD';
export const INFANTRY_RECON_SQUAD = 'INFANTRY_RECON_SQUAD';
export const INFANTRY_ENGINEER_SQUAD = 'INFANTRY_ENGINEER_SQUAD';
export const INFANTRY_ARC_SUIT_SQUAD = 'INFANTRY_ARC_SUIT_SQUAD';
export const INFANTRY_REAPER_SUIT_SQUAD = 'INFANTRY_REAPER_SUIT_SQUAD';
export const INFANTRY_VIPER_SUIT_SQUAD = 'INFANTRY_VIPER_SUIT_SQUAD';

const baseInfantryStats = {
    unit_type_id: TYPE_INFANTRY,
    size_id: SIZE_ULTRA_LIGHT,
    move: 3,
    armor: 0,
    structure: 3,
};

const baseSuitStats = {
    unit_type_id: TYPE_INFANTRY,
    size_id: SIZE_ULTRA_LIGHT,
};

export const INFANTRY_SQUADS = makeFrozenStaticListIds({
    [[INFANTRY_RIFLE_SQUAD]]: {
        ...baseInfantryStats,
        display_name: 'Rifle',
        weapon_ids: [
            INFANTRY_RIFLES,
        ],
        traits: [
            trait(TRAIT_SUPPRESSIVE_FIRE),
        ],
    },
    [[INFANTRY_ANTI_TANK_SQUAD]]: {
        ...baseInfantryStats,
        display_name: 'Anti-Tank',
        weapon_ids: [
            INFANTRY_RIFLES,
            INFANTRY_MISSILE_LAUNCHER,
        ],
        traits: [],
    },
    [[INFANTRY_RECON_SQUAD]]: {
        ...baseInfantryStats,
        display_name: 'Recon',
        weapon_ids: [
            INFANTRY_RIFLES,
        ],
        traits: [
            trait(TRAIT_TARGET_DESIGNATOR),
        ],
    },
    [[INFANTRY_ENGINEER_SQUAD]]: {
        ...baseInfantryStats,
        display_name: 'Engineers',
        weapon_ids: [
            INFANTRY_RIFLES,
        ],
        traits: [
            trait(TRAIT_MINE_SWEEPER),
        ],
    },
    [[INFANTRY_ARC_SUIT_SQUAD]]: {
        ...baseSuitStats,
        move: 4,
        armor: 0,
        structure: 4,
        display_name: 'Arc Suits',
        weapon_ids: [
            INFANTRY_RIFLES,
            INFANTRY_ELECTRO_ARC_PULSERS,
        ],
        traits: [
            trait(TRAIT_SUPPRESSIVE_FIRE),
        ],
    },
    [[INFANTRY_REAPER_SUIT_SQUAD]]: {
        ...baseSuitStats,
        move: 4,
        armor: 0,
        structure: 4,
        display_name: 'Reaper Suits',
        weapon_ids: [
            INFANTRY_RIFLES,
            INFANTRY_HEAVY_MISSILE_LAUNCHER,
        ],
        traits: [],
    },
    [[INFANTRY_VIPER_SUIT_SQUAD]]: {
        ...baseSuitStats,
        move: 5,
        armor: 0,
        structure: 4,
        display_name: 'Viper Suits',
        weapon_ids: [
            INFANTRY_HEAVY_RIFLES,
        ],
        traits: [
            trait(TRAIT_TARGET_DESIGNATOR),
        ],
    },
});

export function getInfantrySquad(id) {
    return Object.assign({}, INFANTRY_SQUADS[id]);
}