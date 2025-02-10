<script lang="ts">
	import { clearJwtToken } from "$lib/auth.svelte";
	import { goto } from "$app/navigation";

	clearJwtToken();

	// redirect to the home page
	goto("/");
</script>

<h1 class="text-2xl">Du wirst abgemeldet...</h1>
