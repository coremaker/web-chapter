import { IconButtonClasses, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

export const iconButtonStyle:
  | Partial<
      OverridesStyleRules<
        keyof IconButtonClasses,
        'MuiIconButton',
        Omit<Theme, 'components'>
      >
    >
  | undefined = {
  root: {
    borderRadius: '0.75rem',
  },
};
