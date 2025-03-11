import { get } from "svelte/store";
import { cardInventoryStore, itemInventoryStore } from "./stores";

function isObject(o: any) {
    return (o instanceof Object && !(o instanceof Array)) ? true : false;
};

export function exportRawCardData() {
    const data = get(cardInventoryStore);
    const str = JSON.stringify(data);
    return str;
}

export function importRawCardData(str: string) {
    try {
        if (isObject(JSON.parse(str)) === false) throw "IsNotValidObjectError";
    } catch(error) {
        return 2;
    }
    const data = JSON.parse(str);
    cardInventoryStore.set(data);
    return 1;
}

export function resetCardData() {
    cardInventoryStore.reset();
}

export function exportRawItemData() {
    const data = get(itemInventoryStore);
    const str = JSON.stringify(data);
    return str;
}

export function importRawItemData(str: string) {
    try {
        if (isObject(JSON.parse(str)) === false) throw "IsNotValidObjectError";
    } catch(error) {
        return 2;
    }
    const data = JSON.parse(str);
    itemInventoryStore.set(data);
    return 1;
}

export function resetItemData() {
    itemInventoryStore.reset();
}
