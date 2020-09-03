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
        target: "http://192.168.0.167:8888/", 
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/catalog": {
        target: "http://192.168.0.167:8880/", 
        secure: false,
        changeOrigin: true,
      }
    }
  }
};