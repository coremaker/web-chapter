import { customShadows, palette, typography } from '../themeOptions';
import { MUIComponentOverrides } from './types/StyleOverrides';

export const tooltipStyle: MUIComponentOverrides['MuiTooltip'] = {
    tooltip: {
        backgroundColor: palette.ink[900],
        borderRadius: '0.75rem',
        padding: '0.625rem 0.8rem',
        boxShadow: customShadows.ink.m,

        '& .MuiTypography-root': {
            ...typography.body2,
            color: palette.ink[50],
        },
    },
    arrow: {
        '::before': {
            backgroundColor: palette.ink[900],
        },
    },
};
