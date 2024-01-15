import { typography } from '../themeOptions';
import { MUIComponentOverrides } from './types/StyleOverrides';

export const listItemTextStyle: MUIComponentOverrides['MuiListItemText'] = {
    primary: ({ theme: { palette } }) => ({
        color: palette.ink[500],
        ...typography.button2,
    }),

    secondary: ({ theme: { palette } }) => ({
        color: palette.ink[500],
        ...typography.overline,
    }),
};

export const listItemAvatarStyle: MUIComponentOverrides['MuiListItemAvatar'] = {
    root: {
        minWidth: 'fit-content',
        marginRight: '0.3rem',
    },
};
