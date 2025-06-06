export const ORDER_SUPPORT = 'ORDER_SUPPORT';
export const ORDER_SUPPORT_CNC_STATION = 'ORDER_SUPPORT_CNC_STATION';
export const ORDER_SUPPORT_COMBAT_SUPPLIES = 'ORDER_SUPPORT_COMBAT_SUPPLIES';
export const ORDER_SUPPORT_GUIDANCE_SUITE = 'ORDER_SUPPORT_GUIDANCE_SUITE';
export const ORDER_SUPPORT_MSOE = 'ORDER_SUPPORT_MSOE';
export const ORDER_SUPPORT_MINE_DRONE_LAYER = 'ORDER_SUPPORT_MINE_DRONE_LAYER';

export const ORDER_SUPPORT_DEFINITION = {
    [ORDER_SUPPORT]: {
        display_name: 'Support',
        description: ' The unit may activate the effect of any or all “Support:” traits. See each trait entry for the effects of the “Support:” trait. Note that if a model (or models) in a Squadron have a “Support:” trait, the entire Squadron must perform the Support Order. However, each model with a “Support:” will activate that trait during the Order, in any order its Commander wishes.',
    },
};

export const SUPPORT_ORDERS_DATA = {
    [ORDER_SUPPORT_CNC_STATION]: makeSupportOrder({
        display_name: 'Command and Control Station',
        description: 'When calculating Tonnage for the purpose of any Objective, if a friendly unit contributing Tonnage to that calculation is within 12” of this Model, the Commander controlling this Model may choose to win or lose any ties. When this model performs a Support Order, select a HE-V of weight class Light or heavier, and move that model up to 3” immediately. A Unit may not be moved by this trait more than once a turn.',
    }),
    [ORDER_SUPPORT_COMBAT_SUPPLIES]: makeSupportOrder({
        display_name: 'Combat Supplies',
        description: 'When this model performs a Support Order, select one unit within 2" of this model, and select one of the benefits below:' +
            '1) If the friendly model is a HE-V of weight class Light or heavier, 4 Armor may be restored. This may not increase the HE-V’s armor above the value the unit began the game with. ' +
            '2) If the friendly model has a Weapon System, Upgrade or other Trait with the Limited Trait, one use of that system is restored. This may not increase its available uses above the initial Limited value. ' +
            '3) If the friendly model has one of these upgrades, one use of Coolant Tanks or Nitro Boost may be restored. This may not increase the available uses above the number of uses the unit began with the game with. ' +
            'Note: if multiple Models in a squadron have this trait, you may select the same or different target and benefit for each model with this trait. ',
    }),
    [ORDER_SUPPORT_GUIDANCE_SUITE]: makeSupportOrder({
        display_name: 'Guidance Suite',
        description: 'When this model performs a Support Order, select one enemy unit within LOS of this model. Place a Guidance Marker on this unit. Guidance Marker: When a unit with a Guidance Marker is the Target of an Engage Order, the unit performing the Engage selects one of the following effects: ' +
            'All weapons used in this Engage Order count as having the benefit of a Lock On Order. (Note: the Engaging unit need not have a Target Designator to benefit from this). ' +
            'One weapon used in this Engage Order may have +2 added to its Damage Rating.' +
            'When the Engage Order is complete, remove the Guidance Marker. If the Marker has not been otherwise removed, remove the Marker when this model is activated again. ',
    }),
    [ORDER_SUPPORT_MSOE]: makeSupportOrder({
        display_name: 'Multi-spectral Obscuration Emitter (MSOE) Deployer',
        description: 'When this model performs a Support Order, place an Obscuration Emitter Marker (25mm) within 12”.',
    }),
    [ORDER_SUPPORT_MINE_DRONE_LAYER]: makeSupportOrder({
        display_name: 'Mine-Drone Layer',
        description: 'When this model performs a Support Order, place a Mine Drone token within 3” of the Active model and not within 6” of another Mine Drone token.',
    }),
};

function makeSupportOrder(obj) {
    obj.display_name = 'Support: ' + obj.display_name;
    return obj;
}