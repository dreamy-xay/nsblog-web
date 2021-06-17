/*
 * @Description: main.ts
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-11 20:18:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-15 11:15:42
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import tinymce from 'tinymce';
import VueTinymce from '@packy-tang/vue-tinymce';
Vue.prototype.$tinymce = tinymce; // 将全局tinymce对象指向给Vue作用域下
Vue.use(VueTinymce); // 安装vue的tinymce组件

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
