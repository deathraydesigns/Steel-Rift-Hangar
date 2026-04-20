import { makeStaticListIds } from './data-helpers';

export enum MECH_DRONE_UPGRADE {
    TARGETING_SUPPORT_DRONE = 'TARGETING_SUPPORT_DRONE',
    TACTICAL_AWARENESS_DRONE = 'TACTICAL_AWARENESS_DRONE',
    MINE_DIRECTOR_DRONE = 'MINE_DIRECTOR_DRONE'
}

export enum MechDroneUpgradeAttachType {
    WEAPON = 'WEAPON',
    MINE_DRONE_CARRIER = 'MINE_DRONE_CARRIER'
}

export interface MechDroneUpgrade {
    id: MECH_DRONE_UPGRADE,
    display_name: string,
    description: string,
    // cost_per_size: NumberBySize,
    attach_type: MechDroneUpgradeAttachType
}

export const MECH_DRONE_UPGRADES = makeStaticListIds<MechDroneUpgrade>({
    [MECH_DRONE_UPGRADE.TARGETING_SUPPORT_DRONE]: {
        display_name: 'Targeting Support Drone',
        description: 'When using the Weapon in an ENGAGE Order, this Weapon gains the benefits of having been preceded by a LOCK ON Order. If the Target has Electronic Countermeasures, they prevent the LOCK ON Order benefits.',
        attach_type: MechDroneUpgradeAttachType.WEAPON,

    },
    [MECH_DRONE_UPGRADE.TACTICAL_AWARENESS_DRONE]: {
        display_name: 'Tactical Awareness Drone',
        description: 'When selecting a Unit as a Target with the Weapon, Line of Sight may be drawn from any part of your silhouette, not just the nearest point on the front 180° Arc. This Weapon does not suffer the Secondary Target or Bypass Shot penalties.',
        attach_type: MechDroneUpgradeAttachType.WEAPON,
    },
    [MECH_DRONE_UPGRADE.MINE_DIRECTOR_DRONE]: {
        display_name: 'Mine Director Drone',
        description: 'Mine Drone Tokens placed with this HE-V’s trait may be placed within 6” of the Active Model. Once per turn during this HE-V’s Activation, one Mine Drone Token within 12” of this HE-V may be placed within 6” of its current position. These abilities may not be used while this HE-V has a Redline Marker.',
        attach_type: MechDroneUpgradeAttachType.MINE_DRONE_CARRIER,
    },
});