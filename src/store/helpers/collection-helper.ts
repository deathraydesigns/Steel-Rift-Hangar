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

export function dedupeById<T extends { id: string | number }>(arr: T[]): T[] {
    const seen = new Set<T['id']>();
    return arr.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
    });
}