<script lang="ts">
	import { goto } from "$app/navigation";
	import { searchState } from "$lib/overlays.svelte";

	let { children, href } = $props();

	function handleClick() {
		if (href) {
			searchState.visible = false;
			goto(href);
		}
	}
</script>

<button class="cursor-pointer"
				onclick={() => handleClick()}
>{@render children()}</button>