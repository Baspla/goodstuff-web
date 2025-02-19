<script lang="ts">
	let { children, value } = $props();
</script>

<option value={value} class="">
	{@render children()}
</option>