import { MECH_ARMOR_UPGRADE } from '../mech-armor-upgrades';
import { MECH_BODY_MOD } from '../mech-body';
import { MECH_MOBILITY } from '../mech-mobility';
import { MECH_TEAM } from '../mech-teams';
import { MECH_UPGRADE } from '../mech-upgrades';
import { MECH_WEAPON } from '../mech-weapons';
import { SIZE } from '../unit-sizes';
import { UNIT_TYPE } from '../unit-types';

export const pack3 = {
    name: 'Akamatsu Assassination Team Box',
    team_id: MECH_TEAM.ASSASSIN,
    mechs: [
        {
            id: 1,
            name: 'Haro Light HE-V 1',
            size_id: SIZE.LIGHT,
            structure_mod_id: MECH_BODY_MOD.REINFORCED,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.COMBAT_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: MECH_UPGRADE.HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 3,
                    upgrade_id: MECH_UPGRADE.JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 4,
            display_order: 0,
            unit_type_id: UNIT_TYPE.HEV,
            visible: true,
        },
        {
            id: 2,
            name: 'Kenshiro Medium HE-V 1',
            size_id: SIZE.MEDIUM,
            structure_mod_id: MECH_BODY_MOD.REINFORCED,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.EXTRA_PLATING_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.PLASMA_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: MECH_UPGRADE.HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 4,
                    upgrade_id: MECH_UPGRADE.JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 5,
            display_order: 1,
            unit_type_id: UNIT_TYPE.HEV,
            visible: true,
        },
        {
            id: 3,
            name: 'Haro Light HE-V 2',
            size_id: SIZE.LIGHT,
            structure_mod_id: MECH_BODY_MOD.REINFORCED,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.COMBAT_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: MECH_UPGRADE.HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 3,
                    upgrade_id: MECH_UPGRADE.JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 4,
            display_order: 2,
            unit_type_id: UNIT_TYPE.HEV,
            visible: true,
        },
        {
            id: 4,
            name: 'Kenshiro Medium HE-V 2',
            size_id: SIZE.MEDIUM,
            structure_mod_id: MECH_BODY_MOD.REINFORCED,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.EXTRA_PLATING_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.ASSASSIN,
            weapons: [
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.PLASMA_BLADE,
                    display_order: 0,
                },
            ],
            weapons_id_increment: 2,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.DIRECTIONAL_THRUSTER,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: MECH_UPGRADE.HIGH_SPEED_SERVOS,
                    display_order: 1,
                },
                {
                    id: 3,
                    upgrade_id: MECH_UPGRADE.JUMP_JETS,
                    display_order: 2,
                },
            ],
            upgrades_id_increment: 4,
            display_order: 3,
            unit_type_id: UNIT_TYPE.HEV,
            visible: true,
        },
    ],
};