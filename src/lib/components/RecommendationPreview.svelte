<script lang="ts">
	import { getHashGradient, protectUrl } from "$lib/utils";
	import Time from "svelte-time";

	let { recommendation } = $props();
</script>

<div class="flex flex-col gap-2 rounded-xl bg-neutral-700 p-2">
	<div class="inline-flex items-center justify-between gap-2">
		<a class="text-2xl font-semibold" href="/recommendation?id={recommendation?.id}">
			<h3>{recommendation?.title}</h3>
		</a>
		<div class="inline-flex items-center gap-2 text-right">
			<div class="flex flex-col">
				<a href="/user?id={recommendation?.user?.id}" class="font-semibold">
					{recommendation?.user?.username}
				</a>
				<Time timestamp={recommendation.createdAt} relative />
			</div>
			{#if recommendation?.user?.avatarUrl}
				<img src={recommendation?.user?.avatarUrl} alt="" />
			{:else}
				<img
					src="https://avatars.githubusercontent.com/u/1024025?v=4"
					alt=""
					class="aspect-square size-10 rounded-full"
				/>
			{/if}
		</div>
	</div>

	{#if recommendation?.imageUrl}
		<img
			class="h-52 rounded-lg object-cover"
			src={recommendation?.imageUrl}
			alt={"[Bild zu " + recommendation?.title + "]"}
			onerror={() => (recommendation.imageUrl = null)}
		/>
	{:else}
		<div class="h-52 w-full rounded-lg" style={getHashGradient(recommendation?.id)}></div>
	{/if}
	{#if recommendation?.tldr}
		<p>Tldr: {recommendation?.tldr}</p>
	{/if}
	{#if recommendation?.url}
		<a href={protectUrl(recommendation?.url)}>{recommendation?.url}</a>
	{/if}
	<div>
		Tags:
		{#each recommendation?.recommendationsToTags as rel}
			<span class="bg-neutral-500"><a href="/tag?id={rel.tag.id}">{rel.tag.name}</a></span>
		{/each}
	</div>
</div>
