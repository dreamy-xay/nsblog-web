/*
 * @Description: naive-ui
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 16:13:02
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-08-09 22:38:42
 */
import { App } from 'vue';
import { create, NMessageProvider, NBadge, NButton } from 'naive-ui';

const components = [NMessageProvider, NBadge, NButton];

export default (app: App): void => {
  const naive = create({
    components
  });

  app.use(naive);
};
