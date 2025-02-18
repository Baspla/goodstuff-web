<script>
	import { getHashColor } from "$lib/utils";

	let { user, children = null } = $props();
</script>

<div class="aspect-square overflow-hidden rounded-full ">
	{#if user?.avatarUrl}
		<img src={user?.avatarUrl} alt="" />
	{:else}
		<div style={getHashColor(user?.id)} class="w-full h-full rounded-full text-center flex justify-center items-center">
			{#if !!children}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>