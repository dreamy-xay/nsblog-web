/*
 * @Description: user route
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:06:39
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-09 11:37:50
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
    },
    {
      path: 'dynamic',
      name: 'userDynamic',
      component: () => import('@/views/user/childComps/pages/UserDynamic.vue'),
      meta: {
        title: '我的动态'
      }
    },
    {
      path: 'question',
      name: 'userQuestion',
      component: () => import('@/views/user/childComps/pages/UserQuestion.vue'),
      meta: {
        title: '提问回答'
      }
    },
    {
      path: 'collection',
      name: 'userCollection',
      component: () => import('@/views/user/childComps/pages/UserCollection.vue'),
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: 'resource',
      name: 'userResource',
      component: () => import('@/views/user/childComps/pages/UserResource.vue'),
      meta: {
        title: '资源共享'
      }
    },
    {
      path: 'group',
      name: 'userGroup',
      component: () => import('@/views/user/childComps/pages/UserGroup.vue'),
      meta: {
        title: '学习小组'
      }
    },
    {
      path: 'profile',
      name: 'userProfile',
      component: () => import('@/views/user/childComps/pages/UserProfile.vue'),
      meta: {
        title: '个人简介'
      }
    }
  ]
};

export default userRouter;
