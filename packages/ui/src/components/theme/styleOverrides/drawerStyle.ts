import { blurEffects } from '../themeOptions';
import { MUIComponentOverrides } from './types/StyleOverrides';

export const DRAWER_WIDTH = '16.25rem';

export const drawerStyle: MUIComponentOverrides['MuiDrawer'] = {
    docked: {
        width: `${DRAWER_WIDTH}rem`,
        flexShrink: 0,
    },

    modal: ({ theme: { palette } }) => ({
        '& .MuiBackdrop-root': {
            backgroundColor: palette.charcoal[500],
            backdropFilter: blurEffects.backdropFilter.s,
        },
    }),

    paper: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        boxSizing: 'border-box',
    },
};
