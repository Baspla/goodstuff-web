<script lang="ts">
	import { page } from "$app/state";
	import { fetchApi } from "$lib/fetch";
	import RecommendationDetails from "$lib/components/RecommendationDetails.svelte";
	import { getPlausibleProps, plausible } from "$lib/plausible";

	let id = $derived(page.url.searchParams.get("id"));
	let promise: Promise<any> = $derived(fetchApi(`recommendations/${id}`));
	plausible("recommendation-view", { props: { recommendation_id: id, ...getPlausibleProps() } });
</script>

{#await promise}
	<RecommendationDetails recommendation={null} />
{:then response}
	<RecommendationDetails recommendation={response.recommendation} />
{:catch error}
	<p>Error loading post</p>
	<p>{error}</p>
{/await}
