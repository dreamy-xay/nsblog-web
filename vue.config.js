/*
 * @Description: vue config
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:25:41
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-12 10:56:28
 */

const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  // 基本路径
  // publicPath: '/',

  // 输出文件目录
  // outputDir: 'dist',

  // 设置放置打包生成的静态资源 (js、css、img、fonts) 的目录
  // assetsDir: '',

  // 环境配置
  devServer: {
    host: 'localhost',

    port: process.env.VUE_APP_PORT,

    // 是否开启https
    https: false,

    // 编译完是否打开网页
    open: true,

    // 代理配置
    proxy: {
      '/v1': {
        target: `${process.env.VUE_APP_APIHOST}:${process.env.VUE_APP_APIPORT}/`,
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/v1': ''
        }
      }
    },

    // 请求拦截
    before: require('./mock/sever-app').default
  },

  // webpack配置
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias.set('@', resolve('src'));
  },

  // 插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/style/define.scss')]
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/style/define';` //引入全局变量
      }
    }
  }
};
