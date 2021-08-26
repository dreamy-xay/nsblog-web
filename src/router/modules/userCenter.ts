/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 12:47:57
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-26 21:45:51
 */
import { RouteRecordRaw } from 'vue-router';

const messageRouter: RouteRecordRaw = {
  path: '/userCenter',
  name: 'userCenter',
  //刷新显示的第一个界面
  redirect: '/userCenter/collection',
  component: () => import('@/views/userCenter/UserCenter.vue'),
  meta: {
    title: '用户中心'
  },
  children: [
    {
      path: 'collection',
      name: 'userCenterCollection',
      meta: {
        title: '我的收藏'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterCollection.vue')
    },
    {
      path: 'profile',
      name: 'userCenterProfile',
      meta: {
        title: '个人资料'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterProfileEdit.vue')
    },
    {
      path: 'account',
      name: 'userCenterAccount',
      meta: {
        title: '帐号安全'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterAccount.vue')
    },
    {
      path: 'setting',
      name: 'userCenterSetting',
      meta: {
        title: '隐私设置'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterSetting.vue')
    }
  ]
};

export default messageRouter;
