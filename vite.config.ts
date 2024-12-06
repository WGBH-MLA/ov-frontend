/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import jsconfigPaths from 'vite-jsconfig-paths'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_relativeSplatPath: true,
      },
    }),
    legacy({
      targets: ['>= 0%'],
    }),
    jsconfigPaths(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    fs: {
      strict: true,
    },
    hmr: { overlay: false },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
