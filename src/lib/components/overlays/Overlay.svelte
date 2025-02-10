<script lang="ts">

	let { children, visible = $bindable() } = $props();

	$effect(() => {
		if (visible) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	});

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

<div
	class="bg-opacity-60 fixed inset-0 z-50 bg-black backdrop-blur-lg {visible ? '' : 'hidden'}"
	onclick={(event) => event.target === event.currentTarget && closeOverlay()}
	aria-hidden={!visible}
>
	{@render children()}
</div>
