/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-26 20:40:24
 */
import { App } from 'vue';
import { create, NMessageProvider, NModal, NBadge, NButton, NPopover } from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton, NPopover];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
