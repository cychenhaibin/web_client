const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  publicPath: '/',  // 根域上下文目录
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false,
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: true,
  configureWebpack(config) {
    if(debug){
      config.devtool = 'cheap-module-source-map'
    }else{
      // 生产环境的配置...
    }
  },
  chainWebpack: config => {
    if(debug){
      // 开发环境的配置...
    }else {
      // 生产环境的配置...
    }
  },
  parallel: require('os').cpus().length > 1,
  pluginOptions: {

  },
  pwa: {

  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    hot: true, // 启用热模块替换
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    onBeforeSetupMiddleware: (app, server) => {
      // 在这里添加你的自定义中间件逻辑
    }
  }
}