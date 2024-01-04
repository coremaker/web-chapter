import { MenuClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { customShadows, palette, typography } from '../themeOptions';

export const menuStyle:
    | Partial<OverridesStyleRules<keyof MenuClasses, 'MuiMenu', Omit<Theme, 'components'>>>
    | undefined = {
    paper: {
        backgroundColor: palette.surface[0],
        boxShadow: customShadows.ink.m,

        '& .MuiMenuItem-root': {
            ...typography.body1Regular,
            color: palette.ink[500],
            whiteSpace: 'unset',

            '& .MuiListItemText-root.itemText .MuiTypography-root': {
                ...typography.body1Regular,
                color: palette.ink[500],
            },

            '&:hover': {
                backgroundColor: palette.ink[50],
                color: palette.ink[700],
                ...typography.body1Regular,

                '& .MuiListItemText-primary': {
                    color: palette.ink[700],
                },

                '& .MuiSvgIcon-root': {
                    color: palette.ink[700],
                },

                '& .MuiListItemText-root.itemText .MuiTypography-root': {
                    ...typography.body1Regular,
                    color: palette.ink[700],
                },
            },
        },

        '& .Mui-selected': {
            backgroundColor: palette.primary[50],
            color: palette.primary[500],
            ...typography.body1Bold,

            '&.Mui-disabled': {
                backgroundColor: palette.primary.tint50,
                color: palette.primary[300],
                opacity: 1,

                '& .MuiSvgIcon-root': {
                    color: palette.primary[300],
                },
            },

            '&:hover': {
                backgroundColor: palette.primary[100],
                color: palette.primary[700],
                ...typography.body1Bold,

                '& .MuiSvgIcon-root': {
                    color: palette.primary[700],
                },
            },
        },
    },

    list: {
        padding: 0,
    },
};
