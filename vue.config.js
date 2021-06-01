const path = require('path')

module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/style/define.scss')
      ]
    }
  }
}
