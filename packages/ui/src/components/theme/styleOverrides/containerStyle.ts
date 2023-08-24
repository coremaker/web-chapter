import { ContainerClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

export const containerStyle:
  | Partial<
      OverridesStyleRules<
        keyof ContainerClasses,
        'MuiContainer',
        Omit<Theme, 'components'>
      >
    >
  | undefined = {
  maxWidthSm: ({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      maxWidth: '35rem',
      margin: '0rem 4rem',
      padding: 0,
    },

    [theme.breakpoints.down('md')]: {
      padding: 0,
      margin: '0rem 4rem',
    },

    [theme.breakpoints.down('xs')]: {
      padding: '0rem 2rem',
      margin: 0,
    },
  }),
};
