/// <reference types="vitest" />
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		globals: true,
		setupFiles: ['./vitest.setup.ts'],
		environment: 'jsdom',
		server: {
			deps: {
				inline: ['vitest-canvas-mock'],
			},
		},
		// For this config, check https://github.com/vitest-dev/vitest/issues/740
		// threads: false,
		environmentOptions: {
			jsdom: {
				resources: 'usable',
			},
		},
	},
});
