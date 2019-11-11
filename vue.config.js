module.exports = {
  //解决静态资源404
  //  baseUrl: '/',   //根路径
  publicPath:"./",
  outputDir: 'dist', // 打包的目录 构建输出目录
  // pages:{
  //   index:{
  //     entry:""
  //   }
  // }
  assetsDir: 'assets', //静态资源目录(js.css.img.fonts)
  // lintOnSave: true, // 在保存时校验格式 是否开启eslint保存检测 true false error
  // productionSourceMap: false, // 生产环境是否生成 SourceMap
  // configureWebpack: {
  //   devtool: 'source-map'
  // },
  lintOnSave: false,
  // 反向代理
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://vuets-api.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  },
  //报错资源(asset)和入口起点超过指定文件限制
  configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints: false
    }

    //或者

    //警告 webpack 的性能提示
    // performance: {
    //   hints: 'warning',
    //   //入口起点的最大体积
    //   maxEntrypointSize: 50000000,
    //   //生成文件的最大体积
    //   maxAssetSize: 30000000,
    //   //只给出 js 文件的性能提示
    //   assetFilter: function (assetFilename) {
    //     return assetFilename.endsWith('.js');
    //   }
    // }
  }

};