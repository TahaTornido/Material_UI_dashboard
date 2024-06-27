/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				SeaBlue: "#073846",
				CustomGrey: "#EFF4F7",
			},
			fontFamily: {
				Roboto: "Roboto",
			},
			borderColor: {
				SeaBlue: "#073846",
			},
			textColor: {
				SeaBlue: "#073846",
			},
		},
	},
	plugins: [],
};
