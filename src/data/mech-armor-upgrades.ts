import type { Optional } from '../_helpers';
import type { NumberBySize } from '../types';
import { makeFrozenStaticListIds } from './data-helpers';
import { type MechSizeId, SIZE_HEAVY, SIZE_LIGHT, SIZE_MEDIUM, SIZE_ULTRA } from './unit-sizes';

export const NO_ARMOR_UPGRADE = 'NO_ARMOR_UPGRADE' as const;
export const ABLATIVE_ARMOR_UPGRADE = 'ABLATIVE_ARMOR_UPGRADE' as const;
export const REACTIVE_ARMOR_UPGRADE = 'REACTIVE_ARMOR_UPGRADE' as const;
export const CERAMIC_ARMOR_UPGRADE = 'CERAMIC_ARMOR_UPGRADE' as const;
export const CLAYMORE_ARMOR_UPGRADE = 'CLAYMORE_ARMOR_UPGRADE' as const;
export const EXTRA_PLATING_ARMOR_UPGRADE = 'EXTRA_PLATING_ARMOR_UPGRADE' as const;
export const HEAVY_PLATING_ARMOR_UPGRADE = 'HEAVY_PLATING_ARMOR_UPGRADE' as const;

export type MechArmorUpgradeId =
    | typeof NO_ARMOR_UPGRADE
    | typeof ABLATIVE_ARMOR_UPGRADE
    | typeof REACTIVE_ARMOR_UPGRADE
    | typeof CERAMIC_ARMOR_UPGRADE
    | typeof CLAYMORE_ARMOR_UPGRADE
    | typeof EXTRA_PLATING_ARMOR_UPGRADE
    | typeof HEAVY_PLATING_ARMOR_UPGRADE;

export interface MechArmorUpgrade {
    id: MechArmorUpgradeId,
    display_name: string,
    cost: number,
    slots: number,
    card_upgrade_display_name?: string,
    description: string,
    cost_by_size: NumberBySize,
    limited_size_ids?: MechSizeId[],
    armor_mod?: number,
}

interface MakeArmorUpgradeInput extends Omit<Optional<MechArmorUpgrade, 'cost' | 'cost_by_size' | 'limited_size_ids' | 'armor_mod'>, 'id'> {
}

function makeArmorUpgrade(item: MakeArmorUpgradeInput): Omit<MechArmorUpgrade, 'id'> {
    const cost_by_size: NumberBySize = item.cost_by_size ?? {
        [SIZE_LIGHT]: item.cost ?? 0,
        [SIZE_MEDIUM]: item.cost ?? 0,
        [SIZE_HEAVY]: item.cost ?? 0,
        [SIZE_ULTRA]: item.cost ?? 0,
    };

    return {
        display_name: item.display_name,
        cost: item.cost ?? 0,
        slots: item.slots,
        card_upgrade_display_name: item.card_upgrade_display_name,
        description: item.description,
        cost_by_size,
        limited_size_ids: item.limited_size_ids ?? [],
        armor_mod: item.armor_mod,
    };
}

export const MECH_ARMOR_UPGRADES: Readonly<Record<MechArmorUpgradeId, MechArmorUpgrade>> = makeFrozenStaticListIds<MechArmorUpgrade>({
    [NO_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Standard',
        description: '',
        cost: 0,
        slots: 0,
    }),
    [ABLATIVE_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Ablative',
        card_upgrade_display_name: 'Ablative Armor',
        cost_by_size: {
            [SIZE_LIGHT]: 1,
            [SIZE_MEDIUM]: 1,
            [SIZE_HEAVY]: 2,
            [SIZE_ULTRA]: 2,
        },
        slots: 1,
        description: 'Reduce the Attack Pool for attacks using the Blast trait by 1, to a minimum of 1.',
    }),
    [REACTIVE_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Reactive',
        card_upgrade_display_name: 'Reactive Armor',
        cost: 1,
        slots: 1,
        description: 'Reduce the Attack Pool for Missile and Rocket Pack attacks by 1, to a minimum of 1.',
    }),
    [CERAMIC_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Ceramic',
        card_upgrade_display_name: 'Ceramic Armor',
        cost_by_size: {
            [SIZE_LIGHT]: 2,
            [SIZE_MEDIUM]: 2,
            [SIZE_HEAVY]: 1,
            [SIZE_ULTRA]: 1,
        },
        slots: 1,
        description: 'Each time this unit would take damage from the AP trait of a Laser Weapon System roll 1D6 - on a 5+ that damage is negated.',
    }),
    [CLAYMORE_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Claymore',
        card_upgrade_display_name: 'Claymore Armor',
        description: 'Reduce the Attack Pool of incoming Smash Orders by 1 to a minimum of 1. If a Unit equipped with Claymore Armor takes structure damage from a Smash Order, the attacking Unit is immediately targeted by an Engage Order with a damage value of (2/2/3/3) and the Frag trait.',
        cost: 1,
        slots: 1,
    }),
    [EXTRA_PLATING_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Extra Plating',
        card_upgrade_display_name: 'Extra Plating (+2 applied)',
        description: 'This HE-V gains 2 additional Armor ',
        cost: 1,
        slots: 1,
        armor_mod: 2,
    }),
    [HEAVY_PLATING_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Heavy Plating',
        card_upgrade_display_name: 'Heavy Plating (+4 applied)',
        description: 'This HE-V gains 4 additional Armor ',
        cost: 1,
        slots: 1,
        armor_mod: 4,
        limited_size_ids: [SIZE_ULTRA],
    }),
});