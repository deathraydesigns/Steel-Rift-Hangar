import { MECH_ARMOR_UPGRADE } from '../mech-armor-upgrades';
import { MECH_BODY_MOD } from '../mech-body-mod';
import { MECH_MOBILITY } from '../mech-mobility';
import { MECH_TEAM } from '../mech-teams';
import { MECH_UPGRADE } from '../mech-upgrades';
import { MECH_WEAPON } from '../mech-weapons';
import { SIZE } from '../unit-sizes';
import { UNIT_TYPE } from '../unit-types';

export const pack4 = {
    name: 'Cerberus Gunslinger Team Box',
    team_id: MECH_TEAM.GUNSLINGER,
    mechs: [
        {
            id: 1,
            name: 'Ermey Medium HE-V 1',
            size_id: SIZE.MEDIUM,
            structure_mod_id: MECH_BODY_MOD.STANDARD,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.GUNSLINGER,
            weapons: [
                {
                    id: 3,
                    weapon_id: MECH_WEAPON.MELEE_WEAPON,
                    display_order: 0,
                },
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.MAG_TETHER,
                    display_order: 1,
                },
                {
                    id: 2,
                    weapon_id: MECH_WEAPON.ROTARY_CANNON,
                    display_order: 2,
                },
            ],
            weapons_id_increment: 4,
            upgrades: [
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.HAPTIC_SUIT,
                    display_order: 0,
                },
                {
                    id: 2,
                    upgrade_id: MECH_UPGRADE.JUMP_JETS,
                    display_order: 1,
                },
            ],
            upgrades_id_increment: 3,
            display_order: 0,
            unit_type_id: UNIT_TYPE.HEV,
            visible: true,
        },
        {
            id: 2,
            name: 'Zuma Heavy HE-V 1',
            size_id: SIZE.HEAVY,
            structure_mod_id: MECH_BODY_MOD.STANDARD,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.GUNSLINGER,
            weapons: [
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.PLASMA_BLADE,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: MECH_WEAPON.ROTARY_CANNON,
                    display_order: 1,
                },
                {
                    id: 3,
                    weapon_id: MECH_WEAPON.SHOT_CANNON,
                    display_order: 2,
                },
            ],
            weapons_id_increment: 4,
            upgrades: [
                {
                    id: 3,
                    upgrade_id: MECH_UPGRADE.COOLANT_TANKS,
                    display_order: 0,
                },
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.HAPTIC_SUIT,
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
            name: 'Chesty Light HE-V',
            size_id: SIZE.LIGHT,
            structure_mod_id: MECH_BODY_MOD.STANDARD,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.GUNSLINGER,
            weapons: [
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.ARC_GUN,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: MECH_WEAPON.SHOT_CANNON,
                    display_order: 1,
                },
            ],
            weapons_id_increment: 3,
            upgrades: [
                {
                    id: 2,
                    upgrade_id: MECH_UPGRADE.COOLANT_TANKS,
                    display_order: 0,
                },
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.HAPTIC_SUIT,
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
            name: 'Ermey Medium HE-V 2',
            size_id: SIZE.MEDIUM,
            structure_mod_id: MECH_BODY_MOD.STANDARD,
            armor_mod_id: MECH_BODY_MOD.STANDARD,
            armor_upgrade_id: MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE,
            mobility_id: MECH_MOBILITY.BI_PEDAL,
            preferred_team_id: MECH_TEAM.GUNSLINGER,
            weapons: [
                {
                    id: 1,
                    weapon_id: MECH_WEAPON.SHOT_CANNON,
                    display_order: 0,
                },
                {
                    id: 2,
                    weapon_id: MECH_WEAPON.SHOT_CANNON,
                    display_order: 1,
                },
            ],
            weapons_id_increment: 3,
            upgrades: [
                {
                    id: 3,
                    upgrade_id: MECH_UPGRADE.COOLANT_TANKS,
                    display_order: 0,
                },
                {
                    id: 1,
                    upgrade_id: MECH_UPGRADE.HAPTIC_SUIT,
                    display_order: 1,
                },
                {
                    id: 2,
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
