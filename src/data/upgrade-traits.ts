import type { Trait, TraitInfo } from '../types';
import { DRONE_MINE_DIRECTOR, MINE_LAYER } from './_shared';
import { inchFormater, xFormater } from './data-formatters';
import { makeTraits, type TraitDef } from './data-helpers';
import { ORDER } from './orders';

export enum UPGRADE_TRAIT {
    COMPACT = 'TRAIT_COMPACT',
    DASH = 'TRAIT_DASH',
    LIMITED = 'TRAIT_UPGRADE_LIMITED',
    MINELAYER = 'TRAIT_MINELAYER',
    DRONE_MINE_DIRECTOR_ATTACHED = 'TRAIT_DRONE_DIRECTOR_ATTACHED',
}

export interface UpgradeTraitDef extends TraitDef<UPGRADE_TRAIT> {
}

export const UPGRADE_TRAITS: Readonly<Record<UPGRADE_TRAIT, UpgradeTraitDef>> = makeTraits<UpgradeTraitDef>({
    [UPGRADE_TRAIT.COMPACT]: {
        display_name: 'Compact',
        description: 'This Upgrade does not take an Upgrade Slot to equip. No HE-V may be equipped with more than one Upgrade with the Compact trait.',
    },
    [UPGRADE_TRAIT.DASH]: {
        display_name: 'Dash',
        description: 'This Unit may be issued the Dash order',
        formatter: inchFormater,
        granted_order_ids: [ORDER.DASH],
    },
    [UPGRADE_TRAIT.LIMITED]: {
        display_name: 'Limited',
        description: 'This upgrade may only be used (X) times during a mission.',
        formatter: xFormater,
    },
    [UPGRADE_TRAIT.MINELAYER]: {
        ...MINE_LAYER,
    },
    [UPGRADE_TRAIT.DRONE_MINE_DIRECTOR_ATTACHED]: {
        ...DRONE_MINE_DIRECTOR,
    },
});

export function upgradeTraitInfo(trait: Trait<UPGRADE_TRAIT>): TraitInfo<UPGRADE_TRAIT> {
    return {
        dependent_trait_ids: [],
        ...UPGRADE_TRAITS[trait.id],
        ...trait,
        display_name: upgradeTraitDisplayName(trait),
    };
}

export function upgradeTraitDisplayName({ id, X, Y }: Trait<UPGRADE_TRAIT>): string {
    const trait = UPGRADE_TRAITS[id];

    if (!trait) {
        throw new Error('trait not found: ' + id);
    }
    if (trait.formatter) {
        return trait.formatter(trait.display_name, X, Y);
    }
    return trait.display_name;
}
