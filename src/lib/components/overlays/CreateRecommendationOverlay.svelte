<script>
    import Overlay from "$lib/components/overlays/Overlay.svelte";
    import {fetchApi, postApi} from "$lib/fetch";

    let {visible = $bindable()} = $props();

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
        }).then((response) => {
            console.log(response);
            visible = false;
        }).catch((error) => {
            alert("Fehler beim Erstellen der Empfehlung: " + error);
        });
    }

    function fetchPageData() {
        fetchApi("util/urlPreview", {url: url}).then((response) => {
            console.log(response);
            if (title === "")
                title = response.preview?.title;
            if (image === "")
                image = response.preview?.imageUrl;
            if (tldr === "")
                tldr = response.preview?.description;
        });
    }
</script>

<Overlay bind:visible={visible}>
    <div class="absolute left-1/2 transform -translate-x-1/2 rounded-lg h-full w-[90vw] max-w-[1000px]">
        <div class="mt-[10vh]">
            <div class="relative">
                <h1 class="text-2xl mb-2">Empfehlung erstellen</h1>
                <!-- title, tldr, url, image, tags textarea with label -->
                <div>
                    <label for="url" class="block text-sm font-medium text-neutral-100">Link</label>
                    <div class="flex flex-row mt-1 border border-neutral-800 rounded-lg overflow-hidden">
                        <input type="text" id="url" name="url"
                               class="block w-full px-4 py-2 rounded-s-lg bg-neutral-900"
                               placeholder="https://example.com" bind:value={url}>
                        <button class="bg-neutral-900 text-neutral-100 px-4 py-2 rounded-e-lg whitespace-nowrap"
                                onclick={fetchPageData}>Website-Daten laden
                        </button>
                    </div>
                </div>
                <div class="flex flex-row gap-4 mt-2">
                    <div class="flex flex-col gap-2 w-1/2">
                        <div>
                            <label for="title" class="block text-sm font-medium text-neutral-100">Titel</label>
                            <input type="text" id="title" name="title"
                                   class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2"
                                   placeholder="Ihr werdet nicht glauben was es hier gibt" bind:value={title}>
                        </div>

                        <div>
                            <label for="image" class="block text-sm font-medium text-neutral-100">Bild-Link</label>
                            <input type="text" id="image" name="image"
                                   class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2"
                                   placeholder="https://example.com/image.jpg" bind:value={image}>
                            {#if image}
                                <img src={image} alt="" class="mt-2"/>
                            {/if}
                        </div>
                        <div class="relative">
                            <button class="mt-4 bg-neutral-900 text-neutral-100 px-4 py-2 rounded-lg"
                                    onclick={handleClick}>
                                Erstellen
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-1/2">
                        <div>
                            <label for="tags" class="block text-sm font-medium text-neutral-100">Tags</label>
                            <input type="text" id="tags" name="tags"
                                   class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2"
                                   placeholder="Hier kommt noch ein funktionierender Tag-Picker" bind:value={tags}>
                        </div>
                        <div>
                            <label for="tldr" class="block text-sm font-medium text-neutral-100">TL;DR</label>
                            <textarea id="tldr" name="tldr"
                                      class="mt-1 block w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 max-h-32 min-h-11"
                                      placeholder="Eine knappe Beschreibung" bind:value={tldr}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Overlay>