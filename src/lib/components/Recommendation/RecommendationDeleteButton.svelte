<script>
	import { deleteApi } from "$lib/scripts/fetch.ts";

	let { recommendation } = $props();
</script>

<button
	class="cursor-pointer rounded-lg bg-red-500 dark:bg-red-800 dark:saturate-50 px-4 py-2 text-white"
	onclick={async () => {
		deleteApi(`/recommendations/${recommendation.id}`)
			.then(() => {
				window.location.href = "/recommendations";
			})
			.catch((e) => {
				alert("Fehler beim Löschen: " + e);
			});
	}}
>
	Löschen
</button>