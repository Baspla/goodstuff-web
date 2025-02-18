<script>
	import Overlay from "$lib/components/overlays/Overlay.svelte";
	import { outgoingLinkState } from "$lib/overlays.svelte";

	$effect(() => {
		if (!outgoingLinkState.visible && outgoingLinkState.visible_before) {
			outgoingLinkState.url = "";
		}
		outgoingLinkState.visible = outgoingLinkState.url !== "";
		outgoingLinkState.visible_before = outgoingLinkState.visible;
	});
</script>

<Overlay bind:visible={outgoingLinkState.visible}>
	<div
		class="absolute left-1/2 h-full w-[90vw] max-w-[1000px] -translate-x-1/2 transform rounded-lg text-white"
	>
		<div class="mt-[10vh]">
			<div class="relative">
				<h1 class="mb-2 text-2xl font-semibold">Link</h1>
				{#if outgoingLinkState.url}
					<div class="mb-2">
						<p>Dieser Link führt zu</p>
						<p class="text-lg font-semibold tracking-wide">{outgoingLinkState.url}</p>
						<p>Möchtest du zu dieser Seite weitergeleitet werden?</p>
					</div>
					<div class="flex flex-row gap-2">
						<button
							class="cursor-pointer rounded-sm bg-green-500 p-2 px-4"
							onclick={() => {
								window.location.assign(outgoingLinkState.url);
							}}
						>
							Ja
						</button>
						<button
							class="cursor-pointer rounded-sm bg-red-500 p-2 px-4"
							onclick={() => (outgoingLinkState.visible = false)}
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
</Overlay>
