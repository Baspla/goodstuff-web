<script lang="ts">
	import { fetchApi } from "$lib/scripts/fetch";

	let promise: Promise<any> = $state(fetchApi(`finds`));
</script>

<h1 class="text-2xl">Liste aller Posts</h1>

{#await promise}
	<p>Loading</p>
{:then response}
	{#each response?.finds as find}
		<div class="ms-4 mb-4">
			<h1>{find?.title}</h1>
			<p>{find?.createdAt}</p>
			<p>{find?.tldr}</p>
			<a href={find?.url}>{find?.url}</a>
			<p>Von: {find?.user?.username}</p>
		</div>
	{/each}
{:catch error}
	<p>Error loading post</p>
	<p>{error}</p>
{/await}
