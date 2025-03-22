<script lang="ts">
    import { base } from "$app/paths";
    import partsData from "$lib/assets/parts_data.json";
    import partsGetData from "$lib/assets/parts_get.json";
    import { rankListStore } from "$lib/stores";
    import type { RankList } from "$lib/types";

    let isOpenRankSummary = $state(false)

    let rankListShow: RankList = $state({});
    rankListStore.subscribe((value) => {
        rankListShow = value;
    });

    let elementArray: HTMLDivElement[] = $state([]);

    function getPartsData(partsName: string) {
        return partsData.find((element) => element.name == partsName)
    }
</script>
<main class="grow mt-15 p-2.5">
    <h1 class="p-2.5 text-3xl bg-white/70 rounded-xl">入手方法別マイキャラパーツ一覧</h1>
    <div class="p-2.5 mt-2.5 text-2xl bg-white/70 rounded-xl">
        <select
            class="bg-white border-1"
            onchange={(e) => {
                elementArray[e.currentTarget.selectedIndex].scrollIntoView({behavior: "smooth"})
            }}
        >
            {#each elementArray as element, index}
                <option
                    value=""
                >{partsGetData[index].title}</option>
            {/each}
        </select>
        にジャンプ
    </div>
    {#each partsGetData as title, index}
    {@const isDream = (title.title == "ドリーム")}
        <div class="p-2.5 mt-2.5 bg-white/70 rounded-xl">
            <div
                class="text-2xl scroll-mt-19"
                bind:this={elementArray[index]}
            >
                {title.title}
                {#if isDream}
                    <button
                        class="p-1 bg-white border-1 text-base"
                        onclick={() => {isOpenRankSummary = !isOpenRankSummary}}
                    >ランク一覧</button>
                {/if}
            </div>
                {#each title.groups as group}
                    <div>
                        <div class="flex items-end pt-1">
                            <div class="text-xl">・{group.group}</div>
                            {#if isDream && group.dreamId != null}
                                <div class="flex ml-2 h-6 overflow-hidden border-1 border-[#ccc] rounded-xl">
                                    <button
                                        aria-label="ランク-1" class="flex items-center justify-center h-full w-5 bg-[#eee]"
                                        onclick={() => {
                                            if (group.dreamId in rankListShow) {
                                                rankListShow[group.dreamId]--;
                                            } else {
                                                rankListShow[group.dreamId] = -1;
                                            }
                                            if (rankListShow[group.dreamId] <= 0) {
                                                delete rankListShow[group.dreamId];
                                            }
                                            rankListStore.set(rankListShow);
                                        }}
                                    ><span class="mdi--minus"></span></button>
                                    <input
                                        type="text" class="inline-block h-full w-10 text-center bg-white"
                                        bind:value={rankListShow[group.dreamId]}
                                        onchange={() => {
                                            if (rankListShow[group.dreamId] <= 0) {
                                                delete rankListShow[group.dreamId];
                                            }
                                            rankListStore.set(rankListShow);
                                        }}
                                    >
                                    <button
                                        aria-label="ランク+1" class="flex items-center justify-center h-full w-5 bg-[#eee]"
                                        onclick={() => {
                                            if (group.dreamId in rankListShow) {
                                                rankListShow[group.dreamId]++;
                                            } else {
                                                rankListShow[group.dreamId] = 1;
                                            }
                                            rankListStore.set(rankListShow);
                                        }}
                                    ><span class="mdi--plus"></span></button>
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
    {#if isOpenRankSummary}
        <div class="fixed top-0 left-0 p-10 pt-25 w-full h-screen bg-[#aaa]/50">
            <button
                class="fixed top-17 right-2 w-8 h-8 border-2 rounded-full bg-white"
                onclick={() => {isOpenRankSummary = !isOpenRankSummary}}
            >×</button>
            <div class="h-full w-full p-2 bg-white overflow-scroll">
                {#each partsGetData as title}
                {@const isDream = (title.title == "ドリーム")}
                    {#if isDream}
                        {#each title.groups as group}
                            <div class="flex items-end pt-1">
                                <div class="text-xl">・{group.group}</div>
                                {#if isDream && group.dreamId != null}
                                    <div class="flex ml-2 h-6 overflow-hidden border-1 border-[#ccc] rounded-xl">
                                        <button
                                            aria-label="ランク-1" class="flex items-center justify-center h-full w-5 bg-[#eee]"
                                            onclick={() => {
                                                if (group.dreamId in rankListShow) {
                                                    rankListShow[group.dreamId]--;
                                                } else {
                                                    rankListShow[group.dreamId] = -1;
                                                }
                                                if (rankListShow[group.dreamId] <= 0) {
                                                    delete rankListShow[group.dreamId];
                                                }
                                                rankListStore.set(rankListShow);
                                            }}
                                        ><span class="mdi--minus"></span></button>
                                        <input
                                            type="text" class="inline-block h-full w-10 text-center bg-white"
                                            bind:value={rankListShow[group.dreamId]}
                                            onchange={() => {
                                                if (rankListShow[group.dreamId] <= 0) {
                                                    delete rankListShow[group.dreamId];
                                                }
                                                rankListStore.set(rankListShow);
                                            }}
                                        >
                                        <button
                                            aria-label="ランク+1" class="flex items-center justify-center h-full w-5 bg-[#eee]"
                                            onclick={() => {
                                                if (group.dreamId in rankListShow) {
                                                    rankListShow[group.dreamId]++;
                                                } else {
                                                    rankListShow[group.dreamId] = 1;
                                                }
                                                rankListStore.set(rankListShow);
                                            }}
                                        ><span class="mdi--plus"></span></button>
                                    </div>
                                {/if}
                            </div>
                        {/each}
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</main>
