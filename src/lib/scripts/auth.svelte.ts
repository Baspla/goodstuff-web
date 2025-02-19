export let auth: { jwtToken: string | null; currentUser: User | null } = $state({
	jwtToken: localStorage.getItem("jwtToken"),
	currentUser: localStorage.getItem("currentUser")
		? JSON.parse(localStorage.getItem("currentUser") as string)
		: null
});

type User = {
	jwtToken: string | null;
	avatarUrl: string | null;
	createdAt: string;
	discordId: string;
	email: string;
	id: number;
	lastLogin: string;
	role: string;
	username: string;
};

let loggedIn = $derived(!!auth.jwtToken);

if (auth.jwtToken) {
	console.log("jwtToken found in localStorage");
}

export function setJwtToken(token: string) {
	auth.jwtToken = token;
	localStorage.setItem("jwtToken", token);
}

export function clearJwtToken() {
	auth.jwtToken = null;
	localStorage.removeItem("jwtToken");
}

export function getJwtToken() {
	return auth.jwtToken;
}

export function isLoggedIn() {
	return loggedIn;
}

export function invalidateLogin() {
	console.log("Invalidating login");
	clearJwtToken();
	auth.currentUser = null;
	localStorage.removeItem("currentUser");
}

export function setCurrentUser(user: any) {
	auth.currentUser = user;
	localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
	return auth.currentUser;
}

export function getCurrentUserRole() {
	return auth.currentUser?.role;
}