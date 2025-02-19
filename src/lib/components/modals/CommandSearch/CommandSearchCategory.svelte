<script lang="ts">
	import SearchLink from "$lib/components/modals/CommandSearch/CommandSearchLink.svelte";

	let {
		category,
		entries,
		more,
		dialog
	}: {
		category: { title: string; url: string };
		entries: { title: string; url: string }[];
		more: string;
		dialog?: HTMLDialogElement;
	} = $props();
</script>

{#if entries.length > 0}
	<h2 class="mt-4 text-xl dark:text-indigo-300 text-indigo-200 font-semibold">
		<SearchLink dialog={dialog} href={category.url}>{category.title}</SearchLink>
	</h2>
	<div class="mx-2 mt-2 flex flex-col gap-2 text-neutral-200 dark:text-white">
		{#each entries as entry}
			<span>
				<SearchLink dialog={dialog} href={entry.url}>{entry.title}</SearchLink>
			</span>
		{/each}
		{#if more}
			<span class="text-neutral-300 drop-shadow-xl shadow-black dark:text-neutral-400">
				<SearchLink dialog={dialog} href={more}>Weitere Ergebnisse ...</SearchLink>
			</span>
		{/if}
	</div>
{/if}
