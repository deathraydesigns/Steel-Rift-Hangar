import type { Trait } from '../types';
import { inchFormater, numberFormater } from './data-formatters';
import { makeTraits, type TraitDef } from './data-helpers';
import { ORDER_DASH } from './orders/special-orders';

export const TRAIT_COMPACT = 'TRAIT_COMPACT' as const;
export const TRAIT_DASH = 'TRAIT_DASH' as const;
export const TRAIT_UPGRADE_LIMITED = 'TRAIT_UPGRADE_LIMITED' as const;

export type UpgradeTraitId =
    | typeof TRAIT_COMPACT
    | typeof TRAIT_DASH
    | typeof TRAIT_UPGRADE_LIMITED;

export interface UpgradeTraitDef extends TraitDef {
    id: UpgradeTraitId;
    description: string;
    formatter?: (name: string, number: number | string | undefined) => string;
}

export const UPGRADE_TRAITS: Readonly<Record<UpgradeTraitId, UpgradeTraitDef>> = makeTraits<UpgradeTraitDef>({
    [TRAIT_COMPACT]: {
        display_name: 'Compact',
        description: 'This upgrade does not take up a slot during upgrade. No HE-V may be equipped with more than one Upgrade with the Compact special Rule.',
    },
    [TRAIT_DASH]: {
        display_name: 'Dash',
        description: 'This Unit may take the Dash order',
        formatter: inchFormater,
        granted_order_ids: [ORDER_DASH],
    },
    [TRAIT_UPGRADE_LIMITED]: {
        display_name: 'Limited',
        description: 'This upgrade may only be used (X) times during a mission.',
        formatter: numberFormater,
    },
});

export function upgradeTraitDisplayName({ id, number }: Trait): string {

    const trait = UPGRADE_TRAITS[id as UpgradeTraitId];

    if (!trait) {
        throw new Error('trait not found: ' + id);
    }
    if (trait.formatter && number !== undefined) {
        return trait.formatter(trait.display_name, number);
    }
    return trait.display_name;
}
