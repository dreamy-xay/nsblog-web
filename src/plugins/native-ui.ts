/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-09 14:11:50
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
  NPagination
];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
