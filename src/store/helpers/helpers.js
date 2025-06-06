import {ORDERS} from '../../data/orders.js';

export function makeGrantedOrderCollection() {
    let orderIdMap = new Map();

    function add(obj) {
        obj.granted_order_ids?.forEach(orderId => {
            orderIdMap.set(orderId, true);
        });
    }

    function remove(id) {
        orderIdMap.delete(id);
    }

    function addMultiple(array) {
        array.forEach(obj => {
            add(obj);
        });
    }

    function addIds(ids) {
        ids.forEach(orderId => {
            orderIdMap.set(orderId, true);
        });
    }

    function ids() {
        return orderIdMap.keys().toArray();
    }

    function all() {
        return ids().map(id => ORDERS[id]);
    }

    function includes(id) {
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

export function makeUniqueItemIdCollection(DATA_STORE) {
    let idMap = new Map();

    function add(item) {
        idMap.set(item.id, true);
    }

    function addMultiple(array) {
        array.forEach(item => {
            add(item);
        });
    }

    function addId(id) {
        idMap.set(id, true);
    }

    function addIds(array) {
        array.forEach(id => {
            addId(id);
        });
    }

    function ids() {
        return idMap.keys().toArray();
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