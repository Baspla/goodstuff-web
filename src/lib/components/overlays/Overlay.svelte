<script lang="ts">
    import {onMount} from "svelte";

    let {children, visible = $bindable()} = $props();

    $effect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    function closeOverlay() {
        visible = false;
    }
</script>

<svelte:document onkeydown={event => {if(event.key === "Escape" && visible){closeOverlay()}}}/>

<div class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg z-50 {visible?'':'hidden'}"
     onclick={event => event.target === event.currentTarget && closeOverlay()} aria-hidden={!visible}>
    {@render children()}
</div>