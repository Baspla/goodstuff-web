export const prerender = true;
export const ssr = false;
export const csr = true;
export const trailingSlash = 'always';

import "dayjs/locale/de"; // German locale
dayjs.locale("de");
import { dayjs } from "svelte-time";

export async function load() {
}
