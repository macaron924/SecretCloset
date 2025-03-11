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
