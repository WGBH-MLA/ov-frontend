/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const config = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "./build/index.js",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
  serverModuleFormat: "esm",
};

export default config;