import { DrawerClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { blurEffects, palette } from '../themeOptions';

export const DRAWER_WIDTH = 16.25;

export const drawerStyle:
    | Partial<OverridesStyleRules<keyof DrawerClasses, 'MuiDrawer', Omit<Theme, 'components'>>>
    | undefined = {
    docked: {
        width: `${DRAWER_WIDTH}rem`,
        flexShrink: 0,
    },

    modal: {
        '& .MuiBackdrop-root': {
            backgroundColor: palette.charcoal[500],
            backdropFilter: blurEffects.backdropFilter.s,
        },
    },

    paper: {
        width: `${DRAWER_WIDTH}rem`,
        flexShrink: 0,
        boxSizing: 'border-box',
    },
};
