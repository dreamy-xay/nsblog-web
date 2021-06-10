/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-11 00:13:09
 */
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
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/define";` //引入全局变量
      }
    }
  }
}
