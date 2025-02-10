<script lang="ts">
	let { loadMore } = $props();
	let loading = false;

	loadBlock(); // Initial load

	async function loadBlock() {
		if (loading) return;
		loading = true;
		await loadMore();
		loading = false;
	}

	async function handleScroll() {
		if (
			document.documentElement.scrollHeight -
			document.documentElement.scrollTop -
			document.documentElement.clientHeight <=
			document.documentElement.clientHeight
		) {
			loadBlock();
		}

		if (document.documentElement.scrollTop! > document.documentElement.clientHeight) {
			// Am Ende der Seite
		}
	}
</script>

<svelte:window onscroll={handleScroll} />
