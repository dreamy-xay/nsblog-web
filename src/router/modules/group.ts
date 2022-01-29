/*
 * @Description: 学习小组页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:23:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 15:02:37
 */
import { RouteRecordRaw } from 'vue-router';

const groupRouter: RouteRecordRaw = {
  path: '/group',
  name: 'group',
  component: () => import('@/views/group/Group.vue'),
  children: [
    {
      path: '',
      name: 'groupHome',
      component: () => import('@/views/group/childComps/pages/groupHome/GroupHome.vue')
    },
    {
      path: ':groupName',
      name: 'groupDetail',
      component: () => import('@/views/group/childComps/pages/groupDetail/GroupDetail.vue')
    }
  ]
};

export default groupRouter;
