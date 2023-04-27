module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:storybook/recommended",
		"plugin:jsx-a11y/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	
	plugins: ["react", "prettier", "@typescript-eslint"],
	rules: {
		"react/jsx-props-no-spreading": 0,
		"react/function-component-definition": [
			2,
			{
				namedComponents: "arrow-function",
			},
		],
		"jsx-a11y/anchor-is-valid": [
			"error",
			{
				components: [],
			},
		],
		"import/prefer-default-export": "off",
		"import/no-extraneous-dependencies": [
			"error",
			{
				peerDependencies: true,
				devDependencies: [
					"**/*.test.tsx",
					"**/*.test.ts",
					"**/*.stories.*",
					"**/.storybook/**/*.*",
				],
			},
		],
		"react/react-in-jsx-scope": 0,
		"react/require-default-props": 0,
		"import/extensions": 0,
		"jsx-a11y/label-has-associated-control": [
			2,
			{
				depth: 1,
			},
		],
		"@typescript-eslint/no-unused-vars": "error",
	},
};
