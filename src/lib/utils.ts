import { get } from "svelte/store";
import { cardInventoryStore, itemInventoryStore, rankListStore } from "./stores";
import type { CardInventory, ItemInventory, RankList } from "./types";

const COMPRESS_MODE = "deflate-raw";

function isObject(o: any) {
    return (o instanceof Object && !(o instanceof Array)) ? true : false;
};

class FileReaderAsync extends FileReader {
    constructor() {
        super();
    }
    readAsDataURLAsync(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            this.onloadend = () => resolve(this.result as string);
            this.onerror = () => reject(this.error);
            this.readAsDataURL(blob);
        });
    }
}

async function compressData(prefix: string, data: string) {
    const stream = new Blob([data]).stream();
    const compressed = stream.pipeThrough(new CompressionStream(COMPRESS_MODE));
    const reader = new FileReaderAsync();
    return new Response(compressed).blob()
        .then(blob => reader.readAsDataURLAsync(blob))
        .then(str => {
            return prefix + str.replace(/^data:.*?;base64,/, "");
        })
        .catch(() => Promise.reject(""));
}

async function decompressData(prefix: string, str: string) {
    if (!str.startsWith(prefix)) return Promise.reject(false);
    return fetch("data:application/octet-string;base64," + str.replace(prefix, ""))
        .then(res => res.blob())
        .then(blob => {
            const decompressedStream = blob.stream().pipeThrough(new DecompressionStream(COMPRESS_MODE));
            return new Response(decompressedStream).json();
        })
        .catch(() => Promise.reject());
}

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

export async function exportCompressedCardData() {
    const data = sortPosData(get(cardInventoryStore));
    const str = JSON.stringify(data);
    return compressData("card-", str)
        .catch(() => Promise.reject(false));
}

export function importRawCardData(str: string) {
    try {
        let data = JSON.parse(str);
        if (isObject(data) === false) throw "IsNotValidObjectError";
        cardInventoryStore.set(data);
    } catch(error) {
        return -1;
    }
    return 1;
}

export async function importCompressedCardData(str: string): Promise<number> {
    return decompressData("card-", str)
        .then(res => {
            let data = res;
            try {
                if (isObject(data) === false) throw "IsNotValidObjectError";
            } catch(error) {
                return -1;
            }
            cardInventoryStore.set(data);
            return 1;
        })
        .catch((err) => Promise.resolve(-1));
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

export async function exportCompressedItemData() {
    const data = sortPosData(get(itemInventoryStore));
    const str = JSON.stringify(data);
    return compressData("item-", str)
        .catch(() => Promise.reject(false));
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

export async function importCompressedItemData(str: string): Promise<number> {
    return decompressData("item-", str)
        .then(res => {
            let data = res;
            try {
                if (isObject(data) === false) throw "IsNotValidObjectError";
            } catch(error) {
                return -1;
            }
            itemInventoryStore.set(data);
            return 1;
        })
        .catch((err) => Promise.resolve(-1));
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

export async function exportCompressedRankData() {
    const data = sortPosData(get(rankListStore));
    const str = JSON.stringify(data);
    return compressData("rank-", str)
        .catch(() => Promise.reject(false));
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

export async function importCompressedRankData(str: string): Promise<number> {
    return decompressData("rank-", str)
        .then(res => {
            let data = res;
            try {
                if (isObject(data) === false) throw "IsNotValidObjectError";
            } catch(error) {
                return -1;
            }
            rankListStore.set(data);
            return 1;
        })
        .catch((err) => Promise.resolve(-1));
}

export function resetRankData() {
    const result = confirm('ランクデータをリセットします。本当によろしいですか？');
    if (result) {
        rankListStore.reset();
    }
}
