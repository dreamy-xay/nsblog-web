/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:45:25
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 16:56:13
 */

import { StoreOptions, ActionContext } from 'vuex';
import socket from '@/socket';

const messageStore: StoreOptions<unknown> = {
  state: {
    messageCount: [0, 0, 0, 0, 0] // message页面左侧菜单未读消息数量
  },
  getters: {},
  mutations: {
    updateMessageCount(state: any, type: number, count: number | undefined = undefined) {
      let index: number = -1;
      if (type === 2) index = 0;
      if (type === 3) index = 1;
      else if (type === 4) index = 2;
      else if (type === 1) index = 3;
      else if (type === 5) index = 4;
      if (index >= 0) state.messageCount[index] = typeof count === 'undefined' ? state.messageCount[index] + 1 : count;
    }
  },
  actions: {
    // 对话发消息
    sendMessage(context: ActionContext<unknown, unknown>, options: { to: string; content: string }) {
      socket.emit('sendMessage', options.content, options.to, (context.rootState as any)['global/tokenInfo'].username);
    },
    // 对话接收消息
    receiveMessage(context: ActionContext<unknown, unknown>, callback: (from: string, content: string) => void) {
      socket.on('receiveMessage', (from: string, content: string) => {
        callback(from, content);
      });
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
