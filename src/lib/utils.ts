import { get } from "svelte/store";
import { cardInventoryStore, itemInventoryStore, rankListStore } from "./stores";
import type { CardInventory, ItemInventory, RankList } from "./types";

function isObject(o: any) {
    return (o instanceof Object && !(o instanceof Array)) ? true : false;
};

function sortPosData(json: CardInventory | ItemInventory | RankList) {
    const keyList = Object.keys(json);
    keyList.sort();
    let newJson: CardInventory | ItemInventory | RankList = {};
    keyList.forEach((key) => {
        newJson[key] = json[key];
    });
    return newJson;
}

export function exportRawCardData() {
    const data = sortPosData(get(cardInventoryStore));
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
    const result = confirm('アイプリカードの所持データをリセットします。本当によろしいですか？');
    if (result) {
        cardInventoryStore.reset();
    }
}

export function exportRawItemData() {
    const data = sortPosData(get(itemInventoryStore));
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
    const result = confirm('コーデアイテムの所持データをリセットします。本当によろしいですか？');
    if (result) {
        itemInventoryStore.reset();
    }
}

export function exportRawRankData() {
    const data = sortPosData(get(rankListStore));
    const str = JSON.stringify(data);
    return str;
}

export function importRawRankData(str: string) {
    try {
        if (isObject(JSON.parse(str)) === false) throw "IsNotValidObjectError";
    } catch(error) {
        return 2;
    }
    const data = JSON.parse(str);
    rankListStore.set(data);
    return 1;
}

export function resetRankData() {
    const result = confirm('ランクデータをリセットします。本当によろしいですか？');
    if (result) {
        rankListStore.reset();
    }
}
