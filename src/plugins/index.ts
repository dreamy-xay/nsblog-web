/*
 * @Description: 插件集合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 12:03:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-24 16:10:19
 */
import { App } from 'vue';
import installElementPlus from './modules/element';
import installNative from './modules/native-ui';
import installMdEdit from './modules/md-edit';
import installEcharts from './modules/echarts';

export default (app: App): void => {
  // 安装注册ElementPlus
  installElementPlus(app);

  // 安装注册naive-ui
  installNative(app);

  // 安装markdown 插件
  installMdEdit(app);

  // 安装 echarts 插件
  installEcharts(app);
};
