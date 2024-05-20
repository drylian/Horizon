/**
 * Codigo gerado com o tailwind padrão, doc usada
 * https://www.tailwindcss.cn/docs/guides/vite
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		"./app/Resources/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		// container: {
		// 	center: true,
		// },
		extend: {
			colors: {
				light: {
					primary: "var(--lightcorpri)",
					secondary: "var(--lightcorsec)",
					tertiary: "var(--lightcorter)",
				},
				dark: {
					primary: "var(--darkcorpri)",
					secondary: "var(--darkcorsec)",
					tertiary: "var(--darkcorter)",
				}
			},
			textColor: {
				light: {
					primary: "var(--lighttextpri)",
					secondary: "var(--lighttextsec)",
					tertiary: "var(--lighttextter)",
				},
				dark: {
					primary: "var(--darktextpri)",
					secondary: "var(--darktextsec)",
					tertiary: "var(--darktextter)",
				}
			},
			backgroundImage: {
				'dark-image': "var(--darkbackgroundimg)",
				'light-image': "var(--lightbackgroundimg)",
			}
		},
	},
	plugins: [],
};

