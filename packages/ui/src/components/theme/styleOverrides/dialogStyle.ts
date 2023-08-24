import { DialogClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { palette, blurEffects, typography } from '../themeOptions';

export const dialogStyle:
  | Partial<
      OverridesStyleRules<
        keyof DialogClasses,
        'MuiDialog',
        Omit<Theme, 'components'>
      >
    >
  | undefined = {
  root: {
    '& .MuiBackdrop-root': {
      backgroundColor: palette.charcoal[500],
      backdropFilter: blurEffects.backdropFilter.s,
    },
  },

  paper: {
    width: '37.5rem',
    borderRadius: '0.75rem',

    '& .MuiDialogTitle-root': {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '4rem',
      borderBottom: `1px solid ${palette.surface[300]}`,

      '& .MuiTypography-root': {
        ...typography.h3,
      },

      '& .MuiIconButton-root': {
        position: 'absolute',
        right: 10,
      },
    },

    '& .MuiDialogContent-root': {
      padding: '2rem!important',
    },

    '& .MuiDialogActions-root': {
      borderTop: `1px solid ${palette.surface[300]}`,
      height: '4rem',
    },
  },
};
