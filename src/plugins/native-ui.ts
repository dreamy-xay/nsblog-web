/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-09 13:02:48
 */
import { App } from 'vue';
import { create, NMessageProvider, NModal, NAvatar, NButton, NPopover } from 'naive-ui';

const components = [NMessageProvider, NModal, NAvatar, NButton, NPopover];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
