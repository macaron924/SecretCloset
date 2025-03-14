// -----------------------------------------------------
// インターフェース: Dictionary
// 説明: 汎用辞書型定義
// -----------------------------------------------------
export interface Dictionary<T> {
    [key: string]: T;
}

// -----------------------------------------------------
// インターフェース: CardInventory
// 説明: カード所持数情報（カードIDをキーとする辞書）
// -----------------------------------------------------
export interface CardInventory extends Dictionary<number> {
    [id: string]: number;
}

// -----------------------------------------------------
// インターフェース: ItemInventory
// 説明: カード所持数情報（カードIDをキーとする辞書）
// -----------------------------------------------------
export interface ItemInventory extends Dictionary<number> {
    [id: string]: number;
}

export type CoordinatePart = "one-piece" | "tops" | "bottoms" | "shoes" | "accessory";

type CoordinatePartObj = {
    [key in CoordinatePart]: string;
}

type CoordinateData1 = {
    tmpId: string;
    coordinateId: string;
    url: string;
    category: string;
    categorySP: string | null;
    connectedCategory: string;
    coordinateName: string;
    brandName: string;
    rarity: number;
};

export type CoordinateData = CoordinateData1 & CoordinatePartObj;

/**
type CoordinateData2 = {
    tmpId: string;
    coordinateId: string;
    url: string;
    category: string;
    categorySP: string | null;
    connectedCategory: string;
    coordinateName: string;
    brandName: string;
    rarity: number;
    items: {
    [key in CoordinatePart]: {
        id: string;
        re: boolean;
    };
    };
};
*/

export interface RankList extends Dictionary<number> {
    [id: string]: number;
}
