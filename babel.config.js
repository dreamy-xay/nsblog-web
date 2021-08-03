/*
 * @Description: babel
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-18 09:48:00
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-03 16:43:14
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
  ]
}
