/*
 * @Description: 学习小组页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-25 21:23:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 16:54:34
 */
import { RouteRecordRaw } from 'vue-router';

const groupRouter: RouteRecordRaw = {
  path: '/group',
  name: 'group',
  component: () => import('@/views/group/Group.vue'),
  children: [
    {
      path: '',
      name: 'groupHome',
      component: () => import('@/views/group/childComps/pages/groupHome/GroupHome.vue')
    },
    {
      path: ':groupName',
      name: 'groupDetail',
      redirect: {
        name: 'groupDetailArticle'
      },
      component: () => import('@/views/group/childComps/pages/groupDetail/GroupDetail.vue'),
      children: [
        {
          path: 'article',
          name: 'groupDetailArticle',
          component: () => import('@/views/group/childComps/pages/groupDetail/childComps/pages/GroupDetailArticle.vue')
        },
        {
          path: 'question',
          name: 'groupDetailQuestion',
          component: () => import('@/views/group/childComps/pages/groupDetail/childComps/pages/GroupDetailQuestion.vue')
        },
        {
          path: 'resource',
          name: 'groupDetailResource',
          component: () => import('@/views/group/childComps/pages/groupDetail/childComps/pages/GroupDetailResource.vue')
        },
        {
          path: 'solicitation',
          name: 'groupDetailSolicitation',
          component: () =>
            import('@/views/group/childComps/pages/groupDetail/childComps/pages/GroupDetailSolicitation.vue')
        },
        {
          path: 'user',
          name: 'groupDetailUser',
          component: () => import('@/views/group/childComps/pages/groupDetail/childComps/pages/GroupDetailUser.vue')
        }
      ]
    }
  ]
};

export default groupRouter;
