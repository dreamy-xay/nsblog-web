/*
 * @Description: 历史记录页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:18:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-25 21:21:22
 */
import { RouteRecordRaw } from 'vue-router';

const historyRouter: RouteRecordRaw = {
  path: '/history',
  name: 'history',
  component: () => import('@/views/history/History.vue')
};

export default historyRouter;
