/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import jsconfigPaths from 'vite-jsconfig-paths'
import tsconfigPaths from 'vite-tsconfig-paths'

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true
  }
}

export default defineConfig({
  plugins: [
    reactRouter({
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_routeConfig: true,
        v3_singleFetch: true,
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
})
