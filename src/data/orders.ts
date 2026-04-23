import { makeFrozenStaticListIds } from './data-helpers';

export enum ORDER {
    CLEAR_MINEFIELD = 'ORDER_CLEAR_MINEFIELD',
    DASH = 'ORDER_DASH',

    SUPPORT = 'ORDER_SUPPORT',
    SUPPORT_CNC_STATION = 'ORDER_SUPPORT_CNC_STATION',
    SUPPORT_COMBAT_SUPPLIES = 'ORDER_SUPPORT_COMBAT_SUPPLIES',
    SUPPORT_GUIDANCE_SUITE = 'ORDER_SUPPORT_GUIDANCE_SUITE',
    SUPPORT_MSOE = 'ORDER_SUPPORT_MSOE',
    SUPPORT_MINE_DRONE_LAYER = 'ORDER_SUPPORT_MINE_DRONE_LAYER',

    PLOW_THROUGH = 'ORDER_PLOW_THROUGH',
    HUNKER_DOWN = 'ORDER_HUNKER_DOWN',

    INFANTRY_MUSTER = 'ORDER_INFANTRY_MUSTER',
    INFANTRY_MOVE = 'ORDER_INFANTRY_MOVE',
    INFANTRY_LOCK_ON = 'ORDER_INFANTRY_LOCK_ON',
    INFANTRY_ENGAGE = 'ORDER_INFANTRY_ENGAGE',
    INFANTRY_DIG_IN = 'ORDER_INFANTRY_DIG_IN',
    FLYING_MOVE = 'ORDER_FLYING_MOVE',
}

export const INFANTRY_ORDERS = [
    ORDER.INFANTRY_ENGAGE,
    ORDER.INFANTRY_MOVE,
    ORDER.INFANTRY_LOCK_ON,
    ORDER.INFANTRY_DIG_IN,
    ORDER.INFANTRY_MUSTER,
];

export type MobilityOrderId =
    | typeof ORDER.PLOW_THROUGH
    | typeof ORDER.HUNKER_DOWN

export interface Order {
    id: ORDER,
    display_name: string,
    description: string,
}

