/*
 * @Description: route api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:51:18
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-03-20 23:26:19
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

/**
 * @description:
 * @param {(route: RouteInfo) => boolean} roules 规则回调函数，返回true则为匹配成功 `必传参数`
 * @param {RouteInfo[]} routes 路由信息列表 `默认为 getMenuRoutes()`
 * @param {boolean} all 是否全部匹配(路由间存在包含关系) `默认为false`
 * @return {RouteInfo[][]} 返回路由信息行列表
 * @author: dreamy-xay
 */
export function searchMenuRoutes(
  rules: (route: RouteInfo) => boolean,
  routes: RouteInfo[] = getMenuRoutes(),
  all: boolean = false
): RouteInfo[][] {
  const menuRoutes: RouteInfo[][] = [];
  const menuRoute: RouteInfo[] = [];
  // dfs 更新route列表
  function filterMenu(route: RouteInfo): boolean {
    menuRoute.push(route);
    let ok: boolean = false; // 下一级是否已经收集
    for (const r of route.children) if (filterMenu(r)) ok = true;
    if ((!ok || all) && rules(route)) {
      ok = true;
      menuRoutes.push(JSON.parse(JSON.stringify(menuRoute)));
    }
    menuRoute.pop();
    return ok;
  }
  for (const route of routes) filterMenu(route);
  return menuRoutes;
}
