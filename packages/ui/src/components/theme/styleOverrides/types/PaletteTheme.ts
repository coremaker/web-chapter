import { Interpolation, Theme } from '@mui/material';

export interface VariantObject {
    props: Partial<unknown>;
    style: Interpolation<{
        theme: Theme;
    }>;
}

export type Color = 'danger' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'ink';
