import { AlertColor } from '@mui/material';
import { ReactNode } from 'react';

export interface Notification {
    id: string;
    createdAt: Date;
    type: AlertColor;
    open?: boolean;
    title?: string;
    message?: string | ReactNode;
}
