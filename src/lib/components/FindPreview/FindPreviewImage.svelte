<script lang="ts">
	import { getHashGradient } from "$lib/scripts/utils";

	let { find } = $props();
	let brokenImage = $state("");
</script>

{#if find?.imageUrl}
	<a href="/find?id={find?.id}">
		<img
			class="aspect-auto h-64 w-full rounded-lg bg-neutral-700/30 object-cover"
			src={find?.imageUrl}
			alt={"Bild zu " + find?.title}
			onerror={() => {
				brokenImage = find?.imageUrl;
				find.imageUrl = null;
			}}
		/>
	</a>
{:else}
	<a
		href="/find?id={find?.id}"
		class="h-64 w-full rounded-lg p-4 font-semibold"
		style={getHashGradient(find?.id)}
		title={brokenImage}
	>
		{#if find?.tldr}
			<p class="line-clamp-9 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{find?.tldr}</p>
		{/if}
	</a>
{/if}
