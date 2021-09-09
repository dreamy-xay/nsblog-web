/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-09 15:52:45
 */
import { App } from 'vue';
import { create, NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog } from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
