/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-11 15:46:03
 */
import { App } from 'vue';
import { create, NMessageProvider, NModal, NBadge, NButton } from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
