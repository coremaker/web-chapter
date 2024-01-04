import { TabClasses, TabProps, TabsClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { palette, typography } from '../themeOptions';
import { Color } from './types';

export interface CustomTabProps extends TabProps {
    variant?: 'text' | 'outlined' | 'contained' | 'soft';
    color?: Color | string;
}

export const tabsStyle:
    | Partial<OverridesStyleRules<keyof TabsClasses, 'MuiTabs', Omit<Theme, 'components'>>>
    | undefined = {
    indicator: {
        backgroundColor: 'transparent',
    },

    scrollButtons: ({ theme }) => ({
        '&.Mui-disabled': {
            [theme.breakpoints.down(530)]: {
                opacity: 0.3,
            },
        },

        [theme.breakpoints.down(350)]: {
            '&.MuiTabScrollButton-root': {
                width: '1.25rem',
            },
        },
    }),

    scroller: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'fit-content',
    },

    root: {
        display: 'flex',
        alignItems: 'center',
        height: 'fit-content',
        minHeight: '0rem!important',
    },
};

export const tabStyle: Partial<OverridesStyleRules<keyof TabClasses, 'MuiTab', Omit<Theme, 'components'>>> | undefined =
    {
        root: ({ ownerState }: { ownerState: CustomTabProps }) => {
            const variant = ownerState.variant || 'contained';
            const color = (ownerState.color as Color) || 'primary';

            return {
                borderRadius: 12,
                textTransform: 'none',
                padding: '4px 10px',
                opacity: 1,
                minWidth: 'fit-content',
                minHeight: 'fit-content',
                ...typography.button,

                '&.Mui-selected': {
                    color: palette.ink[0],
                    backgroundColor: palette[color][500],
                },

                ...(variant === 'contained' && {
                    backgroundColor: palette[color][500],
                    color: palette.ink[0],

                    '&:hover': {
                        backgroundColor: palette[color][700],
                    },

                    '&.Mui-disabled': {
                        backgroundColor: palette[color][300],
                        color: palette[color][100],
                    },
                }),

                ...(variant === 'outlined' && {
                    backgroundColor: 'transparent',
                    color: palette[color][500],
                    border: `1px solid ${palette[color][500]}`,

                    '&:hover': {
                        backgroundColor: palette[color].tint50,
                    },
                }),

                ...(variant === 'soft' && {
                    backgroundColor: palette[color].tint100,
                    color: palette[color][700],

                    '&:hover': {
                        backgroundColor: palette[color].tint200,
                    },

                    '&.Mui-selected': {
                        backgroundColor: palette[color].tint100,
                        color: palette[color][700],
                    },
                }),

                ...(variant === 'text' && {
                    backgroundColor: 'transparent',
                    color: palette[color][500],

                    '&:hover': {
                        backgroundColor: palette[color].tint100,
                    },

                    '&.Mui-disabled': {
                        color: palette[color][300],
                    },
                }),
            };
        },
    };
