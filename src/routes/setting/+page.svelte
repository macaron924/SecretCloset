<script lang="ts">
    import { exportRawCardData, exportRawItemData, exportRawRankData, importRawCardData, importRawItemData, importRawRankData, resetCardData, resetItemData, resetRankData } from "$lib/utils";

    let importCardText = $state("");
    let importItemText = $state("");
    let importRankText = $state("");
    let statusText = ["インポート", "インポート成功", "インポート失敗"]
    let importCardStatusNum = $state(0);
    let importItemStatusNum = $state(0);
    let importRankStatusNum = $state(0);
</script>
<main class="grow mt-15 p-2.5">
    <div class="p-2.5 bg-white/70 rounded-xl">
        <h1 class="mb-2.5 text-xl">データ管理について</h1>
        <p>このサイトでは、所持データ管理にローカルストレージを使用しています。</p>
        <p>データは各端末で保存/参照のみに用いられ、外部に送信されることはございません。</p>
    </div>
    <div class="mt-2.5 p-2.5 bg-white/70 rounded-xl">
        <h1 class="mb-2.5 text-xl">アイプリカード管理</h1>
        <textarea
            name="" id="" class="w-full bg-white border-1"
            bind:value={importCardText}
        ></textarea>
        <select name="" id="" class="p-1 bg-white border-1">
            <!--<option value="true">圧縮モード</option>-->
            <option value="false">非圧縮モード</option>
        </select>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                importCardStatusNum = importRawCardData(importCardText)
                setTimeout(() => {
                    importCardStatusNum = 0;
                }, 1000);
            }}
        >{statusText[importCardStatusNum]}</button>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                importCardText = exportRawCardData();
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
            name="" id="" class="w-full bg-white border-1"
            bind:value={importItemText}
        ></textarea>
        <select name="" id="" class="p-1 bg-white border-1">
            <!--<option value="true">圧縮モード</option>-->
            <option value="false">非圧縮モード</option>
        </select>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                importItemStatusNum = importRawItemData(importItemText)
                setTimeout(() => {
                    importItemStatusNum = 0;
                }, 1000);
            }}
        >{statusText[importItemStatusNum]}</button>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                importItemText = exportRawItemData();
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
            name="" id="" class="w-full bg-white border-1"
            bind:value={importRankText}
        ></textarea>
        <select name="" id="" class="p-1 bg-white border-1">
            <!--<option value="true">圧縮モード</option>-->
            <option value="false">非圧縮モード</option>
        </select>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                importRankStatusNum = importRawRankData(importRankText)
                setTimeout(() => {
                    importRankStatusNum = 0;
                }, 1000);
            }}
        >{statusText[importRankStatusNum]}</button>
        <button
            class="p-1 bg-white border-1"
            onclick={() => {
                importRankText = exportRawRankData();
            }}
        >エクスポート</button>
        <button class="p-1 bg-white border-1"
            onclick={() => {
                resetRankData();
            }}
        >保存リセット</button>
    </div>
</main>
