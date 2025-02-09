<script lang="ts">
    import {isLoggedIn} from "$lib/auth.svelte";
    import LoginButton from "$lib/components/LoginButton.svelte";
    import {goto} from "$app/navigation";

    if (isLoggedIn()) {
        goto("/recommendations");
    }
</script>
<div class="flex flex-col items-center justify-center h-full">
    <h2 class="text-5xl leading-">
        Teile deine Empfehlungen<br>
        für gute Dinge
    </h2>
</div>