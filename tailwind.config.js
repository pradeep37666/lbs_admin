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
				'nav-bg': "url('https://dev.littlebigsocial.com/file-uploads?key=other/6dbecb70-6998-11ee-b3dd-59e7033885e9.png')",
			},
			fontFamily: {
				dmSans: ['DM Sans', 'sans-serif'],
				KameronSans: ['Kameron', 'sans-serif'],
			},
			colors: {
				white: '#FFF',
				black: '#000',
				blue: {
					dark: '#33384F',
				},
				red: {
					light: '#de4056',
					base: '#AC172C',
					dark: '#7d0214',
				},
				grey: {
					base: '#B4B4B4',
					light: '#F5F5F5',
					dark: '#797979',
					border: '#C7C7C7',
					placeholder: '#BCBCBC',
					text: '#ADADAD',
					bg: '#EDEDED',
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
