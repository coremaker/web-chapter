import { MUIComponentOverrides } from './types/StyleOverrides';

export const switchStyle: MUIComponentOverrides['MuiSwitch'] = {
    root: ({ ownerState: { color = 'primary' }, theme: { palette } }) => {
        return {
            color: palette[color][500],
        };
    },
    switchBase: ({ theme: { palette } }) => ({
        color: palette.ink[400],
        '&.Mui-disabled': {
            color: palette.ink[400],
        },
    }),
    track: ({ theme: { palette } }) => ({
        color: palette.ink[200],
        opacity: '0.38!important',
    }),
};
