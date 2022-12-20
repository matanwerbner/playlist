const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/tw-elements/dist/js/**/*.js'],
	theme: {
		extend: {}
	},
	plugins: [
		require('tw-elements/dist/plugin'),
		plugin(({ addComponents }) => {
			addComponents({
				'.btn': {
					color: '#fff',
					fontStyle: 'bold',
					padding: '8px',
					borderRadius: '5px',
					display: 'flex',
					justifyContent: 'center',
					gap: 5,
					'&:disabled': {
						opacity: 0.5
					}
				}
			});
		})
	]
};
