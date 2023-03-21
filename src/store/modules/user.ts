/*
 * @Description: 用户页面状态
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-16 15:51:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-21 16:19:57
 */
import { StoreOptions } from 'vuex';

const messageStore: StoreOptions<unknown> = {
  state: {
    // 用户私有设置信息
    privacySetting: {
      view_dynamic: true,
      view_ask: true,
      view_profile: true
    }
  },
  getters: {},
  mutations: {
    /* privacySetting */
    // 修改用户私有设置信息
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
