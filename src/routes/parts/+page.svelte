<script>
    import { base } from "$app/paths";
    import partsData from "$lib/assets/parts_data.json";
    import partsGetData from "$lib/assets/parts_get.json";

    /**
     * パーツ情報を返す関数
     * @param partsName {string}
     */
    function getPartsData(partsName) {
        return partsData.find((element) => element.name == partsName)
    }
</script>
<main class="grow p-2.5">
    <h1 class="p-2.5 text-3xl bg-white/70 rounded-xl">入手方法別マイキャラパーツ一覧</h1>
    {#each partsGetData as title}
    {@const isDream = (title.title == "ドリーム")}
        <div class="p-2.5 mt-2.5 bg-white/70 rounded-xl">
            <div class="text-2xl">{title.title}</div>
                {#each title.groups as group}
                    <div>
                        <div class="flex items-end pt-1">
                            <div class="text-xl">・{group.group}</div>
                            {#if isDream}
                                <div class="flex ml-2 h-6 overflow-hidden border-1 border-[#ccc] rounded-xl">
                                    <button aria-label="ランク-1" class="flex items-center justify-center h-full w-5 bg-[#eee]"><span class="mdi--minus"></span></button>
                                    <input type="text" class="inline-block h-full w-10 bg-white" disabled>
                                    <button aria-label="ランク+1" class="flex items-center justify-center h-full w-5 bg-[#eee]"><span class="mdi--plus"></span></button>
                                </div>
                            {/if}
                        </div>
                        <div class="grid grid-cols-3 md:grid-cols-6">
                            {#each group.parts as parts}
                            {@const data = getPartsData(parts)}
                                <div class="m-1 p-1 w-9/10 text-center border-1 border-[#aaa] rounded-xl">
                                    <img src="{base}/img/parts/{data?.img}_150.webp" alt="{parts}" class="m-auto w-full max-w-40">
                                    <span class="text-wrap">{data?.get}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
        </div>
    {/each}
</main>
