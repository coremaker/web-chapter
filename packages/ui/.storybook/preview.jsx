import React from "react";
import { ThemeProvider } from "@mui/material";
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

import theme from "../src/components/theme/theme";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	(Story) => (
		<Emotion10ThemeProvider theme={theme}>
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		</Emotion10ThemeProvider>
	),
];
