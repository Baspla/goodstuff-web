<script lang="ts">
    import '../app.css';
    import UserMenu from "$lib/components/UserMenu.svelte";
    import {isLoggedIn} from "$lib/auth.svelte";
    import {goto} from "$app/navigation";
    import DiscordLoginButton from "$lib/components/DiscordLoginButton.svelte";

    let {children, overlays}: { children: any, overlays: any } = $props()
</script>

<svelte:head>
    <title>Goodstuff</title>
</svelte:head>

<div id="titlebar" class="text-white p-4 flex flex-row items-center">
    <h1 class="text-3xl">Goodstuff</h1>
    <div class="flex-grow"></div>
    <div class="flex flex-row gap-4">
        {#if isLoggedIn()}
            <UserMenu/>
        {:else}
            {#if location.pathname.toString() !== "/login/"}
                <DiscordLoginButton stateParam={location.pathname.toString()}/>
            {/if}
        {/if}
    </div>
</div>
<div class="mx-4 my-2">
    {@render children()}
</div>