<script lang="ts">
	import { page } from "$app/state";
	import { fetchApi } from "$lib/scripts/fetch";
	import FindDetails from "$lib/components/Find/FindDetails.svelte";
	import { getPlausibleProps, plausible } from "$lib/scripts/plausible";

	let id = $derived(page.url.searchParams.get("id"));
	let promise: Promise<any> = $derived(fetchApi(`finds/${id}`));
	plausible("find-view", { props: { find_id: id, ...getPlausibleProps() } });
</script>

{#await promise}
	<FindDetails find={null} />
{:then response}
	<FindDetails find={response.find} />
{:catch error}
	<p>Error loading post</p>
	<p>{error}</p>
{/await}
