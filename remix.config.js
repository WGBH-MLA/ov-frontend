/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const config = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"]
};

export default config;