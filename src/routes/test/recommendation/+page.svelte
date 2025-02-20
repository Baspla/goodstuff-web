<script lang="ts">
	import { page } from "$app/state";
	import { fetchApi } from "$lib/scripts/fetch";

	let id = page.url.searchParams.get("id");
	let promise: Promise<any> = $state(fetchApi(`finds/${id}`));
</script>

<h1 class="text-2xl">Post</h1>
{#await promise}
	<p>Loading</p>
{:then response}
	<p>Loaded</p>
	<div class="ms-4 mb-4">
		<h1>{response.find.title}</h1>
		<p>{response.find.createdAt}</p>
		<p>{response.find.tldr}</p>
		<a href={response.find.url}>{response.find.url}</a>
	</div>
{:catch error}
	<p>Error loading post</p>
	<p>{error}</p>
{/await}
