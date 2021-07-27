/*
 * @Description: login page router
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-26 19:06:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-26 19:09:16
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
      path: 'signUpSuccess',
      name: 'signUpSuccess',
      meta: {
        title: '忘记密码'
      },
      component: () => import('@/views/login/childComps/pages/SignUpSuccess.vue')
    }
  ]
};

export default loginRouter;
