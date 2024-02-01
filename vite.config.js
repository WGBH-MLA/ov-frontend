/**
 * @type {import('@remix-run/dev/config').AppConfig}
*/
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import { unstable_vitePlugin as remix } from "@remix-run/dev";


export default defineConfig({
    plugins: [reactRefresh(), remix({
        appDirectory: "app",
        buildDirectory: "public/build",
        publicPath: "/build/",
        serverBuildFile: "./build/index.js",
        ignoredRouteFiles: [".*"],
        serverModuleFormat: "esm",
    })],
    server: {
        port: 3000,
        host: '0.0.0.0',
        fs: {
            strict: true,
        },
        hmr:
            { overlay: false }
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        },
    },
    esbuild: {
        jsxInject: `import React from 'react'`
    }
})
