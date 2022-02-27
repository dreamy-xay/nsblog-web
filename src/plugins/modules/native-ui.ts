/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-27 11:30:42
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
  NConfigProvider,
  NLoadingBarProvider,
  NDatePicker,
  NPagination,
  NSkeleton,
  NDivider
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
  NConfigProvider,
  NLoadingBarProvider,
  NDatePicker,
  NPagination,
  NSkeleton,
  NDivider
];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
