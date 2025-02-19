<script lang="ts">
	import { page } from "$app/state";
	import DiscordLoginButton from "$lib/components/TitleBar/DiscordLoginButton.svelte";
	import { isLoggedIn } from "$lib/scripts/auth.svelte";
	import { goto } from "$app/navigation";

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

	// if already logged in, redirect to home
	if (isLoggedIn()) {
		if (stateParam) {
			console.log("Redirecting to provided state", stateParam);
			goto(stateParam, { replaceState: true });
		} else {
			console.log("Redirecting to home");
			goto("/", { replaceState: true });
		}
	}
</script>

<div class="flex flex-row justify-center">
	<div class="mt-[10vh] flex w-[500px] max-w-[90vw] flex-col justify-center">
		<h2 class="mb-2 text-2xl">Bitte melde dich an</h2>
		<p>
			Entweder du bist neu hier oder deine Session ist abgelaufen. Ich wollte dich aber nicht
			einfach wild zu Discord weiterleiten, ohne dir Bescheid zu sagen. Bitte melde dich an, um
			fortzufahren.
		</p>
		<div class="mt-8 mb-8 flex flex-row justify-center">
			<DiscordLoginButton {stateParam} />
		</div>
	</div>
</div>
