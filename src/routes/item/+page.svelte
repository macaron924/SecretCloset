<script>
    import { base } from "$app/paths";
    import { toCategory1String } from "$lib";
    import itemData from "$lib/assets/item_data.json";
    import coordinateData from "$lib/assets/coordinate_data.json";
</script>
<main class="grow p-2.5">
    <div id="list" class="grid grid-cols-2 md:grid-cols-4 items-start">
        {#each coordinateData as coordinate (coordinate.tmpId)}
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
