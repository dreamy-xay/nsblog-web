/*
 * @Description: main
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-13 11:50:45
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from './directives';
import installPlugins from './plugins';

// import '../mock/mock-app'; // mock拦截

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
