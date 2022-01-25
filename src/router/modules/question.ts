/*
 * @Description: 问答页面路由
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 10:19:33
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 11:13:28
 */
import { RouteRecordRaw } from 'vue-router';

const questionRouter: RouteRecordRaw = {
  path: '/question',
  name: 'question',
  redirect: '/question/home',
  component: () => import('@/views/question/Question.vue'),
  meta: {
    title: '问答'
  },
  children: [
    {
      path: 'home',
      name: 'questionHome',
      component: () => import('@/views/question/pages/questionHome/QuestionHome.vue')
    },
    {
      path: 'detail',
      name: 'questionDetail',
      meta: {
        title: '问答详情'
      },
      component: () => import('@/views/question/pages/questionDetail/QuestionDetail.vue')
    }
  ]
};

export default questionRouter;
