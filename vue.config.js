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
        //target: "http://192.168.0.167:28500/", 
        //target: "http://172.26.4.51:28500/",
        // target: "http://172.16.1.81:28500/",  //以后常用服务器
        target: "http://192.168.0.167:28500/",
        //target: "http://192.168.43.181:28500/",
        //target: "http://10.0.0.31:28500/",//测绘
        secure: false,
        changeOrigin: true,
      },
      "/api/v1/catalog": {
        //target: "http://192.168.0.167:28500/", 
        //target: "http://172.26.4.51:28500/",
        // target: "http://172.16.1.81:28500/",  //以后常用服务器
        target: "http://192.168.0.167:28500/",
        //target: "http://192.168.43.181:28500/",
        //target: "http://10.0.0.31:28500/",//测绘
        secure: false,
        changeOrigin: true,
      }
    }
  }
};