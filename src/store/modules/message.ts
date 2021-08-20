/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:45:25
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 16:00:23
 */

import { StoreOptions, ActionContext } from 'vuex';
import socket from '@/socket';

const messageStore: StoreOptions<unknown> = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 对话发消息
    sendMessage(context: ActionContext<unknown, unknown>, options: { to: string; content: string }) {
      socket.emit('sendMessage', options.content, options.to, (context.rootState as any).global.tokenInfo.username);
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
