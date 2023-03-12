/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-06-28 19:53:48
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
  NDivider,
  NDrawerContent,
  NRadioGroup,
  NRadioButton,
  NInputNumber,
  NSwitch,
  NInput,
  NColorPicker,
  NNumberAnimation
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
  NDivider,
  NDrawerContent,
  NRadioGroup,
  NRadioButton,
  NInputNumber,
  NSwitch,
  NInput,
  NColorPicker,
  NNumberAnimation
];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
