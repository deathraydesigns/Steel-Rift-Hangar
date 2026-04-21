import { type ORDER, ORDERS } from '../../data/orders';

export type GrantedOrderCollection = ReturnType<typeof makeGrantedOrderCollection>

export interface GrantedOrderIdObj {
    granted_order_ids?: ORDER[],
}

export function makeGrantedOrderCollection() {
    const orderIdMap = new Map<ORDER, boolean>();

    function add(obj: GrantedOrderIdObj) {
        obj.granted_order_ids?.forEach(orderId => {
            orderIdMap.set(orderId, true);
        });
    }

    function remove(id: ORDER) {
        orderIdMap.delete(id);
    }

    function addMultiple(array: GrantedOrderIdObj[]) {
        array.forEach(obj => {
            add(obj);
        });
    }

    function addIds(ids: ORDER[]) {
        ids.forEach(orderId => {
            orderIdMap.set(orderId, true);
        });
    }

    function ids(): ORDER[] {
        return [...orderIdMap.keys()];
    }

    function all() {
        return ids().map(id => ORDERS[id]);
    }

    function includes(id: ORDER) {
        return orderIdMap.has(id);
    }

    return {
        add,
        addIds,
        remove,
        addMultiple,
        includes,
        ids,
        all,
    };
}

export type UniqueItemIdCollection<T> = ReturnType<typeof makeUniqueItemIdCollection<T>>

export function makeUniqueItemIdCollection<T>(DATA_STORE: Record<string, T>) {
    const idMap = new Map<string, boolean>();

    function add(item: { id: string }) {
        idMap.set(item.id, true);
    }

    function addMultiple(array: { id: string }[]) {
        array.forEach(item => {
            add(item);
        });
    }

    function addId(id: string) {
        idMap.set(id, true);
    }

    function addIds(array: string[]) {
        array.forEach(id => {
            addId(id);
        });
    }

    function ids() {
        return [...idMap.keys()];
    }

    function all() {
        return ids().map(id => DATA_STORE[id]);
    }

    return {
        add,
        addId,
        addIds,
        addMultiple,
        ids,
        all,
    };
}

export function ifEmptyString<T>(val: any, result: T): T | false {
    if (val === '') {
        return result;
    }
    return false;
}
