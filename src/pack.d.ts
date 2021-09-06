/*
 * @Description: 包ts声明
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 14:18:34
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-06 22:13:32
 */

// json import
declare module '*.json' {
  const jsonValue: any;
  export default jsonValue;
}

// @kangc/v-md-editor
declare module '@kangc/v-md-editor';
declare module '@kangc/v-md-editor/lib/theme/vuepress.js';
declare module 'prismjs';
