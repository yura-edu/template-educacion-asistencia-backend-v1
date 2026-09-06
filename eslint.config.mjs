import sonarjs from 'eslint-plugin-sonarjs'
import tseslint from 'typescript-eslint'

// Yura's technical-debt instrumentation. NOT this project's linter.
//
// The reusable workflow `yura-edu/ci-workflows` tariffs `sonarjs/...` violations
// over the PR's NEW lines to compute the debt index, and it needs an ESLint
// config to do it — a repo without one reports `debt: null` forever.
//
// Only the sonarjs plugin is loaded, on purpose: `rule-effort.yaml` tariffs
// sonarjs rules and nothing else, so anything more would produce noise that
// costs zero minutes and would fight whatever linter the project actually uses
// (see the `lint` script in package.json). Do not add formatting or stylistic
// rules here.
//
// `files` and the TS parser are explicit: ESLint 9's flat config lints only
// plain `.js` by default, so without them this config reports zero findings on
// a TypeScript repo and the debt looks like zero instead of unmeasured.
export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage', 'prisma'] },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    extends: [sonarjs.configs.recommended],
    languageOptions: { parser: tseslint.parser },
  },
)
