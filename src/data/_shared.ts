import { xFormater } from './data-formatters';

export const MINE_LAYER = {
    display_name: 'Minelayer',
    description: 'Immediately before or after resolving (X) Order, place one friendly Mine Drone Token within 3” of the Active Model and not within 6” of another friendly Mine Drone Token.',
    formatter: xFormater,
};

export const DRONE_TACTICAL_AWARENESS = {
    display_name: 'Tactical Awareness Drone',
    card_display_name: 'Tact. Aware. DRN',
    description: 'When selecting a Unit as a Target with this Weapon, Line of Sight may be drawn from any part of your silhouette, not just the nearest point on the front 180° Arc. This Weapon does not suffer the Secondary Target or Bypass Shot penalties.',
};

export const DRONE_MINE_DIRECTOR = {
    display_name: 'Mine Director Drone',
    card_display_name: 'Mine Dir. DRN',
    description: 'Once per turn during this HE-V’s Activation, one Mine Drone Token within 12” of this HE-V may be placed within 6” of its current position. These abilities may not be used while this HE-V has a Redline Marker.',
};

export const DRONE_TARGETING_SUPPORT = {
    display_name: 'Targeting Support Drone',
    card_display_name: 'Targ. Sup. DRN',
    description: 'When using the Weapon in an ENGAGE Order, this Weapon gains the benefits of having been preceded by a LOCK ON Order. If the Target has Electronic Countermeasures, they prevent the LOCK ON Order benefits.',
};