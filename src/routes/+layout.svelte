<script lang="ts">
	import "../app.css";
	import UserMenu from "$lib/components/UserMenu.svelte";
	import { getCurrentUser, isLoggedIn } from "$lib/auth.svelte";
	import DiscordLoginButton from "$lib/components/DiscordLoginButton.svelte";
	import SearchOverlay from "$lib/components/overlays/search/SearchOverlay.svelte";
	import LogoutButton from "$lib/components/LogoutButton.svelte";
	import SearchButton from "$lib/components/overlays/search/SearchButton.svelte";
	import { getPlausibleProps, plausible } from "$lib/plausible";
	import { page } from "$app/state";
	import { env } from "$lib/env.svelte";
	import OutgoingLinkOverlay from "$lib/components/overlays/OutgoingLinkOverlay.svelte";
	import { createRecommendationState, outgoingLinkState, searchState } from "$lib/overlays.svelte";
	import CreateRecommendationOverlay from "$lib/components/overlays/CreateRecommendationOverlay.svelte";

	let { children }: { children: any } = $props();

	function handleRouteChange() {
		if (page.url.pathname === "/" && isLoggedIn()) {
			return; // dont track home page for logged in users as they are redirected.
		}
		plausible("pageview", { props: getPlausibleProps() });
	}

	$effect(() => {
		page.url.pathname && handleRouteChange();
	});

	$effect(() => {
		if (outgoingLinkState.visible || searchState.visible || createRecommendationState.visible) {
			document.body.style.overflow = "hidden";
			document.getElementById("content")?.setAttribute("aria-hidden", "true");
			document.getElementById("content")?.setAttribute("inert", "true");
		} else {
			document.body.style.overflow = "auto";
			// make content visible
			document.getElementById("content")?.removeAttribute("aria-hidden");
			document.getElementById("content")?.removeAttribute("inert");
		}
	});
</script>

<svelte:head>
	<title>Goodstuff</title>
</svelte:head>

<SearchOverlay />
<OutgoingLinkOverlay />
<CreateRecommendationOverlay />

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
					<SearchButton />
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
