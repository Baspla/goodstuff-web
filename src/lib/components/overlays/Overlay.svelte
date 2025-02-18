<script lang="ts">
	import { fade } from "svelte/transition";

	let { children, visible = $bindable() } = $props();

	function closeOverlay() {
		visible = false;
	}
</script>

<svelte:document
	onkeydown={(event) => {
		if (event.key === "Escape" && visible) {
			closeOverlay();
		}
	}}
/>

{#if visible}
	<div
		class="fixed inset-0 z-50 bg-black/70 dark:bg-black/90 backdrop-blur-lg"
		aria-modal="true"
		transition:fade={{ duration: 50 }}
		onclick={(event) => event.target === event.currentTarget && closeOverlay()}
		aria-hidden={!visible}
	>
		{@render children()}
	</div>
{/if}
