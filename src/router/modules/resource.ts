/*
 * @Description: 学习小组页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:23:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-25 21:26:37
 */
import { RouteRecordRaw } from 'vue-router';

const resourceRouter: RouteRecordRaw = {
  path: '/resource',
  name: 'resource',
  component: () => import('@/views/resource/Resource.vue')
};

export default resourceRouter;
