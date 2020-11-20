const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/shared/components/svg-icon/svgs"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/shared/components/svg-icon/svgs"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]"
      })
      .end();
  },
  devServer: {
    proxy: {
      "/api/v1/retrieval": {
        target: "http://172.16.1.81:28500",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/catalog": {
        target: "http://172.16.1.81:28500",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/meta": {
        target: "http://172.16.1.81:28500",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/api": {
        target: "http://172.16.1.81:28000",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/dataflow": {
        target: "http://172.16.1.81:28500/",
        secure: false,
        changeOrigin: true,
      },
    }
  }
};