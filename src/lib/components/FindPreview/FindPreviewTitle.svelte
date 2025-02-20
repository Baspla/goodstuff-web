<script lang="ts">
	let { find } = $props();
</script>

<a class="text-2xl font-semibold text-balance" href="/find?id={find?.id}">
	<h3 class="line-clamp-2 text-ellipsis hyphens-auto" lang="de">{find?.title}</h3>
</a>