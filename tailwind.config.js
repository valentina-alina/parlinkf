/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      navbar: ['Homemade Apple'],
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}