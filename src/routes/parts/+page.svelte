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
                        <div class="pt-1 text-xl">・{group.group}</div>
                        <div class="flex flex-row flex-wrap">
                            {#each group.parts as parts}
                            {@const data = getPartsData(parts)}
                                <div class="m-1 p-1 w-40 text-center border-1 border-[#aaa] rounded-xl">
                                    <img src="{base}/img/parts/{data?.img}_150.webp" alt="{parts}" class="m-auto">
                                    <span class="text-wrap">{data?.get}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
        </div>
    {/each}
</main>
