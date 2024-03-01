const { quote } = require('shell-quote');
const isWin = process.platform === 'win32';

function escape(str) {
	const escaped = quote(str);
	return escaped.replace(/\\@/g, '@');
}

function escapeFileNames(filenames) {
	return filenames
		.map((filename) => (isWin ? filename : escape([filename])))
		.join(' ');
}

module.exports = {
	'*.{ts,tsx,js,jsx,mts,mtsx,mjs,mjsx,cts,ctsx,cjs,cjsx}': (filenames) => {
		return [
			'pnpm format-staged',
			'pnpm types-check',
			'pnpm lint-js-fix',
			'vitest related --run --bail 1 --coverage=false',
			`git add ${escapeFileNames(filenames)}`,
		];
	},

	'*.{css,scss,sass,less,styl}': (filenames) => {
		return [
			'pnpm format-staged',
			'stylelint --cache --fix',
			`git add ${escapeFileNames(filenames)}`,
		];
	},

	'*.{json,yml,yaml}': (filenames) => {
		return ['pnpm format-staged', `git add ${escapeFileNames(filenames)}`];
	},

	'*.{md}': (filenames) => {
		return [
			'pnpm format-staged',
			'pnpm lint-md-fix',
			`git add ${escapeFileNames(filenames)}`,
		];
	},
};
