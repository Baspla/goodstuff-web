<script lang="ts">
	import { page } from "$app/state";
	import { getPlausibleProps, plausible } from "$lib/plausible";
	import { onMount } from "svelte";

	onMount(() => {
		plausible("404", { props: { path: document.location.pathname, ...getPlausibleProps() } });
	});
</script>

<div class="m-3">
	<h1 class="text-2xl">Error</h1>
	<p class="text-lg">{page.error?.message}</p>
</div>