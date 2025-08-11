import {TEAM_GUNSLINGER} from '../mech-teams.js';
import {SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM} from '../unit-sizes.js';
import {MOD_STANDARD} from '../mech-body.js';
import {NO_ARMOR_UPGRADE} from '../mech-armor-upgrades.js';
import {MOBILITY_BI_PEDAL} from '../mech-mobility.js';
import {ARC_GUN, MAG_TETHER, MELEE_WEAPON, PLASMA_BLADE, ROTARY_CANNON, SHOT_CANNON} from '../mech-weapons.js';
import {COOLANT_TANKS, HAPTIC_SUIT, JUMP_JETS} from '../mech-upgrades.js';
import {TYPE_HEV} from '../unit-types.js';

export const pack4 = {
    name: 'Cerberus Gunslinger Team Box',
    team_id: TEAM_GUNSLINGER,
    mechs: [
        {
            id: 1,
            name: 'Ermey Medium HE-V 1',
            size_id: SIZE_MEDIUM,
            structure_mod_id: MOD_STANDARD,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_GUNSLINGER,
            weapons: [
                {
                    id: 3,
                    weapon_id: MELEE_WEAPON,
                    display_order: 0,
                },
                {
                    id: 1,
                    weapon_id: MAG_TETHER,
                    display_order: 1,
                },
                {
                    id: 2,
                    weapon_id: ROTARY_CANNON,
                    display_order: 2,
                },
            ],
            weapons_id_increment: 4,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: HAPTIC_SUIT,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: JUMP_JETS,
                    display_order: 1,
                },
            ],
            upgrades_id_increment: 3,
            display_order: 0,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 2,
            name: 'Zuma Heavy HE-V 1',
            size_id: SIZE_HEAVY,
            structure_mod_id: MOD_STANDARD,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_GUNSLINGER,
            weapons: [
                {
                    id: 1,
                    weapon_id: PLASMA_BLADE,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: ROTARY_CANNON,
                    display_order: 1,
                },
                {
                    id: 3,
                    weapon_id: SHOT_CANNON,
                    display_order: 2,
                },
            ],
            weapons_id_increment: 4,
            upgrades: [
                {
                    id: 3,
                    upgrade_id: COOLANT_TANKS,
                    display_order: 0,
                },
                {
                    id: 1,
                    upgrade_id: HAPTIC_SUIT,
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
            name: 'Chesty Light HE-V',
            size_id: SIZE_LIGHT,
            structure_mod_id: MOD_STANDARD,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_GUNSLINGER,
            weapons: [
                {
                    id: 1,
                    weapon_id: ARC_GUN,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: SHOT_CANNON,
                    display_order: 1,
                },
            ],
            weapons_id_increment: 3,
            upgrades: [
                {
                    id: 2,
                    upgrade_id: COOLANT_TANKS,
                    display_order: 0,
                },
                {
                    id: 1,
                    upgrade_id: HAPTIC_SUIT,
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
            name: 'Ermey Medium HE-V 2',
            size_id: SIZE_MEDIUM,
            structure_mod_id: MOD_STANDARD,
            armor_mod_id: MOD_STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MOBILITY_BI_PEDAL,
            preferred_team_id: TEAM_GUNSLINGER,
            weapons: [
                {
                    id: 1,
                    weapon_id: SHOT_CANNON,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: SHOT_CANNON,
                    display_order: 1,
                },
            ],
            weapons_id_increment: 3,
            upgrades: [
                {
                    id: 3,
                    upgrade_id: COOLANT_TANKS,
                    display_order: 0,
                },
                {
                    id: 1,
                    upgrade_id: HAPTIC_SUIT,
                    display_order: 1,
                },
                {
                    id: 2,
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
