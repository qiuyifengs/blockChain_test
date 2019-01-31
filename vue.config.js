var path = require('path')

const PurgecssPlugin = require("purgecss-webpack-plugin")
const glob = require("glob-all"); //If you need multiple paths use the npm package glob-all instead of glob
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV) //是否生产环境
const IS_CDN = false; //是否开启CDN引用
const IS_GZIP = true; //是否开启Gzip压缩
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  lintOnSave: false,
  outputDir: 'dist',
  productionSourceMap: false,
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 将 dist 目录下的文件，作为可访问的文件
    compress: true, // 开启Gzip压缩
    host: '',
    port: 3001,
    open: false,
    https: false,
    hotOnly: false,
    proxy: 'http://192.168.4.188:3001/'
  },
  chainWebpack: config => {
    // 目录别名alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', path.join(__dirname, 'src/assets'))
      .set('@components', path.join(__dirname, 'src/components'))
      .set('@view', path.join(__dirname, 'src/view'))
      .set('@utils', path.join(__dirname, 'src/utils'))
      // 压缩图片
    config.module
      .rule('images')
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()

    // 打包分析
    process.env.NODE_ENV === 'analyz' &&
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    // svg-sprite-loader配置
    // config.module.rules.delete("svg");
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
  },
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = []
      // 去除无效css
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, './src/index.html'),
            path.join(__dirname, './**/*.vue'),
            path.join(__dirname, './src/**/*.js')
          ])
        })
      )
      // 生产环境去除console
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
              drop_console: true, // 删除所有的 `console` 语句
              collapse_vars: true, // 内嵌定义了但是只用到一次的变量
              reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      // 开启Gzip压缩
      if (IS_GZIP) {
        plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8
          })
        )
      }
      config.plugins = [...config.plugins, ...plugins]
    }

    // cdn引用时配置externals
    if (IS_CDN) {
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
      }
    }
  },
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    extract: true, // 允许生成 CSS source maps?
    sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    loaderOptions: {
      // 配置scss全局变量
      sass: {
        data: `@import "@/assets/scss/variable.scss";`
      }
    }, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
    modules: false
  },
  pluginOptions: {}
}
