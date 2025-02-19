<script lang="ts">
	import { page } from "$app/state";
	import { fetchApi } from "$lib/scripts/fetch";
	import { getPlausibleProps, plausible } from "$lib/scripts/plausible";
	import Time from "svelte-time";
	import Avatar from "$lib/components/Avatar.svelte";

	let id = $derived(page.url.searchParams.get("id"));
	let promiseUserStats: Promise<any> = $derived(fetchApi(`users/${id}/stats`));
	let promiseStats: Promise<any> = $derived(fetchApi(`/stats`));
	let promise = $derived(Promise.all([promiseUserStats, promiseStats]).then(([user, stats]) => ({ ...user, ...stats })));
	plausible("user-view", { props: { user_id: id, ...getPlausibleProps() } });
</script>

{#await promise}
	<div class="skeleton"></div>
{:then response}
	<div class="mt-[15vh] flex flex-col items-center justify-center gap-8">
		<div class="flex items-center gap-4">
			<Avatar user={response.user} class="h-30 w-30" />
			<div class="flex flex-col gap-2">
				<h1 class="text-4xl font-bold">{response.user.username}</h1>
				<p class="text-sm text-neutral-500">
					Seit
					<Time timestamp={response.user.createdAt} />
					dabei
				</p>
			</div>
		</div>
		<div class="stats stats-vertical lg:stats-horizontal">
			<div class="stat">
				<div class="stat-title">Empfehlungen</div>
				<div class="stat-value">{response.user.recommendationsCount}</div>
				<div
					class="stat-desc">{response.stats.recommendationsCount === 0 ? 0 : Math.min(100, Math.max(0, Math.round(response.user.recommendationsCount / response.stats.recommendationsCount * 100)))}
					% aller Empfehlungen
				</div>
			</div>
			<div class="stat">
				<div class="stat-title">Reviews</div>
				<div class="stat-value">{response.user.reviewsCount}</div>
				<div
					class="stat-desc">{response.stats.reviewsCount === 0 ? 0 : Math.min(100, Math.max(0, Math.round(response.user.reviewsCount / response.stats.reviewsCount * 100)))}
					% aller Reviews
				</div>
			</div>
			<div class="stat">
				<div class="stat-title">Listen</div>
				<div class="stat-value">{response.user.listsCount}</div>
				<div
					class="stat-desc">{response.stats.listsCount === 0 ? 0 : Math.min(100, Math.max(0, Math.round(response.user.listsCount / response.stats.listsCount * 100)))}
					% aller Listen
				</div>
			</div>
		</div>
	</div>
{:catch error}
	<p>Error loading user details</p>
	<p>{error}</p>
{/await}
