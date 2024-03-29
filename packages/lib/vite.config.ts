/// <reference types="vitest" />

import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
	plugins: [tsConfigPaths(), dts()],
	resolve: {
		alias: {
			src: resolve(__dirname, "src"),
		},
	},
	test: {
		globals: true,
		mockReset: true,
	},
	build: {
		lib: {
			entry: resolve("src", "index.ts"),
			name: "@web-chapter/lib",
			formats: ["es", "umd"],
			fileName: (format) => `lib.${format}.js`,
		},
	},
}));
