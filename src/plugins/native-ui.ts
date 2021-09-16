/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: clq
 * @LastEditTime: 2021-09-16 14:11:26
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
  NSelect
} from 'naive-ui';

const components = [NMessageProvider, NModal, NBadge, NButton, NPopover, NDialog, NCard, NDropdown, NSelect];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
