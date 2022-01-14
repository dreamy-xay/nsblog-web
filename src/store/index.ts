/*
 * @Description: vuex
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-03 21:33:25
 */
import { createStore } from 'vuex';
import modules from './modules';
import plugins from './plugins';

export default createStore({
  modules,
  plugins
});
