<script lang="ts">
	import { page } from "$app/state";
	import { fetchApi } from "$lib/fetch";

	let id = page.url.searchParams.get("id");
	let promise: Promise<any> = $state(fetchApi(`recommendations/${id}`));
</script>

<h1 class="text-2xl">Post</h1>
{#await promise}
	<p>Loading</p>
{:then response}
	<p>Loaded</p>
	<div class="ms-4 mb-4">
		<h1>{response.recommendation.title}</h1>
		<p>{response.recommendation.createdAt}</p>
		<p>{response.recommendation.tldr}</p>
		<a href={response.recommendation.url}>{response.recommendation.url}</a>
	</div>
{:catch error}
	<p>Error loading post</p>
	<p>{error}</p>
{/await}
