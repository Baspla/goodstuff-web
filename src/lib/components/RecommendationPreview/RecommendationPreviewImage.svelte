<script lang="ts">
	import { getHashGradient } from "$lib/scripts/utils";

	let { recommendation } = $props();
	let brokenImage = $state("");
</script>

{#if recommendation?.imageUrl}
	<a href="/recommendation?id={recommendation?.id}">
		<img
			class="aspect-auto h-64 w-full rounded-lg bg-neutral-700/30 object-cover"
			src={recommendation?.imageUrl}
			alt={"Bild zu " + recommendation?.title}
			onerror={() => {
				brokenImage = recommendation?.imageUrl;
				recommendation.imageUrl = null;
			}}
		/>
	</a>
{:else}
	<a
		href="/recommendation?id={recommendation?.id}"
		class="h-64 w-full rounded-lg p-4 font-semibold"
		style={getHashGradient(recommendation?.id)}
		title={brokenImage}
	>
		{#if recommendation?.tldr}
			<p class="line-clamp-9 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{recommendation?.tldr}</p>
		{/if}
	</a>
{/if}
