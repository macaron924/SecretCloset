<script>
    import { base } from "$app/paths";
    import { SvelteSet } from "svelte/reactivity";
    import { brandList, toUrlString } from "$lib";
    import itemData from "$lib/assets/item_data.json";
    import coordinateData from "$lib/assets/coordinate_data.json";
    let coordinateDataShow = $state(coordinateData)
    let filterSets = $state({
        rarities: new SvelteSet(),
        brands: new SvelteSet(),
    });
    let isOpenFilterRarity = $state(false);
    let isOpenFilterBrand = $state(false);
    function filter() {
        return coordinateData.filter(coordinate => {
            return (filterSets.rarities.size === 0 || filterSets.rarities.has(coordinate.rarity))
            && (filterSets.brands.size === 0 || filterSets.brands.has(coordinate.brandName))
        })
    }
    /**
     * 排出時印字ID取得
     * @param {string} targetId
     */
    function getPrintedId(targetId) {
        const retsult = itemData.find(({ imageId }) => imageId == targetId);
        if (retsult != undefined) return retsult.id;
        return null;
    }
    /**
     * 再録かどうか
     * @param {string} targetId
     * @param {string} category1
     * @param {string} category2
     */
    function isSameCategory(targetId, category1, category2) {
        const retsult = itemData.find(({ imageId }) => imageId == targetId);
        if (retsult != undefined) {
            if (retsult.category1 === category1 && retsult.category2 === category2) return true;
            return false;
        }
        return false;
    }
