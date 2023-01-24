/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{html,js,jsx,ts,tsx}',
		'./components/**/*.{html,js,jsx,ts,tsx}',
		'./sub-pages/**/*.{html,js,jsx,ts,tsx}',
		'./assets/**/*.{html,js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				// 'footer-card-image': "url('../assets/images/footer-card-image.png')",
			},
			fontFamily: {
				// axiforma: ['Axiforma', 'sans-serif']
			},
			colors: {
				white: {
					base: '#FFF',
				},
				black: {
					base: '#000',
				},
				success: {
					base: '#16A34A',
				},
				error: {
					base: '#E33B45',
				},
			},
		},
		colors: {},
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
