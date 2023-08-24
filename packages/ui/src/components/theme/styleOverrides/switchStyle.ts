import { SwitchClasses, SwitchProps, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';
import { Color } from './types/PaletteTheme';
import { palette } from '../themeOptions';

export const switchStyle:
  | Partial<
      OverridesStyleRules<
        keyof SwitchClasses,
        'MuiSwitch',
        Omit<Theme, 'components'>
      >
    >
  | undefined = {
  root: ({
    ownerState,
  }: {
    ownerState: SwitchProps & Record<string, unknown>;
  }) => {
    const color = (ownerState.color as Color) || 'primary';

    return {
      color: palette[color][500],
    };
  },
  switchBase: {
    color: palette['ink'][400],
    '&.Mui-disabled': {
      color: palette['ink'][400],
    },
  },
  track: {
    color: palette['ink'][200],
    opacity: '0.38!important',
  },
};
