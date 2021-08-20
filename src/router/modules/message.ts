/*
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-28 13:09:20
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 16:53:52
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
      path: 'reply',
      name: 'messageReply',
      meta: {
        title: '回复我的'
      },
      component: () => import('@/views/message/childComps/pages/MessageReply.vue')
    },
    {
      path: '/message/like',
      name: 'messageLike',
      meta: {
        title: '收到的赞'
      },
      component: () => import('@/views/message/childComps/pages/MessageLike.vue')
    },
    {
      path: 'attention',
      name: 'messageAttention',
      meta: {
        title: '关注我的'
      },
      component: () => import('@/views/message/childComps/pages/MessageAttention.vue')
    },
    {
      path: 'system',
      name: 'messageSystem',
      meta: {
        title: '系统通知'
      },
      component: () => import('@/views/message/childComps/pages/MessageSystem.vue')
    },
    {
      path: 'my',
      name: 'messageMy',
      meta: {
        title: '我的消息'
      },
      component: () => import('@/views/message/childComps/pages/messageMy/MessageMy.vue')
    },
    {
      path: 'setting',
      name: 'messageSeting',
      meta: {
        title: '消息设置'
      },
      component: () => import('@/views/message/childComps/pages/MessageSetting.vue')
    }
  ]
};

export default messageRouter;
