<script lang="ts">
	import { link } from "$lib/scripts/link.svelte";

	let dialog: HTMLDialogElement;

	$effect(() => {
		if (link.warningVisible) {
			dialog.showModal();
		}
	});
</script>

<!-- Anmerkung: Dieses Modal ist aus dem alten Overlay System und nutzt noch absolute Positionierung. -->

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="modal modal-bottom sm:modal-top backdrop:bg-black/70 backdrop:backdrop-blur-lg backdrop:dark:bg-black/90"
	onclose={() => (link.warningVisible = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div
		class="absolute left-1/2 h-full w-[90vw] max-w-[1000px] -translate-x-1/2 transform rounded-lg text-white"
	>
		<div class="mt-[10vh]">
			<div class="relative">
				<h1 class="mb-2 text-2xl font-semibold">Link</h1>
				{#if link.url}
					<div class="mb-2">
						<p>Dieser Link führt zu</p>
						<p class="text-lg font-semibold tracking-wide">{link.url}</p>
						<p>Möchtest du zu dieser Seite weitergeleitet werden?</p>
					</div>
					<div class="flex flex-row gap-2">
						<button
							class="cursor-pointer rounded-sm bg-green-500 p-2 px-4"
							onclick={() => {
								if (link.url) {
									window.location.assign(link.url);
								}
							}}
						>
							Ja
						</button>
						<button
							class="cursor-pointer rounded-sm bg-red-500 p-2 px-4"
							onclick={() => (dialog.close())}
						>
							Nein
						</button>
					</div>
				{:else}
					<p>Kein Link angegeben</p>
				{/if}
			</div>
		</div>
	</div>
</dialog>
