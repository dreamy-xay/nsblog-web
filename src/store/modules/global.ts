/*
 * @Description: 公共页面全局状态（不缓存）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-16 15:51:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-17 18:01:45
 */
import { StoreOptions } from 'vuex';
import { verifyToken } from '@/network/token';
import { getMenuRoutes, modifyMenuRoutes, modifyRoutesOfVueRouter, ModifiedRouteInfo } from '@/util/router';

const messageStore: StoreOptions<unknown> = {
  state: {
    tokenInfo: verifyToken(), // 是否登录验证token返回值
    adminRoutes: getMenuRoutes(true) // 后台管理全局菜单路由信息
  },
  getters: {
    isLogin(state: any) {
      // 是否登录
      return state.tokenInfo.status;
    }
  },
  mutations: {
    updateTokenInfo(state: any, tokenInfo: unknown = null) {
      state.tokenInfo = tokenInfo ? tokenInfo : verifyToken();
    },
    updateAdminRoutes(state: any, options: ModifiedRouteInfo) {
      /* adminRoutes = getMenuRoutes() 情况下的修改执行代码 */
      // if (modifyRoutesOfVueRouter(options)) modifyMenuRoutes(options, state.adminRoutes);
      // else console.error(
      //        new Error(`[Vuex] 'global/mutations' => modifyMenuRoutes failed!!! ('${options.name}' is not find.)`)
      //      );

      /* adminRoutes = getMenuRoutes(true) 情况下的修改执行代码 */
      if (!modifyMenuRoutes(options, state.adminRoutes))
        console.error(
          new Error(`[Vuex] 'global/mutations' => modifyMenuRoutes failed!!! ('${options.name}' is not find.)`)
        );
    }
  },
  actions: {}
};

export default {
  namespaced: true,
  persistedstate: false,
  ...messageStore
};
