export const prerender = true;
export const ssr = false;
export const csr = true;
export const trailingSlash = "always";

import "dayjs/locale/de"; // German locale
import { dayjs } from "svelte-time";

dayjs.locale("de");

export async function load() {}
