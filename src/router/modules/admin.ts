/*
 * @Description: 后台管理页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:01:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-21 20:03:35
 */
import { RouteRecordRaw } from 'vue-router';

const adminRouter: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  component: () => import('@/views/admin/Admin.vue'),
  children: []
};

export default adminRouter;
