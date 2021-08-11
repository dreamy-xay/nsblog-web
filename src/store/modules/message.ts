/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:45:25
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-11 17:09:02
 */

import { StoreOptions } from 'vuex';

const messageStore: StoreOptions<unknown> = {
  state: {
    message: '9999'
  },
  getters: {
    messages(state: any) {
      return state.message + 'x';
    }
  },
  mutations: {
    setMessage(state: any, m: string) {
      state.message = m;
    }
  },
  actions: {
    log({ state }, xx: any) {
      console.log(xx);
    }
  }
};

export default {
  namespaced: true,
  ...messageStore
};
