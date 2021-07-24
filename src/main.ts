/*
 * @Description: main
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-24 11:02:37
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from './directives';

import '../mock/mock-app'; // mock拦截

import installElementPlus from '@/plugins/element';

// 创建app
const app = createApp(App);

// 注册自定义指令
directives(app);

// 全局使用ElementPlus
installElementPlus(app);

app
  .use(store)
  .use(router)
  .mount('#app');
