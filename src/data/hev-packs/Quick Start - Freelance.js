import {SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM} from '../unit-sizes.js';
import {MOD_REINFORCED, MOD_STANDARD} from '../mech-body.js';
import {NO_ARMOR_UPGRADE} from '../mech-armor-upgrades.js';
import {MOBILITY_BI_PEDAL} from '../mech-mobility.js';
import {TEAM_GENERAL} from '../mech-teams.js';
import {AUTO_CANNON, MELEE_WEAPON, RAIL_GUN, SUBMUNITIONS} from '../mech-weapons.js';
import {JUMP_JETS, OPTIC_CAMO} from '../mech-upgrades.js';
import {TYPE_HEV} from '../unit-types.js';

export const pack2 = {
    name: 'Quick Start - Freelance',
    team_id: TEAM_GENERAL,
    mechs: [
        {
            id: 1,
            name: 'Freelance Light HE-V',
            size_id: SIZE_LIGHT,
            structure_mod_id: MOD_STANDARD,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_GENERAL,
            weapons: [
                {
                    id: 1,
                    weapon_id: AUTO_CANNON,
                    display_order: 0,
                },
                {
                    id: 3,
                    weapon_id: RAIL_GUN,
                    display_order: 1,
                },
                {
                    id: 4,
                    weapon_id: MELEE_WEAPON,
                    display_order: 2,
                },
            ],
            weapons_id_increment: 5,
            upgrades: [
                {
                    id: 2,
                    upgrade_id: JUMP_JETS,
                    display_order: 0,
                },
            ],
            upgrades_id_increment: 3,
            display_order: 0,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 2,
            name: 'Freelance Medium HE-V',
            size_id: SIZE_MEDIUM,
            structure_mod_id: MOD_REINFORCED,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_GENERAL,
            weapons: [
                {
                    id: 3,
                    weapon_id: AUTO_CANNON,
                    display_order: 0,
                },
                {
                    id: 4,
                    weapon_id: RAIL_GUN,
                    display_order: 1,
                },
                {
                    id: 5,
                    weapon_id: RAIL_GUN,
                    display_order: 2,
                },
                {
                    id: 6,
                    weapon_id: MELEE_WEAPON,
                    display_order: 3,
                },
            ],
            weapons_id_increment: 7,
            upgrades: [
                {
                    id: 2,
                    upgrade_id: JUMP_JETS,
                    display_order: 0,
                },
            ],
            upgrades_id_increment: 3,
            display_order: 1,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 3,
            name: 'Freelance Heavy HE-V',
            size_id: SIZE_HEAVY,
            structure_mod_id: MOD_REINFORCED,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_GENERAL,
            weapons: [
                {
                    id: 3,
                    weapon_id: AUTO_CANNON,
                    display_order: 0,
                },
                {
                    id: 4,
                    weapon_id: RAIL_GUN,
                    display_order: 1,
                },
                {
                    id: 6,
                    weapon_id: SUBMUNITIONS,
                    display_order: 2,
                },
                {
                    id: 7,
                    weapon_id: MELEE_WEAPON,
                    display_order: 3,
                },
            ],
            weapons_id_increment: 8,
            upgrades: [
                {
                    id: 2,
                    upgrade_id: JUMP_JETS,
                    display_order: 0,
                },
                {
                    id: 3,
                    upgrade_id: OPTIC_CAMO,
                    display_order: 1,
                },
            ],
            upgrades_id_increment: 4,
            display_order: 2,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
    ],
};