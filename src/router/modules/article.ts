/*
 * @Description: 文章页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:17:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 11:24:42
 */
import { RouteRecordRaw } from 'vue-router';

const articleRouter: RouteRecordRaw = {
  path: '/article/:articleId(\\d+)',
  name: 'article',
  component: () => import('@/views/article/Article.vue')
};

export default articleRouter;
