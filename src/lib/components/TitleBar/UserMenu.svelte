<script lang="ts">
	import Avatar from "$lib/components/Avatar.svelte";

	let { user } = $props();
</script>

<div class="rounded-full bg-neutral-800 overflow-hidden cursor-help">
	<div class="shrink-0 size-10 text-xs tracking-tighter">
		<Avatar user={user}>
		</Avatar>
	</div>
</div>