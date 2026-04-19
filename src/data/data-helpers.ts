import type { Optional } from '../_helpers';
import type { Trait } from '../types';
import { weaponTraitDisplayName } from './weapon-traits';

export interface DisplayNameItem {
    display_name: string;
    id?: string;
}

export function listToDropDown<T extends DisplayNameItem>(list: Record<string, T>) {
    return Object.keys(list)
        .map((key) => {
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
export function makeStaticListIds<T extends { id: string }>(
    obj: Record<string, Omit<T, 'id'>>,
): Record<string, T> {
    const result = {} as Record<string, T>;
    for (const [id, item] of Object.entries(obj)) {
        result[id] = {
            ...item,
            id,
        } as unknown as T;
    }
    return result;
}

export function makeFrozenStaticListIds<T extends { id: string }>(
    obj: Record<string, Omit<T, 'id'>>,
): Readonly<Record<string, T>> {
    return deepFreeze(makeStaticListIds(obj));
}


export function makeKeyedFrozenStaticListIds<K extends string, T extends { id: K }>(
    obj: Record<string, Omit<T, 'id'>>,
): Readonly<Record<K, T>> {
    return deepFreeze(makeStaticListIds(obj))
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

export interface TraitDef {
    id: string;
    display_name: string;
    granted_order_ids: string[];
}

export function makeTraits<
    T extends TraitDef
>(items: Record<string, Omit<Optional<T, 'granted_order_ids'>, 'id'>>): Readonly<Record<string, T>> {
    const result = {} as Record<string, T>;
    for (const [id, item] of Object.entries(items)) {
        result[id] = {
            granted_order_ids: [],
            ...item,
            id,
        } as unknown as T;
    }

    return deepFreeze(result);
}

export function trait<ID extends string = string>(id: ID, number: number | string | undefined = undefined, type: string | undefined = undefined): Readonly<Trait<ID>> {
    const obj: Trait = { id };
    if (number !== undefined) {
        obj.number = number;
    }
    if (type !== undefined) {
        obj.type = type;
    }

    return Object.freeze(obj) as Readonly<Trait<ID>>;
}

export function traitDisplayNames(traits: Trait[]): string {
    return traits.map((trait) => weaponTraitDisplayName(trait)).join(', ');
}
