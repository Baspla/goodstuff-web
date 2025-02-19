<script lang="ts">
	import { env } from "$lib/scripts/env.svelte.js";

	window.location.assign(env.API_BASE + "/docs");
</script>

<h1 class="text-2xl">Du wirst zu den Docs weitergeleitet...</h1>
