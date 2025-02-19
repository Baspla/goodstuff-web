<script lang="ts">
	import { fetchApi, postApi } from "$lib/scripts/fetch";

	let title = $state("");
	let url = $state("");
	let image = $state("");
	let tags = $state("");
	let tldr = $state("");

	let { showModal = $bindable() } = $props();
	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (showModal) {
			dialog?.showModal();
		}
	});

	function handleClick() {
		if (title === "") {
			alert("Bitte fülle den Titel aus");
			return;
		}

		console.log("Posting recommendation", title, url, image, tags, tldr);

		postApi("recommendations", {
			title: title,
			url: url,
			imageUrl: image,
			tags: tags,
			tldr: tldr
		})
			.then((response) => {
				console.log(response);
				dialog?.close();
				//reload page
				window.location.reload();
			})
			.catch((error) => {
				alert("Fehler beim Erstellen der Empfehlung: " + error);
			});
	}

	function fetchPageData() {
		fetchApi("util/urlPreview", { url: url })
			.then((response) => {
				console.log(response);
				if (title === "") title = response.preview?.title;
				if (image === "") image = response.preview?.imageUrl;
				if (tldr === "") tldr = response.preview?.description;
			})
			.catch((error) => {
				alert("Fehler beim Laden der Website-Daten: " + error);
			});
	}
</script>

<button
	class="cursor-pointer rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700"
	onclick={() => (showModal = true)}
>
	Neue Empfehlung erstellen
</button>
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="modal modal-bottom sm:modal-middle"
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="modal-box sm:max-w-full sm:w-5/6 flex gap-2 flex-col">
		<h2 class="text-2xl font-semibold mb-2">Neue Empfehlung erstellen</h2>
		<div>
			<label for="title" class="block text-sm font-medium text-neutral-100">Titel</label>
			<input
				type="text"
				id="title"
				name="title"
				class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-2"
				placeholder="Ihr werdet nicht glauben was es hier gibt"
				bind:value={title}
			/>
		</div>
		<div>
			<label for="url" class="block text-sm font-medium text-neutral-100">Link</label>
			<div class="mt-1 flex flex-row rounded-lg border border-neutral-800">
				<input
					type="text"
					id="url"
					name="url"
					class="block w-full rounded-s-lg bg-neutral-100 dark:bg-neutral-900 px-4 py-2"
					placeholder="https://example.com"
					bind:value={url}
				/>
				<button
					class="rounded-e-lg px-4 py-2 whitespace-nowrap text-black dark:text-neutral-100 cursor-pointer bg-neutral-200 dark:bg-neutral-900"
					onclick={fetchPageData}
				>Website-Daten laden
				</button>
			</div>
		</div>
		<div class="mt-2 flex flex-row gap-4">
			<div class="flex w-1/2 flex-col gap-2">
				<div>
					<label for="image" class="block text-sm font-medium text-neutral-100">Bild-Link</label
					>
					<input
						type="text"
						id="image"
						name="image"
						class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-2"
						placeholder="https://example.com/image.jpg"
						bind:value={image}
					/>
					{#if image}
						<img src={image} alt="" class="mt-2" />
					{/if}
				</div>
			</div>
			<div class="flex w-1/2 flex-col gap-2">
				<div>
					<label for="tags" class="block text-sm font-medium text-neutral-100">Tags</label>
					<input
						type="text"
						id="tags"
						name="tags"
						class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-2"
						placeholder="Hier kommt noch ein funktionierender Tag-Picker"
						bind:value={tags}
					/>
				</div>
				<div>
					<label for="tldr" class="block text-sm font-medium text-neutral-100">TL;DR</label>
					<textarea
						id="tldr"
						name="tldr"
						class="mt-1 block max-h-32 min-h-11 w-full rounded-lg border border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 py-2"
						placeholder="Eine knappe Beschreibung"
						bind:value={tldr}
					></textarea>
				</div>
			</div>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in a form, it will close the modal -->
				<button class="cursor-pointer rounded-md bg-neutral-300 px-2 py-1 dark:bg-neutral-700">Abbrechen</button>
				<button class="cursor-pointer rounded-md bg-green-300 px-2 py-1 dark:bg-green-700"
								onclick={(event) => {
						handleClick();
						event.preventDefault();
					}}
				>Erstellen
				</button>
			</form>
		</div>
	</div>
</dialog>
