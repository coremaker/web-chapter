import { typography } from '../themeOptions';
import { Color } from './types';
import { MUIComponentOverrides } from './types/StyleOverrides';

export const buttonStyle: MUIComponentOverrides['MuiButton'] = {
    root: {
        borderRadius: 12,
        textTransform: 'none',
        boxShadow: 'none',
        padding: '8px 16px',

        '&:hover': {
            boxShadow: 'none',
        },
    },

    contained: ({ ownerState, theme: { palette } }) => {
        const color = (ownerState.color as Color) || 'primary';

        return {
            color: palette.ink[0],

            ':hover': {
                backgroundColor: palette[color][700],
                color: palette.ink[0],
            },

            '&.Mui-disabled': {
                backgroundColor: palette[color][300],
                color: palette[color][100],
            },
        };
    },

    outlined: ({ ownerState, theme: { palette } }) => {
        const color = (ownerState.color as Color) || 'primary';

        return {
            ':hover': {
                backgroundColor: palette[color].tint50,
                borderColor: palette[color][700],
                color: palette[color][700],
            },

            '&.Mui-disabled': {
                color: palette[color][300],
                borderColor: palette[color][300],
            },
        };
    },

    soft: ({ ownerState, theme: { palette } }) => {
        const color = ownerState.color || 'primary';

        return {
            color: palette[color][500],
            backgroundColor: palette[color].tint50,

            ':hover': {
                backgroundColor: palette[color].tint100,
                color: palette[color][700],
            },

            '&.Mui-disabled': {
                color: palette[color][300],
                backgroundColor: palette[color].tint50,
            },
        };
    },

    containedReversed: ({ ownerState, theme: { palette } }) => {
        const color = ownerState.color || 'primary';

        return {
            color: palette[color][500],
            backgroundColor: palette.ink[0],

            ':hover': {
                backgroundColor: palette.ink[50],
                color: palette[color][700],
            },

            '&.Mui-disabled': {
                color: palette[color][500],
                backgroundColor: palette[color][300],
            },
        };
    },

    text: ({ ownerState, theme: { palette } }) => {
        const color = ownerState.color || 'primary';

        return {
            ':hover': {
                backgroundColor: palette[color].tint50,
                color: palette[color][700],
            },

            '&.Mui-disabled': {
                color: palette[color][300],
                backgroundColor: 'transparent',
            },
        };
    },

    sizeSmall: {
        padding: '6px 14px',
        ...typography.button2,
    },

    sizeLarge: {
        padding: '8px 16px',
        ...typography.button,
    },

    startIcon: {
        marginRight: 4,
    },
};
