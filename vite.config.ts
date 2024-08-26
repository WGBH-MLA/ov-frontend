/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import Sitemap from 'vite-plugin-sitemap'
import mpaPlugin from 'vite-plugin-mpa';

// @ts-expect-error
const mpa = mpaPlugin.default;

export default defineConfig({
  plugins: [
    remix(),
    legacy({
      targets: ['>= 0%'],
    }),
    // mpa({open: './app/root.jsx', scanDir: '.'}),
    Sitemap({
      hostname: 'https://openvault.wgbh.org',
      outDir: 'build',
      robots: [{ userAgent: '*', disallow: ['/catalog'] }],
      dynamicRoutes: ['/exhibits', '/collections'],
    }),
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
