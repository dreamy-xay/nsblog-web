/*
 * @Description: 征集令页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:23:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 12:27:26
 */
import { RouteRecordRaw } from 'vue-router';

const solicitationRouter: RouteRecordRaw = {
  path: '/solicitation/:solicitationId(\\d+)',
  name: 'solicitation',
  component: () => import('@/views/solicitation/Solicitation.vue'),
  meta: {
    title: '征集令页面'
  }
};

export default solicitationRouter;
