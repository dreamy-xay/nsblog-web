/*
 * @Description: markdown 编辑器
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 12:08:35
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 12:10:36
 */
import { App } from 'vue';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

export default (app: App) => {
  app.use(
    VMdEditor.use(vuepressTheme, {
      Prism
    })
  );
};
