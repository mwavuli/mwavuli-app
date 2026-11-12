import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Every project's `lint` target runs `eslint .` from its own folder and finds this file above it.
export default defineConfig([
  globalIgnores([
    '**/dist/',
    '**/.astro/',
    '**/.nx/',
    '**/node_modules/',
    '**/coverage/',
    'mobile/*/ios/',
    'mobile/*/android/',
    'mobile/*/vendor/',
    '**/.bundle/',
  ]),

  nx.configs['flat/base'],
  js.configs.recommended,
  tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,mts}'],
    rules: {
      // What a project may import, by tag (each project's tags are in its package.json under "nx").
      //
      // The three personas are disjoint: a persona's code may use the shared packages and nothing else,
      // so no portal can reach into another. A shell may use the personas of its own platform, but only
      // through a dynamic import (see the next block).
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: false,
          allow: [],
          depConstraints: [
            { sourceTag: 'persona:tenant', onlyDependOnLibsWithTags: ['scope:shared'] },
            { sourceTag: 'persona:landlord', onlyDependOnLibsWithTags: ['scope:shared'] },
            { sourceTag: 'persona:ops', onlyDependOnLibsWithTags: ['scope:shared'] },
            { sourceTag: 'type:shell', onlyDependOnLibsWithTags: ['scope:shared', 'type:persona'] },
            { sourceTag: 'scope:shared', onlyDependOnLibsWithTags: ['scope:shared'] },
            // Web code and mobile code never import each other; both may use the shared packages.
            { sourceTag: 'platform:web', onlyDependOnLibsWithTags: ['platform:web', 'scope:shared'] },
            { sourceTag: 'platform:mobile', onlyDependOnLibsWithTags: ['platform:mobile', 'scope:shared'] },
          ],
        },
      ],
    },
  },

  // A shell loads a persona on demand and never imports one statically, so that only the chosen persona
  // is fetched and run. Nx's own check for this does not fire in a pnpm workspace (the dependency in
  // package.json is always a static edge), so the rule is written out: a persona may be named only in
  // `import()`.
  ...['web', 'mobile'].map((platform) => ({
    files: [`${platform}/shell/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-syntax': [
        'error',
        ...['ImportDeclaration', 'ExportAllDeclaration', 'ExportNamedDeclaration'].map((type) => ({
          selector: `${type}[source.value=/^@mwavuli\\/${platform}-(tenant|landlord|ops)(\\/|$)/]`,
          message: 'A persona loads on demand: reach it with a dynamic import() in registry, never a static import.',
        })),
      ],
    },
  })),

  {
    files: ['web/**/*.{ts,tsx}', 'mobile/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },

  {
    files: ['**/*.mjs', '**/scripts/**/*.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },

  // Tool configs that must be CommonJS: Metro, Babel, Tailwind 3 and Jest read them with `require`.
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },

  // Jest mock factories run before imports exist, so they use require().
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },

  // Last, so it switches off the formatting rules that Prettier owns.
  prettier,
]);
