/*
 * @Description: 包ts声明
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 14:18:34
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-11 18:52:44
 */

// json import
declare module '*.json' {
  const jsonValue: any;
  export default jsonValue;
}

// @kangc/v-md-editor
declare module '@kangc/v-md-editor';
declare module '@kangc/v-md-editor/lib/preview';
declare module '@kangc/v-md-editor/lib/theme/github.js';
declare module '@kangc/v-md-editor/lib/theme/vuepress.js';
declare module 'prismjs';
declare module '@kangc/v-md-editor/lib/plugins/line-number/index';
declare module '@kangc/v-md-editor/lib/plugins/copy-code/index';
