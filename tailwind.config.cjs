/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				myRed: '#f9004d',
				myPurple: {
					100: '#a238ff',
					200: '#7d2bc4',
				},
			},
			minHeight: {
				'55vh': '55vh',
			},
			padding: {
				'20px 10px': '20px 10px',
			},
			margin: {
				'50px': '50px',
			},
		},
	},
	plugins: [],
};
