const pnpmLockCmd = 'pnpm install --frozen-lockfile';

module.exports = {
	hooks: {
		// Instead of running "pnpm commit" or "pnpm cz" scripts:
		// 'prepare-commit-msg': 'exec < /dev/tty && npx cz --hook || true',

		'pre-commit': 'lint-staged',
		'pre-push': 'pnpm test',

		'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${pnpmLockCmd}; fi`,
		'post-merge': pnpmLockCmd,
		'post-rebase': 'pnpm install',
	},
};
