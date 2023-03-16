import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	optimizeDeps: {
		exclude: ['vscode'],
	},
	esbuild: {
		pure: ['console'],
	},
	build: {
		lib: {
			entry: 'src/main.ts',
			name: 'tailwind-config-viewer-client',
		},
		target: 'es2022',
		emptyOutDir: true,
		outDir: '../client-build',

		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].js',
				chunkFileNames: 'assets/[name].js',
				assetFileNames: 'assets/[name].[ext]',
			},
		},
	},
	resolve: {
		alias: {
			'@src': fileURLToPath(new URL('src', import.meta.url)),
		},
	},
});