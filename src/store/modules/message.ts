/*
 * @Description: 消息页面状态
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:45:25
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-21 16:19:03
 */

import { StoreOptions, ActionContext } from 'vuex';
import socket from '@/socket';

const messageStore: StoreOptions<unknown> = {
  state: {
    messageCount: [-1, -1, -1, -1, -1] // message页面左侧菜单未读消息数量
  },
  getters: {},
  mutations: {
    /* messageCount */
    // 更新message页面左侧菜单未读消息数量
    updateMessageCount(state: any, options: { type: number; count: number }) {
      let index: number = -1;
      if (options.type === 2) index = 0;
      else if (options.type === 3) index = 1;
      else if (options.type === 4) index = 2;
      else if (options.type === 1) index = 3;
      else if (options.type === 5) index = 4;

      if (index >= 0)
        state.messageCount[index] = Object.prototype.hasOwnProperty.call(options, 'count')
          ? options.count
          : state.messageCount[index] + 1;
    }
  },
  actions: {
    /* message socket */
    // 对话发消息
    sendMessage(context: ActionContext<unknown, unknown>, options: { to: string; content: string; time: string }) {
      socket.emit(
        'sendMessage',
        options.content,
        options.to,
        options.time,
        (context.rootState as any).global.tokenInfo.username
      );
    },
    // 对话接收消息
    receiveMessage(
      context: ActionContext<unknown, unknown>,
      callback: (options: { username: string; nickname: string; avatar: string; content: string; time: string }) => void
    ) {
      socket.on(
        'receiveMessage',
        (options: { username: string; nickname: string; avatar: string; content: string; time: string }) => {
          callback(options);
        }
      );
    },
    // 消息页面5种类型通知
    notice(context: ActionContext<unknown, unknown>, callback: (type: number) => void) {
      socket.on('notice', (type: number) => {
        callback(type);
      });
    },
    // 上线
    online(context: ActionContext<unknown, unknown>, username: string) {
      socket.emit('online', username);
    },
    // 下线
    offline(context: ActionContext<unknown, unknown>, username: string) {
      socket.emit('offline', username);
    }
  }
};

export default {
  namespaced: true,
  persistedstate: false,
  ...messageStore
};
