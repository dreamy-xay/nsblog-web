/*
 * @Description: 插件集合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 12:03:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 12:11:28
 */
import { App } from 'vue';
import installElementPlus from './element';
import installNative from './native-ui';
import installMdEdit from './md-edit';

export default (app: App): void => {
  // 安装注册ElementPlus
  installElementPlus(app);

  // 安装注册naive-ui
  installNative(app);

  // 安装markdown 插件
  installMdEdit(app);
};
