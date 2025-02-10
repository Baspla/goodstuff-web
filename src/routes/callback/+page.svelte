<script lang="ts">
	// get the token from the URL
	import { page } from "$app/state";
	import { setCurrentUserId, setJwtToken } from "$lib/auth.svelte";
	import { goto } from "$app/navigation";
	import { fetchApi } from "$lib/fetch";

	let tokenParam = page.url.searchParams.get("token");
	let stateParam = page.url.searchParams.get("state");

	// if the token is not null, set it in the local storage
	if (tokenParam) {
		console.log("Token found in the URL");
		setJwtToken(tokenParam);
		console.log("Token set in the local storage");
		fetchApi("me")
			.then((response) => {
				console.log("ME:", response);
				setCurrentUserId(response.id);
				resolveState();
			})
			.catch((error) => {
				console.log("Error fetching user data: ", error);
				resolveState();
			});
	} else {
		console.log("No token found in the URL");
		resolveState();
	}

	function resolveState() {
		// redirect to the home page if no state is set
		if (!stateParam) {
			goto("/");
		} else {
			console.log("State found in the URL");
			if (stateParam.startsWith("/")) {
				goto(stateParam);
			} else {
				console.log("Invalid state found in the URL");
				goto("/");
			}
		}
	}
</script>

<h1 class="text-2xl">Logging in...</h1>
