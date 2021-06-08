import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'blog主页'
    },
    component: () => import('@/views/home/Home.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      title: '后台管理页面'
    },
    component: () => import('@/views/admin/Admin.vue')
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    meta: {
      title: '管理员登录'
    },
    component: () => import('@/views/admin/login/Login.vue')
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
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
