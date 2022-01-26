/*
 * @Description: 文章页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:17:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-25 21:22:10
 */
import { RouteRecordRaw } from 'vue-router';

const articleRouter: RouteRecordRaw = {
  path: '/article/:articleId',
  name: 'article',
  component: () => import('@/views/article/Article.vue')
};

export default articleRouter;
