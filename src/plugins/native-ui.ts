/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-18 12:54:16
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
  NDropdown,
  NSelect,
  NTooltip
} from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog, NCard, NDropdown, NSelect, NTooltip];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
