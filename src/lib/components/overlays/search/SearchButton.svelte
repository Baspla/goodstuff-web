<script lang="ts">
	import { searchState } from "$lib/overlays.svelte";
</script>

<button
	class="flex flex-row items-center ps-2 pe-4 gap-2 text-sm py-1 cursor-pointer bg-neutral-300 dark:bg-neutral-700 rounded-full text-neutral-500 dark:text-neutral-400"
	onclick={() => (searchState.visible = true)}>
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
			 class="size-3">
		<path stroke-linecap="round" stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
	</svg>
	Strg+K
</button>