<script lang="ts">
	import Time from "svelte-time";
	import Avatar from "$lib/components/Avatar.svelte";
	import FindPreviewReviewsButton from "$lib/components/FindPreview/FindPreviewReviewsButton.svelte";
	import FindUrl from "$lib/components/Find/FindURL.svelte";
	import FindPreviewTagList from "$lib/components/FindPreview/FindPreviewTagList.svelte";
	import FindPreviewImage from "$lib/components/FindPreview/FindPreviewImage.svelte";
	import FindPreviewTitle from "$lib/components/FindPreview/FindPreviewTitle.svelte";

	let { find } = $props();
	/*onMount(() => {
		find.findsToTags = [
			{ tag: { id: 1, name: "Gaming" } },
			{ tag: { id: 2, name: "Soulslike" } },
			{ tag: { id: 3, name: "Micro-transactions" } },
			{ tag: { id: 4, name: "Free-to-play" } }
		];
	});*/
</script>

<div
	class="flex flex-col gap-2 rounded-lg bg-neutral-700/0"
>
	<div class="inline-flex items-center justify-between gap-2">
		<FindPreviewTitle find={find} />
		<div class="flex shrink-0 items-center gap-2">
			<div class="flex flex-col text-right">
				<a href="/user?id={find?.user?.id}" class="font-semibold">
					{find?.user?.username}
				</a>
				<Time timestamp={find.createdAt} relative />
			</div>
			<div class="shrink-0 size-10">
				<Avatar user={find?.user} />
			</div>
		</div>
	</div>
	<div class="flex h-full flex-col justify-normal">
		<FindPreviewImage find={find} />
		<div class="mt-2 flex flex-row justify-between gap-4">
			<div class="max-w-2/3">
				<FindUrl find={find} />
			</div>
			<FindPreviewReviewsButton find={find} />
		</div>
		<FindPreviewTagList find={find} />
	</div>
</div>
