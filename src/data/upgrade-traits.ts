import type { Trait } from '../types';
import { inchFormater, numberFormater } from './data-formatters';
import { makeTraits, type TraitDef } from './data-helpers';
import { ORDER } from './orders';

export enum UPGRADE_TRAIT {
    COMPACT = 'TRAIT_COMPACT',
    DASH = 'TRAIT_DASH',
    LIMITED = 'TRAIT_UPGRADE_LIMITED',
}

export interface UpgradeTraitDef extends TraitDef {
    id: UPGRADE_TRAIT;
    description: string;
    formatter?: (name: string, number: number | string | undefined) => string;
}

export const UPGRADE_TRAITS: Readonly<Record<UPGRADE_TRAIT, UpgradeTraitDef>> = makeTraits<UpgradeTraitDef>({
    [UPGRADE_TRAIT.COMPACT]: {
        display_name: 'Compact',
        description: 'This upgrade does not take up a slot during upgrade. No HE-V may be equipped with more than one Upgrade with the Compact special Rule.',
    },
    [UPGRADE_TRAIT.DASH]: {
        display_name: 'Dash',
        description: 'This Unit may take the Dash order',
        formatter: inchFormater,
        granted_order_ids: [ORDER.DASH],
    },
    [UPGRADE_TRAIT.LIMITED]: {
        display_name: 'Limited',
        description: 'This upgrade may only be used (X) times during a mission.',
        formatter: numberFormater,
    },
});

export function upgradeTraitDisplayName({ id, number }: Trait): string {

    const trait = UPGRADE_TRAITS[id as UPGRADE_TRAIT];

    if (!trait) {
        throw new Error('trait not found: ' + id);
    }
    if (trait.formatter && number !== undefined) {
        return trait.formatter(trait.display_name, number);
    }
    return trait.display_name;
}
