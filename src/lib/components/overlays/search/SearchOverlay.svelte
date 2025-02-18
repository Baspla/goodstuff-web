<script lang="ts">
	import Overlay from "$lib/components/overlays/Overlay.svelte";
	import SearchCategory from "$lib/components/overlays/search/SearchCategory.svelte";
	import { fetchApi } from "$lib/fetch";
	import { isLoggedIn } from "$lib/auth.svelte";
	import { getPlausibleProps, plausible } from "$lib/plausible";
	import { createRecommendationState, outgoingLinkState, searchState } from "$lib/overlays.svelte";

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
				if (!outgoingLinkState.visible && !createRecommendationState.visible) {
					searchState.visible = !searchState.visible;
					if (searchState.visible) {
						plausible("search-shortcut", { props: getPlausibleProps() });
					}
				}
			}
			event.preventDefault();
		}
	}

	$effect(() => {
		if (searchState.visible) {
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

	let searchbar: HTMLInputElement;

	$effect(() => {
		if (searchState.visible) {
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

<Overlay bind:visible={searchState.visible}>
	<div
		class="absolute left-1/2 w-[90vw] mt-[15vh] py-[10vh] max-w-[750px] -translate-x-1/2 transform rounded-lg px-8 pointer-events-auto"
	>
		<div class="flex max-h-[75vh] flex-col ">
			<input
				bind:this={searchbar}
				bind:value={searchterm}
				class="h-[42px] w-full resize-none rounded-lg border dark:border-neutral-800 bg-neutral-100 border-neutral-200 dark:bg-neutral-900 px-4 py-2 dark:focus:border-neutral-700 dark:focus:ring-neutral-700 focus:border-neutral-500 focus:ring-neutral-500"
				placeholder="Suche"
				onkeydown={redirectToSearch}
			/>
			<div class="mx-2 mt-4 overflow-y-auto">
				<SearchCategory
					category={{ title: "Empfehlungen", url: "/recommendations" }}
					entries={recommendationEntries}
					more={moreRecommendations}
				/>
				<SearchCategory
					category={{ title: "Reviews", url: "/reviews" }}
					entries={reviewEntries}
					more={moreReviews}
				/>
				<SearchCategory
					category={{ title: "Tags", url: "/tags" }}
					entries={tagEntries}
					more={moreTags}
				/>
				<SearchCategory
					category={{ title: "Nutzer", url: "/users" }}
					entries={userEntries}
					more={moreUsers}
				/>
			</div>
		</div>
	</div>
</Overlay>
