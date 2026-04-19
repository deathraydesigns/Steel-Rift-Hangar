import { type OrderId, ORDERS } from '../../data/orders';

export type GrantedOrderCollection = ReturnType<typeof makeGrantedOrderCollection>

export interface GrantedOrderIdObj {
    granted_order_ids?: OrderId[];
};

export function makeGrantedOrderCollection() {
    const orderIdMap = new Map<OrderId, boolean>();

    function add(obj: GrantedOrderIdObj) {
        obj.granted_order_ids?.forEach(orderId => {
            orderIdMap.set(orderId, true);
        });
    }

    function remove(id: OrderId) {
        orderIdMap.delete(id);
    }

    function addMultiple(array: GrantedOrderIdObj[]) {
        array.forEach(obj => {
            add(obj);
        });
    }

    function addIds(ids: OrderId[]) {
        ids.forEach(orderId => {
            orderIdMap.set(orderId, true);
        });
    }

    function ids(): OrderId[] {
        return [...orderIdMap.keys()];
    }

    function all() {
        return ids().map(id => ORDERS[id]);
    }

    function includes(id: OrderId) {
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

export function ifEmptyString(val: any, result: any): any {
    if (val === '') {
        return result;
    }
    return false;
}
