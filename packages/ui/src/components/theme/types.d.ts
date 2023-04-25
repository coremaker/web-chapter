import { CSSProperties } from "react";

export {};

interface TypographyThemeVariants {
	displayLarge?: CSSProperties;
	displayMedium?: CSSProperties;
	displaySmall?: CSSProperties;

	titleLarge?: CSSProperties;
	titleMedium?: CSSProperties;
	titleSmall?: CSSProperties;

	bodyLargeRegular?: CSSProperties;
	bodyLargeItalic?: CSSProperties;
	bodyLargeBold?: CSSProperties;
	bodyLargeLink?: CSSProperties;

	bodySmallRegular?: CSSProperties;
	bodySmallItalic?: CSSProperties;
	bodySmallBold?: CSSProperties;
	bodySmallLink?: CSSProperties;

	buttonLarge?: CSSProperties;
	buttonLargeLink?: CSSProperties;

	buttonSmall?: CSSProperties;
	buttonSmallLink?: CSSProperties;

	captionLarge?: CSSProperties;
	captionSmall?: CSSProperties;
	captionSmallBold?: CSSProperties;
}

interface ColorThemeVariants {
	0?: string;
	50?: string;
	100?: string;
	200?: string;
	300?: string;
	400?: string;
	500?: string;
	600?: string;
	700?: string;
	800?: string;
	900?: string;
	tint50?: string;
	tint100?: string;
	tint200?: string;
}

declare module "@mui/material/styles/createPalette" {
	interface PaletteOptions {
		ink: PaletteColorOptions;
		danger: PaletteColorOptions;
		surface: PaletteColorOptions;
		charcoal: PaletteColorOptions;
		chalk: PaletteColorOptions;
	}
	interface Palette {
		ink: PaletteColor;
		danger: PaletteColor;
		surface: PaletteColor;
		charcoal: PaletteColor;
		chalk: PaletteColor;
	}
}

declare module "@mui/material/styles" {
	interface Theme {}

	interface PaletteColor extends ColorThemeVariants {}

	interface SimplePaletteColorOptions extends ColorThemeVariants {}

	interface ThemeOptions {}

	interface TypographyVariants extends TypographyThemeVariants {}

	interface TypographyVariantsOptions extends TypographyThemeVariants {}
}

declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		ink: true;
		danger: true;
		surface: true;
		charcoal: true;
		chalk: true;
	}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		displayLarge: true;
		displayMedium: true;
		displaySmall: true;

		titleLarge: true;
		titleMedium: true;
		titleSmall: true;

		bodyLargeRegular: true;
		bodyLargeItalic: true;
		bodyLargeBold: true;
		bodyLargeLink: true;

		bodySmallRegular: true;
		bodySmallItalic: true;
		bodySmallBold: true;
		bodySmallLink: true;

		buttonLarge: true;
		buttonLargeLink: true;

		buttonSmall: true;
		buttonSmallLink: true;

		captionLarge: true;
		captionSmall: true;
		captionSmallBold: true;
	}
}
