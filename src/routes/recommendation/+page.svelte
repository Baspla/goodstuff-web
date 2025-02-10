<script lang="ts">
	import { page } from "$app/state";
	import { fetchApi } from "$lib/fetch";
	import RecommendationPreview from "$lib/components/RecommendationPreview.svelte";

	let id = page.url.searchParams.get("id");
	let promise: Promise<any> = $state(fetchApi(`recommendations/${id}`));
</script>

<h1 class="text-2xl">Post</h1>
{#await promise}
	<p>Loading</p>
{:then response}
	<RecommendationPreview recommendation={response.recommendation} />
{:catch error}
	<p>Error loading post</p>
	<p>{error}</p>
{/await}
