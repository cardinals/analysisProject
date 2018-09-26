const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  baseUrl: '/',
  outputDir: './docker/dist',
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {
      '/peopleMediate': {
        target: 'http://192.168.22.137:8850',
        changeOrigin: true
      }
    },
    before: app => {}
  }
}
