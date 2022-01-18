/*
 * @Description: 搜索主页路由
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:29:49
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-18 22:55:32
 */
import { RouteRecordRaw } from 'vue-router';

const searchRouter: RouteRecordRaw = {
  path: '/search',
  name: 'search',
  //刷新显示的第一个界面
  redirect: '/search/tag',
  component: () => import('@/views/search/Search.vue'),
  meta: {
    title: '标签'
  },
  children: [
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
    }
  ]
};

export default searchRouter;
