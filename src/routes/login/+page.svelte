<script lang="ts">
    import {env} from "$lib/env.svelte.js";
    import {page} from "$app/state";
    import DiscordLoginButton from "$lib/components/DiscordLoginButton.svelte";

    let stateParam = page.url.searchParams.get("state");

    //NEVER add a check if there is already a token stored in the local storage. The token may be invalid and the user was redirected to the login page.

    /* Auto redirect disabled for now to avoid confusion of redirection
    if (!stateParam) {
        console.log("No state found in the URL");
        window.location.assign(env.API_BASE + "/v1/auth/discord/web")
    } else {
        console.log("State found in the URL");
        if (stateParam.startsWith("/")) {
            window.location.assign(env.API_BASE + "/v1/auth/discord/web?state=" + stateParam)
        } else {
            console.log("Invalid state found in the URL");
            window.location.assign(env.API_BASE + "/v1/auth/discord/web")
        }
    }*/
</script>
<div class="flex flex-row justify-center">
    <div class="flex flex-col justify-center max-w-[90vw] w-[500px] mt-[10vh]">
        <h2 class="text-2xl mb-2">Bitte melde dich an</h2>
        <p>
            Entweder du bist neu hier oder deine Session ist abgelaufen.
            Ich wollte dich aber nicht einfach wild zu Discord weiterleiten,
            ohne dir Bescheid zu sagen.
            Bitte melde dich an, um fortzufahren.
        </p>
        <div class="flex flex-row justify-center mt-8 mb-8">
            <DiscordLoginButton {stateParam}/>
        </div>
    </div>
</div>