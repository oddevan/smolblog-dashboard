/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],

	theme: {
		extend: {
			colors: {
				'primary': {
					'50': '#f4faf3',
					'100': '#e6f4e4',
					'200': '#cce9c9',
					'300': '#9cd398',
					'400': '#72bb6d',
					'500': '#4f9e49',
					'600': '#3c8138',
					'700': '#31672e',
					'800': '#2b5229',
					'900': '#244423',
					'950': '#0f240f',
				},
				'snek': '#9cd398',
				'boop': '#191b20',
				'step': '#e9e3db',
			}
		}
	},

	plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],

  darkMode: 'class',
};

module.exports = config;
