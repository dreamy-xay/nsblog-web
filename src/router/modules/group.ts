/*
 * @Description: 学习小组页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:23:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-25 21:24:45
 */
import { RouteRecordRaw } from 'vue-router';

const groupRouter: RouteRecordRaw = {
  path: '/group',
  name: 'group',
  component: () => import('@/views/group/Group.vue')
};

export default groupRouter;
