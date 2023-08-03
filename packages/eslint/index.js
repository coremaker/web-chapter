module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    ignorePatterns: ['**/eslint/index.js'],
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
        'plugin:storybook/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',

    plugins: ['react', 'prettier', '@typescript-eslint', 'repo-structure'],
    settings: {
        'repo-structure/config-path': '.repo-structurerc.js',
    },
    rules: {
        'repo-structure/file-structure': 0,
        'react/jsx-props-no-spreading': 0,
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
            },
        ],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: [],
            },
        ],
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                peerDependencies: true,
                devDependencies: [
                    '**/*.test.tsx',
                    '**/*.test.ts',
                    '**/*.stories.*',
                    '**/setupTests.ts',
                    '**/vite.config.ts',
                    '**/.storybook/**/*.*',
                ],
            },
        ],
        'react/react-in-jsx-scope': 0,
        'react/require-default-props': 0,
        'import/extensions': 0,
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                depth: 1,
            },
        ],
        '@typescript-eslint/no-unused-vars': 'error',
    },
};
