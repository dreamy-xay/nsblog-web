/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-11 20:18:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-12 12:48:06
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
