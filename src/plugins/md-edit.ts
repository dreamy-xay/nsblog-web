/*
 * @Description: markdown 编辑器
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 12:08:35
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-14 15:01:36
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

//提示信息
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
import '@kangc/v-md-editor/lib/plugins/tip/tip.css';

//Emoji 表情插件
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

//Katex 插件
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

//Mermaid 插件（流程图等）
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

//TodoList 任务列表
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

// 代码行数插件
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

//Highlight Lines 高亮代码行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

// 代码复制插件
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

//Align 内容定位
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

const plugins = [
  { name: 'tip', value: createTipPlugin() },
  { name: 'emoji', value: createEmojiPlugin() },
  { name: 'katex', value: createKatexPlugin() },
  { name: 'mermaid', value: createMermaidPlugin() },
  { name: 'todoList', value: createTodoListPlugin() },
  { name: 'lineNumber ', value: createLineNumbertPlugin() },
  { name: 'highlightLines', value: createHighlightLinesPlugin() },
  { name: 'copyCode', value: createCopyCodePlugin() },
  { name: 'align ', value: createAlignPlugin() }
];

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
    if (!(themeName === 'vuepress' && plugin.name === 'tip')) component.use(plugin.value);
  });
  return component;
}

export default (app: App) => {
  // markdown预览
  app.use(setOptions(VMdPreview, 'github'));

  // markdown编辑器
  app.use(setOptions(VMdEditor, 'vuepress'));
};
