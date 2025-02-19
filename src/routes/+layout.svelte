<script lang="ts">
	import "../app.css";
	import UserMenu from "$lib/components/TitleBar/UserMenu.svelte";
	import { getCurrentUser, isLoggedIn } from "$lib/scripts/auth.svelte";
	import DiscordLoginButton from "$lib/components/TitleBar/DiscordLoginButton.svelte";
	import LogoutButton from "$lib/components/TitleBar/LogoutButton.svelte";
	import SearchButton from "$lib/components/modals/CommandSearch/CommandSearchButton.svelte";
	import { getPlausibleProps, plausible } from "$lib/scripts/plausible";
	import { page } from "$app/state";
	import { env } from "$lib/scripts/env.svelte";
	import CommandSearch from "$lib/components/modals/CommandSearch/CommandSearch.svelte";
	import OutgoingLinkWarning from "$lib/components/modals/OutgoingLinkWarning.svelte";
	import Alerts from "$lib/components/Alerts.svelte";

	let { children }: { children: any } = $props();

	let showSearchModal = $state(false);

	$effect(() => {
		page.url.pathname && handleRouteChange();
	});

	function handleRouteChange() {
		if (page.url.pathname === "/" && isLoggedIn()) {
			return; // dont track home page for logged in users as they are redirected.
		}
		plausible("pageview", { props: getPlausibleProps() });
	}

</script>

<svelte:head>
	<title>Goodstuff</title>
</svelte:head>

<CommandSearch bind:showModal={showSearchModal} />
<OutgoingLinkWarning />
<Alerts />

<div id="content"
		 class="flex min-h-screen flex-col selection:bg-indigo-700 selection:text-white bg-neutral-100 dark:bg-neutral-900">
	<div id="titlebar" class="flex flex-col gap-4 p-4 px-8">
		<div class="flex flex-row items-center">
			<a
				href="/"
				class="shrink bg-gradient-to-r dark:from-indigo-300 dark:to-indigo-100 bg-clip-text pr-1 font-serif text-xl text-transparent md:text-4xl from-indigo-600 to-indigo-400"
				class:animate-pulse={env.DEVELOPMENT}
			>
				<h1>Goodstuff</h1>
			</a>
			<div class="grow"></div>
			<div class="flex items-center justify-between gap-4">
				{#if isLoggedIn()}
					<SearchButton bind:showModal={showSearchModal} />
					<LogoutButton />
					<UserMenu user={getCurrentUser()} />
				{:else if page.url.pathname !== "/login/"}
					<DiscordLoginButton stateParam={page.url.pathname} />
				{/if}
			</div>
		</div>
	</div>
	<div class="mx-8 grow">
		{@render children()}
	</div>
</div>
