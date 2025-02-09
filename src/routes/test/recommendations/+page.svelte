<script lang="ts">
    import {fetchApi} from "$lib/fetch";
    let promise: Promise<any> = $state(fetchApi(`recommendations`));
</script>

<h1 class="text-2xl"> Liste aller Posts </h1>

{#await promise}
    <p>Loading</p>
{:then response}
    {#each response?.recommendations as recommendation}
        <div class="mb-4 ms-4">
            <h1>{recommendation?.title}</h1>
            <p>{recommendation?.createdAt}
            <p>{recommendation?.tldr}</p>
            <a href={recommendation?.url}>{recommendation?.url}</a>
            <p>Von: {recommendation?.user?.username}</p>
        </div>
    {/each}

{:catch error}
    <p>Error loading post</p>
    <p>{error}</p>
{/await}