<script lang="ts">
	import SearchLink from "$lib/components/overlays/search/SearchLink.svelte";

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
	<h2 class="mt-4 text-xl dark:text-indigo-300 text-indigo-200 font-semibold">
		<SearchLink href={category.url}>{category.title}</SearchLink>
	</h2>
	<div class="mx-2 mt-2 flex flex-col gap-2 text-neutral-200 dark:text-white text-base">
		{#each entries as entry}
			<span>
				<SearchLink href={entry.url}>{entry.title}</SearchLink>
			</span>
		{/each}
		{#if more}
			<span class="text-neutral-300 drop-shadow-xl shadow-black dark:text-neutral-400">
				<SearchLink href={category.url}>Weitere Ergebnisse ...</SearchLink>
			</span>
		{/if}
	</div>
{/if}
