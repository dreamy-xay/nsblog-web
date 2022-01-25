/*
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-24 18:02:09
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-25 12:54:54
 */
import { RouteRecordRaw } from 'vue-router';

const homeRouter: RouteRecordRaw = {
  path: '/home',
  name: 'home',
  redirect: '/home',
  component: () => import('@/views/home/Home.vue'),
  meta: {
    title: '主页',
  },
  children: [
    {
      path: 'tag',
      name: 'tagMain',
      component: () => import('@/views/home/childComps/pages/tagMain/TagMain.vue'),
      meta: {
        title: '标签详情信息',
      },
    },
  ],
};

export default homeRouter;
