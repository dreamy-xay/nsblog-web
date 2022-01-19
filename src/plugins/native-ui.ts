/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-16 16:32:41
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
  NPagination,
  NSkeleton
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
  NPagination,
  NSkeleton
];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
