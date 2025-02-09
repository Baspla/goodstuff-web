<script lang="ts">
    import {fetchApi} from "$lib/fetch";
    let apiRoute: string = $state('me');
    let promise: Promise<any> = $state(new Promise(() => {}));

</script>

<h1 class="text-2xl"> API Explorer </h1>
<input class="text-black" type="text" bind:value={apiRoute} placeholder="Enter API route" />
<button onclick={() => promise = fetchApi(apiRoute)}>Fetch</button>
{#await promise}
    <h2>Loading</h2>
{:then response}
    <h2>Result</h2>
    <p>{JSON.stringify(response)}</p>
{:catch error}
    <h2>Error</h2>
    <p>{error}</p>
{/await}