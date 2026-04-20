import type { Trait, TraitFormatter } from '../types';
import { numberFormater } from './data-formatters';
import { makeTraits, type TraitDef } from './data-helpers';
import { MECH_UPGRADES, TARGET_DESIGNATOR } from './mech-upgrades';
import { ORDER_INFANTRY_MUSTER } from './orders/infantry-orders';
import { ORDER_CLEAR_MINEFIELD } from './orders/special-orders';
import {
    ORDER_SUPPORT,
    ORDER_SUPPORT_CNC_STATION,
    ORDER_SUPPORT_COMBAT_SUPPLIES,
    ORDER_SUPPORT_GUIDANCE_SUITE,
    ORDER_SUPPORT_MINE_DRONE_LAYER,
    ORDER_SUPPORT_MSOE,
} from './orders/support-orders';

export enum UNIT_TRAIT {
    ALL_TERRAIN = 'TRAIT_ALL_TERRAIN',
    CLOSE_SUPPORT = 'TRAIT_CLOSE_SUPPORT',
    GARRISON = 'TRAIT_GARRISON',
    GROUP_COMMAND = 'TRAIT_GROUP_COMMAND',
    MAGNETIC_GRAPPLES = 'TRAIT_MAGNETIC_GRAPPLES',
    MINE_SWEEPER = 'TRAIT_MINE_SWEEPER',
    SHIELD_PROJECTOR = 'TRAIT_SHIELD_PROJECTOR',
    TARGET_DESIGNATOR = 'TRAIT_TARGET_DESIGNATOR',
    OUTRIDER = 'TRAIT_OUTRIDER',
    SUPPORT_ORDER_CNC = 'TRAIT_SUPPORT_ORDER_CNC',
    SUPPORT_ORDER_COMBAT_SUPPLIES = 'TRAIT_SUPPORT_ORDER_COMBAT_SUPPLIES',
    SUPPORT_GUIDANCE_SUITE = 'TRAIT_SUPPORT_GUIDANCE_SUITE',
    SUPPORT_MINE_DRONE_LAYER = 'TRAIT_SUPPORT_MINE_DRONE_LAYER',
    SUPPORT_MOED = 'TRAIT_SUPPORT_MOED',
    MSOE_LAUNCHER = 'TRAIT_MSOE_LAUNCHER',
    MSOE_DEPLOYER = 'TRAIT_MSOE_DEPLOYER',
    SCRAMBLERS = 'TRAIT_SCRAMBLERS',
    INFERNO_GEAR = 'TRAIT_INFERNO_GEAR',
    SUPPRESSIVE_FIRE = 'TRAIT_SUPPRESSIVE_FIRE',
    UL_HEV_LAUNCH_GEAR = 'TRAIT_UL_HEV_LAUNCH_GEAR',
    FORTIFICATION = 'TRAIT_FORTIFICATION',
    COMMAND = 'TRAIT_COMMAND',
    BUNKER_MINE_DRONES = 'TRAIT_BUNKER_MINE_DRONES',
    SQUADRON = 'TRAIT_SQUADRON',
    FLYING = 'TRAIT_FLYING',
    FLYING_SQUADRON = 'TRAIT_FLYING_SQUADRON',
    SUPPORT_ORDERS = 'TRAIT_SUPPORT_ORDERS',
    HEAVY_SUPPORT_ASSET = 'TRAIT_HEAVY_SUPPORT_ASSET',
    HAULER = 'TRAIT_HAULER',
    UNIT_SIZE_AND_TYPE = 'TRAIT_UNIT_SIZE_AND_TYPE',
}

export interface UnitTraitDef extends TraitDef {
    description: string;
    formatter?: TraitFormatter;
    dependent_trait_ids?: string[];
    type?: string;
}

