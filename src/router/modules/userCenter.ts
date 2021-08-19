/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2021-08-19 12:47:57
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-19 22:24:54
 */
import { RouteRecordRaw } from 'vue-router';

const messageRouter: RouteRecordRaw = {
  path: '/usercenter',
  name: 'user',
  //刷新显示的第一个界面
  redirect: '/usercenter/collection',
  component: () => import('@/views/userCenter/UserCenter.vue'),
  meta: {
    title: '用户中心'
  },
  children: [
    {
      path: '/usercenter/collection',
      name: 'usercenterCollection',
      meta: {
        title: '我的收藏'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterCollection.vue')
    },
    {
      path: '/usercenter/profile',
      name: 'usercenterProfile',
      meta: {
        title: '个人资料'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterProfileEdit.vue')
    },
    {
      path: '/usercenter/account',
      name: 'usercenterAccount',
      meta: {
        title: '帐号安全'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterAccount.vue')
    },
    {
      path: '/usercenter/setting',
      name: 'usercenterSetting',
      meta: {
        title: '隐私设置'
      },
      component: () => import('@/views/userCenter/childComps/pages/UserCenterSetting.vue')
    }
  ]
};

export default messageRouter;
