/*
 * @Description: 主页路由
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-24 18:02:09
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-25 21:54:51
 */
import { RouteRecordRaw } from 'vue-router';

const homeRouter: RouteRecordRaw = {
  path: '',
  name: 'home',
  component: () => import('@/views/home/Home.vue'),
  meta: {
    title: '主页',
  },
};

export default homeRouter;
