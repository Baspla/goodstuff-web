import { getJwtToken, invalidateLogin } from "$lib/scripts/auth.svelte.js";
import { env } from "$lib/scripts/env.svelte.js";

function handleResponseErrors(response: Response) {
	if (response.status === 401) {
		invalidateLogin();
		window.location.href = `/login?state=${encodeURIComponent(window.location.pathname + window.location.search)}`;
		return;
	}
	if (!response.ok) {
		throw new Error(`API error: ${response.status} ${response.statusText}`);
	}
}

export async function fetchApi(
	endpoint: string,
	queryParams: Record<string, string> = {}
): Promise<any> {
	const token = getJwtToken();

	// Build query string from queryParams object
	const queryString = new URLSearchParams(queryParams).toString();
	const url = `${env.API_BASE}/v1/${endpoint}${queryString ? `?${queryString}` : ""}`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	handleResponseErrors(response);

	return await response.json();
}

export async function postApi(endpoint: string, body: any): Promise<any> {
	const token = getJwtToken();

	const response = await fetch(`${env.API_BASE}/v1/${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(body)
	});

	handleResponseErrors(response);

	return await response.json();
}

export async function patchApi(endpoint: string, body: any): Promise<any> {
	const token = getJwtToken();

	const response = await fetch(`${env.API_BASE}/v1/${endpoint}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(body)
	});

	handleResponseErrors(response);

	return await response.json();
}

export async function deleteApi(endpoint: string): Promise<any> {
	const token = getJwtToken();

	const response = await fetch(`${env.API_BASE}/v1/${endpoint}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	handleResponseErrors(response);

	return await response.json();
}
