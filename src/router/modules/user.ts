/*
 * @Description: user route
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:06:39
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-07 16:32:47
 */
import { RouteRecordRaw } from 'vue-router';

const userRouter: RouteRecordRaw = {
  path: '/user/:username',
  name: 'user',
  redirect: {
    name: 'userArticle'
  },
  component: () => import('@/views/user/User.vue'),
  meta: {
    title: '用户主页'
  },
  children: [
    {
      path: 'article',
      name: 'userArticle',
      component: () => import('@/views/user/childComps/pages/UserArticle.vue'),
      meta: {
        title: '发布文章'
      }
    }
  ]
};

export default userRouter;
