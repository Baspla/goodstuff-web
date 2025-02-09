import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}',"./lib/**/*.{svelte,js,ts,jsx,tsx}"],

  theme: {
    extend: {}
  },
  safelist: [
    {
      pattern: /bg-gradient-to-(r|b|t|l|tr|tl|br|bl)/,
    }, {
      pattern: /from-(\w+)-\d+/,
    }, {
      pattern: /via-(\w+)-\d+/,
    }, {
      pattern: /to-(\w+)-\d+/,
    },
  ],

  plugins: [typography, forms]
} satisfies Config;
