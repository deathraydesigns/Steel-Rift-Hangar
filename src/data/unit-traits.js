import {MECH_UPGRADES, TARGET_DESIGNATOR} from './mech-upgrades.js';
import {numberFormater} from './weapon-traits.js';

export const TRAIT_ALL_TERRAIN = 'TRAIT_ALL_TERRAIN';
export const TRAIT_CLOSE_SUPPORT = 'TRAIT_CLOSE_SUPPORT';
export const TRAIT_GARRISON = 'TRAIT_GARRISON';
export const TRAIT_GROUP_COMMAND = 'TRAIT_GROUP_COMMAND';
export const TRAIT_MAGNETIC_GRAPPLES = 'TRAIT_MAGNETIC_GRAPPLES';
export const TRAIT_MINE_SWEEPER = 'TRAIT_MINE_SWEEPER';
export const TRAIT_SHIELD_PROJECTOR = 'TRAIT_SHIELD_PROJECTOR';
export const TRAIT_TARGET_DESIGNATOR = 'TRAIT_TARGET_DESIGNATOR';
export const TRAIT_OUTRIDER = 'TRAIT_OUTRIDER';
export const TRAIT_SUPPORT_ORDER_CNC = 'TRAIT_SUPPORT_ORDER_CNC';
export const TRAIT_SUPPORT_ORDER_COMBAT_SUPPLIES = 'TRAIT_SUPPORT_ORDER_COMBAT_SUPPLIES';
export const TRAIT_SUPPORT_GUIDANCE_SUITE = 'TRAIT_SUPPORT_GUIDANCE_SUITE';
export const TRAIT_SUPPORT_MINE_DRONE_LAYER = 'TRAIT_SUPPORT_MINE_DRONE_LAYER';
export const TRAIT_SUPPORT_MOED = 'TRAIT_SUPPORT_MOED';
export const TRAIT_MSOE_LAUNCHER = 'TRAIT_MSOE_LAUNCHER';
export const TRAIT_SCRAMBLERS = 'TRAIT_SCRAMBLERS';
export const TRAIT_INFERNO_GEAR = 'TRAIT_INFERNO_GEAR';
export const TRAIT_SUPPRESSIVE_FIRE = 'TRAIT_SUPPRESSIVE_FIRE';
export const TRAIT_UL_HEV_LAUNCH_GEAR = 'TRAIT_UL_HEV_LAUNCH_GEAR';
export const TRAIT_FORTIFICATION = 'TRAIT_FORTIFICATION';
export const TRAIT_COMMAND = 'TRAIT_COMMAND';
export const TRAIT_BUNKER_MINE_DRONES = 'TRAIT_BUNKER_MINE_DRONES';
export const TRAIT_SQUADRON = 'TRAIT_SQUADRON';
export const TRAIT_FLYING = 'TRAIT_FLYING';
export const TRAIT_FLYING_SQUADRON = 'TRAIT_FLYING_SQUADRON';
export const TRAIT_SUPPORT_ORDERS = 'TRAIT_SUPPORT_ORDERS';
export const TRAIT_HEAVY_SUPPORT_ASSET = 'TRAIT_HEAVY_SUPPORT_ASSET';
export const TRAIT_HAULER = 'TRAIT_HAULER';
export const TRAIT_UNIT_SIZE_AND_TYPE = 'TRAIT_UNIT_SIZE_AND_TYPE';

