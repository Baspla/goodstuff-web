<script lang="ts">
	import { fetchApi } from "$lib/fetch";
	import RecommendationPreview from "$lib/components/RecommendationPreview/RecommendationPreview.svelte";
	import EndlessScroll from "$lib/components/EndlessScroll.svelte";
	import { flip } from "svelte/animate";
	import { createRecommendationState } from "$lib/overlays.svelte";

	/* default values for /recommendations endpoint
    page: number = 0,
    limit: number = 20,
    searchterm: string = '',
    sortBy: 'created_at' | 'updated_at' | 'title' = 'created_at',
    sortOrder: 'asc' | 'desc' = 'asc'
     */

	let reachedEnd: boolean = false;
	let error: boolean = $state(false);
	const limit: number = 20;

	async function loadMore() {
		if (reachedEnd) {
			return;
		}
		let page = Math.floor(recommendations.length / limit);
		console.log("loading page:", page);
		try {
			let response = await fetchApi(`recommendations`, {
				page: "" + page,
				limit: "" + limit,
				sortBy: "created_at",
				sortOrder: "desc"
			});
			const newRecommendations = response.recommendations.filter(
				(rec: any) => !recommendations.some((existingRec: any) => existingRec.id === rec.id)
			);
			recommendations = [...recommendations, ...newRecommendations];
			if (response.recommendations.length < limit) {
				reachedEnd = true;
				console.log("reached end of recommendations");
			}
			return response.recommendations.length > 0;
		} catch (err) {
			console.error("Empfehlungen konnten nicht geladen werden:", err);
			error = true;
			return false;
		}
	}
	let recommendations: any = $state([]);
</script>

<EndlessScroll {loadMore} />

<div class="my-4 flex flex-row flex-wrap items-baseline gap-4">
	<h1 class="text-4xl font-semibold">Empfehlungen</h1>
	<button
		class="cursor-pointer rounded-md bg-neutral-300 dark:bg-neutral-700 px-2 py-1"
		onclick={() => (createRecommendationState.visible = true)}
	>
		Neue Empfehlung erstellen
	</button>
</div>

<div class="mb-6 grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
	{#each recommendations as recommendation (recommendation.id)}
		<div animate:flip={{ duration: 100 }}>
			<RecommendationPreview {recommendation} />
		</div>
	{/each}
</div>

{#if error}
	<div class="text-neutral-500">Beim Laden der Empfehlungen ist ein Fehler aufgetreten.</div>
	<button class="cursor-pointer rounded-sm bg-neutral-700 px-1 text-neutral-400" onclick={loadMore}
	>Erneut versuchen
	</button
	>
{/if}
