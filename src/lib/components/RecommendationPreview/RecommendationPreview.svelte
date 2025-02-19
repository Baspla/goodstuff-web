<script lang="ts">
	import Time from "svelte-time";
	import Avatar from "$lib/components/Avatar.svelte";
	import RecommendationPreviewReviewsButton
		from "$lib/components/RecommendationPreview/RecommendationPreviewReviewsButton.svelte";
	import RecommendationUrl from "$lib/components/Recommendation/RecommendationURL.svelte";
	import RecommendationPreviewTagList from "$lib/components/RecommendationPreview/RecommendationPreviewTagList.svelte";
	import RecommendationPreviewImage from "$lib/components/RecommendationPreview/RecommendationPreviewImage.svelte";
	import RecommendationPreviewTitle from "$lib/components/RecommendationPreview/RecommendationPreviewTitle.svelte";

	let { recommendation } = $props();
	/*onMount(() => {
		recommendation.recommendationsToTags = [
			{ tag: { id: 1, name: "Gaming" } },
			{ tag: { id: 2, name: "Soulslike" } },
			{ tag: { id: 3, name: "Micro-transactions" } },
			{ tag: { id: 4, name: "Free-to-play" } }
		];
	});*/
</script>

<div
	class="flex flex-col gap-2 rounded-lg bg-neutral-700/0"
>
	<div class="inline-flex items-center justify-between gap-2">
		<RecommendationPreviewTitle recommendation={recommendation} />
		<div class="flex shrink-0 items-center gap-2">
			<div class="flex flex-col text-right">
				<a href="/user?id={recommendation?.user?.id}" class="font-semibold">
					{recommendation?.user?.username}
				</a>
				<Time timestamp={recommendation.createdAt} relative />
			</div>
			<div class="shrink-0 size-10">
				<Avatar user={recommendation?.user} />
			</div>
		</div>
	</div>
	<div class="flex h-full flex-col justify-normal">
		<RecommendationPreviewImage recommendation={recommendation} />
		<div class="mt-2 flex flex-row justify-between gap-4">
			<div class="max-w-2/3">
				<RecommendationUrl recommendation={recommendation} />
			</div>
			<RecommendationPreviewReviewsButton recommendation={recommendation} />
		</div>
		<RecommendationPreviewTagList recommendation={recommendation} />
	</div>
</div>
