<script lang="ts">
    // This page is a warning page that is shown when a user tries to access a outgoing link

    import {page} from "$app/state";

    let linkto = page.url.searchParams.get('to')
</script>

<h1 class="text-2xl"> Link </h1>
{#if linkto}
    <p> Dieser Link führt zu {linkto} </p>
    <p> Möchtest du fortfahren? </p>
    <button onclick={() => window.history.back()}> Nein </button>
    <button onclick={() => {window.location.assign(linkto)}}> Ja </button>
{:else}
    <p> No link provided </p>
{/if}