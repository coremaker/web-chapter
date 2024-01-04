import { AvatarClasses, AvatarProps, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { palette, typography } from '../themeOptions';

interface CustomAvatarProps extends AvatarProps {
    size?: 'xl' | 'l' | 'm' | 's';
}

const remDimensionsBySize = {
    s: {
        height: '2rem',
        width: '2rem',
    },
    m: {
        height: '2.5rem',
        width: '2.5rem',
    },
    l: {
        height: '3rem',
        width: '3rem',
    },
    xl: { height: '3.5rem', width: '3.5rem' },
};

export const avatarStyle:
    | Partial<OverridesStyleRules<keyof AvatarClasses, 'MuiAvatar', Omit<Theme, 'components'>>>
    | undefined = {
    colorDefault: {
        backgroundColor: palette.primary[50],
        color: palette.primary[500],
        border: `1px solid ${palette.primary.tint50}`,
        ...typography.body1Bold,
    },

    root: ({ ownerState }: { ownerState: CustomAvatarProps }) => {
        const size = ownerState.size || 'm';

        return {
            border: `1px solid ${palette.primary.tint100}`,
            ...remDimensionsBySize[size],
        };
    },

    img: {
        objectFit: 'cover',
        height: '100%',
    },
};
