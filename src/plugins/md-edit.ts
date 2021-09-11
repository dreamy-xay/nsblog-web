/*
 * @Description: markdown 编辑器
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 12:08:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-11 18:51:00
 */
import { App } from 'vue';
// 编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

// markdown 预览
import VMdPreview from '@kangc/v-md-editor/lib/preview';

// 主题 github
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js'; // highlightjs

// 主题 vuepress
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs'; // prismjs

// 代码行数插件
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

// 代码复制插件
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

const plugins = [createLineNumbertPlugin(), createCopyCodePlugin()];

const theme = {
  github: [githubTheme, { Hljs: hljs }],
  vuepress: [vuepressTheme, { Prism }]
};

/**
 * @description: 设置markdown组件选项
 * @param {any} component 导入的组件 `必传参数`
 * @param {'github' | 'vuepress'} themeName 主题名  `必传参数`
 * @return {*}
 * @author: Z_Y_C
 */
function setOptions(component: any, themeName: 'github' | 'vuepress'): any {
  component.use(...theme[themeName]);
  plugins.forEach(plugin => {
    component.use(plugin);
  });
  return component;
}

export default (app: App) => {
  // markdown预览
  app.use(setOptions(VMdPreview, 'github'));

  // markdown编辑器
  app.use(setOptions(VMdEditor, 'vuepress'));
};
