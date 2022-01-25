/*
 * @Description: 问答页面路由
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 10:19:33
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 21:20:40
 */
import { RouteRecordRaw } from 'vue-router';

const questionRouter: RouteRecordRaw = {
  path: '/question',
  name: 'question',
  component: () => import('@/views/question/Question.vue'),
  meta: {
    title: '问答'
  },
  children: [
    {
      path: '',
      name: 'questionHome',
      component: () => import('@/views/question/pages/questionHome/QuestionHome.vue')
    },
    {
      path: ':questionId',
      name: 'questionDetail',
      meta: {
        title: '问答详情'
      },
      component: () => import('@/views/question/pages/questionDetail/QuestionDetail.vue')
    }
  ]
};

export default questionRouter;
