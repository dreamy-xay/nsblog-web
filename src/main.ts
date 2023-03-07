/*
 * @Description: main
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-12-06 14:31:50
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from './directives';
import installPlugins from './plugins';

// mock拦截
if (process.env.VUE_APP_MOCK_SEVER !== 'false') import('../mock/mock-app');

// 创建app
const app = createApp(App);

// 注册自定义指令
directives(app);

// 安装插件
installPlugins(app);

app
  .use(store)
  .use(router)
  .mount('#app');
