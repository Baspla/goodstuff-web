<script lang="ts">
	import { fetchApi } from "$lib/scripts/fetch";
	import FindPreview from "$lib/components/FindPreview/FindPreview.svelte";
	import EndlessScroll from "$lib/components/EndlessScroll.svelte";
	import { flip } from "svelte/animate";
	import CreateFind from "$lib/components/modals/CreateFind.svelte";
	import { page } from "$app/state";

	/* default values for /finds endpoint
    page: number = 0,
    limit: number = 20,
    searchterm: string = '',
    sortBy: 'created_at' | 'updated_at' | 'title' = 'created_at',
    sortOrder: 'asc' | 'desc' = 'asc'
     */

	let sortByParam: string = page.url.searchParams.get("sortBy") || "created_at";
	let sortOrderParam = page.url.searchParams.get("sortOrder") || "desc";
	let sortBy: "created_at" | "updated_at" | "title" = $state(sortByParam in ["created_at", "updated_at", "title"] ? sortByParam as "created_at" | "updated_at" | "title" : "created_at");
	let sortOrder: "asc" | "desc" = $state(sortOrderParam in ["asc", "desc"] ? sortOrderParam as "asc" | "desc" : "desc");
	let searchterm: string = $state(page.url.searchParams.get("search") || "");
	let enteredsearchterm: string = $state(page.url.searchParams.get("search") || "");

	let reachedEnd: boolean = false;
	let error: boolean = $state(false);
	const limit: number = 20;


	function changedFilter() {
		page.url.searchParams.set("search", searchterm);
		page.url.searchParams.set("sortBy", sortBy);
		page.url.searchParams.set("sortOrder", sortOrder);

		// overwrite the current url with the new search
		history.pushState({}, "", page.url.toString());
		finds = [];
		reachedEnd = false;
		loadMore();
	}

	async function loadMore() {
		if (reachedEnd) {
			return;
		}
		let page = Math.floor(finds.length / limit);
		console.log("loading page:", page);
		try {
			let response = await fetchApi(`finds`, {
				page: "" + page,
				limit: "" + limit,
				sortBy: sortBy,
				sortOrder: sortOrder,
				searchterm: searchterm
			});
			const newFinds = response.finds.filter(
				(rec: any) => !finds.some((existingRec: any) => existingRec.id === rec.id)
			);
			finds = [...finds, ...newFinds];
			if (response.finds.length < limit) {
				reachedEnd = true;
				console.log("reached end of finds");
			}
			return response.finds.length > 0;
		} catch (err) {
			console.error("Empfehlungen konnten nicht geladen werden:", err);
			error = true;
			return false;
		}
	}

	let finds: any = $state([]);
</script>

<EndlessScroll {loadMore} />

<div class="my-4 flex flex-row flex-wrap items-baseline gap-4">
	<h1 class="text-4xl font-semibold">Funde
		{#if searchterm}
			<span class="text-neutral-500"> "{searchterm}"</span>
		{/if}
	</h1>
	<CreateFind />
	<div class="sm:block hidden grow"></div>
	<input type="text" placeholder="Suche" class="input grow max-w-lg" bind:value={enteredsearchterm} onkeydown={(e) => {
		if (e.key === "Enter") {
			searchterm = enteredsearchterm;
			changedFilter();
		}
	}} />
	<select class="select w-fit" bind:value={sortBy} onchange={changedFilter}>
		<option value="created_at">Erstellt</option>
		<option value="updated_at">Aktualisiert</option>
		<option value="title">Titel</option>
	</select>
	<select class="select w-fit" bind:value={sortOrder} onchange={changedFilter}>
		<option value="asc">Aufsteigend</option>
		<option value="desc">Absteigend</option>
	</select>
</div>

<div class="mb-6 grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
	{#each finds as find (find.id)}
		<div animate:flip={{ duration: 100 }}>
			<FindPreview {find} />
		</div>
	{/each}
</div>

{#if error}
	<div class="text-neutral-500">Beim Laden des Funds ist ein Fehler aufgetreten.</div>
	<button class="cursor-pointer rounded-sm bg-neutral-700 px-1 text-neutral-400" onclick={loadMore}>
		Erneut versuchen
	</button>
{/if}
