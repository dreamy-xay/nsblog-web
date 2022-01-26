/*
 * @Description: 专题标签页路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-24 18:02:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-25 21:32:05
 */
import { RouteRecordRaw } from 'vue-router';

const tagRouter: RouteRecordRaw = {
  path: '/tag/:tagName',
  name: 'tag',
  component: () => import('@/views/tag/Tag.vue'),
  meta: {
    title: '标签详情信息'
  }
};

export default tagRouter;
