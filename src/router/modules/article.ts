/*
 * @Description: 文章页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:17:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 17:54:50
 */
import { RouteRecordRaw } from 'vue-router';

const articleRouter: RouteRecordRaw = {
  path: '/article',
  name: 'article',
  component: () => import('@/views/article/Article.vue'),
  children: [
    {
      path: 'protection',
      name: 'articleProtection',
      component: () => import('@/views/article/childComps/pages/ArticleProtection.vue')
    },
    {
      path: ':articleId(\\d+)',
      name: 'articleMain',
      component: () => import('@/views/article/childComps/pages/articleMain/ArticleMain.vue')
    }
  ]
};

export default articleRouter;
