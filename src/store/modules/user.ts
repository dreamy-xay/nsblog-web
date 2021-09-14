/*
 * @Description: 公共页面全局变量
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-16 15:51:19
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-13 21:18:16
 */
import { StoreOptions } from 'vuex';

const messageStore: StoreOptions<unknown> = {
  state: {
    privacySetting: {
      view_dynamic: true,
      view_ask: true,
      view_profile: true
    }
  },
  getters: {},
  mutations: {
    changePrivacySetting(state: any, data: Record<string, unknown>) {
      state.privacySetting.view_dynamic = data.view_dynamic;
      state.privacySetting.view_ask = data.view_ask;
      state.privacySetting.view_profile = data.view_profile;
    }
  },
  actions: {}
};

export default {
  namespaced: true,
  persistedstate: false,
  ...messageStore
};
