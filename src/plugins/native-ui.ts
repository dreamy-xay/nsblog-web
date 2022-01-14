/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-14 16:28:55
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
  NDrawer,
  NDialogProvider,
  NPagination
} from 'naive-ui';

const components = [
  NMessageProvider,
  NModal,
  NBadge,
  NButton,
  NPopover,
  NDialog,
  NCard,
  NTooltip,
  NDrawer,
  NDialogProvider,
  NPagination
];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
