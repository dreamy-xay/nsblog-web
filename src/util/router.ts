/*
 * @Description: route api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:51:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-13 18:09:22
 */

import router from '@/router';
import { RouteRecordNormalized, RouteLocationNormalized } from 'vue-router';

// 过滤路由信息接口
export interface RouteInfo {
  title: string; // 路由标题
  icon: string; // 路由图标
  super: boolean; // 是否超级管理员支持路由
  name: string; // 路由名称
  children: RouteInfo[]; // 子路由
  meta: Record<string, unknown>; // 全部meta信息
  badge?: string; // 路由徽章
  noCache?: boolean; // 是否取消页面缓存
  route?: RouteRecordNormalized; // 路由详细信息
  beforeToggle?: (next: () => void) => void; // 路由切换前拦截函数
  beforeClose?: (next: () => void) => void; // 路由界面关闭前拦截函数
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
      const routeData: RouteInfo = { title: '', icon: '', name: '', meta: {}, super: false, children: [] };
      routeData['title'] = route.meta.title as string;
      routeData['icon'] = route.meta.icon as string;
      routeData['super'] = route.meta.super as boolean;
      routeData['name'] = route.name as string;
      routeData['meta'] = route.meta;
      if (all) routeData['route'] = route;
      for (const key of ['badge', 'noCache', 'beforeToggle', 'beforeClose'])
        if (route.meta[key]) routeData[key] = route.meta[key];
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
 * @param {boolean} deepCopy 是否获取深拷贝数据 `默认为 false`
 * @return {RouteInfo[][]} 返回路由信息行列表
 * @author: dreamy-xay
 */
export function searchMenuRoutes(
  rules: (route: RouteInfo) => boolean,
  routes: RouteInfo[] = getMenuRoutes(),
  all: boolean = false,
  deepCopy: boolean = false
): RouteInfo[][] {
  const menuRoutes: RouteInfo[][] = [];
  let menuRoute: RouteInfo[] = [];
  // dfs 更新route列表
  function filterMenu(route: RouteInfo): boolean {
    menuRoute.push(route);
    let ok: boolean = false; // 下一级是否已经收集
    for (const r of route.children) if (filterMenu(r)) ok = true;
    if ((!ok || all) && rules(route)) {
      ok = true;
      if (deepCopy) menuRoutes.push(JSON.parse(JSON.stringify(menuRoute)));
      else {
        menuRoutes.push(menuRoute);
        menuRoute = []; // 重新赋值，改变对象地址
        for (const r of menuRoutes[menuRoutes.length - 1]) menuRoute.push(r); // 重新添加
      }
    }
    menuRoute.pop();
    return ok;
  }
  for (const route of routes) filterMenu(route);
  return menuRoutes;
}

// 被修改路由信息接口
export interface ModifiedRouteInfo {
  name: string; // 路由名称
  meta:
    | {
        // 需要修改的meta
        title?: string; // 路由标题
        icon?: string; // 路由图标
        super?: boolean; // 是否超级管理员支持路由
        badge?: string; // 路由徽章
        noCache?: boolean; // 是否取消页面缓存
        beforeToggle?: (next: () => void) => void; // 路由切换前拦截函数
        beforeClose?: (next: () => void) => void; // 路由界面关闭前拦截函数
      }
    | Record<string, unknown>;
}

/**
 * @description: 修改菜单路由
 * @param {ModifiedRouteInfo} options 修改的参数选项 `必传参数`
 * @param {RouteInfo} routes 当前菜单路由信息 `路由信息列表 `默认为 getMenuRoutes()`
 * @return {RouteInfo[]} 返回更新的菜单路由信息
 * @author: dreamy-xay
 */
export function modifyMenuRoutes(options: ModifiedRouteInfo, routes: RouteInfo[] = getMenuRoutes()): RouteInfo[] {
  // 查找制定项并修改
  function findAndModifyMenu(route: RouteInfo): boolean {
    if (route.name == options.name) {
      // 开始修改
      for (const key in options.meta) {
        route[key] = options.meta[key];
        route.meta[key] = options.meta[key];
      }

      return true; // 修改完毕
    }
    // 子菜单修改
    for (const r of route.children) if (findAndModifyMenu(r)) return true; // 修改完毕
    return false; // 未修改完毕
  }
  // 迭代修改
  for (const route of routes) if (findAndModifyMenu(route)) return routes;
  return routes;
}

/**
 * @description: 修改自定义配置vue-router的路由
 * @param {ModifiedRouteInfo} options 修改的参数选项 `必传参数`
 * @return {boolean} 返回是否查找到并修改成功
 * @author: dreamy-xay
 */
export function modifyRoutesOfVueRouter(options: ModifiedRouteInfo): boolean {
  const routes: RouteRecordNormalized[] = router.getRoutes();

  // 获取过滤的 routes （带有菜单的）
  const filterRoutes: RouteRecordNormalized[] = routes.filter((route: RouteRecordNormalized) => {
    return Object.prototype.hasOwnProperty.call(route.meta, 'menu');
  });

  // 查找制定项并修改
  function findAndModifyRoute(route: RouteRecordNormalized): boolean {
    if (route.name == options.name) {
      // 开始修改
      for (const key in options.meta) route.meta[key] = options.meta[key];

      return true; // 修改完毕
    }
    // 子菜单修改
    for (const r of route.children) if (findAndModifyRoute(r as RouteRecordNormalized)) return true; // 修改完毕
    return false; // 未修改完毕
  }
  // 迭代修改
  for (const route of filterRoutes) if (findAndModifyRoute(route)) return true;

  return false;
}

/**
 * @description: 兼容<routeName>按需加载
 * @param {RouteLocationNormalized} to 前往的路由 `必传参数`
 * @param {string} routeName 需要删除的缓存组件名字 `必传参数`
 * @return {Promise<void>}
 * @author: dreamy-xay
 */
export async function handleKeepAlive(to: RouteLocationNormalized, routeName: string): Promise<void> {
  if (to.matched && to.matched.length > 2) {
    for (let i: number = 0; i < to.matched.length; ++i) {
      const element: RouteRecordNormalized = to.matched[i];
      if (element.components.default.name === routeName) {
        to.matched.splice(i, 1);
        await handleKeepAlive(to, routeName);
      }
      // 如果没有按需加载完成则等待加载
      if (typeof element.components.default === 'function') {
        await (element.components.default as any)();
        await handleKeepAlive(to, routeName);
      }
    }
  }
}
