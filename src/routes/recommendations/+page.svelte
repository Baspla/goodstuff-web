<script lang="ts">
    import {fetchApi} from "$lib/fetch";
    import RecommendationPreview from "$lib/components/RecommendationPreview.svelte";
    import EndlessScroll from "$lib/components/EndlessScroll.svelte";
    import SearchOverlay from "$lib/components/overlays/search/SearchOverlay.svelte";
    import CreateRecommendationOverlay from "$lib/components/overlays/CreateRecommendationOverlay.svelte";

    /* default values for /recommendations endpoint
    page: number = 0,
    limit: number = 20,
    searchterm: string = '',
    sortBy: 'created_at' | 'updated_at' | 'title' = 'created_at',
    sortOrder: 'asc' | 'desc' = 'asc'
     */

    let reachedEnd = false;
    const limit = 20;

    async function loadMore() {
        if (reachedEnd) {
            return;
        }
        let page = Math.floor(recommendations.length / limit)
        console.log("loading page:", page);
        let response = await fetchApi(`recommendations`, {
            page: ""+page,
            limit: ""+limit,
            sortBy: 'created_at',
            sortOrder: 'desc'
        });
        recommendations = [...recommendations, ...response.recommendations];
        if (response.recommendations.length < limit) {
            reachedEnd = true;
            console.log("reached end of recommendations");
        }
        return response.recommendations.length > 0;
    }
    let searchOverlayVisible = $state(false);
    let createRecommendationOverlayVisible = $state(false);
    let recommendations: any = $state([]);
</script>

<EndlessScroll {loadMore}/>

<h1 class="text-2xl">Feed</h1>

<div class="flex flex-row my-4 gap-4">
    <button class="" onclick={() => searchOverlayVisible = true}>Suche</button>
    <button class="" onclick={() => createRecommendationOverlayVisible = true}>Empfehlung erstellen</button>
</div>

<SearchOverlay bind:visible={searchOverlayVisible}/>
<CreateRecommendationOverlay bind:visible={createRecommendationOverlayVisible}/>

<div class="grid grid-cols-3 gap-4">
    {#each recommendations as recommendation}
        <RecommendationPreview {recommendation}/>
    {/each}
</div>