/*
 * @Description: router
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-07 16:10:41
 */
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import loginRouter from './modules/login';
import messageRouter from './modules/message';
import usercenterRouter from './modules/userCenter';
import user from './modules/user';

const routes: Array<RouteRecordRaw> = [
  // 主页
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue')
  },
  // 问答页面
  {
    path: '/question',
    name: 'question',
    component: () => import('@/views/question/Question.vue')
  },
  // 登录页面
  loginRouter,
  // 消息页面
  messageRouter,
  // 用户中心页面
  usercenterRouter,
  // 用户主页页面
  user,
  // 历史记录页面
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/history/History.vue')
  },
  // 404 not find pages
  {
    path: '/404',
    name: '404',
    meta: {
      title: '对不起！您访问的页面不存在'
    },
    component: () => import('@/views/Error.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
];

const router = createRouter({
  history:
    process.env.VUE_APP_ROUTER_MODE !== 'false'
      ? createWebHistory(process.env.BASE_URL)
      : createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
