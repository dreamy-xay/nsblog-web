/*
 * @Description: login page router
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 19:06:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-30 16:05:14
 */

import { RouteRecordRaw } from 'vue-router';

const loginRouter: RouteRecordRaw = {
  path: '/login',
  name: 'login',
  redirect: '/login/signIn',
  component: () => import('@/views/login/Login.vue'),
  meta: {
    title: '登录，注册等'
  },
  children: [
    {
      path: 'signIn',
      name: 'signIn',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/login/childComps/pages/SignIn.vue')
    },
    {
      path: 'signUp',
      name: 'signUp',
      meta: {
        title: '注册'
      },
      component: () => import('@/views/login/childComps/pages/SignUp.vue')
    },
    {
      path: 'forgotPassword',
      name: 'forgotPassword',
      meta: {
        title: '忘记密码'
      },
      component: () => import('@/views/login/childComps/pages/ForgotPassword.vue')
    },
    {
      path: 'success',
      name: 'success',
      meta: {
        title: '忘记密码'
      },
      component: () => import('@/views/login/childComps/pages/Success.vue')
    },
    {
      path: 'emailVerify',
      name: 'emailVerify',
      meta: {
        title: '验证邮箱'
      },
      component: () => import('@/views/login/childComps/pages/EmailVerify.vue')
    },
    {
      path: 'resetPassword',
      name: 'resetPassword',
      meta: {
        title: '重置密码'
      },
      component: () => import('@/views/login/childComps/pages/ResetPassword.vue')
    }
  ]
};

export default loginRouter;
