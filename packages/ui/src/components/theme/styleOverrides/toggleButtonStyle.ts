import { typography } from '../themeOptions';
import { MUIComponentOverrides } from './types/StyleOverrides';

const BORDER_RADIUS = '0.75rem';

export const toggleButtonGroupStyle: MUIComponentOverrides['MuiToggleButtonGroup'] = {
    root: ({ theme: { palette, breakpoints } }) => ({
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

        [breakpoints.down('xs')]: {
            flexDirection: 'column',
            height: 'fit-content',
        },
    }),

    grouped: ({ theme: { palette, breakpoints } }) => ({
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

        [breakpoints.down('xs')]: {
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

export const toggleButtonStyle: MUIComponentOverrides['MuiToggleButton'] = {
    root: ({ ownerState: { color = 'primary' }, theme: { palette } }) => {
        return {
            color: palette[color][500],
            opacity: 1,
            border: 'none',
            textTransform: 'capitalize',
            ...typography.button,

            ':hover': {
                backgroundColor: palette[color].tint50,
                color: palette[color][700],
            },

            '&.Mui-disabled': {
                color: palette[color][300],
                border: 'none',
            },

            '&.Mui-selected': {
                color: palette[color][500],
                backgroundColor: palette[color].tint100,
                heigth: '1.25rem',

                ':hover': {
                    backgroundColor: palette[color].tint200,
                    color: palette[color][700],
                },

                '&.Mui-disabled': {
                    color: palette[color][300],
                    backgroundColor: palette[color].tint50,
                },
            },
        };
    },
};
