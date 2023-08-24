import { Theme, TooltipClasses } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { customShadows, palette, typography } from '../themeOptions';

export const tooltipStyle:
    | Partial<OverridesStyleRules<keyof TooltipClasses, 'MuiTooltip', Omit<Theme, 'components'>>>
    | undefined = {
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
