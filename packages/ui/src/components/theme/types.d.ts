export {};

declare module "@mui/material/styles" {
	interface Theme {}

	interface Palette {
		ink: Palette["primary"];
		danger: Palette["primary"];
		surface: Palette["primary"];
		charcoal: Palette["primary"];
		chalk: Palette["primary"];
	}

	interface PaletteOptions {
		ink: PaletteOptions["primary"];
		danger: PaletteOptions["primary"];
		surface: PaletteOptions["primary"];
		charcoal: PaletteOptions["primary"];
		chalk: PaletteOptions["primary"];
	}

	interface PaletteColor {
		darker?: string;
	}

	interface SimplePaletteColorOptions {
		darker?: string;
	}

	interface ThemeOptions {}
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
