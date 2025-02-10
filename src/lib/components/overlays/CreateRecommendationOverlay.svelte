<script>
	import Overlay from "$lib/components/overlays/Overlay.svelte";
	import { fetchApi, postApi } from "$lib/fetch";

	let { visible = $bindable() } = $props();

	let title = $state("");
	let url = $state("");
	let image = $state("");
	let tags = $state("");
	let tldr = $state("");

	function handleClick() {
		if (title === "") {
			alert("Bitte fülle den Titel aus");
			return;
		}

		postApi("recommendations", {
			title: title,
			url: url,
			imageUrl: image,
			tags: tags,
			tldr: tldr
		})
			.then((response) => {
				console.log(response);
				visible = false;
			})
			.catch((error) => {
				alert("Fehler beim Erstellen der Empfehlung: " + error);
			});
	}

	function fetchPageData() {
		fetchApi("util/urlPreview", { url: url }).then((response) => {
			console.log(response);
			if (title === "") title = response.preview?.title;
			if (image === "") image = response.preview?.imageUrl;
			if (tldr === "") tldr = response.preview?.description;
		});
	}
</script>

<Overlay bind:visible>
	<div
		class="absolute left-1/2 h-full w-[90vw] max-w-[1000px] -translate-x-1/2 transform rounded-lg"
	>
		<div class="mt-[10vh]">
			<div class="relative">
				<h1 class="mb-2 text-2xl">Empfehlung erstellen</h1>
				<!-- title, tldr, url, image, tags textarea with label -->
				<div>
					<label for="url" class="block text-sm font-medium text-neutral-100">Link</label>
					<div class="mt-1 flex flex-row overflow-hidden rounded-lg border border-neutral-800">
						<input
							type="text"
							id="url"
							name="url"
							class="block w-full rounded-s-lg bg-neutral-900 px-4 py-2"
							placeholder="https://example.com"
							bind:value={url}
						/>
						<button
							class="rounded-e-lg bg-neutral-900 px-4 py-2 whitespace-nowrap text-neutral-100"
							onclick={fetchPageData}
						>Website-Daten laden
						</button>
					</div>
				</div>
				<div class="mt-2 flex flex-row gap-4">
					<div class="flex w-1/2 flex-col gap-2">
						<div>
							<label for="title" class="block text-sm font-medium text-neutral-100">Titel</label>
							<input
								type="text"
								id="title"
								name="title"
								class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2"
								placeholder="Ihr werdet nicht glauben was es hier gibt"
								bind:value={title}
							/>
						</div>

						<div>
							<label for="image" class="block text-sm font-medium text-neutral-100">Bild-Link</label
							>
							<input
								type="text"
								id="image"
								name="image"
								class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2"
								placeholder="https://example.com/image.jpg"
								bind:value={image}
							/>
							{#if image}
								<img src={image} alt="" class="mt-2" />
							{/if}
						</div>
						<div class="relative">
							<button
								class="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-neutral-100"
								onclick={handleClick}
							>
								Erstellen
							</button>
						</div>
					</div>
					<div class="flex w-1/2 flex-col gap-2">
						<div>
							<label for="tags" class="block text-sm font-medium text-neutral-100">Tags</label>
							<input
								type="text"
								id="tags"
								name="tags"
								class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2"
								placeholder="Hier kommt noch ein funktionierender Tag-Picker"
								bind:value={tags}
							/>
						</div>
						<div>
							<label for="tldr" class="block text-sm font-medium text-neutral-100">TL;DR</label>
							<textarea
								id="tldr"
								name="tldr"
								class="mt-1 block max-h-32 min-h-11 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2"
								placeholder="Eine knappe Beschreibung"
								bind:value={tldr}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</Overlay>
