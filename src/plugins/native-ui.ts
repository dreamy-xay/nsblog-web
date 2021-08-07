/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-07 18:00:35
 */
import { App } from 'vue';
import { create, NMessageProvider, NModal } from 'naive-ui';

const components = [NMessageProvider, NModal];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
