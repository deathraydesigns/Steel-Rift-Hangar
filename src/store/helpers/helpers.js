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