</script>
<main class="grow p-2.5">
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div>
            <div>
                <button
                    onclick={() => {
                        isOpenFilterRarity = !isOpenFilterRarity;
                    }}
                >{isOpenFilterRarity ? "▲" : "▼"} レアリティ選択</button>
                {#if isOpenFilterRarity}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each [{str: "★★★★", num: 4}, {str: "★★★", num: 3}, {str: "★★", num: 2}, {str: "スペシャル", num: 0}] as rarity}
                            <button
                                class={{
                                    "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.rarities.has(rarity.num)
                                }}
                                onclick="{() => {
                                    filterSets.rarities.has(rarity.num) ? filterSets.rarities.delete(rarity.num) : filterSets.rarities.add(rarity.num);
                                    coordinateDataShow = filter();
                                }}"
                                >{rarity.str}</button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div>
            <div>
                <button
                    onclick={() => {
                        isOpenFilterBrand = !isOpenFilterBrand;
                    }}
                >{isOpenFilterBrand ? "▲" : "▼"} ブランド選択</button>
                {#if isOpenFilterBrand}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each brandList as brand}
                            <button
                                class={{
                                    "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.brands.has(brand)
                                }}
                                onclick="{() => {
                                    filterSets.brands.has(brand) ? filterSets.brands.delete(brand) : filterSets.brands.add(brand);
                                    coordinateDataShow = filter();
                                }}"
                            >{brand}</button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div id="list" class="grid grid-cols-2 md:grid-cols-4 items-start">
        {#each coordinateDataShow as coordinate (coordinate.tmpId)}
            <div class="coordinateDiv relative m-2 p-2.5 rounded-2xl bg-white text-center">
                <div class="text-right">{coordinate.brandName}</div>
                <div class="text-xl">{coordinate.coordinateName}</div>
                <div class="text-left">{toUrlString(coordinate.category1)} / {coordinate.category2}</div>
                <div class="grid grid-cols-2 pt-2">
                    {#if coordinate["one-piece"] != ""}
                    {@const grayout = (coordinate["one-piece"].split(" ").length > 1)}
                    {@const imageId = coordinate["one-piece"].split(" ")[0]}
                    {@const printedId = getPrintedId(imageId)}
                        <div>
                            <div><img src="{base}/img/item/{imageId}_150.webp" alt="" class="size-full p-1"></div>
                            {#if printedId != null}
                                <div>{printedId}</div>
                            {/if}
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text"
                                    class={{
                                        "w-full": true,
                                        "bg-[#ccc]": grayout
                                    }}
                                    disabled
                                >
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                            {#if grayout}
                                {#if isSameCategory(imageId, coordinate.category1, coordinate.category2)}
                                    <div>※共通</div>
                                {:else}
                                    <div>※再録</div>
                                {/if}
                            {/if}
                        </div>
                        <div></div>
                    {/if}
                    {#if coordinate.tops != ""}
                    {@const grayout = (coordinate.tops.split(" ").length > 1)}
                    {@const imageId = coordinate.tops.split(" ")[0]}
                    {@const printedId = getPrintedId(imageId)}
                        <div>
                            <div><img src="{base}/img/item/{imageId}_150.webp" alt="" class="size-full p-1"></div>
                            {#if printedId != null}
                                <div>{printedId}</div>
                            {/if}
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text"
                                    class={{
                                        "w-full": true,
                                        "bg-[#ccc]": grayout
                                    }}
                                    disabled
                                >
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                            {#if grayout}
                                {#if isSameCategory(imageId, coordinate.category1, coordinate.category2)}
                                    <div>※共通</div>
                                {:else}
                                    <div>※再録</div>
                                {/if}
                            {/if}
                        </div>
                    {/if}
                    {#if coordinate.bottoms != ""}
                    {@const grayout = (coordinate.bottoms.split(" ").length > 1)}
                    {@const imageId = coordinate.bottoms.split(" ")[0]}
                    {@const printedId = getPrintedId(imageId)}
                        <div>
                            <div><img src="{base}/img/item/{imageId}_150.webp" alt="" class="size-full p-1"></div>
                            {#if printedId != null}
                                <div>{printedId}</div>
                            {/if}
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text"
                                    class={{
                                        "w-full": true,
                                        "bg-[#ccc]": grayout
                                    }}
                                    disabled
                                >
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                            {#if grayout}
                                {#if isSameCategory(imageId, coordinate.category1, coordinate.category2)}
                                    <div>※共通</div>
                                {:else}
                                    <div>※再録</div>
                                {/if}
                            {/if}
                        </div>
                    {/if}
                    {#if coordinate.shoes != ""}
                    {@const grayout = (coordinate.shoes.split(" ").length > 1)}
                    {@const imageId = coordinate.shoes.split(" ")[0]}
                    {@const printedId = getPrintedId(imageId)}
                        <div>
                            <div><img src="{base}/img/item/{imageId}_150.webp" alt="" class="size-full p-1"></div>
                            {#if printedId != null}
                                <div>{printedId}</div>
                            {/if}
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text"
                                    class={{
                                        "w-full": true,
                                        "bg-[#ccc]": grayout
                                    }}
                                    disabled
                                >
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                            {#if grayout}
                                {#if isSameCategory(imageId, coordinate.category1, coordinate.category2)}
                                    <div>※共通</div>
                                {:else}
                                    <div>※再録</div>
                                {/if}
                            {/if}
                        </div>
                    {/if}
                    {#if coordinate.accessory != ""}
                    {@const grayout = (coordinate.accessory.split(" ").length > 1)}
                    {@const imageId = coordinate.accessory.split(" ")[0]}
                    {@const printedId = getPrintedId(imageId)}
                        <div>
                            <div><img src="{base}/img/item/{imageId}_150.webp" alt="" class="size-full p-1"></div>
                            {#if printedId != null}
                                <div>{printedId}</div>
                            {/if}
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text"
                                    class={{
                                        "w-full": true,
                                        "bg-[#ccc]": grayout
                                    }}
                                    disabled
                                >
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                            {#if grayout}
                                {#if isSameCategory(imageId, coordinate.category1, coordinate.category2)}
                                    <div>※共通</div>
                                {:else}
                                    <div>※再録</div>
                                {/if}
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</main>
<style>
    .coordinateDiv::before {
        content: "";
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
        bottom: -0.2rem;
        left: -0.2rem;
        background: linear-gradient(90deg, #fe9bf2, #66d9fe);
        border-radius: 1.2rem;
        z-index: -1;
    }
</style>
