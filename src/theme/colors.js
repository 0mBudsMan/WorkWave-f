import { alpha } from "@mui/material/styles";

const withAlphas = (color) => {
	return {
		...color,
		alpha4: alpha(color.main, 0.04),
		alpha8: alpha(color.main, 0.08),
		alpha12: alpha(color.main, 0.12),
		alpha30: alpha(color.main, 0.3),
		alpha50: alpha(color.main, 0.5),
	};
};

export const neutral = {
	50: "#EAEAEA",
	100: "#D5D5D5",
	200: "#BFBFBF",
	300: "#A8A8A8",
	400: "#929292",
	500: "#7C7C7C",
	600: "#666666",
	700: "#505050",
	800: "#3A3A3A",
	900: "#242424",
};

export const indigo = withAlphas({
	lightest: "#E8EAF6",
	light: "#C5CAE9",
	main: "#3F51B5",
	dark: "#303F9F",
	darkest: "#1A237E",
	contrastText: "#FFFFFF",
});

export const success = withAlphas({
	lightest: "#E8F5E9",
	light: "#C8E6C9",
	main: "#4CAF50",
	dark: "#388E3C",
	darkest: "#1B5E20",
	contrastText: "#FFFFFF",
});

export const info = withAlphas({
	lightest: "#E1F5FE",
	light: "#B3E5FC",
	main: "#03A9F4",
	dark: "#0288D1",
	darkest: "#01579B",
	contrastText: "#FFFFFF",
});

export const warning = withAlphas({
	lightest: "#FFF3E0",
	light: "#FFE0B2",
	main: "#FF9800",
	dark: "#F57C00",
	darkest: "#E65100",
	contrastText: "#FFFFFF",
});

export const error = withAlphas({
	lightest: "#FFEBEE",
	light: "#FFCDD2",
	main: "#F44336",
	dark: "#D32F2F",
	darkest: "#B71C1C",
	contrastText: "#FFFFFF",
});
