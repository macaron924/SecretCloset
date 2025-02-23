// place files you want to import through the `$lib` alias in this folder.

/**
 * 日本語に変換するか"だん"をつける
 * @param {string} category1
 * @returns {string}
 */
export function toCategory1String(category1) {
    switch (category1) {
        case "special":
            return "スペシャル";
        case "gumi":
            return "アイプリカード♪コレクショングミ";
        case "millefeui":
            return "ミルフィーカード";
        default:
            return `${category1}だん`;
    }
}

/**
 * プロモーションかどうか
 * @param {string} category1
 * @returns {boolean}
 */
export function isPromotion(category1) {
    switch (category1) {
        case "special":
            return true;
        case "gumi":
            return true;
        case "millefeui":
            return true;
        default:
            return false;
    }
}

export const characterList = [
    "ひまり",
    "みつき",
    "つむぎ",
    "つむぎ（プリンセスver.）",
    "サクラ",
    "タマキ",
    "アイリ",
    "リンリン",
    "チィ",
    "ダークチィ",
    "ダークサクラ",
    "ダークタマキ",
    "ダークアイリ",
    "ダークリンリン"
];
export const brandList = [
    "ポッピンハート",
    "ミラクルムーン",
    "フラワーマーチ",
    "スカーレットバタフライ",
    "ロゼッション",
    "レインボーキャンディ",
    "ベアベアベア",
    "ラブマイミュージック",
    "プリズムストーン",
    "クリスタルバース"
];
