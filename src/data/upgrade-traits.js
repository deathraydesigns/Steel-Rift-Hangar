import {inchFormater, numberFormater} from './weapon-traits.js';

export const TRAIT_COMPACT = 'TRAIT_COMPACT';
export const TRAIT_DASH = 'TRAIT_DASH';
export const TRAIT_UPGRADE_LIMITED = 'TRAIT_UPGRADE_LIMITED';

export const UPGRADE_TRAITS = makeUpgradeTraits({
    [[TRAIT_COMPACT]]: {
        display_name: 'Compact',
        description: 'This upgrade does not take up a slot during upgrade. No HE-V may be equipped with more than one Upgrade with the Compact special Rule.',
    },
    [[TRAIT_DASH]]: {
        display_name: 'Dash',
        description: 'This Unit may take the Dash order',
        formatter: inchFormater,
    },
    [[TRAIT_UPGRADE_LIMITED]]: {
        display_name: 'Limited',
        description: 'This upgrade may only be used (X) times during a mission.',
        formatter: numberFormater,
    },
});

export function traitDisplayName({id, number}) {

    const trait = UPGRADE_TRAITS[id];

    if (!trait) {
        throw new Error('trait not found: '.id);
    }
    if (trait.formatter) {
        return trait.formatter(trait.display_name, number);
    }
    return trait.display_name;
}

function makeUpgradeTraits(items) {
    Object.keys(items)
        .forEach((key) => {
            const item = items[key];
            item.id = key;

            Object.freeze(item);
        });

    return Object.freeze(items);
}

