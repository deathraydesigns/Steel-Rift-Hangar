import { makeStaticListIds, trait } from '../data-helpers';
import { SIZE, UNIT_SIZES } from '../unit-sizes';
import { UNIT_TRAIT } from '../unit-traits';
import { UNIT_TYPE } from '../unit-types';
import { UNIT_WEAPON } from '../unit-weapons';
import type { SupportAssetUnitDef, SupportAssetUnitVehicleDef } from './_support-asset-types';

const baseStats = {
    move: 8,
    jump: 0,
    armor: 2,
    structure: 2,
};

export const SUPPORT_VEHICLE_SQUADRON_DATA: Omit<SupportAssetUnitDef, 'id'> = {
    unit_type_id: UNIT_TYPE.VEHICLE,
    size_id: SIZE.MEDIUM,
    display_name: 'Support Vehicle Squadron',
    cost: 20,
    max_duplicate_vehicles: 2,
    max_vehicles: 4,
    defense: 4,
    traits: [
        trait(UNIT_TRAIT.AUXILIARY_UNIT, UNIT_SIZES[SIZE.MEDIUM].display_name),
        trait(UNIT_TRAIT.SQUADRON),
        trait(UNIT_TRAIT.SUPPORT_ORDERS),
    ],
    vehicles: makeStaticListIds<SupportAssetUnitVehicleDef>({
        RECON_VEHICLE: {
            ...baseStats,
            display_name: 'Recon Vehicle',
            weapon_ids: [
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.TARGET_DESIGNATOR),
                trait(UNIT_TRAIT.OUTRIDER),
            ],
        },
        COMMAND_VEHICLE: {
            ...baseStats,
            display_name: 'Command Vehicle',
            weapon_ids: [
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.SUPPORT_ORDER_CNC),
            ],
        },
        RESUPPLY_VEHICLE: {
            ...baseStats,
            display_name: 'Resupply Vehicle',
            weapon_ids: [
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.SUPPORT_ORDER_COMBAT_SUPPLIES),
            ],
        },
        TARGETING_VEHICLE: {
            ...baseStats,
            display_name: 'Targeting Support Vehicle',
            weapon_ids: [
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.SUPPORT_GUIDANCE_SUITE),
            ],
        },
        MINELAYER_VEHICLE: {
            ...baseStats,
            display_name: 'Minelayer',
            weapon_ids: [
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.SUPPORT_MINE_DRONE_LAYER, 4),
            ],
        },
        SCRAMBLER_VEHICLE: {
            ...baseStats,
            display_name: 'Obscuration Projection Vehicle',
            weapon_ids: [
                UNIT_WEAPON.VEH_AUTO_CANNON,
            ],
            traits: [
                trait(UNIT_TRAIT.MSOE_DEPLOYER),
            ],
        },
    }),
};