/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 18:22:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 18:28:26
 */
import { RouteRecordRaw } from 'vue-router';

const blogRouter: RouteRecordRaw = {
  path: '/blog/:username',
  name: 'blog',
  component: () => import('@/views/blog/Blog.vue'),
  meta: {
    title: '用户博客主页'
  },
  children: [
    {
      path: 'tags',
      name: 'blogTags',
      component: () => import('@/views/blog/childComps/pages/BlogTags.vue'),
      meta: {
        title: '用户博客全部标签'
      }
    },
    {
      path: 'categories',
      name: 'blogCategories',
      component: () => import('@/views/blog/childComps/pages/BlogCategories.vue'),
      meta: {
        title: '用户博客全部分类'
      }
    }
  ]
};

export default blogRouter;
