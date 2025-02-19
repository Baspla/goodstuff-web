<script lang="ts">
	let { children, multiple = false } = $props();
</script>

<select multiple={multiple} class="bg-neutral-100 dark:bg-neutral-800 rounded-md border-0 ">
	{@render children()}
</select>