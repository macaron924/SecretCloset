<script lang="ts">
    import {  exportCompressedCardData, exportCompressedItemData, exportCompressedRankData, exportRawCardData, exportRawItemData, exportRawRankData, importCompressedCardData, importCompressedItemData, importCompressedRankData, importRawCardData, importRawItemData, importRawRankData, resetCardData, resetItemData, resetRankData } from "$lib/utils";

    let compressionMode = $state(true);
    let importCardText = $state("");
    let importItemText = $state("");
    let importRankText = $state("");
    let statusText = ["インポート", "インポート成功", "インポート失敗"]
    let importCardStatusNum = $state(0);
    let importItemStatusNum = $state(0);
    let importRankStatusNum = $state(0);

    function displayStatus(num: number) {
        switch (num) {
            case -1:
                return "インポート失敗";
            case 1:
                return "インポート成功";
            default:
                return "インポート";
        }
    }
</script>
<main class="grow mt-15 p-2.5">
    <div class="p-2.5 bg-white/70 rounded-xl">
        <h1 class="mb-2.5 text-xl">データ管理について</h1>
        <p>このサイトでは、所持データ管理にローカルストレージを使用しています。</p>
        <p>データは各端末で保存/参照のみに用いられ、外部に送信されることはございません。</p>
    </div>
    <div class="mt-2.5 p-2.5 bg-white/70 rounded-xl">
        <button
            class="flex items-center justify-center p-1 bg-white border-1"
            onclick={() => {
                compressionMode = !compressionMode;
            }}
        >{compressionMode ? "圧縮モード" : "非圧縮モード"}<span class="mdi--counterclockwise-arrows ml-1 text-xl"></span></button>
    </div>
    <div class="mt-2.5 p-2.5 bg-white/70 rounded-xl">
        <h1 class="mb-2.5 text-xl">アイプリカード管理</h1>
        <textarea
            name="" id="" class="w-full h-20 p-1 bg-white border-1"
            bind:value={importCardText}
        ></textarea>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                if (compressionMode) {
                    importCompressedCardData(importCardText)
                        .then((result) => {
                            importCardStatusNum = result;
                        })
                } else {
                    importCardStatusNum = importRawCardData(importCardText);
                }
                setTimeout(() => {
                    importCardStatusNum = 0;
                }, 1000);
            }}
        >{displayStatus(importCardStatusNum)}</button>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                if (compressionMode) {
                    exportCompressedCardData()
                        .then((result) => {
                            importCardText = result;
                        })
                } else {
                    importCardText = exportRawCardData();
                }
            }}
        >エクスポート</button>
        <button class="p-1 bg-white border-1"
            onclick={() => {
                resetCardData();
            }}
        >保存リセット</button>
    </div>
    <div class="mt-2.5 p-2.5 bg-white/70 rounded-xl">
        <h1 class="mb-2.5 text-xl">コーデアイテム管理</h1>
        <textarea
            name="" id="" class="w-full h-20 p-1 bg-white border-1"
            bind:value={importItemText}
        ></textarea>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                if (compressionMode) {
                    importCompressedItemData(importItemText)
                        .then((result) => {
                            importItemStatusNum = result;
                        })
                } else {
                    importItemStatusNum = importRawItemData(importItemText);
                }
                setTimeout(() => {
                    importItemStatusNum = 0;
                }, 1000);
            }}
        >{statusText[importItemStatusNum]}</button>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                if (compressionMode) {
                    exportCompressedItemData()
                        .then((result) => {
                            importItemText = result;
                        })
                } else {
                    importItemText = exportRawItemData();
                }
            }}
        >エクスポート</button>
        <button class="p-1 bg-white border-1"
            onclick={() => {
                resetItemData();
            }}
        >保存リセット</button>
    </div>
    <div class="mt-2.5 p-2.5 bg-white/70 rounded-xl">
        <h1 class="mb-2.5 text-xl">ドリームランク管理</h1>
        <textarea
            name="" id="" class="w-full h-20 p-1 bg-white border-1"
            bind:value={importRankText}
        ></textarea>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                if (compressionMode) {
                    importCompressedRankData(importRankText)
                        .then((result) => {
                            importRankStatusNum = result;
                        })
                } else {
                    importRankStatusNum = importRawRankData(importRankText);
                }
                setTimeout(() => {
                    importRankStatusNum = 0;
                }, 1000);
            }}
        >{statusText[importRankStatusNum]}</button>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                if (compressionMode) {
                    exportCompressedRankData()
                        .then((result) => {
                            importRankText = result;
                        })
                } else {
                    importRankText = exportRawRankData();
                }
            }}
        >エクスポート</button>
        <button class="p-1 bg-white border-1"
            onclick={() => {
                resetRankData();
            }}
        >保存リセット</button>
    </div>
</main>
