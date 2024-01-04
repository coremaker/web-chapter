import { ListItemAvatarClasses, ListItemTextClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { palette, typography } from '../themeOptions';

export const listItemTextStyle:
    | Partial<OverridesStyleRules<keyof ListItemTextClasses, 'MuiListItemText', Omit<Theme, 'components'>>>
    | undefined = {
    primary: {
        color: palette.ink[500],
        ...typography.button2,
    },

    secondary: {
        color: palette.ink[500],
        ...typography.overline,
    },
};

export const listItemAvatarStyle:
    | Partial<OverridesStyleRules<keyof ListItemAvatarClasses, 'MuiListItemAvatar', Omit<Theme, 'components'>>>
    | undefined = {
    root: {
        minWidth: 'fit-content',
        marginRight: '0.3rem',
    },
};
