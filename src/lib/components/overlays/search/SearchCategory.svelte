<script lang="ts">
    let {category, entries,more}: {
        category: { title: string, url: string },
        entries: { title: string, url: string }[],
        more: boolean
    } = $props();
</script>

{#if entries.length > 0}
    <h2 class="text-lg text-neutral-400 mt-4"><a href="{category.url}">{category.title}</a></h2>
    <div class="mx-2 mt-2 gap-2 flex flex-col">
        {#each entries as entry}
            <a class="text-sm" href={entry.url}>{entry.title}</a>
        {/each}
        {#if more}
            <a class="text-sm text-neutral-400" href={category.url}>Weitere Ergebnisse ...</a>
        {/if}
    </div>
{/if}