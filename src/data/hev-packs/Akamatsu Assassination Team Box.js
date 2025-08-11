import {TEAM_ASSASSIN} from '../mech-teams.js';
import {SIZE_LIGHT, SIZE_MEDIUM} from '../unit-sizes.js';
import {MOD_REINFORCED, MOD_STANDARD} from '../mech-body.js';
import {EXTRA_PLATING_ARMOR_UPGRADE, NO_ARMOR_UPGRADE} from '../mech-armor-upgrades.js';
import {MOBILITY_BI_PEDAL} from '../mech-mobility.js';
import {COMBAT_BLADE, PLASMA_BLADE} from '../mech-weapons.js';
import {DIRECTIONAL_THRUSTER, HIGH_SPEED_SERVOS, JUMP_JETS} from '../mech-upgrades.js';
import {TYPE_HEV} from '../unit-types.js';

export const pack3 = {
    name: 'Akamatsu Assassination Team Box',
    team_id: TEAM_ASSASSIN,
    mechs: [
        {
            id: 1,
            name: 'Haro Light HE-V 1',
            size_id: SIZE_LIGHT,
            structure_mod_id: MOD_REINFORCED,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: COMBAT_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 3,
                    upgrade_id: JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 4,
            display_order: 0,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 2,
            name: 'Kenshiro Medium HE-V 1',
            size_id: SIZE_MEDIUM,
            structure_mod_id: MOD_REINFORCED,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: EXTRA_PLATING_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: PLASMA_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 4,
                    upgrade_id: JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 5,
            display_order: 1,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 3,
            name: 'Haro Light HE-V 2',
            size_id: SIZE_LIGHT,
            structure_mod_id: MOD_REINFORCED,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: COMBAT_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 3,
                    upgrade_id: JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 4,
            display_order: 2,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 4,
            name: 'Kenshiro Medium HE-V 2',
            size_id: SIZE_MEDIUM,
            structure_mod_id: MOD_REINFORCED,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: EXTRA_PLATING_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: PLASMA_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 3,
                    upgrade_id: JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 4,
            display_order: 3,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
    ],
};