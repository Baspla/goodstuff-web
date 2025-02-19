<script lang="ts">
	let { showModal = $bindable() } = $props();
</script>

<button
	class="flex cursor-pointer flex-row items-center gap-2 rounded-full bg-neutral-300 py-1 ps-2 pe-4 text-sm text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
	onclick={() => {
		showModal = true;
	}}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-3"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
		/>
	</svg>
	<span>
		<kbd class="kbd kbd-sm">Strg</kbd>
		+
		<kbd class="kbd kbd-sm">K</kbd></span
	>
</button>
