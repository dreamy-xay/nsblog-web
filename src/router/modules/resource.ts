/*
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 15:33:53
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-24 21:41:21
 */
import { RouteRecordRaw } from 'vue-router';

const resourceRouter: RouteRecordRaw = {
  path: '/resource/:resourceId',
  name: 'resourcePage',
  //资源详情页面
  component: () => import('@/views/resource/childComps/pages/resourceDetail/ResourceDetail.vue'),
  meta: {
    title: '资源详情'
  },
  children: []
};

export default resourceRouter;
