/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-03 16:38:07
 */
import { App } from 'vue';
import { create, NMessageProvider } from 'naive-ui';

const components = [NMessageProvider];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
