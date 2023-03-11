/*
 * @Description: 公共页面全局状态（不缓存）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-16 15:51:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-11 16:33:45
 */
import { StoreOptions } from 'vuex';
import { verifyToken } from '@/network/token';
import { getMenuRoutes, modifyMenuRoutes, ModifiedRouteInfo } from '@/util/router';

const messageStore: StoreOptions<unknown> = {
  state: {
    tokenInfo: verifyToken(), // 是否登录验证token返回值
    adminRoutes: getMenuRoutes() // 后台管理全局菜单路由信息
  },
  getters: {
    isLogin(state: any) {
      return state.tokenInfo.status;
    }
  },
  mutations: {
    updateTokenInfo(state: any, tokenInfo: unknown = null) {
      state.tokenInfo = tokenInfo ? tokenInfo : verifyToken();
    },
    updateAdminRoutes(state: any, options: ModifiedRouteInfo) {
      state.adminRoutes = modifyMenuRoutes(options, state.adminRoutes);
    }
  },
  actions: {}
};

export default {
  namespaced: true,
  persistedstate: false,
  ...messageStore
};
