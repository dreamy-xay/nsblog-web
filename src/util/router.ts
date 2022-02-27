/*
 * @Description: route api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:51:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-27 14:52:53
 */

import router from '@/router';
import { RouteRecordNormalized } from 'vue-router';

// 过滤路由信息接口
export interface RouteInfo {
  title: string; // 路由标题
  icon: string; // 路由图标
  super: boolean; // 是否超级管理员支持路由
  name: string; // 路由名称
  children: RouteInfo[]; // 子路由
  badge?: string; // 路由徽章
  route?: RouteRecordNormalized; // 路由详细信息
  beforeToggle?: (next: () => void) => void; // 路由切换前拦截函数
}

/**
 * @description: 获取过滤路由信息
 * @param {boolean} all 是否获取全部路由信息 `默认为false`
 * @return {RouteInfo[]} 返回路由信息
 * @author: dreamy-xay
 */
export function getMenuRoutes(all: boolean = false): RouteInfo[] {
  // 获取全部routes
  function getDeepRoutes(routes: RouteRecordNormalized[], filter: boolean = false): RouteInfo[] {
    // 获取过滤的 routes
    const filterRouters: RouteRecordNormalized[] = filter
      ? routes.filter((route: RouteRecordNormalized) => {
          return Object.prototype.hasOwnProperty.call(route.meta, 'menu');
        })
      : routes;

    // 返回格式化的route
    return filterRouters.map((route: RouteRecordNormalized) => {
      const routeData: RouteInfo = { title: '', icon: '', name: '', super: false, children: [] };
      routeData['title'] = route.meta.title as string;
      routeData['icon'] = route.meta.icon as string;
      routeData['super'] = route.meta.super as boolean;
      routeData['name'] = route.name as string;
      if (all) routeData['route'] = route;
      if (route.meta['badge']) routeData['badge'] = route.meta.badge as string;
      if (route['children'] && route.children.length)
        routeData['children'] = getDeepRoutes(route.children as RouteRecordNormalized[]);
      return routeData;
    });
  }

  return getDeepRoutes(router.getRoutes(), true);
}
