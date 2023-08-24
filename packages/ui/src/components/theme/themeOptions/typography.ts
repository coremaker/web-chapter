import {
  TypographyOptions,
  Variant,
} from '@mui/material/styles/createTypography';

import { typographySm } from './typographySm';
import { typographyXs } from './typographyXs';
import { TypographyThemeVariants } from '../types';

type TypographyVariants = Variant | keyof TypographyThemeVariants;

const responsiveFontSizes = (variant: TypographyVariants) => {
  return {
    '@media (max-width:480px)': {
      ...typographySm[variant],
    },

    '@media (max-width:320px)': {
      ...typographyXs[variant],
    },
  };
};

export const typography: TypographyOptions = {
  h1: {
    fontWeight: 700,
    lineHeight: '5.25rem',
    fontSize: '3.5rem',
    ...responsiveFontSizes('h1'),
  },
  h2: {
    fontWeight: 700,
    lineHeight: '3rem',
    fontSize: '2rem',
    ...responsiveFontSizes('h2'),
  },
  h3: {
    fontWeight: 700,
    lineHeight: '2.25rem',
    fontSize: '1.5rem',
    ...responsiveFontSizes('h3'),
  },
  h4: {
    fontWeight: 700,
    lineHeight: '2rem',
    fontSize: '1.25rem',
    ...responsiveFontSizes('h4'),
  },
  h5: {
    fontWeight: 700,
    lineHeight: '1.75rem',
    fontSize: '1.125rem',
    ...responsiveFontSizes('h5'),
  },
  h6: {
    fontWeight: 700,
    lineHeight: '1.5rem',
    fontSize: '1rem',
    ...responsiveFontSizes('h6'),
  },
  body1Regular: {
    fontWeight: 400,
    lineHeight: '1.5rem',
    fontSize: '1rem',
    ...responsiveFontSizes('body1Regular'),
  },
  body1Italic: {
    fontWeight: 400,
    lineHeight: '1.5rem',
    fontSize: '1rem',
    fontStyle: 'italic',
    ...responsiveFontSizes('body1Italic'),
  },
  body1Bold: {
    fontWeight: 700,
    lineHeight: '1.5rem',
    fontSize: '1rem',
    ...responsiveFontSizes('body1Bold'),
  },
  body1Link: {
    fontWeight: 400,
    lineHeight: '1.5rem',
    fontSize: '1rem',
    textDecorationLine: 'underline',
    ...responsiveFontSizes('body1Link'),
  },
  body2Regular: {
    fontWeight: 400,
    lineHeight: '1.25rem',
    fontSize: '0.875rem',
    ...responsiveFontSizes('body2Regular'),
  },
  body2Italic: {
    fontWeight: 400,
    lineHeight: '1.25rem',
    fontSize: '0.875rem',
    fontStyle: 'italic',
    ...responsiveFontSizes('body2Italic'),
  },
  body2Bold: {
    fontWeight: 700,
    lineHeight: '1.25rem',
    fontSize: '0.875rem',
    ...responsiveFontSizes('body2Bold'),
  },
  body2Link: {
    fontWeight: 400,
    lineHeight: '1.25rem',
    fontSize: '0.875rem',
    textDecorationLine: 'underline',
    ...responsiveFontSizes('body2Link'),
  },
  button: {
    fontWeight: 700,
    lineHeight: '1.5rem',
    fontSize: '1rem',
    ...responsiveFontSizes('button'),
  },
  buttonLink: {
    fontWeight: 700,
    lineHeight: '1.5rem',
    fontSize: '1rem',
    textDecorationLine: 'underline',
    ...responsiveFontSizes('buttonLink'),
  },
  button2: {
    fontWeight: 700,
    lineHeight: '1.25rem',
    fontSize: '0.875rem',
    ...responsiveFontSizes('button2'),
  },
  button2Link: {
    fontWeight: 700,
    lineHeight: '1.25rem',
    fontSize: '0.875rem',
    textDecorationLine: 'underline',
    ...responsiveFontSizes('button2Link'),
  },
  caption: {
    fontWeight: 400,
    lineHeight: '1.25rem',
    fontSize: '0.875rem',
    ...responsiveFontSizes('caption'),
  },
  overline: {
    fontWeight: 400,
    lineHeight: '1rem',
    fontSize: '0.75rem',
    textTransform: 'initial',
    letterSpacing: 0,
    ...responsiveFontSizes('overline'),
  },
};
