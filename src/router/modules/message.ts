/*
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:09:20
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-07-29 22:47:51
 */
import { RouteRecordRaw } from 'vue-router';

const messageRouter: RouteRecordRaw = {
  path: '/message',
  name: 'message',
  //刷新显示的第一个界面
  redirect: '/message/reply',
  component: () => import('@/views/message/Message.vue'),
  meta: {
    title: '消息'
  },
  children: [
    {
      path: '/message/reply',
      name: 'message-reply',
      meta: {
        title: '回复我的'
      },
      component: () => import('@/views/message/childComps/pages/MessageReply.vue')
    },
    {
      path: '/message/like',
      name: 'message-like',
      meta: {
        title: '收到的赞'
      },
      component: () => import('@/views/message/childComps/pages/MessageLike.vue')
    },
    {
      path: '/message/attention',
      name: 'message-attention',
      meta: {
        title: '关注我的'
      },
      component: () => import('@/views/message/childComps/pages/MessageAttention.vue')
    },
    {
      path: '/message/system',
      name: 'message-system',
      meta: {
        title: '系统通知'
      },
      component: () => import('@/views/message/childComps/pages/MessageSystem.vue')
    },
    {
      path: '/message/my',
      name: 'message-my',
      meta: {
        title: '我的消息'
      },
      component: () => import('@/views/message/childComps/pages/MessageMy.vue')
    },
    {
      path: '/message/setting',
      name: 'message-seting',
      meta: {
        title: '消息设置'
      },
      component: () => import('@/views/message/childComps/pages/MessageSetting.vue')
    }
  ]
};

export default messageRouter;
