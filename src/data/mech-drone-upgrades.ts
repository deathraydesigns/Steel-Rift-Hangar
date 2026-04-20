import type { NumberBySize } from '../types';

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
    cost_per_size: NumberBySize,
    attach_type: MechDroneUpgradeAttachType
}

export const MECH_DRONE_UPGRADES: Record<MECH_DRONE_UPGRADE, MechDroneUpgrade> = {
    [MECH_DRONE_UPGRADE.TARGETING_SUPPORT_DRONE]: {
        display_name: 'Targeting Support Drone',
        description: 'When using the Weapon in an ENGAGE Order, this Weapon gains the benefits of having been preceded by a LOCK ON Order. If the Target has Electronic Countermeasures, they prevent the LOCK ON Order benefits.',

    },
    [MECH_DRONE_UPGRADE.TACTICAL_AWARENESS_DRONE]: {},
    [MECH_DRONE_UPGRADE.MINE_DIRECTOR_DRONE]: {},
};