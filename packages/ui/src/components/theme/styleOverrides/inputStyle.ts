import { OverridesStyleRules } from '@mui/material/styles/overrides';
import { OutlinedInputClasses, Theme } from '@mui/material';

import { palette, typography } from '../themeOptions';

export const muiOutlinedInputStyle:
  | Partial<
      OverridesStyleRules<
        keyof OutlinedInputClasses,
        'MuiOutlinedInput',
        Omit<Theme, 'components'>
      >
    >
  | undefined = {
  root: {
    borderRadius: 12,
    backgroundColor: palette.surface[100],
    border: `2px solid ${palette.surface[100]}`,

    '&:hover': {
      backgroundColor: palette.surface[200],
    },

    '&:active': {
      backgroundColor: palette.surface[200],
      border: `2px solid ${palette.primary[500]}`,
      caretColor: palette.primary[500],
    },

    '&.Mui-focused': {
      backgroundColor: palette.surface[200],
      border: `2px solid ${palette.ink[500]}`,
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: 'transparent',
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      backgroundColor: palette.surface[100],
      userSelect: 'none',

      '&:active': {
        border: 'transparent',
      },
    },

    '&.Mui-error': {
      caretColor: palette.danger[500],
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'transparent',
        boxShadow: `0 0 0 2px ${palette.danger[500]}`,
      },

      '&.Mui-focused': {
        border: 'none',
      },
    },

    '& .MuiIconButton-root': {
      borderRadius: '8px',
      padding: '2px',

      ':hover': {
        backgroundColor: palette.ink.tint50,
      },

      '& .MuiSvgIcon-root': {
        color: palette.ink[500],

        ':hover': {
          color: palette.ink[700],
        },
      },

      '&.Mui-disabled': {
        '& .MuiSvgIcon-root': {
          color: palette.ink[300],
        },
      },
    },
  },
  input: {
    ...typography.body1Regular,
    color: palette.ink[500],

    '&::placeholder': {
      color: palette.ink[300],
      opacity: 1,
    },
  },
};
