<script lang="ts">
	let { find } = $props();
	let amountOfReviews = 0;
</script>
<div class="shrink-0">
	<p class="text-lg cursor-pointer"> {amountOfReviews === 1 ? "1 Review" : amountOfReviews + " Reviews"} </p>
</div>