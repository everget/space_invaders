/**
 * @type {import('prettier').Options}
 **/
module.exports = {
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	printWidth: 100,
	plugins: [
		// 'prettier-plugin-tailwindcss',
		// 'prettier-plugin-astro',
	],
	overrides: [
		{
			files: ['*.{json,md,yml,yaml}'],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
		{
			files: [
				'prettier.config.js',
				'husky.config.js',
				'lint-staged.config.js',
				'.remarkrc.js',
				'.eslintrc.js',
			],
			options: {
				printWidth: 80,
			},
		},
		// {
		// 	files: '*.astro',
		// 	options: {
		// 		parser: 'astro',
		// 	},
		// },
	],
};
