module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:storybook/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.base.json',
    },
    plugins: ['react', 'prettier', '@typescript-eslint'],
    rules: {
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
                devDependencies: ['**/*.test.tsx', '**/*.test.ts'],
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
