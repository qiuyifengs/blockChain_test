module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    host: '',
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: ''
  },
  externals: {
    jquery: 'jQuery'
  },
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    extract: true, // 允许生成 CSS source maps?
    sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
    modules: false
  }
}
