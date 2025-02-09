<script lang="ts">
    import {getHashGradient, protectUrl} from "$lib/utils";
    import Time from 'svelte-time';
    let {recommendation} = $props();
</script>

<div class="bg-neutral-700">
    <h1>{#if recommendation?.user?.avatarUrl}
        <img src={recommendation?.user?.avatarUrl}
             alt=""/>
    {/if}
        <a href="/user?id={recommendation?.user?.id}" class="font-semibold">{recommendation?.user?.username}</a> hat <Time timestamp={recommendation.createdAt} relative/> <a class="font-semibold" href="/recommendation?id={recommendation?.id}">{recommendation?.title}</a> empfohlen</h1>
    {#if recommendation?.imageUrl}
        <img class="max-h-96" src={recommendation?.imageUrl} alt={"[Bild zu " + recommendation?.title+"]"} onerror={() => recommendation.imageUrl = null}/>
        {:else}
        <div class="h-52 w-full {getHashGradient(recommendation?.id)}">
        </div>
    {/if}
    {#if recommendation?.tldr}
        <p>Tldr: {recommendation?.tldr}</p>
    {/if}
    {#if recommendation?.url}
        <a href={protectUrl(recommendation?.url)}>{recommendation?.url}</a>
    {/if}
    <div>Tags:
        {#each recommendation?.recommendationsToTags as rel}
            <span class="bg-neutral-500"><a href="/tag?id={rel.tag.id}">{rel.tag.name}</a></span>
        {/each}
    </div>
</div>