<script>
    import { base } from "$app/paths";
    import { SvelteSet } from "svelte/reactivity";
    import { brandList, toCategory1String } from "$lib";
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
                <div class="text-left">{toCategory1String(coordinate.category1)} / {coordinate.category2}</div>
                <div class="grid grid-cols-2 pt-2">
                    {#if coordinate["one-piece"] != ""}
                        <div>
                            <div><img src="{base}/img/item/{coordinate["one-piece"].split(" ")[0]}_150.webp" alt="" class="size-full p-1"></div>
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text" class="w-full" disabled>
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                        </div>
                        <div></div>
                    {/if}
                    {#if coordinate.tops != ""}
                        <div>
                            <div><img src="{base}/img/item/{coordinate.tops.split(" ")[0]}_150.webp" alt="" class="size-full p-1"></div>
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text" class="w-full" disabled>
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                        </div>
                    {/if}
                    {#if coordinate.bottoms != ""}
                        <div>
                            <div><img src="{base}/img/item/{coordinate.bottoms.split(" ")[0]}_150.webp" alt="" class="size-full p-1"></div>
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text" class="w-full" disabled>
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                        </div>
                    {/if}
                    {#if coordinate.shoes != ""}
                        <div>
                            <div><img src="{base}/img/item/{coordinate.shoes.split(" ")[0]}_150.webp" alt="" class="size-full p-1"></div>
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text" class="w-full" disabled>
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
                        </div>
                    {/if}
                    {#if coordinate.accessory != ""}
                        <div>
                            <div><img src="{base}/img/item/{coordinate.accessory.split(" ")[0]}_150.webp" alt="" class="size-full p-1"></div>
                            <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                                <button class="w-full bg-[#eee]">+</button>
                                <input type="text" class="w-full" disabled>
                                <button class="w-full bg-[#eee]">-</button>
                            </div>
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
