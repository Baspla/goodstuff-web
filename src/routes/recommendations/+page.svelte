<script lang="ts">
	import { fetchApi } from "$lib/scripts/fetch";
	import RecommendationPreview from "$lib/components/RecommendationPreview/RecommendationPreview.svelte";
	import EndlessScroll from "$lib/components/EndlessScroll.svelte";
	import { flip } from "svelte/animate";
	import Select from "$lib/components/Select.svelte";
	import Option from "$lib/components/Option.svelte";
	import CreateRecommendation from "$lib/components/modals/CreateRecommendation.svelte";

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
	<CreateRecommendation />
	<div class="grow"></div>
	<div id="filters">
		<Select>
			<Option value="tag-game">Spiel</Option>
			<Option value="tag-movie">Film</Option>
			<Option value="tag-book">Buch</Option>
			<Option value="tag-music">Musik</Option>
		</Select>
		<input type="text" placeholder="Suche" />
		<Select>
			<Option value="created_at">Erstellt</Option>
			<Option value="updated_at">Aktualisiert</Option>
			<Option value="title">Titel</Option>
		</Select>
		<Select>
			<Option value="asc">Aufsteigend</Option>
			<Option value="desc">Absteigend</Option>
		</Select>
	</div>
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
	<button class="cursor-pointer rounded-sm bg-neutral-700 px-1 text-neutral-400" onclick={loadMore}>
		Erneut versuchen
	</button>
{/if}
