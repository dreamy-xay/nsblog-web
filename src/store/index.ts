/*
 * @Description: vuex
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-16 16:50:03
 */
import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';
import modules, { persistedstatePath } from './modules';

export default createStore({
  modules,
  plugins: [
    createPersistedState({
      key: 'nsblog',
      paths: persistedstatePath
    })
  ]
});
