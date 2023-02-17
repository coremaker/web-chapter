import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// import EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
// const { EsLinter, linterPlugin } = EsLint;
import * as packageJson from "./package.json";
// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
	plugins: [
		react(),
		tsConfigPaths(),
		// linterPlugin({
		// 	include: ["./src}/**/*.{ts,tsx}"],
		// 	linters: [new EsLinter({ configEnv })],
		// }),
		dts({
			include: ["src/components/"],
		}),
	],
	resolve: {
		alias: {
			// "@material-ui": resolve("../../node_modules/@material-ui"),
			// "@emotion/styled": resolve("../../node_modules/@emotion/styled"),
			"@emotion/core": resolve("../../node_modules/@emotion/react"),
			"emotion-theming": resolve("../../node_modules/@emotion/react"),
		},
	},
	build: {
		lib: {
			entry: resolve("src", "components/index.ts"),
			name: "@web-chapter/ui",
			formats: ["es", "umd"],
			fileName: (format) => `ui.${format}.js`,
		},
		// rollupOptions: {
		// 	external: [...Object.keys(packageJson.peerDependencies)],
		// },
	},
}));
