module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: false,
  chainWebpack: () => {},
  configureWebpack: () => {},
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {
      '/peopleMediate': {
        // target: 'http://139.224.131.57:8888',
        target: 'http://192.168.22.137:8860',
        changeOrigin: true
      }
    },
    before: app => {}
  }
}
