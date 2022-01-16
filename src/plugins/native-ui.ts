/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
<<<<<<< HEAD
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-16 15:44:12
=======
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-12 21:48:23
>>>>>>> ab8da4ed08b0e766c865e5e61434cf96115f1d91
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
