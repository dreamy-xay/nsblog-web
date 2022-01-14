/*
 * @Description: 公共页面全局状态（不缓存）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-16 15:51:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-14 12:39:57
 */
import { StoreOptions } from 'vuex';
import { verifyToken } from '@/network/token';

const messageStore: StoreOptions<unknown> = {
  state: {
    tokenInfo: verifyToken() // 是否登录验证token返回值
  },
  getters: {
    isLogin(state: any) {
      return state.tokenInfo.status;
    }
  },
  mutations: {
    updateTokenInfo(state: any, tokenInfo: unknown = null) {
      state.tokenInfo = tokenInfo ? tokenInfo : verifyToken();
    }
  },
  actions: {}
};

export default {
  namespaced: true,
  persistedstate: false,
  ...messageStore
};
