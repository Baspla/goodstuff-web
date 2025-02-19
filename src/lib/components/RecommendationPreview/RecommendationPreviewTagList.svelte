<script lang="ts">
	import { getHashColor } from "$lib/scripts/utils";

	let { recommendation } = $props();
</script>

<div class="flex flex-row flex-wrap gap-2 mt-2">
	{#each recommendation?.recommendationsToTags as rel}
		<a href="/tag?id={rel.tag.id}" style="{getHashColor(rel.tag.id)}"
			 class="px-1 py-0.5 rounded-sm text-nowrap">{rel.tag.name}</a>
	{/each}
</div>