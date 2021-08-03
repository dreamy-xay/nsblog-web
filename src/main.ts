/*
 * @Description: main
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-03 17:38:41
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from './directives';

import '../mock/mock-app'; // mock拦截

import installElementPlus from '@/plugins/element';
import installNative from '@/plugins/native-ui';

// 创建app
const app = createApp(App);

// 注册自定义指令
directives(app);

// 安装注册ElementPlus
installElementPlus(app);

// 安装注册naive-ui
installNative(app);

app
  .use(store)
  .use(router)
  .mount('#app');
