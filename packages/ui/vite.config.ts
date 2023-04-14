import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
	plugins: [react(), tsConfigPaths(), dts()],
	resolve: {
		alias: {
			src: resolve(__dirname, "src"),
		},
	},
	build: {
		emptyOutDir: false,
		outDir: "dist",
		lib: {
			entry: {
				index: resolve("src", "index.ts"),
				usePagination: resolve("src/hooks/usePagination", "index.ts"),
			},
			name: "@web-chapter/ui",
			formats: ["es", "cjs"],
			fileName: (format, entryName) => `${entryName}.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
}));
