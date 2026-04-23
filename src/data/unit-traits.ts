import type { Trait, TraitFormatter, TraitInfo } from '../types';
import { MINE_LAYER } from './_mine-layer';
import { xFormater, xyFormater } from './data-formatters';
import { makeTraits, type TraitDef } from './data-helpers';
import { MECH_UPGRADE, MECH_UPGRADES } from './mech-upgrades';
import { INFANTRY_ORDERS, ORDER, ORDERS } from './orders';

export enum UNIT_TRAIT {
    ALL_TERRAIN = 'TRAIT_ALL_TERRAIN',
    CLOSE_SUPPORT = 'TRAIT_CLOSE_SUPPORT',
    GARRISON = 'TRAIT_GARRISON',
    SQUADRON_GARRISON = 'TRAIT_SQUADRON_GARRISON',
    ASSET_COMMAND = 'TRAIT_ASSET_COMMAND',
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
    SQUADRON = 'TRAIT_SQUADRON',
    FLYING = 'TRAIT_FLYING',
    FLYING_SQUADRON = 'TRAIT_FLYING_SQUADRON',
    SUPPORT_ORDERS = 'TRAIT_SUPPORT_ORDERS',
    AUXILIARY_UNIT = 'TRAIT_AUXILIARY_UNIT',
    MINELAYER = 'TRAIT_MINELAYER',
    GUIDANCE_SUITE = 'TRAIT_GUIDANCE_SUITE',
    INFANTRY_UNIT = 'TRAIT_INFANTRY_UNIT',
    VULNERABLE = 'TRAIT_VULNERABLE',
    YIELDING = 'TRAIT_YIELDING',
    SMASHER = 'TRAIT_SMASHER',
}

export interface UnitTraitDef extends TraitDef<UNIT_TRAIT> {
}

