import type { Optional } from '../_helpers';
import type { NumberBySize } from '../types';
import { makeFrozenStaticListIds } from './data-helpers';
import { type MechSizeId, SIZE } from './unit-sizes';

export enum MECH_ARMOR_UPGRADE {
    NO_ARMOR_UPGRADE = 'NO_ARMOR_UPGRADE',
    ABLATIVE_ARMOR_UPGRADE = 'ABLATIVE_ARMOR_UPGRADE',
    REACTIVE_ARMOR_UPGRADE = 'REACTIVE_ARMOR_UPGRADE',
    CERAMIC_ARMOR_UPGRADE = 'CERAMIC_ARMOR_UPGRADE',
    CLAYMORE_ARMOR_UPGRADE = 'CLAYMORE_ARMOR_UPGRADE',
    EXTRA_PLATING_ARMOR_UPGRADE = 'EXTRA_PLATING_ARMOR_UPGRADE',
    HEAVY_PLATING_ARMOR_UPGRADE = 'HEAVY_PLATING_ARMOR_UPGRADE',
    REDUNDANT_INTERNALS = 'REDUNDANT_INTERNALS',
}

export interface MechArmorUpgrade {
    id: MECH_ARMOR_UPGRADE,
    display_name: string,
    slots: 0,
    card_upgrade_display_name?: string,
    description: string,
    cost_by_size: NumberBySize,
    limited_size_ids?: MechSizeId[],
    armor_mod: number | null,
}

type MakeArmorUpgradeInput =
    Omit<Optional<MechArmorUpgrade, | 'slots' | 'cost_by_size' | 'limited_size_ids' | 'armor_mod'>, 'id'>
    & ({
    cost: number,
    cost_by_size?: undefined
} | {
    cost?: undefined,
    cost_by_size: NumberBySize
})

function makeArmorUpgrade(item: MakeArmorUpgradeInput): Omit<MechArmorUpgrade, 'id'> {
    const cost_by_size: NumberBySize = item.cost_by_size ?? {
        [SIZE.LIGHT]: item.cost ?? 0,
        [SIZE.MEDIUM]: item.cost ?? 0,
        [SIZE.HEAVY]: item.cost ?? 0,
        [SIZE.ULTRA]: item.cost ?? 0,
    };

    return {
        display_name: item.display_name,
        slots: 0,
        card_upgrade_display_name: item.card_upgrade_display_name,
        description: item.description,
        cost_by_size,
        limited_size_ids: item.limited_size_ids ?? [],
        armor_mod: item.armor_mod ?? null,
    };
}

export const MECH_ARMOR_UPGRADES: Readonly<Record<MECH_ARMOR_UPGRADE, MechArmorUpgrade>> = makeFrozenStaticListIds<MechArmorUpgrade>({
    [MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Standard',
        description: '',
        cost: 0,
    }),
    [MECH_ARMOR_UPGRADE.ABLATIVE_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Ablative',
        card_upgrade_display_name: 'Ablative Armor',
        cost_by_size: {
            [SIZE.LIGHT]: 1,
            [SIZE.MEDIUM]: 1,
            [SIZE.HEAVY]: 2,
            [SIZE.ULTRA]: 2,
        },
        description: 'This Unit may re‑roll any failed Defense Rolls caused by the Blast effect.',
    }),
    [MECH_ARMOR_UPGRADE.REACTIVE_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Reactive',
        card_upgrade_display_name: 'Reactive Armor',
        cost: 1,
        description: 'Reduce the Attack Pool of Weapons with “Missile” or "Rocket” in the name Targeting this Unit by 1, to a minimum of 1.',
    }),
    [MECH_ARMOR_UPGRADE.CERAMIC_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Ceramic',
        card_upgrade_display_name: 'Ceramic Armor',
        cost_by_size: {
            [SIZE.LIGHT]: 2,
            [SIZE.MEDIUM]: 2,
            [SIZE.HEAVY]: 1,
            [SIZE.ULTRA]: 1,
        },
        description: 'Each time this Unit would take Damage from the AP trait, roll a D6. On a 4+, ignore that Damage.',
    }),
    [MECH_ARMOR_UPGRADE.CLAYMORE_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Claymore',
        card_upgrade_display_name: 'Claymore Armor',
        description: 'Reduce the Attack Pool of incoming SMASH Orders by 1 to a minimum of 1.If a Unit equipped with Claymore Armor takes Structure Damage from a SMASH Order, the Active Unit is immediately targeted by an ENGAGE Order with a damage value of (2/2/3/3) and the Frag trait.',
        cost: 1,
    }),
    [MECH_ARMOR_UPGRADE.EXTRA_PLATING_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Extra Plating',
        card_upgrade_display_name: 'Extra Plating (+2 applied)',
        description: 'This Unit gains 2 additional Armor.',
        cost: 1,
        armor_mod: 2,
    }),
    [MECH_ARMOR_UPGRADE.HEAVY_PLATING_ARMOR_UPGRADE]: makeArmorUpgrade({
        display_name: 'Heavy Plating',
        card_upgrade_display_name: 'Heavy Plating (+4 applied)',
        description: 'This Unit gains 4 additional Armor.',
        cost: 2,
        armor_mod: 4,
        limited_size_ids: [SIZE.ULTRA],
    }),
    [MECH_ARMOR_UPGRADE.REDUNDANT_INTERNALS]: makeArmorUpgrade({
        display_name: 'Redundant Internals',
        card_upgrade_display_name: 'Redundant Internals (Fragile Int. Removed)',
        description: 'This Unit no longer has the "Fragile Internals" rule applied when damaged.',
        cost: 1,
        armor_mod: 4,
        limited_size_ids: [SIZE.LIGHT],
    }),
});