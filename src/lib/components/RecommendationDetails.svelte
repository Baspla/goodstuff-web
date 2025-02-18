<script lang="ts">
	import Time from "svelte-time";
	import Avatar from "$lib/components/Avatar.svelte";
	import { getCurrentUser } from "$lib/auth.svelte";
	import RecommendationUrl from "$lib/components/RecommendationURL.svelte";
	import RecommendationDeleteButton from "$lib/components/RecommendationDeleteButton.svelte";
	import RecommendationEditButton from "$lib/components/RecommendationEditButton.svelte";
	import Skeleton from "$lib/components/Skeleton.svelte";

	let { recommendation } = $props();
</script>

<div class="mx-0 flex flex-col items-start gap-2 md:mx-[15vw] lg:mx-[20vw] xl:mx-[25vw]"
>
	{#if recommendation === null}
		<div class="w-full">
			<Skeleton tw_class="mb-2 h-8 w-2/3"></Skeleton>
		</div>
		<div class="flex gap-2 mb-2">
			<div class="size-10 shrink-0 rounded-full overflow-hidden">
				<Skeleton tw_class="h-10 w-10"></Skeleton>
			</div>
			<div class="flex flex-col justify-between">
				<Skeleton tw_class="h-4 w-20 "></Skeleton>
				<Skeleton tw_class="h-4 w-10 "></Skeleton>
			</div>
		</div>
		<div class="w-full">
			<Skeleton tw_class="mb-2 h-4 w-full"></Skeleton>
			<Skeleton tw_class="mb-2 h-4 w-5/6"></Skeleton>
			<Skeleton tw_class="mb-2 h-4 w-full"></Skeleton>
			<Skeleton tw_class="mb-2 h-4 w-full"></Skeleton>
			<Skeleton tw_class="mb-2 h-4 w-2/3"></Skeleton>
		</div>
		<div class="w-full">
			<Skeleton tw_class="h-[30vh] w-2/5 rounded-lg "></Skeleton>
		</div>

	{:else}
		<a
			class="text-2xl font-semibold text-balance md:text-3xl lg:text-4xl"
			href="/recommendation?id={recommendation?.id}"
		>
			<h3 class="line-clamp-2 text-ellipsis hyphens-auto" lang="de">{recommendation?.title}</h3>
		</a>
		<div class="flex shrink-0 items-center gap-2">
			<div class="size-10 shrink-0">
				<Avatar user={recommendation?.user} />
			</div>
			<div class="flex flex-col">
				<a href="/user?id={recommendation?.user?.id}" class="font-semibold">
					{recommendation?.user?.username}
				</a>
				<Time timestamp={recommendation?.createdAt} relative />
			</div>
		</div>
		{#if recommendation?.tldr}
			<p>{recommendation?.tldr}</p>
		{:else}
			<p class="text-wrap">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi dignissimos ducimus cum
				asperiores unde nostrum dolor amet sunt qui nemo hic quia suscipit omnis in, vero magnam
				recusandae architecto.
			</p>
		{/if}

		<RecommendationUrl {recommendation} />

		{#if recommendation?.recommendationsToTags.length > 0}
			<div>
				{#each recommendation?.recommendationsToTags as rel}
					<span class="bg-neutral-500"><a href="/tag?id={rel.tag.id}">{rel.tag.name}</a></span>
				{/each}
			</div>
		{/if}

		{#if recommendation?.imageUrl}
			<div class="w-full">
				<img
					class="aspect-auto max-h-[50vh] rounded-lg bg-neutral-700/30"
					src={recommendation?.imageUrl}
					alt={"[Bild zu " + recommendation?.title + "]"}
					onerror={() => (recommendation.imageUrl = null)}
				/>
			</div>
		{/if}
		{#if recommendation?.user?.id === getCurrentUser()?.id}
			<div class="flex w-full justify-start gap-2">
				<RecommendationDeleteButton {recommendation} />
				<RecommendationEditButton {recommendation} />
			</div>
		{/if}
	{/if}


</div>
