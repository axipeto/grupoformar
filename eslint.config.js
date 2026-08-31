import antfu from '@antfu/eslint-config';
import importX from 'eslint-plugin-import-x';

// O plugin "import" registrado pelo @antfu/eslint-config é o eslint-plugin-import-lite,
// que não implementa `no-restricted-paths`. Registramos o eslint-plugin-import-x (namespace
// "import-x") só para essa regra de desacoplamento de módulos (seção 4 do CLAUDE.md).
export default antfu(
  {
    vue: true,
    markdown: false,
    stylistic: { indent: 2, quotes: 'single', semi: true },
    ignores: ['dist', 'node_modules', 'public'],
  },
  {
    files: ['**/*.ts', '**/*.mts', '**/*.tsx', '**/*.vue'],
    plugins: {
      'import-x': importX,
    },
    rules: {
      'node/prefer-global/process': 'off',
      'style/quote-props': 'off',
      'unused-imports/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^(_|props$|emit$)',
      }],
      '@typescript-eslint/naming-convention': ['error', { selector: 'interface', format: ['PascalCase'] }],
      // desacoplamento de módulos (seção 4)
      'import-x/no-restricted-paths': ['error', {
        zones: [
          { target: './src/shared', from: './src/modules' },
          { target: './src/domain', from: './src/modules' },
          { target: './src/networking', from: './src/modules' },
          { target: './src/modules/home', from: './src/modules/about' },
          { target: './src/modules/home', from: './src/modules/units' },
          { target: './src/modules/home', from: './src/modules/contact' },
          { target: './src/modules/about', from: './src/modules/home' },
          { target: './src/modules/about', from: './src/modules/units' },
          { target: './src/modules/about', from: './src/modules/contact' },
          { target: './src/modules/units', from: './src/modules/home' },
          { target: './src/modules/units', from: './src/modules/about' },
          { target: './src/modules/units', from: './src/modules/contact' },
          { target: './src/modules/contact', from: './src/modules/home' },
          { target: './src/modules/contact', from: './src/modules/about' },
          { target: './src/modules/contact', from: './src/modules/units' },
        ],
      }],
    },
  },
);
