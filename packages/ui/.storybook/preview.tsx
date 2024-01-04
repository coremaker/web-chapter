import { ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react';
import React from 'react';

import { theme } from '../src/components/theme';

const preview: Preview = {
    parameters: {
        backgrounds: {
            default: 'light',
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    ),
];

export default preview;
