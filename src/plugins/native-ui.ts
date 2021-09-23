/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-20 20:36:57
 */
import { App } from 'vue';
import {
  create,
  NMessageProvider,
  NModal,
  NBadge,
  NButton,
  NPopover,
  NDialog,
  NCard,
  NTooltip,
  NDrawer
} from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog, NCard, NTooltip, NDrawer];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
