<script lang="ts">
    let message = ""

    let inputRef: HTMLInputElement

    const onSend = () => {
        inputRef.focus()
    }
</script>

<input class="text-black" bind:this={inputRef} value={message}>
<button on:click={onSend}>Send Message</button>