export const UNIT_TRAITS = makeUnitTraits({
    [[TRAIT_ALL_TERRAIN]]: {
        display_name: 'All-Terrain',
        description: 'Units with this Trait ignore the movement penalty for Rough Terrain.',
    },
    [[TRAIT_CLOSE_SUPPORT]]: {
        display_name: 'Close Support',
        description: 'If a friendly unit with this trait is within 6” of an enemy target of an Engage or Smash Order, add one to the Damage Rating of each weapon used in that Engage or Smash Order. This bonus is only applied once, regardless of the number of units with this Trait in range.',
    },
    [[TRAIT_GARRISON]]: {
        display_name: 'Garrison',
        formatter: (name, number, type = null) => `${name}(${number} ${type})`,
        description: 'A model with this Trait contains assigned Units, Models and/or Tokens as listed in its (X). For example, a model with the trait Garrison (2 Air Infantry models, 2 Mine Drone tokens) may contain 2 models from the Air Infantry table and 2 Mine Drone tokens. Note what specific models are selected when this model is recruited during the Recruit Forces step. The selected Units, Models and/or Tokens are known as its Garrisoned Units, Garrisoned Models and/or Garrisoned Tokens, respectively. The Garrisoned Units/Models/Tokens will not be Deployed during the Deploy Forces step, and will instead be placed on the table during the game. If a model with the Garrison trait is destroyed, and its Garrisoned Units/Models/Tokens have not yet Mustered, those Units/Models/Tokens are considered destroyed as well.',
    },
    [[TRAIT_GROUP_COMMAND]]: {
        display_name: 'Group Command',
        description: 'All Units in this Asset are issued Orders during the same activation. Select one Unit from this Asset, perform its Orders as normal until it has finished. Then select another Unit from this Asset, perform its Orders until it has finished, and so on until all Units from this Asset have activated. The opponent Commander then becomes the Active Player as normal. If this Unit is no longer in play, any other Units from its Asset will still activate with Group Command.',
    },
    [[TRAIT_MAGNETIC_GRAPPLES]]: {
        display_name: 'Magnetic Grapples',
        description: 'When an enemy Unit attempts to Move or Jump out of contact with one or more Units with this Trait, before moving, that model rolls 1D6, adding +1 for each additional model with this Trait in contact after the first. On a 1-2 result, reduce the Speed distance that the Unit may move by 50%. On a 3-4 result, reduce the distance by 75%. On a 5-6 result, the Active Unit may only move 1” regardless of how far it would normally be allowed to go during that Order.',
    },
    [[TRAIT_MINE_SWEEPER]]: {
        display_name: 'Mine Sweeper',
        description: 'Unit with this Trait may perform the following Order: Clear Minefield: Target a Mine Token of any type within 8” and Line of Sight of this Unit. Roll 1D6, adding +1 for each additional model with the Minesweeper Trait in this Unit. on a roll of 4”, the Mine Token is neutralized and removed from play.',
    },
    [[TRAIT_SHIELD_PROJECTOR]]: {
        display_name: 'Shield Projector',
        description: 'When a friendly or enemy unit within 6” is damaged by an Attack, and it has more than 0 Armor remaining, roll 1D6 for each point of Damage it would receive. On a 5+, that point of Damage is ignored. Damage negated by this rule is treated as not having happened for the purposes of other weapon Trait effects, such as AP. This effect is not cumulative with the effect of a Combat Shield.',
    },
    [[TRAIT_TARGET_DESIGNATOR]]: {
        display_name: 'Target Designator',
        description: MECH_UPGRADES[TARGET_DESIGNATOR].description,
    },
    [[TRAIT_OUTRIDER]]: {
        display_name: 'Outrider',
        description: 'If these models are part of a Squadron, they may be deployed and end moves within 12” of the Squadron Leader (instead of 3”). However, all models with this Trait in a Squadron must deploy and end moves within 3” of all other models with this Trait in the Squadron.',
    },
    [[TRAIT_SUPPORT_ORDERS]]: {
        display_name: 'Support Orders',
        description: 'Units with this trait possess unusual equipment that is intended to support other units, but must be actively operated to take effect. These traits will be prefixed with the term “Support:”. Units with these traits may perform the Support Order. Support: The unit may activate the effect of any or all “Support:” traits. See each trait entry for the effects of the “Support:” trait. Note that if a model (or models) in a Squadron have a “Support:” trait, the entire Squadron must perform the Support Order. However, each model with a “Support:” will activate that trait during the Order, in any order its Commander wishes.',
    },
    [[TRAIT_SUPPORT_ORDER_CNC]]: {
        display_name: 'Support: Command and Control Station',
        description: '',
    },
    [[TRAIT_SUPPORT_ORDER_COMBAT_SUPPLIES]]: {
        display_name: 'Support: Combat Supplies',
        description: '',
    },
    [[TRAIT_SUPPORT_GUIDANCE_SUITE]]: {
        display_name: 'Support: Guidance Suite',
        description: '',
    },
    [[TRAIT_SUPPORT_MINE_DRONE_LAYER]]: {
        display_name: 'Support: Mine Drone Layer',
        description: '',
    },
    [[TRAIT_SUPPORT_MOED]]: {
        display_name: 'Support: Multi-spectral Obscuration Emitter Deployer',
        description: '',
    },
    [[TRAIT_MSOE_LAUNCHER]]: {
        display_name: 'MSOE Launcher',
        description: 'When targeting a unit with the Flying Trait, the target is at -2 to Defense Rolls from weapons with this trait. (I.e., if the target until would normally remove damage from the Attack Pool on a 2+, it avoids damage from this weapon on a 4+). If a Weapon with this trait destroys the Target Model, you may apply remaining damage to another Model of the Squadron as if the Squadron was not a Flying Squadron. ',
    },
    [[TRAIT_SCRAMBLERS]]: {
        display_name: 'Scramblers',
        description: 'No Unit within 6” of a model equipped with a Scrambler may be targeted by an Off-Table Support Asset, nor may they have Line of Sight drawn to them by a Target Designator. They may not be the target of Lock Orders.',
    },
    [[TRAIT_INFERNO_GEAR]]: {
        display_name: 'Inferno Gear',
        description: 'If 50% or more of the Units in a Squadron have this Trait, the Squadron ignores the effects of the Disruptive Trait.',
    },
    [[TRAIT_SUPPRESSIVE_FIRE]]: {
        display_name: 'Suppressive Fire',
        description: 'If an enemy Unit within 6” of a friendly model with this Trait performs an Engage Order, the target of that Order receives +1 to their Defense Rolls.',
    },
    [[TRAIT_UL_HEV_LAUNCH_GEAR]]: {
        display_name: 'Launch Gear',
        description: 'This Unit may perform the Jump Order at distance of +2” to their Speed value.',
    },
    [[TRAIT_FORTIFICATION]]: {
        display_name: 'Fortification',
        description: 'A Unit with this Trait will only ever perform the following Orders (if eligible): Engage, Lock On, Return Fire. Units with this Trait only ever pass Defense rolls on an unmodifiable roll of 6. Units with this Trait count as Light in Class for the purposes of the Kinetic Trait. Units with this Trait are always targeted as if from the Front Arc. If a Mission uses table quadrants then Units with this Trait must be deployed completely inside of one quadrant and cannot extend into others. For the purposes of calculating Tonnage destroyed or in a Zone, each Fortification contributes 5 Tons for the respective Commander.',
    },
    [[TRAIT_COMMAND]]: {
        display_name: 'Command',
        formatter: numberFormater,
        description: 'Units with the Command Trait issue Orders to their Garrison. Once per Activation, when this Unit is issued an Order, instead of performing an Order itself, it will instead issue one of the following Orders to up to (X) Units within its Garrison, or currently deployed on the Battlefield.',
    },
    [[TRAIT_BUNKER_MINE_DRONES]]: {
        display_name: 'Garrison',
        formatter: (name, number, type = null) => `${name}(${number} ${type})`,
        type: 'Mine Drones',
        description: '',
    },
    [[TRAIT_SQUADRON]]: {
        display_name: 'Squadron',
        description: 'A Squadron is a Unit made up of multiple Models. These Models will Activate together and perform the same Orders together during that Activation.',
    },
    [[TRAIT_FLYING]]: {
        display_name: 'Flying',
        description: 'When this unit performs a Move Order, it instead performs a Flying Move Order.',
    },
    [[TRAIT_FLYING_SQUADRON]]: {
        display_name: 'Flying Squadron',
        description: 'This unit has all rules from the Squadron trait, with the following exceptions: All other models in the Squadron must end their deployment or movement within 6” of the Leader Model. When targeted by an engage order, If enough damage is dealt by a Weapon to destroy the Target Model, do not apply any remaining damage to another Model of the squadron. Do not add 2 to the Attack Pool of a Blast Weapon during an Engage Order against a unit with this trait.',
    },
    [[TRAIT_HEAVY_SUPPORT_ASSET]]: {
        display_name: 'Heavy Support Asset',
        description: 'When a Heavy Support Asset is deployed, all units of the Heavy Support Asset must deploy within 3” of another Model from the same Heavy Support Asset. They must deploy in the same area as HE-Vs, and may not use any extended range available to other Support Assets. Note: member models of a Heavy Support Asset are not necessarily a Squadron.',
    },
    [[TRAIT_HAULER]]: {
        display_name: 'Hauler',
        description: `This unit Garrisons a Unit from a separate Asset, and is not in its Group Command. The Garrisoned Unit must be purchased as a separate Asset, following all rules for its selection. The Garrisoned Unit must still be Activated during the turn, but it may not perform any order other than the following until it has performed this order: Muster: This is the only order that a Garrisoned Unit may perform. The Garrisoned Unit is placed within 1” of its Garrison. If the Garrisoned Unit has the Squadron Trait, place one model within 1” of the Garrison, then place the other models within 3” of that initial model. This Unit is no longer considered Garrisoned, and is now “Mustered”.`,
    },
    // temporary until unit types and sizes are separate stats
    [[TRAIT_UNIT_SIZE_AND_TYPE]]: {
        display_name: 'Unit Type: ',
        description: null,
        formatter: (name, number, type) => `${name} ${type}`,
    },
    // [[FOO]]: {
    //     display_name: '',
    //     description: '',
    // },
});

export function unitTraitDisplayName({id, number, type}) {

    const trait = UNIT_TRAITS[id];

    if (!trait) {
        throw new Error('trait not found: '.id);
    }
    if (trait.formatter) {
        return trait.formatter(trait.display_name, number, type);
    }
    return trait.display_name;
}

function makeUnitTraits(items) {
    Object.keys(items)
        .forEach((key) => {
            const item = items[key];
            item.id = key;

            Object.freeze(item);
        });

    return Object.freeze(items);
}

export function getUnitTrait(trait) {
    trait = Object.assign({}, UNIT_TRAITS[trait.id], trait);
    trait.display_name = unitTraitDisplayName(trait);

    return trait;
}