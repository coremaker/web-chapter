import { BreadcrumbsClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { palette, typography } from '../themeOptions';

export const breadcrumbsStyle:
  | Partial<
      OverridesStyleRules<
        keyof BreadcrumbsClasses,
        'MuiBreadcrumbs',
        Omit<Theme, 'components'>
      >
    >
  | undefined = {
  li: {
    color: palette.ink[500],
    ...typography.body1Regular,

    '.MuiTypography-root': {
      color: palette.ink[500],
      ...typography.body1Regular,
    },

    '& .MuiLink-root': {
      textDecoration: 'none',
    },

    '& .active': {
      color: palette.ink[500],
      ...typography.body1Bold,
    },
  },

  separator: {
    color: palette.ink[900],
  },

  ol: {
    '& .MuiButtonBase-root': {
      height: '2rem',
      width: '2.75rem',
      borderRadius: '0.25rem',
      backgroundColor: palette.ink.tint50,
      color: palette.ink[500],
      padding: '0.5rem 0.125rem',
      margin: 0,

      '& .MuiSvgIcon-root': {
        color: palette.ink[500],
        width: '1.75rem',
        height: '1.75rem',
      },
    },
  },
};
