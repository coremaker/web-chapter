import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => ({
    plugins: [react(), tsConfigPaths(), dts()],
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
    build: {
        lib: {
            entry: resolve('src', 'index.ts'),
            name: '@web-chapter/ui',
            formats: ['es', 'umd'],
            fileName: (format, entryName) => `${entryName}.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', '@mui/material/styles/overrides'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['src/setupTests.ts'],
        mockReset: true,
        coverage: {
            provider: 'c8',
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.test.{ts,tsx}', 'src/setupTests.ts'],
        },
    },
}));
