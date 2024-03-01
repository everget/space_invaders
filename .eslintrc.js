module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: [
		'eslint-config-prettier',
		'eslint:recommended',
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/stylistic',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'import'],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	rules: {
		'lines-between-class-members': 'off',
		'no-underscore-dangle': 'off',
		'no-plusplus': 'off',
		'import/prefer-default-export': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': [
			'off',
			{ devDependencies: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}'] },
		],
	},
};
