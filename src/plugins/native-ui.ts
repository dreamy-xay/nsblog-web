/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-09-01 17:49:10
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
