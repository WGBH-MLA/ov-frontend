/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    remix(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
  ],
  server: {
    port: 4000,
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
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
  },
})
