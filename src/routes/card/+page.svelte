<script lang="ts">
    import { base } from "$app/paths";
    import { SvelteSet } from "svelte/reactivity";
    import { brandList, buzzTypeList, cardCategoryList, characterList, toUrlString } from "$lib";
    import cardData from "$lib/assets/card_data.json";
    import musicData from "$lib/assets/music_data.json";
    import { cardInventoryStore } from "$lib/stores";
    import type { CardInventory } from "$lib/types";

    let cardInventoryShow: CardInventory = $state({});
    cardInventoryStore.subscribe((value) => {
        cardInventoryShow = value;
    });

    let isOpenCategory: boolean[] = $state([]);
    let selectedCategoryNum: number[] = $state([]);
    for (let i = 0; i<cardCategoryList.length; i++) {
        isOpenCategory.push(false);
        selectedCategoryNum.push(0);
    }

    let isShowFront = $state(true);
    let cardDataShow = $state(cardData);
    let filterSets = $state({
        categories: new SvelteSet(),
        chance: new SvelteSet(),
        buzzTypes: new SvelteSet(),
        types: new SvelteSet(),
        characters: new SvelteSet(),
        brands: new SvelteSet(),
        musics: new SvelteSet()
    });
    let isOpenFilterCategory = $state(false);
    let isOpenFilterChance = $state(false);
    let isOpenFilterBuzzType = $state(false);
    let isOpenFilterType = $state(false);
    let isOpenFilterCharacter = $state(false);
    let isOpenFilterBrand = $state(false);
    let isOpenFilterMusic = $state(false);
    function filter() {
        return cardData.filter(card => {
            return (filterSets.categories.size === 0 || filterSets.categories.has(card.connectedCategory))
            && (filterSets.chance.size === 0 || filterSets.chance.has(card.chance))
            && (filterSets.buzzTypes.size === 0 || filterSets.buzzTypes.has(card.buzzType))
            && (filterSets.types.size === 0 || filterSets.types.has(card.type))
            && (filterSets.characters.size === 0 || filterSets.characters.has(card.character))
            && (filterSets.brands.size === 0 || filterSets.brands.has(card.brandName))
            && (filterSets.musics.size === 0 || filterSets.musics.has(card.music))
        })
    }
