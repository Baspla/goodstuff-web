<script lang="ts">
	import { goto } from "$app/navigation";

	let { dialog, children, href } = $props();

	function handleClick() {
		if (href) {
			dialog?.close();
			goto(href);
		}
	}
</script>

<button class="cursor-pointer text-left"
				onclick={() => handleClick()}
>{@render children()}</button>