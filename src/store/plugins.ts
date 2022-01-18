/*
 * @Description: vuex 插件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-03 21:29:53
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-15 21:11:23
 */
import { createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { persistedstatePath } from './modules';

// 调试模式下使用日志插件
const debug = process.env.NODE_ENV !== 'production';

// 特殊情况下使用的插件
const constraintPlugins = [...(debug ? [createLogger({})] : [])];

const plugins = [
  ...constraintPlugins,
  createPersistedState({
    key: 'nsblog',
    paths: persistedstatePath
  })
];

export default plugins;
