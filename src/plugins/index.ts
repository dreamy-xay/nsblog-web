/*
 * @Description: 插件集合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-31 12:03:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-12 13:36:58
 */
import { App } from 'vue';
import installElementPlus from './modules/element';
import installNative from './modules/native-ui';
import installMdEdit from './modules/md-edit';
import installEcharts from './modules/echarts';
// import installAnimateCss from './modules/animate-css';

export default (app: App): void => {
  // 安装注册ElementPlus
  installElementPlus(app);

  // 安装注册naive-ui
  installNative(app);

  // 安装markdown 插件
  installMdEdit(app);

  // 安装 echarts 插件
  installEcharts(app);

  // 安装 animate.css 插件
  // installAnimateCss(app);
};
