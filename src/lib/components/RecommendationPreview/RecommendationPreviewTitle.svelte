<script lang="ts">
	let { recommendation } = $props();
</script>

<a class="text-2xl font-semibold text-balance" href="/recommendation?id={recommendation?.id}">
	<h3 class="line-clamp-2 text-ellipsis hyphens-auto" lang="de">{recommendation?.title}</h3>
</a>