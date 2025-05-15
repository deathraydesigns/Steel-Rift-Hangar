import {findIndex} from 'lodash';

export function findItemById(items, id) {
    let index = findItemIndexById(items, id);
    if (index === false) {
        throw Error('Item not found with id', id);
    }
    return items[index];
}

export function findItemIndexById(items, id) {
    let index = findIndex(items, ['id', id]);
    if (index === -1) {
        return false;
    }
    return index;
}

export function findItemIndex(items, item) {
    return findItemIndexById(items, item.id);
}

export function findItemIndexByIdOrFail(items, item) {
    let index = findItemIndex(items, item);
    if (index === false) {
        console.error('Item not found', item);
        throw Error('Item not found', item);
    }
    return index;
}

// export function replaceItem(items, item) {
//     let index = findItemIndexByIdOrFail(items, item);
//
//     items.splice(index, 1, item);
// }
//
export function deleteItem(items, item) {
    let index = findItemIndexByIdOrFail(items, item);

    items.splice(index, 1);
    setDisplayOrders(items);
}

export function deleteItemById(items, id) {
    let index = findItemIndexById(items, id);
    items.splice(index, 1);
    setDisplayOrders(items);
}

export function moveItem(items, item, toIndex) {
    let index = findItemIndexByIdOrFail(items, item);
    move(items, index, toIndex);
}

export function move(items, fromIndex, toIndex) {
    let item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);
    setDisplayOrders(items);
}

// export function copyItem(items, item) {
//     let index = findItemIndex(items, item);
//     let toIndex = index + 1;
//     createItem(items, item, toIndex);
// }

export function setDisplayOrders(items) {
    items.forEach((item, index) => {
        item.display_order = index;
    });
}

