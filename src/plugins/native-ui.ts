/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-10 15:55:39
 */
import { App } from 'vue';
import { create, NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog, NCard } from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog, NCard];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
