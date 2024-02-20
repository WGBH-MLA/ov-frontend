/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        })
      },
    },
    react(),
  ],
  server: {
    port: 1234,
    host: '0.0.0.0',
    //     fs: {
    //         strict: true,
    //     },
    //     hmr:
    //         { overlay: false }
    // },
    // css: {
    //     modules: {
    //         localsConvention: 'camelCaseOnly',
    //     },
    // },
    // esbuild: {
    //   //   jsxInject: `import React from 'react'`,
    //   loader: { '.js': 'jsx' },
    // },
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