const garrisonFormatter: TraitFormatter = (name, number, type = undefined) => `${name}(${number} ${type})`;
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
        formatter: garrisonFormatter,
        description: 'A model with this Trait contains assigned Units, Models and/or Tokens as listed in its (X). For example, a model with the trait Garrison (2 Air Infantry models, 2 Mine Drone tokens) may contain 2 models from the Air Infantry table and 2 Mine Drone tokens. Note what specific models are selected when this model is recruited during the Recruit Forces step. The selected Units, Models and/or Tokens are known as its Garrisoned Units, Garrisoned Models and/or Garrisoned Tokens, respectively. The Garrisoned Units/Models/Tokens will not be Deployed during the Deploy Forces step, and will instead be placed on the table during the game. If a model with the Garrison trait is destroyed, and its Garrisoned Units/Models/Tokens have not yet Mustered, those Units/Models/Tokens are considered destroyed as well.',
    },
    [UNIT_TRAIT.SQUADRON_GARRISON]: {
        display_name: 'Squadron Garrison',
        formatter: garrisonFormatter,
        description: 'This unit follows all of the rules of the Garrison (X) trait, with the following exceptions: The Unit (not Models) with the Squadron Garrison (X) trait carry the Garrisoned Unit collectively. Select one member Model of the Unit to count as the Garrison when the Garrisoned Unit performs the MUSTER Order. If the Unit with this trait loses a member Model, its Commander removes Garrisoned models proportionately, rounding up the number of Models removed.',
    },
    [UNIT_TRAIT.ASSET_COMMAND]: {
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
        granted_order_ids: [ORDER.CLEAR_MINEFIELD],
    },
    [UNIT_TRAIT.SHIELD_PROJECTOR]: {
        display_name: 'Shield Projector',
        description: 'When a friendly Unit within 6” of the model with this trait makes a Defense Roll, it counts as carrying a Combat Shield Upgrade. This is not cumulative with an existing Combat Shield Upgrade on that Unit.',
    },
    [UNIT_TRAIT.TARGET_DESIGNATOR]: {
        display_name: 'Target Designator',
        description: MECH_UPGRADES[MECH_UPGRADE.TARGET_DESIGNATOR].description,
    },
    [UNIT_TRAIT.OUTRIDER]: {
        display_name: 'Outrider',
        description: 'If these Models are part of a Squadron, they may be deployed and end moves within 12” of the Squadron Trait in a Squadron must deploy and end moves within 3” of all other Models with this Trait in the Squadron. ',
    },
    [UNIT_TRAIT.SUPPORT_ORDERS]: {
        display_name: 'Support Orders',
        description: 'Units with this trait possess unusual equipment that is intended to support other units, but must be actively operated to take effect. These traits will be prefixed with the term “SUPPORT:”. Units with these traits may perform the SUPPORT Order. SUPPORT: The Unit may activate the effect of any or all “SUPPORT:” traits. See each trait entry for the effects of the “SUPPORT:” trait. Note that if a model (or models) in a Squadron have a “SUPPORT:” trait, the entire Squadron must perform the SUPPORT Order. However, each model with a “SUPPORT:” will activate that trait during the Order, in any order its Commander wishes.',
        granted_order_ids: [ORDER.SUPPORT],
    },
    [UNIT_TRAIT.SUPPORT_ORDER_CNC]: {
        display_name: 'Support: Command and Control Station',
        description: '',
        granted_order_ids: [ORDER.SUPPORT_CNC_STATION],
    },
    [UNIT_TRAIT.SUPPORT_ORDER_COMBAT_SUPPLIES]: {
        display_name: 'Support: Combat Supplies',
        description: '',
        granted_order_ids: [ORDER.SUPPORT_COMBAT_SUPPLIES],
    },
    [UNIT_TRAIT.SUPPORT_GUIDANCE_SUITE]: {
        display_name: 'Support: Guidance Suite',
        description: '',
        granted_order_ids: [ORDER.SUPPORT_GUIDANCE_SUITE],
    },
    [UNIT_TRAIT.SUPPORT_MINE_DRONE_LAYER]: {
        display_name: 'Support: Mine Drone Layer',
        formatter: xFormater,
        description: '',
        granted_order_ids: [ORDER.SUPPORT_MINE_DRONE_LAYER],
    },
    [UNIT_TRAIT.SUPPORT_MOED]: {
        display_name: 'Support: Multi-spectral Obscuration Emitter Deployer',
        description: '',
        granted_order_ids: [ORDER.SUPPORT_MSOE],
    },
    [UNIT_TRAIT.MSOE_LAUNCHER]: {
        display_name: 'MSOE Launcher (X)',
        description: 'At the beginning or end of the Order listed in (X), you may place an Obscuration Emitter Token within 6” of this model. Obscuration Emitter Token: An Obscuration Emitter is a 25mm circle. Any Unit, regardless of Commander, within 3” of this Token counts as being within Covering Terrain. (i.e., any LOS line drawn to this model will be considered to be drawn through Covering Terrain). Additionally, these Units count as being equipped with Anti‑Missile System and Electronic Countermeasures Upgrades, if they are not already. Remove the Token when the Unit that placed this Token is Activated again.',
        formatter: xFormater,
        referenced_upgrade_ids: [MECH_UPGRADE.ANTI_MISSILE_SYSTEM, MECH_UPGRADE.ELECTRONIC_COUNTERMEASURES],
    },
    [UNIT_TRAIT.MSOE_DEPLOYER]: {
        display_name: 'Support: MSOE Deployer',
        description: '',
        granted_order_ids: [ORDER.SUPPORT_MSOE],
    },
    [UNIT_TRAIT.SCRAMBLERS]: {
        display_name: 'Scramblers',
        description: 'All Units within 6” of a model equipped with Scramblers, including its own Unit, count as being equipped with Anti‑Missile Systems and Electronic Countermeasures.',
        referenced_upgrade_ids: [MECH_UPGRADE.ANTI_MISSILE_SYSTEM, MECH_UPGRADE.ELECTRONIC_COUNTERMEASURES],
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
    [UNIT_TRAIT.SQUADRON]: {
        display_name: 'Squadron',
        description: 'A Squadron is a Unit made up of multiple Models. These Models will Activate together and perform the same Orders together during that Activation. The following rules apply: When deploying or performing an Order that causes a Squadron to deploy, move or be placed, the Com‑ mander of the Unit performing the Order nominates a Model to be Squadron Leader. All other Models in the Squadron must end their deployment, movement or placement within 3” of that Squadron Leader. A differ‑ ent Model may be selected each time the Squadron deploys, moves, or is placed.',
    },
    [UNIT_TRAIT.FLYING]: {
        display_name: 'Flying',
        description: 'When this unit performs a Move Order, it instead performs a Flying Move Order.',
        granted_order_ids: [ORDER.FLYING_MOVE],
        description_html: `<p class="p-heading">Targeting a Flying Unit</></p>
<p>This Unit gains a +1 to Defense Rolls when targeted by ENGAGE Orders.</p>
<p>Weapons Targeting this Unit are not modified for Covered or Blocked modifiers. LoS is still required to Target this Unit.</p>
<p><em>(Note: Blocking terrain may still block LoS entirely, preventing a Weapon from Targeting this Unit.)</em></p>
<p>If this Unit is Targeted by a Weapon with the Blast (X) trait, Units without the Flying Trait are not affected. If this Unit is in the range of a Blast effect, it does not make a Defense Roll.</p>
<p>This Unit may not perform a SMASH Order, or be the Target of SMASH Orders.</p>
<p>The Silhouette of a Flying Unit extends from bottom of the base to 4” above the bottom of the base, regardless of the actual Model's dimensions.</p>
`,
    },
    [UNIT_TRAIT.FLYING_SQUADRON]: {
        display_name: 'Flying Squadron',
        description: 'This unit has all rules from the Squadron trait, with the following exceptions: All other models in the Squadron must end their deployment or movement within 6” of the Leader Model. When targeted by an engage order, If enough damage is dealt by a Weapon to destroy the Target Model, do not apply any remaining damage to another Model of the squadron. Do not add 2 to the Attack Pool of a Blast Weapon during an Engage Order against a unit with this trait.',
        referenced_trait_ids: [UNIT_TRAIT.SQUADRON],
    },
    [UNIT_TRAIT.MINELAYER]: {
        ...MINE_LAYER,
    },
    [UNIT_TRAIT.GUIDANCE_SUITE]: {
        display_name: 'Guidance Suite',
        description: 'When a Unit with a Guidance Marker is the Target of an ENGAGE Order, the Unit performing the EN‑ GAGE selects one of the following effects: a. All weapons used in this ENGAGE Order count as having the benefit of a LOCK ON Order. b. One weapon used in this ENGAGE Order may have +2 added to its Damage Rating. When the ENGAGE Order is complete, remove the Guidance Marker. If the Marker has not been other‑ wise removed, remove the Marker when this Unit is activated again.',
        formatter: xFormater,
    },
    [UNIT_TRAIT.AUXILIARY_UNIT]: {
        display_name: 'Auxiliary Unit',
        description: '',
        formatter: xFormater,
        description_html: `<p>Unless otherwise stated, all Units with the Auxiliary Unit (X) Trait follow the rules below:</p>
<p class="p-heading">Defense Rolls</p>
<p>This Unit will Defend against ENGAGE and SMASH Orders as if it were the Weight Class indicated by (X).</p>
<p>Attack Pools against this Unit are never modified for Side or Rear Arc.</p>
<p class="p-heading">Armor and Structure</p>
<p>This Unit does not suffer Critical Damage.</p>
<p class="p-heading">Other Weight Class Rolls</p>
<p>This Unit will count as the Weight Class indicated by (X) when making Rolls for other Weapons, Upgrades, and other traits when relevant. (Such as when comparing Weight Class for the Kinetic trait).</p>
<p class="p-heading">SMASH Orders</p>
<p>This Unit may never perform a SMASH Order, unless it has a weapon with the Smasher (X,Y) Trait.</p>
<p class="p-heading">Overdrive and Redline Markers</p>
<p>This Unit may never Overdrive. If this Unit would be marked with a Redline Marker from an effect, it suffers 1 point of Structure damage, but do not mark it with a Redline Marker.</p>
<p class="p-heading">Rules about HE-Vs</p>
<p>Many rules refer to HE-Vs specifically. Units with the Auxiliary Unit (X) Trait do not count as HE-Vs unless otherwise specified.</p>
`,
    },
    [UNIT_TRAIT.INFANTRY_UNIT]: {
        display_name: 'Infantry',
        description: '',
        description_html: `<p class="p-heading">Activation</p>
<p>When Infantry Units are activated, do not select their orders from the usual list. Instead, select two orders from the following: ${INFANTRY_ORDERS.map(id => ORDERS[id].display_name).join(', ')}.</p>
<p class="p-heading">Engaging Infantry Units</p>
<p>Infantry suffers a -1 penalty to Defense Rolls when not in Rough or Covering Terrain. (I.e., an Ultralight Infantry Unit would Defend On a net 3+ in the open).</p>
<p class="p-heading">Infantry Units count as 0 tons for Scoring Objectives or Agendas.</p>
`,
    },
    [UNIT_TRAIT.VULNERABLE]: {
        display_name: 'Vulnerability',
        description: 'This Unit receives full Damage to Armor and Structure from Weapons or effects with the Light trait.',
    },
    [UNIT_TRAIT.YIELDING]: {
        display_name: 'Yielding',
        description: 'Any Model without the Yielding trait may move through any Model with the Yielding trait. If such a Model ends its move on top of a Model with the Yielding trait, move any Models with the Yielding trait the minimum distance possible to permit this.',
    },
    [UNIT_TRAIT.SMASHER]: {
        display_name: 'Smasher',
        description: 'This Unit is permitted to make the SMASH Order, even if it has the Auxiliary Unit Trait. The Unit is considered of Weight Class X when making a SMASH Order. Add Y dice to the Attack Pool when performing a SMASH Order.',
        formatter: xyFormater,
    },
});

export function unitTraitDisplayName({ id, X, Y }: Trait<UNIT_TRAIT>): string {
    const trait = UNIT_TRAITS[id];

    if (!trait) {
        throw new Error('trait not found: ' + id);
    }
    if (trait.formatter) {
        return trait.formatter(trait.display_name, X, Y);
    }
    return trait.display_name;
}

export function unitTraitInfo(trait: Trait<UNIT_TRAIT>): TraitInfo<UNIT_TRAIT> {
    return {
        ...UNIT_TRAITS[trait.id],
        granted_order_ids: [],
        dependent_trait_ids: [],
        ...trait,
        display_name: unitTraitDisplayName(trait),
    };
}
