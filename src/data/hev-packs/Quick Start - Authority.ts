import { NO_ARMOR_UPGRADE } from '../mech-armor-upgrades';
import { MECH_BODY_MOD } from '../mech-body';
import { MECH_MOBILITY } from '../mech-mobility';
import { TEAM_GENERAL } from '../mech-teams';
import { JUMP_JETS, TARGET_DESIGNATOR } from '../mech-upgrades';
import { AUTO_CANNON, MISSILES, RAIL_GUN } from '../mech-weapons';
import { SIZE } from '../unit-sizes';
import { TYPE_HEV } from '../unit-types';

export const pack1 = {
    name: 'Quick Start - Authority',
    team_id: TEAM_GENERAL,
    mechs: [
        {
            id: 1,
            name: 'Authority Light HE-V',
            size_id: SIZE.LIGHT,
            structure_mod_id: MECH_BODY_MOD.REINFORCED,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: TEAM_GENERAL,
            weapons: [
                {
                    id: 1,
                    weapon_id: AUTO_CANNON,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: AUTO_CANNON,
                    display_order: 1,
                },
            ],
            weapons_id_increment: 3,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: TARGET_DESIGNATOR,
                    display_order: 0,
                },
            ],
            upgrades_id_increment: 2,
            display_order: 0,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 2,
            name: 'Authority Medium HE-V',
            size_id: SIZE.MEDIUM,
            structure_mod_id: MECH_BODY_MOD.STANDARD,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: TEAM_GENERAL,
            weapons: [
                {
                    id: 1,
                    weapon_id: MISSILES,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: MISSILES,
                    display_order: 1,
                },
                {
                    id: 3,
                    weapon_id: AUTO_CANNON,
                    display_order: 2,
                },
                {
                    id: 4,
                    weapon_id: RAIL_GUN,
                    display_order: 3,
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
            display_order: 1,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
        {
            id: 3,
            name: 'Authority Heavy HE-V',
            size_id: SIZE.HEAVY,
            structure_mod_id: MECH_BODY_MOD.REINFORCED,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: TEAM_GENERAL,
            weapons: [
                {
                    id: 1,
                    weapon_id: MISSILES,
                    display_order: 0,
                },
                {
                    id: 3,
                    weapon_id: AUTO_CANNON,
                    display_order: 1,
                },
                {
                    id: 4,
                    weapon_id: RAIL_GUN,
                    display_order: 2,
                },
                {
                    id: 5,
                    weapon_id: RAIL_GUN,
                    display_order: 3,
                },
            ],
            weapons_id_increment: 6,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: TARGET_DESIGNATOR,
                    display_order: 0,
                },
            ],
            upgrades_id_increment: 2,
            display_order: 2,
            unit_type_id: TYPE_HEV,
            visible: true,
        },
    ],
};