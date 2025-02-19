<script lang="ts">
	import { link } from "$lib/scripts/link.svelte";

	let { recommendation } = $props();

	function handleClick() {
		if (recommendation?.url) {
			link.openLink(recommendation.url);
		}
	}
</script>

<div
	class="w-full text-lg font-light transition-colors duration-200 hover:text-indigo-900 dark:text-indigo-200 hover:dark:text-indigo-100"
>
	{#if recommendation?.url}
		<button
			onclick={() => handleClick()}
			class="inline-block text-left w-full cursor-pointer overflow-hidden text-nowrap overflow-ellipsis"
		>{recommendation?.url}</button
		>
	{:else}
		<p>&nbsp;</p>
	{/if}
</div>
