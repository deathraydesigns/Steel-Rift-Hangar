import { MECH_ARMOR_UPGRADE } from '../../data/mech-armor-upgrades'
import { type ORDER, ORDERS } from '../../data/orders';
import { MECH_SIZES, type MechSizeId } from '../../data/unit-sizes'

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

export function makeUniqueItemIdCollection<T extends { id: ID }, ID extends string>(DATA_STORE: Record<ID, T>) {
    const idMap = new Set<ID>();

    function add(item: { id: ID }) {
        idMap.add(item.id);
    }

    function addMultiple(array: { id: ID }[]) {
        for (const t of array) {
            add(t);
        }
    }

    function addId(id: ID) {
        idMap.add(id);
    }

    function addIds(array: ID[]) {
        for (const id of array) {
            addId(id);
        }
    }

    function ids(): ID[] {
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

export function normalizeArmorUpgrades(size_id: MechSizeId, armor_upgrade_ids:  MECH_ARMOR_UPGRADE[]){
    const maxArmorUpgrades = MECH_SIZES[size_id].max_armor_upgrades;
    const baseArmorUpgradeIds = new Array(maxArmorUpgrades).fill(MECH_ARMOR_UPGRADE.NO_ARMOR_UPGRADE);
    if (!armor_upgrade_ids?.length) {
        armor_upgrade_ids = baseArmorUpgradeIds;
    } else if (armor_upgrade_ids?.length !== maxArmorUpgrades) {
        armor_upgrade_ids = [...armor_upgrade_ids, ...baseArmorUpgradeIds].slice(0, maxArmorUpgrades);
    }

    return armor_upgrade_ids
}