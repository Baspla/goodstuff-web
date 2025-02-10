<script lang="ts">
	let {
		category,
		entries,
		more
	}: {
		category: { title: string; url: string };
		entries: { title: string; url: string }[];
		more: boolean;
	} = $props();
</script>

{#if entries.length > 0}
	<h2 class="mt-4 text-lg text-neutral-400"><a href={category.url}>{category.title}</a></h2>
	<div class="mx-2 mt-2 flex flex-col gap-2">
		{#each entries as entry}
			<a class="text-sm" href={entry.url}>{entry.title}</a>
		{/each}
		{#if more}
			<a class="text-sm text-neutral-400" href={category.url}>Weitere Ergebnisse ...</a>
		{/if}
	</div>
{/if}
