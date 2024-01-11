import { TabProps } from '@mui/material';

import { typography } from '../themeOptions';
import { Color } from './types';
import { MUIComponentOverrides } from './types/StyleOverrides';

export interface CustomTabProps extends TabProps {
    variant?: 'text' | 'outlined' | 'contained' | 'soft';
    color?: Color | string;
}

export const tabsStyle: MUIComponentOverrides['MuiTabs'] = {
    indicator: {
        backgroundColor: 'red',
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

export const tabStyle: MUIComponentOverrides['MuiTab'] = {
    root: ({ ownerState, theme }) => {
        const variant = ownerState.variant || 'contained';
        const color = (ownerState.color as Color) || 'primary';
        const { palette } = theme;
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
