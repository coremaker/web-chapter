import { Theme, ToggleButtonClasses, ToggleButtonGroupClasses, ToggleButtonProps } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { palette, typography } from '../themeOptions';
import { Color } from './types/PaletteTheme';

const BORDER_RADIUS = '0.75rem';

export const toggleButtonGroupStyle:
    | Partial<OverridesStyleRules<keyof ToggleButtonGroupClasses, 'MuiToggleButtonGroup', Omit<Theme, 'components'>>>
    | undefined = {
    root: ({ theme }) => ({
        backgroundColor: palette.surface[50],
        border: `1px solid ${palette.surface[300]}`,
        borderRadius: BORDER_RADIUS,
        display: 'flex',
        alignItems: 'center',
        height: '2.5rem',

        '&.error': {
            border: 'transparent',
            boxShadow: `0 0 0 2px ${palette.danger[500]}`,
        },

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            height: 'fit-content',
        },
    }),

    grouped: ({ theme }) => ({
        height: '2.25rem',
        position: 'relative',
        display: 'inline-block',
        marginRight: '0.5rem',
        borderRadius: BORDER_RADIUS,

        '&:not(:last-of-type):after': {
            content: '""',
            position: 'absolute',
            right: '-0.25rem',
            bottom: '0.125rem',
            height: '80%',
            borderRight: `1px solid ${palette.surface[300]}`,
        },

        '&:not(:first-of-type)': {
            borderRadius: BORDER_RADIUS,
        },

        '&:first-of-type': {
            borderRadius: BORDER_RADIUS,
            marginLeft: '0.0625rem',
        },

        '&:last-of-type': {
            marginRight: '0.0625rem',
        },

        [theme.breakpoints.down('xs')]: {
            '&:not(:last-of-type):after': {
                content: 'none',
            },

            '&:first-of-type': {
                marginLeft: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            },

            '&:last-of-type': {
                marginRight: 0,
                borderBottomLeftRadius: `${BORDER_RADIUS}!important`,
                borderBottomRightRadius: `${BORDER_RADIUS}!important`,
            },

            '&:not(:first-of-type)': {
                borderRadius: 0,
            },

            marginRight: 0,
        },
    }),
};

export const toggleButtonStyle:
    | Partial<OverridesStyleRules<keyof ToggleButtonClasses, 'MuiToggleButton', Omit<Theme, 'components'>>>
    | undefined = {
    root: ({
        ownerState,
        theme,
    }: {
        ownerState: ToggleButtonProps & Record<string, unknown>;
        theme: Omit<Theme, 'components'>;
    }) => {
        const color = (ownerState.color as Color) || 'primary';

        return {
            color: theme.palette[color][500],
            opacity: 1,
            border: 'none',
            textTransform: 'capitalize',
            ...typography.button,

            ':hover': {
                backgroundColor: theme.palette[color].tint50,
                color: theme.palette[color][700],
            },

            '&.Mui-disabled': {
                color: theme.palette[color][300],
                border: 'none',
            },

            '&.Mui-selected': {
                color: theme.palette[color][500],
                backgroundColor: theme.palette[color].tint100,
                heigth: '1.25rem',

                ':hover': {
                    backgroundColor: theme.palette[color].tint200,
                    color: theme.palette[color][700],
                },

                '&.Mui-disabled': {
                    color: theme.palette[color][300],
                    backgroundColor: theme.palette[color].tint50,
                },
            },
        };
    },
};
