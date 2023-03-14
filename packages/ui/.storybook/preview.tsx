import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import theme from "../src/components/theme/theme";
import React from "react";

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: "light",
		},
		actions: { argTypesRegex: "^on[A-Z].*" },
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
