<script>
    import { base } from "$app/paths";
    import cardData from "$lib/assets/card_data.json";
</script>
<main class="grow p-2.5">
    <div id="list" class="grid grid-cols-2 md:grid-cols-4 items-start">
        {#each cardData as card (card.id)}
            <div
                class="relative overflow-hidden m-1.5 p-2.5 border-3 border-[#ccc] rounded-2xl bg-white text-center"
                class:!border-[#ed86a7]={card.type=="ダンス"}
                class:!border-[#68caf2]={card.type=="うた"}
                class:!border-[#ffe467]={card.type=="ファッション"}
            >
                <div
                    class="inline-block absolute top-1 -left-4 p-1.5 w-15 bg-[#ccc] -rotate-45"
                    class:!bg-[#ed86a7]={card.type=="ダンス"}
                    class:!bg-[#68caf2]={card.type=="うた"}
                    class:!bg-[#ffe467]={card.type=="ファッション"}
                ></div>
                <div
                    class="inline-block absolute bottom-1 -right-4 p-1.5 w-15 bg-[#ccc] -rotate-45"
                    class:!bg-[#ed86a7]={card.type=="ダンス"}
                    class:!bg-[#68caf2]={card.type=="うた"}
                    class:!bg-[#ffe467]={card.type=="ファッション"}
                ></div>
                <div class="pl-2.5 text-left">{card.id}</div>
                <div class="text-right">{card.brandName}</div>
                <div class="text-xl">{card.character}</div>
                <div class="text-xl">{card.cardName}</div>
                <div class="text-left">{card.music}</div>
                <div class="text-left">{card.category1} / {card.category2}</div>
                <div class="grid grid-cols-2 pt-2">
                    <div><img src="{base}/img/card/{card.id}_O_150.webp" alt="" class="size-full p-1"></div>
                    <div class="overflow-hidden h-max m-1 border-1 border-[#ccc] rounded-2xl">
                        <button class="w-full bg-[#eee]">+</button>
                        <input type="text" class="w-full" disabled>
                        <button class="w-full bg-[#eee]">-</button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>
