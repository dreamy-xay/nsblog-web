/*
 * @Description: 用户中心路由
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 12:47:57
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-15 17:30:04
 */
import { RouteRecordRaw } from 'vue-router';

const userCenterRouter: RouteRecordRaw = {
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
      component: () => import('@/views/userCenter/childComps/pages/UserCenterCollection/UserCenterCollection.vue')
    },
    {
      path: 'profile',
      name: 'userCenterProfile',
      meta: {
        title: '个人资料'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterProfileEdit/UserCenterProfileEdit.vue')
    },
    {
      path: 'account',
      name: 'userCenterAccount',
      meta: {
        title: '帐号安全'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterAccount/UserCenterAccount.vue')
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

export default userCenterRouter;
