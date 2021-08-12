/*
 * @Description: router
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-12 16:32:14
 */
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import loginRouter from './modules/login';
import messageRouter from './modules/message';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('@/views/question/Question.vue')
  },
  loginRouter,
  messageRouter,
  {
    path: '/history',
    name: 'history',
    component: () => import('@/views/history/History.vue')
  },
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
