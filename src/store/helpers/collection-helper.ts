export interface HasId {
    id: string;
}

export interface HasDisplayOrder {
    display_order: number | null;
}

export function findItemIndexById<T extends number | string>(items: { id: T }[], id: T): number | false {
    let index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return false;
    }
    return index;
}

export function filterUniqueById<T extends HasId>(items: T[]): T[] {
    const idMap: Record<string, T> = {};
    items.forEach(item => {
        idMap[item.id] = item;
    });

    return Object.values(idMap);
}

export function findItemIndex<T extends { id: string | number }>(items: T[], item: T): number | false {
    return findItemIndexById(items, item.id);
}

export function findItemIndexByIdOrFail<T extends { id: string | number }>(items: T[], item: T): number {
    let index = findItemIndex(items, item);
    if (index === false) {
        console.error('Item not found', item);
        throw Error('Item not found');
    }
    return index;
}

export function deleteItem<T extends HasDisplayOrder & HasId>(items: T[], item: T) {
    let index = findItemIndexByIdOrFail(items, item);

    items.splice(index, 1);
    setDisplayOrders(items);
}

export function deleteItemById<T extends HasDisplayOrder & { id: string | number }>(items: T[], id: T['id']) {
    let index = findItemIndexById(items, id);
    if (index !== false) {
        items.splice(index, 1);
        setDisplayOrders(items);
    }
}

export function moveItem<ID extends string | number, T extends HasDisplayOrder & {
    id: ID
}>(items: T[], item: T, toIndex: number) {
    let index = findItemIndexByIdOrFail<T>(items, item);
    move(items, index, toIndex);
}

export function move(items: HasDisplayOrder[], fromIndex: number, toIndex: number) {
    let item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);
    setDisplayOrders(items);
}

export function setDisplayOrders(items: HasDisplayOrder[]) {
    items.forEach((item, index) => {
        item.display_order = index;
    });
}

export function findById<Item extends { id: unknown }>(
    collection: Item[],
    id: Item['id'],
): Item | undefined {
    return collection.find((item) => id === item.id);
}

export function findBy<Item extends {}, Key extends keyof Item>(
    collection: Item[],
    key: Key,
    value: Item[Key],
): Item | undefined {
    return collection.find((item) => value === item[key]);
}

export function pluck<Item extends {}, Key extends keyof Item>(
    collection: Item[],
    key: Key,
): Item[Key][] {
    return collection.map((item) => item[key]);
}

export function sumBy<
    T extends object,
    K extends keyof T
>(
    collection: T[],
    key: K & (T[K] extends number | undefined | null ? K : never),
): number {
    if (!collection?.length) return 0;

    let result = 0;

    for (let i = 0; i < collection.length; i++) {
        const current = collection[i][key];
        result += (current ?? 0) as number;
    }

    return result;
}

// export function countBy<T>(collection: T[] | null | undefined, mapper: (v: T) => string | number): Record<string, number> {
//     if (collection == null) {
//         return {};
//     }
//     const result: Record<string, number> = {};
//     for (let i = 0; i < collection.length; i++) {
//         const item = collection[i];
//         const key = mapper(item);
//         result[key] = (result[key] ?? 0) + 1;
//     }
//     return result;
// }