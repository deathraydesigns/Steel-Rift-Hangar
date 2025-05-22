import {pick} from 'es-toolkit/compat';

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
    Object.keys(obj)
        .forEach((key) => {
            obj[key].id = key;
        });

    return obj;
}

export function makeFrozenStaticListIds(obj) {
    return deepFreeze(makeStaticListIds(obj));
}

export function deepFreeze(object) {
    // Retrieve the property names defined on object
    const propNames = Reflect.ownKeys(object);

    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = object[name];

        if ((value && typeof value === 'object') || typeof value === 'function') {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
}