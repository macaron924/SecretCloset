<script lang="ts">
    import { base } from "$app/paths";
    import pmItems from "$lib/assets/pm_item.json";
    import pmVerse from "$lib/assets/pm_verse.json";
</script>
<main class="grow mt-15 p-2.5">
    <div class="flex flex-wrap">
        {#each pmItems as pmItem}
            <div class="m-1 p-1 w-30 bg-white/70 text-center">
                <span>{pmItem.sealId}</span>
                <img
                    src="{base}/img/pm/{pmItem.id}_150.webp"
                    alt="{pmItem.coordinationName}"
                    class={{
                        "w-full aspect-square opacity-100": true,
                        "!opacity-30": !pmVerse.includes(pmItem.sealId)
                    }}>
                <span>{pmItem.coordinationName}</span>
            </div>
        {/each}
    </div>
</main>
