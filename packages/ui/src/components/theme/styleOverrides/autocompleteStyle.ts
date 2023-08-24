import { AutocompleteClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { customShadows, palette, typography } from '../themeOptions';

export const autocompleteStyle:
    | Partial<OverridesStyleRules<keyof AutocompleteClasses, 'MuiAutocomplete', Omit<Theme, 'components'>>>
    | undefined = {
    root: {
        '& .MuiInputBase-input': {
            padding: '0px 6px',
            boxShadow: 'none',
        },
    },

    paper: {
        backgroundColor: palette.surface[0],
        boxShadow: customShadows.ink.m,
        borderRadius: 8,
    },

    option: {
        color: palette.ink[500],
        ...typography.body1Regular,

        '&:hover': {
            backgroundColor: palette.ink.tint50,

            '& .MuiTypography-root': {
                color: palette.ink[700],
            },

            '&[aria-selected=true]': {
                backgroundColor: palette.primary[100],

                '& .MuiTypography-root': {
                    color: palette.primary[700],
                    ...typography.body1Bold,
                },

                '& .MuiSvgIcon-root': {
                    color: palette.primary[700],
                    ...typography.body1Bold,
                },
            },
        },

        '&[aria-selected=true]': {
            backgroundColor: palette.primary[50],

            '& .MuiTypography-root': {
                color: palette.primary[500],
                ...typography.body1Bold,
            },

            '& .MuiSvgIcon-root': {
                color: palette.primary[500],
                ...typography.body1Bold,
            },

            '& .MuiCheckbox-root': {
                '& .MuiSvgIcon-root': {
                    ...typography.h3,
                },
            },
        },

        '& .MuiTypography-root': {
            color: palette.ink[500],
            ...typography.body1Regular,
        },
    },

    popupIndicator: {
        color: palette.ink[500],
    },

    clearIndicator: {
        color: palette.ink[500],
    },
};
