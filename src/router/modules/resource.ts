/*
 * @Description: 学习小组页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:23:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 11:25:57
 */
import { RouteRecordRaw } from 'vue-router';

const resourceRouter: RouteRecordRaw = {
  path: '/resource',
  name: 'resource',
  redirect: '/resource',
  component: () => import('@/views/resource/Resource.vue'),
  meta: {
    title: '资源页面'
  },
  children: [
    {
      path: '',
      name: 'resourceHome',
      component: () => import('@/views/resource/childComps/pages/resourceHome/ResourceHome.vue'),
      meta: {
        title: '资源主页页面'
      }
    },

    {
      path: ':resourceId(\\d+)',
      name: 'resourceId',
      component: () => import('@/views/resource/childComps/pages/resourceDetail/ResourceDetail.vue'),
      meta: {
        title: '资源详细信息页面'
      }
    }
  ]
};

export default resourceRouter;
