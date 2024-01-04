/* eslint-disable @typescript-eslint/no-empty-interface */
export {};

interface CustomOptions {
    xs?: string;
    s?: string;
    m?: string;
    l?: string;
    xl?: string;
}

interface CustomShadows {
    ink: CustomOptions;
    primary: CustomOptions;
}

interface BlurEffects {
    backdropFilter: CustomOptions;
}

interface ExtendedTheme {
    customShadows?: CustomShadows;
    blurEffects?: BlurEffects;
}

export interface TypographyThemeVariants {
    body1Regular?: React.CSSProperties;
    body1Italic?: React.CSSProperties;
    body1Bold?: React.CSSProperties;
    body1Link?: React.CSSProperties;

    body2Regular?: React.CSSProperties;
    body2Italic?: React.CSSProperties;
    body2Bold?: React.CSSProperties;
    body2Link?: React.CSSProperties;

    buttonLink?: React.CSSProperties;

    button2?: React.CSSProperties;
    button2Link?: React.CSSProperties;
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

declare module '@mui/material/styles/createPalette' {
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

declare module '@mui/material/styles' {
    interface Theme extends ExtendedTheme {}

    interface PaletteColor extends ColorThemeVariants {}

    interface SimplePaletteColorOptions extends ColorThemeVariants {}

    interface ThemeOptions extends ExtendedTheme {}

    interface TypographyVariants extends TypographyThemeVariants {}

    interface TypographyVariantsOptions extends TypographyThemeVariants {}

    interface BreakpointOverrides {
        xxs: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        ink: true;
        danger: true;
        surface: true;
        charcoal: true;
        chalk: true;
        inherit: false;
    }

    interface ButtonClasses {
        soft: true;
        containedReversed: true;
    }

    interface ButtonPropsVariantOverrides {
        soft: true;
        containedReversed: true;
    }
}

declare module '@mui/material/Chip' {
    interface ChipClasses {
        soft: true;
    }

    interface ChipPropsVariantOverrides {
        soft: true;
    }

    interface ChipPropsColorOverrides {
        ink: true;
        danger: true;
        surface: true;
        charcoal: true;
        chalk: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        body1Regular: true;
        body1Italic: true;
        body1Bold: true;
        body1Link: true;

        body2Regular: true;
        body2Italic: true;
        body2Bold: true;
        body2Link: true;

        button: true;
        buttonLink: true;

        button2: true;
        button2Link: true;
    }
}

declare module '@mui/material/ToggleButton' {
    interface ToggleButtonPropsColorOverrides {
        ink: true;
        danger: true;
        surface: true;
        charcoal: true;
        chalk: true;
        inherit: false;
        standard: false;
    }
}

declare module '@mui/material/ToggleButtonGroup' {
    interface ToggleButtonGroupPropsColorOverrides {
        ink: true;
        danger: true;
        surface: true;
        charcoal: true;
        chalk: true;
        inherit: false;
        standard: false;
    }
}

declare module '@mui/material/Switch' {
    interface SwitchPropsColorOverrides {
        ink: true;
        danger: true;
        surface: true;
        charcoal: true;
        chalk: true;
        inherit: false;
        standard: false;
    }
}
