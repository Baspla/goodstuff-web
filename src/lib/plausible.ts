import { getCurrentUserRole, isLoggedIn } from "$lib/auth.svelte";

export const plausible = (...args: any[]) => {
	if (typeof window !== "undefined") {
		(window as any).plausible =
			(window as any).plausible ||
			function () {
				((window as any).plausible.q = (window as any).plausible.q || []).push(arguments);
			};
		(window as any).plausible(...args);
	}
};

export function getPlausibleProps() {
	const themePreference = window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
	const isMobile = /Mobi|Android/i.test(navigator.userAgent);
	const device = isMobile ? "mobile" : "desktop";
	return {
		logged_in: isLoggedIn(),
		role: getCurrentUserRole(),
		theme: themePreference,
		device: device
	};
}
