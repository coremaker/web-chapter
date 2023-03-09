export {};

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

	interface PaletteColor {
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

	interface SimplePaletteColorOptions {
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

	interface ThemeOptions {}

	interface TypographyVariants {
		displayLarge?: React.CSSProperties;
		displayMedium?: React.CSSProperties;
		displaySmall?: React.CSSProperties;

		titleLarge?: React.CSSProperties;
		titleMedium?: React.CSSProperties;
		titleSmall?: React.CSSProperties;

		bodyLargeRegular?: React.CSSProperties;
		bodyLargeItalic?: React.CSSProperties;
		bodyLargeBold?: React.CSSProperties;
		bodyLargeLink?: React.CSSProperties;

		bodySmallRegular?: React.CSSProperties;
		bodySmallItalic?: React.CSSProperties;
		bodySmallBold?: React.CSSProperties;
		bodySmallLink?: React.CSSProperties;

		buttonLarge?: React.CSSProperties;
		buttonLargeLink?: React.CSSProperties;

		buttonSmall?: React.CSSProperties;
		buttonSmallLink?: React.CSSProperties;

		captionLarge?: React.CSSProperties;
		captionSmall?: React.CSSProperties;
		captionSmallBold?: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		displayLarge?: React.CSSProperties;
		displayMedium?: React.CSSProperties;
		displaySmall?: React.CSSProperties;

		titleLarge?: React.CSSProperties;
		titleMedium?: React.CSSProperties;
		titleSmall?: React.CSSProperties;

		bodyLargeRegular?: React.CSSProperties;
		bodyLargeItalic?: React.CSSProperties;
		bodyLargeBold?: React.CSSProperties;
		bodyLargeLink?: React.CSSProperties;

		bodySmallRegular?: React.CSSProperties;
		bodySmallItalic?: React.CSSProperties;
		bodySmallBold?: React.CSSProperties;
		bodySmallLink?: React.CSSProperties;

		buttonLarge?: React.CSSProperties;
		buttonLargeLink?: React.CSSProperties;

		buttonSmall?: React.CSSProperties;
		buttonSmallLink?: React.CSSProperties;

		captionLarge?: React.CSSProperties;
		captionSmall?: React.CSSProperties;
		captionSmallBold?: React.CSSProperties;
	}
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
