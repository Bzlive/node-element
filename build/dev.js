const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./base.js')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 源码调试模式,后面会讲
  devServer: {
    port: 5000,
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://127.0.0.1:43999',
        pathRewrite: { '^/api': '' },
      }
    ],
    client: {
      overlay: false // 不显示打包错误网页
    },
  }
})
