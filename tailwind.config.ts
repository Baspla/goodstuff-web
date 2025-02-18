import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}", "./lib/**/*.{svelte,js,ts,jsx,tsx}"],

	theme: {},

	plugins: [typography, forms]
} satisfies Config;
