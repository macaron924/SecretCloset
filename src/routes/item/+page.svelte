<script lang="ts">
    import { base } from "$app/paths";
    import { SvelteSet } from "svelte/reactivity";
    import { brandList, itemCategoryList, toUrlString } from "$lib";
    import itemData from "$lib/assets/item_data.json";
    import coordinateDataTemp from "$lib/assets/coordinate_data.json";
    const coordinateData = coordinateDataTemp as CoordinateData[];
    import { itemInventoryStore } from "$lib/stores";
    import type { ItemInventory, CoordinateData, CoordinatePart } from "$lib/types";

    const PARTS_LIST: CoordinatePart[] = ["one-piece", "tops", "bottoms", "shoes", "accessory"];

    let itemInventoryShow: ItemInventory = $state({});
    itemInventoryStore.subscribe((value) => {
        itemInventoryShow = value;
    });

    let isOpenCategory: boolean[] = $state([]);
    let selectedCategoryNum: number[] = $state([])
    for (let i = 0; i<itemCategoryList.length; i++) {
        isOpenCategory.push(false);
        selectedCategoryNum.push(0);
    }

    let coordinateDataShow = $state(coordinateData)
    let filterSets = $state({
        categories: new SvelteSet(),
        rarities: new SvelteSet(),
        brands: new SvelteSet(),
    });
    let isOpenFilterCategory = $state(false);
    let isOpenFilterRarity = $state(false);
    let isOpenFilterBrand = $state(false);
    function filter() {
        return coordinateData.filter(coordinate => {
            return (filterSets.categories.size === 0 || filterSets.categories.has(coordinate.connectedCategory))
            && (filterSets.rarities.size === 0 || filterSets.rarities.has(coordinate.rarity))
            && (filterSets.brands.size === 0 || filterSets.brands.has(coordinate.brandName))
        })
    }
    function getPrintedId(targetId: string) {
        const retsult = itemData.find(({ imageId }) => imageId == targetId);
        if (retsult != undefined) return retsult.id;
        return null;
    }
    function isSameCategory(targetId: string, url: string, category: string) {
        const retsult = itemData.find(({ imageId }) => imageId == targetId);
        if (retsult != undefined) {
            if (retsult.url === url && retsult.category === category) return true;
            return false;
        }
        return false;
    }
