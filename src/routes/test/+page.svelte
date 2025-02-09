<script lang="ts">
    import {fetchApi} from "$lib/fetch";
    let promise: Promise<any> = $state(fetchApi(``));
</script>

<h1 class="text-2xl"> Test </h1>

{#await promise}
    <h2>Loading</h2>
{:then response}
    <h2>Result</h2>
    <p>{JSON.stringify(response)}</p>
{:catch error}
    <h2>Error</h2>
    <p>{error}</p>
{/await}