</script>
<main class="grow mt-15 p-2.5">
    <div class="flex flex-col flex-wrap gap-2 fixed top-18 z-10 p-2.5 w-max bg-white/90 rounded-xl">
        <div>現在 <span class="font-bold">{cardDataShow.length}</span> 枚のカードを表示しています</div>
        <button
            class="flex items-center justify-center px-2 w-max bg-white border-1 rounded-full"
            onclick={() => {
                isShowFront = !isShowFront;
            }}
        ><span class="mdi--counterclockwise-arrows text-xl"></span>裏表切り替え</button>
    </div>
    <div class="mt-20 grid grid-cols-1 md:grid-cols-2">
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
                        {#each cardCategoryList as url, index}
                            <div>
                                <button
                                    class={{
                                        "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
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
                                        cardDataShow = filter();
                                    }}
                                >{toUrlString(url.url)} <span class="text-gray-400">({selectedCategoryNum[index]}/{url.categories.length})</span></button>
                                <button
                                    aria-label="カテゴリー開閉"
                                    value="{index}"
                                    class={{
                                        "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true
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
                                                    "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
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
                                                    cardDataShow = filter();
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
                        "bg-[#ffff00]": filterSets.chance.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterChance = !isOpenFilterChance;
                    }}
                >{isOpenFilterChance ? "▲" : "▼"} チャンスマーク有無選択</button>
                {#if isOpenFilterChance}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each [{str: "あり", tf: true}, {str: "なし", tf: false}] as chance}
                            <button
                                class={{
                                    "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.chance.has(chance.tf)
                                }}
                                onclick={() => {
                                    filterSets.chance.has(chance.tf) ? filterSets.chance.delete(chance.tf) : filterSets.chance.add(chance.tf);
                                    cardDataShow = filter();
                                }}
                            >{chance.str}</button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div>
                <button
                    class={{
                        "p-1": true,
                        "bg-[#ffff00]": filterSets.buzzTypes.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterBuzzType = !isOpenFilterBuzzType;
                    }}
                >{isOpenFilterBuzzType ? "▲" : "▼"} バズリウムタイプ選択</button>
                {#if isOpenFilterBuzzType}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each buzzTypeList as buzzType}
                            <button
                                class={{
                                    "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.buzzTypes.has(buzzType)
                                }}
                                onclick={() => {
                                    filterSets.buzzTypes.has(buzzType) ? filterSets.buzzTypes.delete(buzzType) : filterSets.buzzTypes.add(buzzType);
                                    cardDataShow = filter();
                                }}
                            >{buzzType}</button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div>
                <button
                    class={{
                        "p-1": true,
                        "bg-[#ffff00]": filterSets.types.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterType = !isOpenFilterType;
                    }}
                >{isOpenFilterType ? "▲" : "▼"} タイプ選択</button>
                {#if isOpenFilterType}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each ["ダンス", "うた", "ファッション"] as type}
                            <button
                                class={{
                                    "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.types.has(type)
                                }}
                                onclick={() => {
                                    filterSets.types.has(type) ? filterSets.types.delete(type) : filterSets.types.add(type);
                                    cardDataShow = filter();
                                }}
                            >{type}</button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div>
                <button
                    class={{
                        "p-1": true,
                        "bg-[#ffff00]": filterSets.characters.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterCharacter = !isOpenFilterCharacter;
                    }}
                >{isOpenFilterCharacter ? "▲" : "▼"} キャラクター選択</button>
                {#if isOpenFilterCharacter}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each characterList as character}
                            <button
                                class={{
                                    "m-1 px-2 py-1 h-max border-3 border-[#fe9bf2] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.characters.has(character)
                                }}
                                onclick={() => {
                                    filterSets.characters.has(character) ? filterSets.characters.delete(character) : filterSets.characters.add(character);
                                    cardDataShow = filter();
                                }}
                            >{character}</button>
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
                                    "m-1 px-2 py-1 w-24 border-3 border-[#fe9bf2] rounded-full bg-white": true,
                                    "!bg-[#ffff00]": filterSets.brands.has(brand)
                                }}
                                onclick={() => {
                                    filterSets.brands.has(brand) ? filterSets.brands.delete(brand) : filterSets.brands.add(brand);
                                    cardDataShow = filter();
                                }}
                            ><img src="{base}/img/brand/{brand}.webp" alt="{brand}" title="{brand}" class="w-full h-10 object-cover"></button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div>
                <button
                    class={{
                        "p-1": true,
                        "bg-[#ffff00]": filterSets.musics.size > 0
                    }}
                    onclick={() => {
                        isOpenFilterMusic = !isOpenFilterMusic;
                    }}
                >{isOpenFilterMusic ? "▲" : "▼"} 遊べる曲選択</button>
                {#if isOpenFilterMusic}
                    <div class="flex flex-wrap justify-start content-start">
                        {#each musicData as music}
                        {@const musicName = music.musicName}
                        {@const jacketId = music.jacketId}
                            <button
                                title="{musicName}"
                                class={{
                                    "m-1 p-0.5 w-24 border-3 border-[#fe9bf2] bg-white opacity-70": true,
                                    "!bg-[#ffff00] opacity-100": filterSets.musics.has(musicName)
                                }}
                                onclick={() => {
                                    filterSets.musics.has(musicName) ? filterSets.musics.delete(musicName) : filterSets.musics.add(musicName);
                                    cardDataShow = filter();
                                }}
                                ><img src="{base}/img/jacket/jacket_{jacketId}.webp" alt="{musicName}" class="p-1 aspect-square"></button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div id="list" class="mt-2 grid grid-cols-2 md:grid-cols-4 items-start">
        {#each cardDataShow as card (card.id)}
        {@const jacketId = musicData.find(({musicName}) => musicName == card.music)?.jacketId}
            <div
                class={{
                    "relative overflow-hidden m-1.5 p-2.5 border-3 border-[#ccc] rounded-2xl bg-white text-center": true,
                    "!border-[#ed86a7]": card.type === "ダンス",
                    "!border-[#68caf2]": card.type === "うた",
                    "!border-[#ffe467]": card.type === "ファッション"
                }}
            >
                <div
                    class={{
                        "inline-block absolute top-1 -left-4 p-1.5 w-15 bg-[#ccc] -rotate-45": true,
                        "!bg-[#ed86a7]": card.type === "ダンス",
                        "!bg-[#68caf2]": card.type === "うた",
                        "!bg-[#ffe467]": card.type === "ファッション"
                    }}
                ></div>
                <div
                    class={{
                        "inline-block absolute bottom-1 -right-4 p-1.5 w-15 bg-[#ccc] -rotate-45": true,
                        "!bg-[#ed86a7]": card.type === "ダンス",
                        "!bg-[#68caf2]": card.type === "うた",
                        "!bg-[#ffe467]": card.type === "ファッション"
                    }}
                ></div>
                <div class="flex">
                    <div class="grow pl-2.5 text-xs text-left">{card.idSP === null ? card.id : card.idSP}
                        {#if card.idSP !== null}
                            <br><span class=" text-[#aaa]">({card.id})</span>
                        {/if}
                    </div>
                    <div class="max-w-1/2"><img src="{base}/img/brand/{card.brandName}.webp" alt="{card.brandName}" title="{card.brandName}" class="w-16 max-w-full h-8 object-cover"></div>
                </div>
                <div class="text-xl">{card.character}</div>
                <div class="text-xl">{card.cardName}</div>
                <div class="text-left">{toUrlString(card.url)} / {card.category}</div>
                <div class="grid grid-cols-2 pt-2">
                    <div><img src="{base}/img/card/{card.id}_{isShowFront ? "O" : "U"}_150.webp" alt="" class="size-full object-contain object-top p-1"></div>
                    <div>
                        <div class="relative">
                            <img src="{base}/img/jacket/jacket_{jacketId}.webp" alt="{card.music}" title="{card.music}" class="p-1 w-full aspect-square">
                            <span class="absolute top-1 left-1 p-0.5 text-xs bg-white/70">遊べる曲</span>
                        </div>
                        <div class="overflow-hidden m-1 border-1 border-[#ccc] rounded-2xl">
                            <button
                                aria-label="所持数+1" class="flex items-center justify-center h-6 w-full bg-[#eee]"
                                onclick={() => {
                                    if (card.id in cardInventoryShow) {
                                        cardInventoryShow[card.id]++;
                                    } else {
                                        cardInventoryShow[card.id] = 1;
                                    }
                                    cardInventoryStore.set(cardInventoryShow);
                                }}
                            ><span class="mdi--plus"></span></button>
                            <input
                                type="text" class="h-6 w-full text-center"
                                bind:value={cardInventoryShow[card.id]}
                                onchange={() => {
                                    if (cardInventoryShow[card.id] <= 0) {
                                        delete cardInventoryShow[card.id];
                                    }
                                    cardInventoryStore.set(cardInventoryShow);
                                }}
                            >
                            <button
                                aria-label="所持数-1" class="flex items-center justify-center h-6 w-full bg-[#eee]"
                                onclick={() => {
                                    if (card.id in cardInventoryShow) {
                                        cardInventoryShow[card.id]--;
                                    } else {
                                        cardInventoryShow[card.id] = -1;
                                    }
                                    if (cardInventoryShow[card.id] <= 0) {
                                        delete cardInventoryShow[card.id];
                                    }
                                    cardInventoryStore.set(cardInventoryShow);
                                }}
                            ><span class="mdi--minus"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>
