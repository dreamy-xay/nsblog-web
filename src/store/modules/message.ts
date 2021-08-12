/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:45:25
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-12 10:40:42
 */

import { StoreOptions } from 'vuex';
import socket from '@/socket';

const messageStore: StoreOptions<unknown> = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    receiveMessage({ state }, options: { type: number; callback: (data: Record<string, unknown>) => void }) {
      socket.on('messageNotice', (type: number, data: Record<string, unknown>) => {
        if (options.type === type) options.callback(data);
      });
    },
    online({ state }, username: string) {
      socket.emit('online', username);
    }
  }
};

export default {
  namespaced: true,
  ...messageStore
};
