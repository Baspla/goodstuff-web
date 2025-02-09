<script lang="ts">
    import { page } from '$app/state';
</script>

<div class="m-3">
    <h1 class="text-2xl">Error</h1>
    <p class="text-lg">{page.error?.message}</p>
</div>