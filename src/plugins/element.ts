/*
 * @Description: element-plus
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-19 21:30:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-19 22:05:55
 */
import ElementPlus from 'element-plus';
import { App } from 'vue';
import '@/assets/style/element-variables.scss';

export default (app: App): void => {
  app.use(ElementPlus);
};
