/*
 * @Description: babel
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-18 09:48:00
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-06 21:56:10
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-plus",
        styleLibraryName: "theme-chalk"
      }
    ]
  ],
  env: {
    development: {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      plugins: ['dynamic-import-node']
    }
  }
}
