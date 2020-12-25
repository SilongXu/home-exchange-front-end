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
        // target: "http://192.168.43.181:28500",
        target: "http://172.29.202.51:28500/",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/catalog": {
        // target: "http://192.168.43.181:28500",
        target: "http://172.29.202.51:28500/",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/meta": {
        // target: "http://192.168.43.181:28500",
        target: "http://172.29.202.51:28500/",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/api": {
        // target: "http://192.168.43.181:28500",
        target: "http://172.29.202.51:28500/",
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/dataflow": {
        // target: "http://192.168.43.181:28500/",
        target: "http://172.29.202.51:28500/",
        secure: false,
        changeOrigin: true,
      },
    }
  }
};