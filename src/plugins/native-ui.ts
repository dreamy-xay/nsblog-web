/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: clq
 * @LastEditTime: 2021-09-16 11:32:08
 */
import { App } from 'vue';
import { create, NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog, NCard, NDropdown } from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog, NCard, NDropdown];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
