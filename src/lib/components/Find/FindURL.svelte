<script lang="ts">
	import { link } from "$lib/scripts/link.svelte";

	let { find } = $props();

	function handleClick() {
		if (find?.url) {
			link.openLink(find.url);
		}
	}
</script>

<div
	class="w-full text-lg font-light transition-colors duration-200 hover:text-indigo-900 dark:text-indigo-200 hover:dark:text-indigo-100"
>
	{#if find?.url}
		<button
			onclick={() => handleClick()}
			class="inline-block text-left w-full cursor-pointer overflow-hidden text-nowrap overflow-ellipsis"
		>{find?.url}</button
		>
	{:else}
		<p>&nbsp;</p>
	{/if}
</div>
