/*
 * @Description: 包ts声明
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 14:18:34
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-13 10:53:08
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
declare module '@kangc/v-md-editor/lib/plugins/tip/index';
declare module '@kangc/v-md-editor/lib/plugins/emoji/index';
declare module '@kangc/v-md-editor/lib/plugins/katex/cdn';
declare module '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
declare module '@kangc/v-md-editor/lib/plugins/todo-list/index';
declare module '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
declare module '@kangc/v-md-editor/lib/plugins/align';
