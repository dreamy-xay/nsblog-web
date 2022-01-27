/*
 * @Description: 搜索页面路由
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:29:49
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-27 18:54:53
 */
import { RouteRecordRaw } from 'vue-router';

const searchRouter: RouteRecordRaw = {
  path: '/search',
  name: 'search',
  //刷新显示的第一个界面
  redirect: '/search/comprehensive',
  component: () => import('@/views/search/Search.vue'),
  meta: {
    title: '综合'
  },
  children: [
    {
      path: 'resource',
      name: 'searchPageResource',
      meta: {
        title: '资源'
      },
      component: () => import('@/views/search/childComps/pages/searchPageResource/SearchPageResource.vue')
    },
    {
      path: 'tag',
      name: 'searchPageTag',
      meta: {
        title: '标签'
      },
      component: () => import('@/views/search/childComps/pages/SearchPageTag.vue')
    },
    {
      path: 'user',
      name: 'seachPageUser',
      meta: {
        title: '用户'
      },
      component: () => import('@/views/search/childComps/pages/SearchPageUser.vue')
    },
    {
      path: 'comprehensive',
      name: 'searchPageComprehensive',
      meta: {
        title: '综合'
      },
      component: () => import('@/views/search/childComps/pages/SearchPageComprehensive.vue')
    },
    {
      path: 'article',
      name: 'searchPageArticle',
      meta: {
        title: '文章'
      },
      component: () => import('@/views/search/childComps/pages/SearchPageArticle.vue')
    },
    {
      path: 'question',
      name: 'searchPageQuestion',
      meta: {
        title: '问答'
      },
      component: () => import('@/views/search/childComps/pages/SearchPageQuestion.vue')
    }
  ]
};

export default searchRouter;
