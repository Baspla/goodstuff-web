export let auth: { jwtToken: string | null, currentUserId: number | null } = $state({jwtToken: localStorage.getItem('jwtToken'), currentUserId: null});
let loggedIn = $derived(!!auth.jwtToken);


if (auth.jwtToken) {
  console.log('jwtToken found in localStorage');
}

export function setJwtToken(token: string) {
  auth.jwtToken = token;
  localStorage.setItem('jwtToken', token);
}

export function clearJwtToken() {
  auth.jwtToken = null;
  localStorage.removeItem('jwtToken');
}

export function getJwtToken() {
  return auth.jwtToken;
}

export function isLoggedIn() {
  return loggedIn;
}

export function setCurrentUserId(userId: number) {
    auth.currentUserId = userId;
}

export function getCurrentUserId() {
    return auth.currentUserId;
}