const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  chainWebpack(config) {
    // set svg-sprite-loader
    // 第一步：让其他svg loader不要对src/assets/imgs/svgs进行操作
    config.module
      .rule("svg")
      .exclude.add(resolve("src/shared/svg-icon/svgs"))
      .end();
    // 第二步：使用svg-sprite-loader 对 src/shared/svg-icon/svgs 下的svg进行操作
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/shared/svg-icon/svgs"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      //定义规则 使用时 <svg class="icon"> <use xlink:href="#svg文件名"></use>  </svg>
      .options({
        symbolId: "[name]"
      })
      .end();
  }
};