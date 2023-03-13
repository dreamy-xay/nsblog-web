/*
 * @Description: 公共页面全局状态（不缓存）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-16 15:51:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-13 17:11:28
 */
import { StoreOptions } from 'vuex';
import { verifyToken } from '@/network/token';
import { getMenuRoutes, modifyMenuRoutes, modifyRoutesOfVueRouter, RouteInfo, ModifiedRouteInfo } from '@/util/router';

const messageStore: StoreOptions<unknown> = {
  state: {
    tokenInfo: verifyToken(), // 是否登录验证token返回值
    adminRoutes: getMenuRoutes() // 后台管理全局菜单路由信息
  },
  getters: {
    isLogin(state: any) {
      // 是否登录
      return state.tokenInfo.status;
    },
    cacheAdminMenuList(state: any) {
      // 后台管理所有缓存的菜单对应的页面组件名字列表
      function getNames(routes: RouteInfo[]): string[] {
        const nameList: string[] = [];
        for (const route of routes) {
          if (route.children.length) nameList.push(...getNames(route.children));
          else if (!route.noCache) nameList.push(route.name);
        }
        return nameList;
      }
      return getNames(state.adminRoutes);
    }
  },
  mutations: {
    updateTokenInfo(state: any, tokenInfo: unknown = null) {
      state.tokenInfo = tokenInfo ? tokenInfo : verifyToken();
    },
    updateAdminRoutes(state: any, options: ModifiedRouteInfo) {
      if (modifyRoutesOfVueRouter(options)) state.adminRoutes = modifyMenuRoutes(options, state.adminRoutes);
      else console.error("[Vuex] 'global/mutations' => updateAdminRoutes error!!! (modifyRoutesOfVueRouter failed)");
    }
  },
  actions: {}
};

export default {
  namespaced: true,
  persistedstate: false,
  ...messageStore
};
