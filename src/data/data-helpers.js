import {pick} from 'es-toolkit/compat';
import {weaponTraitDisplayName} from './weapon-traits.js';

export function listToDropDown(list) {
    return Object.keys(list)
        .map((key) => {
            return Object.assign({}, list[key], {
                value: key,
                text: list[key].display_name,
            });
        });
}

export function updateObject(existing, data, validKeys) {
    return Object.assign(existing, pick(data, validKeys));
}

export function makeStaticListIds(obj) {
    Object.entries(obj)
        .forEach(([id, item]) => {
            if (item.id !== id) {
                item.id = id;
            }
        });

    return obj;
}

export function makeFrozenStaticListIds(obj) {
    return deepFreeze(makeStaticListIds(obj));
}

export function deepFreeze(object, depth = 0) {
    if (depth > 5) {
        throw new Error('foo');
    }
    // Retrieve the property names defined on object
    const propNames = Reflect.ownKeys(object);

    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = object[name];

        if ((value && typeof value === 'object') || typeof value === 'function') {
            deepFreeze(value, depth + 1);
        }
    }

    return Object.freeze(object);
}

export function makeTraits(items) {
    Object.entries(items)
        .forEach(([id, item]) => {
            items[id] = {
                ...item,
                id,
                granted_order_ids: item.granted_order_ids || [],
            };
        });

    return deepFreeze(items);
}

export function trait(id, number = undefined, type = undefined) {
    const obj = {id};
    if (number !== undefined) {
        obj.number = number;
    }
    if (type !== undefined) {
        obj.type = type;
    }

    return Object.freeze(obj);
}

export function traitDisplayNames(traits) {
    return traits.map((trait) => weaponTraitDisplayName(trait)).join(', ');
}