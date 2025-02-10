<script lang="ts">
	import "../app.css";
	import UserMenu from "$lib/components/UserMenu.svelte";
	import { isLoggedIn } from "$lib/auth.svelte";
	import DiscordLoginButton from "$lib/components/DiscordLoginButton.svelte";

	let { children, overlays }: { children: any; overlays: any } = $props();
</script>

<svelte:head>
	<title>Goodstuff</title>
</svelte:head>

<div class="flex h-screen min-h-screen flex-col">
	<div id="titlebar" class="flex flex-row items-center p-4 text-white">
		<h1
			class="bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text pr-1 font-serif text-4xl text-transparent"
		>
			Goodstuff
		</h1>
		<div class="grow"></div>
		<div class="flex flex-row gap-4">
			{#if isLoggedIn()}
				<UserMenu />
			{:else if location.pathname.toString() !== "/login/"}
				<DiscordLoginButton stateParam={location.pathname.toString()} />
			{/if}
		</div>
	</div>
	<div class="mx-8 my-2 grow">
		{@render children()}
	</div>
</div>
