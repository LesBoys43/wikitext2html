import {defineConfig} from 'tsup';

export default defineConfig([
	{
		entry: ['src/index.ts'],
		target: 'es2017',
		outDir: 'dist',
		clean: true,
		dts: true,
		format: ['esm', 'cjs'],
		sourcemap: false,
		splitting: false,
		treeshake: false,
	},
	{
		entry: ['src/index.ts'],
		target: 'es2017',
		outDir: 'dist',
		clean: false,
		dts: false,
		format: ['esm', 'cjs'],
		sourcemap: false,
		splitting: false,
		treeshake: false,
		minify: true,
		outExtension({format}) {
			return {js: format === 'esm' ? '.min.js' : '.min.cjs'};
		},
	},
]);
