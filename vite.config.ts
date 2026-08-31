import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import { themeVariable } from './src/shared/utils/themeVariable';

export default (config: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(config.mode, process.cwd()) };
  const currentTheme = themeVariable(process.env.VITE_THEME_REALM as string);

  return defineConfig({
    plugins: [vue(), tailwindcss(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@theme': path.resolve(__dirname, `theme/${currentTheme}`),
      },
    },
    server: { port: 8080 },
    preview: { port: 8080 },
    build: { target: 'esnext' },
  });
};
