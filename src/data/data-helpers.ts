import type { Optional } from '../_helpers';
import type { Trait, TraitFormatter } from '../types';
import type { MECH_UPGRADE } from './mech-upgrades';
import type { ORDER } from './orders';
import { UNIT_TRAIT } from './unit-traits';
import type { UNIT_WEAPON } from './unit-weapons';
import { weaponTraitDisplayName } from './weapon-traits';

export interface DisplayNameItem {
    display_name: string;
    id?: string;
}

export function listToDropDown<K extends string, T extends DisplayNameItem>(
    list: Record<K, T>,
): (T & { value: K; text: string })[] {
    return (Object.keys(list) as K[]).map((key) => {
        return Object.assign({}, list[key], {
            value: key,
            text: list[key].display_name,
        });
    });
}

export function updateObject<T extends Record<string, any>>(
    existing: T,
    data: Partial<T>,
    validKeys: (keyof T)[],
): T {
    const picked = validKeys.reduce((acc, key) => {
        if (key in data) acc[key] = data[key] as T[keyof T];
        return acc;
    }, {} as Partial<T>);

    return Object.assign(existing, picked);
}

/**
 * Ensures each item in the object has an 'id' property matching its key.
 */
export function makeStaticListIds<T extends { id: any }>(
    obj: Record<string, Omit<T, 'id'>>,
): Record<T['id'], T> {
    const result = {} as Record<string, T>;
    for (const [id, item] of Object.entries(obj)) {
        result[id] = {
            ...item,
            id,
        } as unknown as T;
    }
    return result;
}

export function makeFrozenStaticListIds<T extends { id: ID }, ID extends string = T['id']>(
    obj: Record<ID, Omit<T, 'id'>>,
): Readonly<Record<ID, T>> {
    return deepFreeze(makeStaticListIds(obj));
}

export function deepFreeze<T extends object>(object: T, depth = 0): Readonly<T> {
    if (depth > 5) {
        throw new Error('Deep freeze limit exceeded');
    }
    const propNames = Reflect.ownKeys(object);

    for (const name of propNames) {
        const value = (object as any)[name];

        if ((value && typeof value === 'object') || typeof value === 'function') {
            deepFreeze(value, depth + 1);
        }
    }

    return Object.freeze(object);
}

export interface TraitDef<ID extends string> {
    id: ID,
    display_name: string,
    description: string,
    description_html?: string,
    granted_order_ids: ORDER[],
    referenced_upgrade_ids: MECH_UPGRADE[],
    formatter?: TraitFormatter,
    referenced_trait_ids: UNIT_TRAIT[];
}

type TraitDefOptional =
    | 'description_html'
    | 'referenced_upgrade_ids'
    | 'referenced_trait_ids'
    | 'granted_order_ids'

export function makeTraits<T extends TraitDef<ID>, ID extends string = T['id']>(
    items: Record<T['id'], Omit<Optional<T, TraitDefOptional>, 'id'>>,
): Record<ID, TraitDef<ID>> {
    const result = {} as Record<ID, TraitDef<ID>>;
    for (const [id, item] of Object.entries(items)) {
        const {
            referenced_trait_ids = [],
            granted_order_ids = [],
            referenced_upgrade_ids = [],
            ...rest
        } = item as Omit<Optional<T, TraitDefOptional>, 'id'>;

        result[id as T['id']] = {
            ...rest,
            granted_order_ids,
            referenced_trait_ids,
            referenced_upgrade_ids,
            id: id as ID,
        };
    }
    return deepFreeze(result);
}

export function trait<ID extends string = string>(id: ID, X?: number | string | undefined, Y?: number | string | undefined): Readonly<Trait<ID>> {
    const obj: Trait<ID> = { id, X, Y };

    return Object.freeze(obj) as Readonly<Trait<ID>>;
}

export function traitDisplayNames(traits: Trait<any>[]): string {
    return traits.map((trait) => weaponTraitDisplayName(trait)).join(', ');
}
