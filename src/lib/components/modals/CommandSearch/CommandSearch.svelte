<script lang="ts">
	import SearchCategory from "$lib/components/modals/CommandSearch/CommandSearchCategory.svelte";
	import { fetchApi } from "$lib/scripts/fetch";
	import { isLoggedIn } from "$lib/scripts/auth.svelte.js";
	import { getPlausibleProps, plausible } from "$lib/scripts/plausible";

	let searchterm = $state("");
	let recommendationEntries: { title: string; url: string }[] = $state([]);
	let reviewEntries: { title: string; url: string }[] = $state([]);
	let tagEntries: { title: string; url: string }[] = $state([]);
	let userEntries: { title: string; url: string }[] = $state([]);
	let moreRecommendations: boolean = $state(false);
	let moreReviews: boolean = $state(false);
	let moreTags: boolean = $state(false);
	let moreUsers: boolean = $state(false);
	let isLoggedin = $derived(isLoggedIn());

	const limit = 5;

	function keyhandler(event: KeyboardEvent) {
		if (event.key === "k" && event.ctrlKey) {
			if (isLoggedin) {
				showModal = true;
				plausible("search-shortcut", { props: getPlausibleProps() });
			}
			event.preventDefault();
		}
	}

	$effect(() => {
		if (showModal) {
			if (searchterm.length > 0) {
				fetchApi(`search`, { searchterm, limit: "" + limit }).then((response) => {
					let newRecommendationEntries = [];
					let newReviewEntries = [];
					let newTagEntries = [];
					let newUserEntries = [];
					for (let recommendation of response.recommendations) {
						newRecommendationEntries.push({
							title: recommendation.title,
							url: `/recommendation?id=${recommendation.id}`
						});
					}
					for (let review of response.reviews) {
						newReviewEntries.push({
							title: review.title,
							url: `/review?id=${review.id}`
						});
					}
					for (let tag of response.tags) {
						newTagEntries.push({
							title: tag.name,
							url: `/tag?id=${tag.id}`
						});
					}
					for (let user of response.users) {
						newUserEntries.push({
							title: user.username,
							url: `/user?id=${user.id}`
						});
					}

					moreRecommendations = response.recommendations.length === limit;
					moreReviews = response.reviews.length === limit;
					moreTags = response.tags.length === limit;
					moreUsers = response.users.length === limit;

					recommendationEntries = newRecommendationEntries;
					reviewEntries = newReviewEntries;
					tagEntries = newTagEntries;
					userEntries = newUserEntries;
				});
			} else {
				recommendationEntries = [];
				reviewEntries = [];
				tagEntries = [];
				userEntries = [];
			}
		}
	});

	let { showModal = $bindable() } = $props();
	let searchbar: HTMLInputElement;
	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (showModal) {
			dialog?.showModal();
			searchbar.focus();
			searchbar.setSelectionRange(0, searchbar.value.length);
		}
	});

	function redirectToSearch(event: KeyboardEvent) {
		if (event.key === "Enter" && searchterm.length > 0) {
			//TODO: Disabled while search page is not implemented
			//window.location.href = `/search?searchterm=${searchterm}`;
		}
	}
</script>

<svelte:document onkeydown={keyhandler} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="modal modal-bottom sm:modal-top backdrop:bg-black/70  backdrop:dark:bg-black/90  backdrop:backdrop-blur-lg"
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div
		class="modal-box pointer-events-auto mx-auto mt-[10vh] flex max-w-full justify-center bg-transparent shadow-none sm:max-w-[60vw] xl:max-w-[40vw]"
	>
		<div class="flex max-h-[75vh] w-full flex-col">
			<div class="flex sm:hidden flex-col mb-4">
				{@render results()}
			</div>
			<input
				bind:this={searchbar}
				bind:value={searchterm}
				class="h-[42px] w-full resize-none rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 focus:border-neutral-500 focus:ring-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-700"
				placeholder="Suche"
				onkeydown={redirectToSearch}
			/>
			<div class="hidden sm:block">
				{@render results()}
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

{#snippet results()}
	<div class="mx-2 mt-4 overflow-y-auto">
		<SearchCategory
			category={{ title: "Empfehlungen", url: "/recommendations" }}
			entries={recommendationEntries}
			more={moreRecommendations? "/recommendations?search=" + searchterm : ""}
			dialog={dialog}
		/>
		<SearchCategory
			category={{ title: "Reviews", url: "/reviews" }}
			entries={reviewEntries}
			more={moreReviews? "/reviews?search=" + searchterm : ""}
			dialog={dialog}
		/>
		<SearchCategory
			category={{ title: "Tags", url: "/tags" }}
			entries={tagEntries}
			more={moreTags? "/tags?search=" + searchterm : ""}
			dialog={dialog}
		/>
		<SearchCategory
			category={{ title: "Nutzer", url: "/users" }}
			entries={userEntries}
			more={moreUsers? "/users?search=" + searchterm : ""}
			dialog={dialog}
		/>
	</div>
{/snippet}
