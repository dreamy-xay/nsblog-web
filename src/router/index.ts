/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-11 21:33:48
 */
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
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      {
        path: 'dataAnalyze',
        name: 'dataAnalyze',
        meta: {
          title: '数据统计页面(仪表盘)'
        },
        component: () => import('@/views/admin/childComps/DataAnalyze.vue')
      },
      {
        path: 'article/manage',
        name: 'articleManage',
        meta: {
          title: '文章管理页面'
        },
        component: () => import('@/views/admin/childComps/ArticleManage.vue')
      },
      {
        path: 'comment',
        name: 'commentManage',
        meta: {
          title: '评论管理页面'
        },
        component: () => import('@/views/admin/childComps/CommentManage.vue')
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    meta: {
      title: '管理员登录'
    },
    component: () => import('@/views/adminLogin/AdminLogin.vue')
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