</script>
<main class="grow mt-15 p-2.5">
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div>
            <div>
                <button
                    class={{
                        "p-1": true,
                        "bg-[#ffff00]": filterSets.categories.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterCategory = !isOpenFilterCategory;
                    }}
                >{isOpenFilterCategory ? "▲" : "▼"} カテゴリー（だん）選択</button>
                {#if isOpenFilterCategory}
                    <div>
                        {#each itemCategoryList as url, index}
                            <div>
                                <button
                                    class={{
                                        "m-1 px-2 py-1 h-max border-3 border-[#66d9fe] rounded-full bg-white": true,
                                        "!bg-[#ffff00]": selectedCategoryNum[index] > 0
                                    }}
                                    onclick={() => {
                                        if (selectedCategoryNum[index] == url.categories.length) {
                                            url.categories.forEach((category) =>{
                                                filterSets.categories.delete(`${url.url}/${category}`);
                                            })
                                            selectedCategoryNum[index] = 0;
                                        } else {
                                            url.categories.forEach((category) =>{
                                                filterSets.categories.add(`${url.url}/${category}`);
                                            })
                                            selectedCategoryNum[index] = url.categories.length;
                                        }
                                        coordinateDataShow = filter();

                                    }}
                                >{toUrlString(url.url)} <span class="text-gray-400">({selectedCategoryNum[index]}/{url.categories.length})</span></button>
                                <button
                                    aria-label="カテゴリー開閉"
                                    value="{index}"
                                    class={{
                                        "m-1 px-2 py-1 h-max border-3 border-[#66d9fe] rounded-full bg-white": true
                                    }}
                                    onclick={() => {
                                        isOpenCategory[index] = !isOpenCategory[index];
                                    }}
                                ><span
                                    class={{
                                        "!size-4 align-middle": true,
                                        "mdi--plus": !isOpenCategory[index],
                                        "mdi--minus": isOpenCategory[index]
                                    }}
                                ></span></button>
                                {#if isOpenCategory[index]}
                                    <div class="flex flex-wrap justify-start content-start pl-4">
                                        {#each url.categories as category}
                                        {@const value = `${url.url}/${category}`}
                                            <button
                                                value="{value}"
                                                class={{
                                                    "m-1 px-2 py-1 h-max border-3 border-[#66d9fe] rounded-full bg-white": true,
                                                    "!bg-[#ffff00]": filterSets.categories.has(value)
                                                }}
                                                onclick={() => {
                                                    if (filterSets.categories.has(value)) {
                                                        filterSets.categories.delete(value);
                                                        selectedCategoryNum[index]--;
                                                    } else {
                                                        filterSets.categories.add(value);
                                                        selectedCategoryNum[index]++;
                                                    }
                                                    coordinateDataShow = filter();
                                                }}
                                            >{category}</button>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div>
            <div>
                <button
                    class={{
                        "p-1": true,
                        "bg-[#ffff00]": filterSets.rarities.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterRarity = !isOpenFilterRarity;
                    }}
                >{isOpenFilterRarity ? "▲" : "▼"} レアリティ選択</button>
                {#if isOpenFilterRarity}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each [{str: "★★★★", num: 4}, {str: "★★★", num: 3}, {str: "★★", num: 2}, {str: "スペシャル", num: 0}] as rarity}
                            <button
                                class={{
                                    "m-1 px-2 py-1 h-max border-3 border-[#66d9fe] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.rarities.has(rarity.num)
                                }}
                                onclick={() => {
                                    filterSets.rarities.has(rarity.num) ? filterSets.rarities.delete(rarity.num) : filterSets.rarities.add(rarity.num);
                                    coordinateDataShow = filter();
                                }}
                                >{rarity.str}</button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div>
                <button
                    class={{
                        "p-1": true,
                        "bg-[#ffff00]": filterSets.brands.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterBrand = !isOpenFilterBrand;
                    }}
                >{isOpenFilterBrand ? "▲" : "▼"} ブランド選択</button>
                {#if isOpenFilterBrand}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each brandList as brand}
                            <button
                                class={{
                                    "m-1 px-2 py-1 w-24 border-3 border-[#66d9fe] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.brands.has(brand)
                                }}
                                onclick={() => {
                                    filterSets.brands.has(brand) ? filterSets.brands.delete(brand) : filterSets.brands.add(brand);
                                    coordinateDataShow = filter();
                                }}
                            ><img src="{base}/img/brand/{brand}.webp" alt="{brand}" title="{brand}" class="w-full h-10 object-cover"></button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div class="p-2.5 mt-2.5 bg-white/70 rounded-xl">現在 {coordinateDataShow.length} のコーデを表示しています</div>
    <div id="list" class="mt-2 grid grid-cols-2 md:grid-cols-4 items-start">
        {#each coordinateDataShow as coordinate (coordinate.tmpId)}
            <div class="coordinateDiv relative m-2 p-2.5 rounded-2xl bg-white text-center">
                <div class="flex">
                    <div class="grow"></div>
                    <div class="max-w-1/2"><img src="{base}/img/brand/{coordinate.brandName}.webp" alt="{coordinate.brandName}" title="{coordinate.brandName}" class="w-16 max-w-full h-8 object-cover"></div>
                </div>
                <div class="text-xl">{coordinate.coordinateName}</div>
                <div class="text-left">{toUrlString(coordinate.url)} / {coordinate.category}</div>
                <div class="grid grid-cols-2 pt-2">
                    {#each PARTS_LIST as part}
                        {#if coordinate[part] != ""}
                        {@const grayout = (coordinate[part].split(" ").length > 1)}
                        {@const imageId = coordinate[part].split(" ")[0]}
                        {@const printedId = getPrintedId(imageId)}
                            <div>
                                <div class="relative">
                                    <img src="{base}/img/item/{imageId}_150.webp" alt="" class="size-full p-1">
                                    <img src="{base}/img/{part}.png" alt="" class="absolute top-1 left-1 w-1/4 opacity-30">
                                </div>
                                {#if printedId != null}
                                <div class="text-xs">{printedId} <span class=" text-[#aaa]">({imageId})</span></div>
                                {/if}
                                <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                    <button
                                        aria-label="所持数+1" class="flex items-center justify-center h-6 w-full bg-[#eee]"
                                        onclick={() => {
                                            if (imageId in itemInventoryShow) {
                                                itemInventoryShow[imageId]++;
                                            } else {
                                                itemInventoryShow[imageId] = 1;
                                            }
                                            itemInventoryStore.set(itemInventoryShow);
                                        }}
                                    ><span class="mdi--plus"></span></button>
                                    <input type="text"
                                        class={{
                                            "h-6 w-full text-center": true,
                                            "bg-[#ccc]": grayout
                                        }}
                                        bind:value={itemInventoryShow[imageId]}
                                        onchange={() => {
                                            if (itemInventoryShow[imageId] <= 0) {
                                                delete itemInventoryShow[imageId];
                                            }
                                            itemInventoryStore.set(itemInventoryShow);
                                        }}
                                    >
                                    <button
                                        aria-label="所持数-1" class="flex items-center justify-center h-6 w-full bg-[#eee]"
                                        onclick={() => {
                                            if (imageId in itemInventoryShow) {
                                                itemInventoryShow[imageId]--;
                                            } else {
                                                itemInventoryShow[imageId] = -1;
                                            }
                                            if (itemInventoryShow[imageId] <= 0) {
                                                delete itemInventoryShow[imageId];
                                            }
                                            itemInventoryStore.set(itemInventoryShow);
                                        }}
                                    ><span class="mdi--minus"></span></button>
                                </div>
                                {#if grayout}
                                    <div class="text-xs">{isSameCategory(imageId, coordinate.url, coordinate.category) ? "※共通" : "※再録"}</div>
                                {/if}
                            </div>
                            {#if part == "one-piece"}
                                <div></div>
                            {/if}
                        {/if}
                    {/each}
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