export const ORDERS = makeFrozenStaticListIds<Order>({
    [ORDER.CLEAR_MINEFIELD]: {
        display_name: 'Clear Minefield',
        description: 'Target a Mine Token of any type within 8” and Line of Sight of this Unit. Roll 1D6, adding +1 for each additional model with the Minesweeper Trait in this Unit. on a roll of 4+, the Mine Token is neutralized and removed from play.',
    },
    [ORDER.DASH]: {
        display_name: 'Dash',
        description: 'This Unit may move up to X” ignoring rough terrain and may end facing any direction. At the end of this Dash Order, this Unit may execute a Smash Order or Engage Order. This secondary order does not count towards the normal 2 orders a Unit can take during its activation. Dash orders count as a Move Order for the purposes of determining movement based bonuses for Smash Orders.',
    },
    [ORDER.SUPPORT]: {
        display_name: 'Support',
        description: ' The unit may activate the effect of any or all “Support:” traits. See each trait entry for the effects of the “Support:” trait. Note that if a model (or models) in a Squadron have a “Support:” trait, the entire Squadron must perform the Support Order. However, each model with a “Support:” will activate that trait during the Order, in any order its Commander wishes.',
    },
    [ORDER.SUPPORT_CNC_STATION]: makeSupportOrder({
        display_name: 'Command and Control Station',
        description: 'When calculating Tonnage for the purpose of any Objective, if a friendly Unit contributing Tonnage to that calculation is within 12” of this Model, the Commander controlling this Model may choose to win or lose any ties. When this Model performs a SUPPORT Order, select an HE‑V and move that model up to 3” immediately. A Unit may not be moved by this trait more than once a turn.',
    }),
    [ORDER.SUPPORT_COMBAT_SUPPLIES]: makeSupportOrder({
        display_name: 'Combat Supplies',
        description: 'When this model performs a SUPPORT Order, select one Unit within 2 inches of this Model, and select one of the benefits below:' +
            '1) If the friendly Model is an HE‑V, 4 Armor may be restored. This may not increase the HE‑V’s Armor above the value the Unit began the game with.' +
            '2) If the friendly Model has a Weapon, Upgrade or other Trait with the Limited Trait, one use of that system is restored. This may not increase its available uses above the initial Limited value.' +
            'Note: if multiple Models in a Squadron have this Trait, you may select the same or different Target and benefit for each Model with this trait',
    }),
    [ORDER.SUPPORT_GUIDANCE_SUITE]: makeSupportOrder({
        display_name: 'Guidance Suite',
        description: 'When this model performs a SUPPORT Order, it counts as having the Guidance Suite (SUPPORT) trait.',
    }),
    [ORDER.SUPPORT_MSOE]: makeSupportOrder({
        display_name: 'Multi-spectral Obscuration Emitter (MSOE) Deployer',
        description: 'When this model performs a SUPPORT Order, it counts as having the MSOE Launcher (SUPPORT) trait.',
    }),
    [ORDER.SUPPORT_MINE_DRONE_LAYER]: {
        display_name: 'MineLayer (SUPPORT)',
        description: 'When this model performs a SUPPORT Order, it counts as having the Minelayer (SUPPORT) trait. Use of this Upgrade has the Limited (X) trait.',
    },
    [ORDER.PLOW_THROUGH]: {
        display_name: 'Plow Through',
        description: 'Pivot this HE‑V up to 90°, then move up to its current move speed in a straight line, ignoring Rough Terrain. This HE‑V’s facing may not change at the end of this Order. This does not count as a MOVE Order.',
    },
    [ORDER.HUNKER_DOWN]: {
        display_name: 'Hunker Down',
        description: ' Move this HE‑V following all rules for a MOVE Order, except the move distance is 10”/8”/6”/4”. This Order counts as a MOVE Order. This Unit receives a Hunkered Down Marker next to the HE‑V.' +
            'Hunkered Down Marker: When this Unit is the Target of an ENGAGE Order, the Attack Pool is modified for Covered. If this Unit would already benefit from Covered, modify for Blocked. If this Unit would already benefit from Blocked, there is no further modification. The Hunkered Down Marker is removed if this Unit is moved or placed in any way, or is the Target of a SMASH Order.',
    },
    [ORDER.INFANTRY_MUSTER]: {
        display_name: 'Muster',
        description: 'The Garrisoned Unit is placed within 1” of its Garrison. If the Garrisoned Unit has the Squadron Trait, place one model within 1” of the Garrison, then place the other models within 3” of that initial model. This Unit is no longer considered Garrisoned, and is now “Mustered”. This is the only order that a Garrisoned Unit may perform. ',
    },
    [ORDER.INFANTRY_MOVE]: {
        display_name: 'Move',
        description: 'As normal, except this unit may perform this order twice in one Activation.',
    },
    [ORDER.INFANTRY_LOCK_ON]: {
        display_name: 'Lock On',
        description: 'As normal',
    },
    [ORDER.INFANTRY_ENGAGE]: {
        display_name: 'Engage',
        description: 'As normal',
    },
    [ORDER.INFANTRY_DIG_IN]: {
        display_name: 'Dig In',
        description: 'This unit counts as being in Rough Terrain until the beginning of their next activation.',
    },
    [ORDER.FLYING_MOVE]: {
        display_name: 'Flying Move',
        description: 'Place the unit within its Speed horizontally of its current position. This ignores any restrictions for moving through Terrain or other Units provided it can be placed in range. The unit must be able to end its move in a place where its Base will fit, and may face any direction.',
    },
});

function makeSupportOrder<T extends Omit<Order, 'id'>>(obj: T): T {
    obj.display_name = 'Support: ' + obj.display_name;
    return obj;
}