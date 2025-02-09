<script>
    let name = $state("Tsumugi");
    let show = $state(true);
    let array = ["Sakura", "Tamaki", "Airi", "Rinrin"];
    let num = $state(719);
    let num2 = $derived(num * 2)
</script>
<div>{name}</div>
<button class="border-2 border-pink-600 p-2 bg-yellow-200 text-blue-700" onclick="{()=>{
    name = "Himari";
    show = !show;
}}">mugi</button>
{#if show}
    <div>Mitsuki</div>
{/if}
{#each array as chara}
    <div>{chara}</div>
{/each}