export const UNIT_TRAITS = makeTraits<UnitTraitDef>({
    [UNIT_TRAIT.ALL_TERRAIN]: {
        display_name: 'All-Terrain',
        description: 'Units with this Trait ignore the movement penalty for Rough Terrain.',
    },
    [UNIT_TRAIT.CLOSE_SUPPORT]: {
        display_name: 'Close Support',
        description: 'If a friendly Unit with this trait is within 6” of an enemy target of an ENGAGE or SMASH Order, add one to the Damage Rating of each weapon used in that ENGAGE or SMASH Order. This bonus is only applied once, regardless of the number of Units with this Trait in range.',
    },
    [UNIT_TRAIT.GARRISON]: {
        display_name: 'Garrison',
        formatter: (name, number, type = undefined) => `${name}(${number} ${type})`,
        description: 'A model with this Trait contains assigned Units, Models and/or Tokens as listed in its (X). For example, a model with the trait Garrison (2 Air Infantry models, 2 Mine Drone tokens) may contain 2 models from the Air Infantry table and 2 Mine Drone tokens. Note what specific models are selected when this model is recruited during the Recruit Forces step. The selected Units, Models and/or Tokens are known as its Garrisoned Units, Garrisoned Models and/or Garrisoned Tokens, respectively. The Garrisoned Units/Models/Tokens will not be Deployed during the Deploy Forces step, and will instead be placed on the table during the game. If a model with the Garrison trait is destroyed, and its Garrisoned Units/Models/Tokens have not yet Mustered, those Units/Models/Tokens are considered destroyed as well.',
    },
    [UNIT_TRAIT.GROUP_COMMAND]: {
        display_name: 'Asset Command',
        description: 'All Units in this Asset are issued Orders during the same Activation. When Activating one of these Units, select one Unit from this Asset, resolve its Activation as normal. Then, immediately select another Unit from this Asset, perform its Orders until it has finished, and so on until all Units from this Asset have Activated. The opponent Commander then becomes the Active Commander as normal. If a Unit from this Asset is no longer in play, any other Units from its Asset will still activate with Asset Command.',
    },
    [UNIT_TRAIT.MAGNETIC_GRAPPLES]: {
        display_name: 'Magnetic Grapples',
        description: 'When this Unit MOVEs or JUMPs into base contact with an Enemy Unit, that Enemy Unit receives a Tether Marker and the Active Unit receives a corresponding Anchor Marker.',
    },
    [UNIT_TRAIT.MINE_SWEEPER]: {
        display_name: 'Mine Sweeper',
        description: 'A Unit with this Trait may not be Targeted by a Mine Drone Token.This Unit may ENGAGE Mine Drone Tokens as if it had the Mine Drone Tracking Munitions Upgrade.',
        granted_order_ids: [ORDER_CLEAR_MINEFIELD],
    },
    [UNIT_TRAIT.SHIELD_PROJECTOR]: {
        display_name: 'Shield Projector',
        description: 'When a friendly Unit within 6” of the model with this trait makes a Defense Roll, it counts as carrying a Combat Shield Upgrade. This is not cumulative with an existing Combat Shield Upgrade on that Unit.',
    },
    [UNIT_TRAIT.TARGET_DESIGNATOR]: {
        display_name: 'Target Designator',
        description: MECH_UPGRADES[TARGET_DESIGNATOR].description,
    },
    [UNIT_TRAIT.OUTRIDER]: {
        display_name: 'Outrider',
        description: 'If these Models are part of a Squadron, they may be deployed and end moves within 12” of the Squadron Trait in a Squadron must deploy and end moves within 3” of all other Models with this Trait in the Squadron. ',
    },
    [UNIT_TRAIT.SUPPORT_ORDERS]: {
        display_name: 'Support Orders',
        description: 'Units with this trait possess unusual equipment that is intended to support other units, but must be actively operated to take effect. These traits will be prefixed with the term “SUPPORT:”. Units with these traits may perform the SUPPORT Order. SUPPORT: The Unit may activate the effect of any or all “SUPPORT:” traits. See each trait entry for the effects of the “SUPPORT:” trait. Note that if a model (or models) in a Squadron have a “SUPPORT:” trait, the entire Squadron must perform the SUPPORT Order. However, each model with a “SUPPORT:” will activate that trait during the Order, in any order its Commander wishes.',
        granted_order_ids: [ORDER_SUPPORT],
    },
    [UNIT_TRAIT.SUPPORT_ORDER_CNC]: {
        display_name: 'Support: Command and Control Station',
        description: '',
        granted_order_ids: [ORDER_SUPPORT_CNC_STATION],
    },
    [UNIT_TRAIT.SUPPORT_ORDER_COMBAT_SUPPLIES]: {
        display_name: 'Support: Combat Supplies',
        description: '',
        granted_order_ids: [ORDER_SUPPORT_COMBAT_SUPPLIES],
    },
    [UNIT_TRAIT.SUPPORT_GUIDANCE_SUITE]: {
        display_name: 'Support: Guidance Suite',
        description: '',
        granted_order_ids: [ORDER_SUPPORT_GUIDANCE_SUITE],
    },
    [UNIT_TRAIT.SUPPORT_MINE_DRONE_LAYER]: {
        display_name: 'Support: Mine Drone Layer',
        formatter: numberFormater,
        description: '',
        granted_order_ids: [ORDER_SUPPORT_MINE_DRONE_LAYER],
    },
    [UNIT_TRAIT.SUPPORT_MOED]: {
        display_name: 'Support: Multi-spectral Obscuration Emitter Deployer',
        description: '',
        granted_order_ids: [ORDER_SUPPORT_MSOE],
    },
    [UNIT_TRAIT.MSOE_LAUNCHER]: {
        display_name: 'MSOE Launcher (X)',
        description: 'At the beginning or end of the Order listed in (X), you may place an Obscuration Emitter Token within 6” of this model.' +
            'Obscuration Emitter Token: An Obscuration Emitter is a 25mm circle. Any Unit, regardless of Commander, within 3” of this Token counts as being within Covering Terrain. (i.e., any LOS line drawn to this model will be considered to be drawn through Covering Terrain). Additionally, these Units count as being equipped with Anti‑Missile System and Electronic Countermeasures Upgrades, if they are not already. Remove the Token when the Unit that placed this Token is Activated again.',
    },
    [UNIT_TRAIT.MSOE_DEPLOYER]: {
        display_name: 'Support: MSOE Deployer',
        description: '',
        granted_order_ids: [ORDER_SUPPORT_MSOE],
    },
    [UNIT_TRAIT.SCRAMBLERS]: {
        display_name: 'Scramblers',
        description: 'All Units within 6” of a model equipped with Scramblers, including its own Unit, count as being equipped with Anti‑Missile Systems and Electronic Countermeasures.',
    },
    [UNIT_TRAIT.INFERNO_GEAR]: {
        display_name: 'Inferno Gear',
        description: 'If a Model or Models in the Unit have this Trait, the Unit ignores the effects of the Disruptive Trait.',
    },
    [UNIT_TRAIT.SUPPRESSIVE_FIRE]: {
        display_name: 'Suppressive Fire',
        description: 'If an enemy Unit within 6” of a friendly model with this Trait performs an ENGAGE Order, the target of that Order receives +1 to their Defense Rolls.',
    },
    [UNIT_TRAIT.UL_HEV_LAUNCH_GEAR]: {
        display_name: 'Launch Gear',
        description: 'This Upgrade allows the entire Unit to perform the JUMP Order at distance of +2” to their Speed value.',
    },
    [UNIT_TRAIT.FORTIFICATION]: {
        display_name: 'Fortification',
        description: 'Once placed in Deployment, this Unit may not be moved or placed by any Order or effect, voluntarily or involuntarily.',
    },
    [UNIT_TRAIT.COMMAND]: {
        display_name: 'Command',
        formatter: numberFormater,
        description: 'Units with the Command Trait issue Orders to their Garrison. Once per Activation, when this Unit is issued an Order, instead of performing an Order itself, it will instead issue one of the following Orders to up to (X) Units within its Garrison, or currently deployed on the Battlefield.',
    },
    [UNIT_TRAIT.BUNKER_MINE_DRONES]: {
        display_name: 'Garrison',
        formatter: (name, number, type = undefined) => `${name}(${number} ${type})`,
        type: 'Mine Drones',
        description: '',
    },
    [UNIT_TRAIT.SQUADRON]: {
        display_name: 'Squadron',
        description: 'A Squadron is a Unit made up of multiple Models. These Models will Activate together and perform the same Orders together during that Activation.',
    },
    [UNIT_TRAIT.FLYING]: {
        display_name: 'Flying',
        description: 'When this unit performs a Move Order, it instead performs a Flying Move Order.',
    },
    [UNIT_TRAIT.FLYING_SQUADRON]: {
        display_name: 'Flying Squadron',
        description: 'This unit has all rules from the Squadron trait, with the following exceptions: All other models in the Squadron must end their deployment or movement within 6” of the Leader Model. When targeted by an engage order, If enough damage is dealt by a Weapon to destroy the Target Model, do not apply any remaining damage to another Model of the squadron. Do not add 2 to the Attack Pool of a Blast Weapon during an Engage Order against a unit with this trait.',
        dependent_trait_ids: [UNIT_TRAIT.SQUADRON],
    },
    [UNIT_TRAIT.HEAVY_SUPPORT_ASSET]: {
        display_name: 'Heavy Support Asset',
        description: 'When a Heavy Support Asset is deployed, all units of the Heavy Support Asset must deploy within 3” of another Model from the same Heavy Support Asset. They must deploy in the same area as HE-Vs, and may not use any extended range available to other Support Assets. Note: member models of a Heavy Support Asset are not necessarily a Squadron.',
    },
    [UNIT_TRAIT.HAULER]: {
        display_name: 'Hauler',
        description: `This unit Garrisons a Unit from a separate Asset, and is not in its Group Command. The Garrisoned Unit must be purchased as a separate Asset, following all rules for its selection. The Garrisoned Unit must still be Activated during the turn, but it may not perform any order other than the following until it has performed this order: Muster: This is the only order that a Garrisoned Unit may perform. The Garrisoned Unit is placed within 1” of its Garrison. If the Garrisoned Unit has the Squadron Trait, place one model within 1” of the Garrison, then place the other models within 3” of that initial model. This Unit is no longer considered Garrisoned, and is now “Mustered”.`,
        granted_order_ids: [ORDER_INFANTRY_MUSTER],
    },
    // temporary until unit types and sizes are separate stats
    [UNIT_TRAIT.UNIT_SIZE_AND_TYPE]: {
        display_name: 'Unit Type: ',
        description: '',
        formatter: (name, _number, type) => `${name} ${type}`,
    },
});

export function unitTraitDisplayName({ id, number, type }: Trait): string {
    const trait = UNIT_TRAITS[id];

    if (!trait) {
        throw new Error('trait not found: ' + id);
    }
    if (trait.formatter) {
        return trait.formatter(trait.display_name, number, type);
    }
    return trait.display_name;
}

export function freshUnitTrait<T extends string = string>(trait: Trait<T>) {
    const combined = Object.assign({}, UNIT_TRAITS[trait.id], trait);
    combined.display_name = unitTraitDisplayName(trait);

    return combined;
}
