import { ChipClasses, ChipProps, Theme } from '@mui/material';
import { OverridesStyleRules } from '@mui/material/styles/overrides';

import { palette, typography } from '../themeOptions';
import { Color } from './types';

export const chipStyle:
    | Partial<OverridesStyleRules<keyof ChipClasses, 'MuiChip', Omit<Theme, 'components'>>>
    | undefined = {
    root: ({ ownerState }: { ownerState: ChipProps & Record<string, unknown> }) => {
        const color = (ownerState.color as Color) || 'primary';

        return {
            borderRadius: 12,
            padding: '4px 8px',
            minHeight: '24px',
            ...typography.body2Bold,

            '&.Mui-disabled': {
                backgroundColor: palette[color][300],
                color: palette[color][100],
                opacity: 1,

                '& .MuiSvgIcon-root': {
                    color: palette[color][100],
                },
            },
        };
    },

    label: {
        padding: 0,
    },

    soft: ({ ownerState }: { ownerState: ChipProps & Record<string, unknown> }) => {
        const color = (ownerState.color as Color) || 'primary';

        return {
            color: palette[color][500],
            backgroundColor: palette[color]['tint50'],

            '& .MuiSvgIcon-root': {
                color: palette[color][500],
            },

            '&:hover': {
                color: palette[color][700],
                backgroundColor: palette[color]['tint100'],

                '& .MuiSvgIcon-root': {
                    color: palette[color][700],
                },
            },

            '&.Mui-disabled': {
                backgroundColor: palette[color]['tint50'],
                color: palette[color][300],

                '& .MuiSvgIcon-root': {
                    color: palette[color][300],
                },
            },

            '& .MuiChip-deleteIcon': {
                color: palette[color][500],

                '&:hover': {
                    color: palette[color][500],
                },
            },
        };
    },

    filled: ({ ownerState }: { ownerState: ChipProps & Record<string, unknown> }) => {
        const color = (ownerState.color as Color) || 'primary';

        return {
            color: palette.ink[0],
            backgroundColor: palette[color][500],

            '&:hover': {
                backgroundColor: palette[color][700],
            },

            '&.Mui-disabled': {
                color: palette[color][100],
                backgroundColor: palette[color][300],

                '& .MuiSvgIcon-root': {
                    color: palette[color][100],
                },
            },

            '& .MuiChip-deleteIcon': {
                color: palette.ink[0],
            },
        };
    },

    outlined: ({ ownerState }: { ownerState: ChipProps & Record<string, unknown> }) => {
        const color = (ownerState.color as Color) || 'primary';

        return {
            color: palette[color][500],
            backgroundColor: palette[color]['tint50'],

            '&:hover': {
                backgroundColor: palette[color]['tint100'],
            },

            '&.Mui-disabled': {
                color: palette[color][100],
                backgroundColor: palette[color][300],

                '& .MuiSvgIcon-root': {
                    color: palette[color][100],
                },
            },

            '& .MuiChip-deleteIcon': {
                color: palette[color][500],

                '&:hover': {
                    color: palette[color][500],
                },
            },
        };
    },

    deleteIcon: {
        fontSize: 16,
        marginRight: 0,
        marginLeft: 4,

        '&:hover': {
            backgroundColor: palette.ink.tint50,
            borderRadius: '8px',
        },
    },

    icon: {
        height: 20,
        width: 20,
        marginRight: 4,
        marginLeft: -2,
    },
};
