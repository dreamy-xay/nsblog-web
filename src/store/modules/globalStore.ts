/*
 * @Description: 公共页面全局状态（缓存）
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-17 09:50:38
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-14 12:40:17
 */
import { StoreOptions } from 'vuex';

const searchHistoryStore: StoreOptions<unknown> = {
  state: {
    searchHistory: []
  },
  mutations: {
    setSearchHistory(state: any, history: string = '') {
      if (history.length === 0) return;
      const index: number = state.searchHistory.findIndex((res: string) => {
        return res === history;
      });
      if (index !== -1) state.searchHistory.splice(index, 1);
      state.searchHistory.splice(0, 0, history);
    },
    deleteSearchHistory(state: any, index: number = -1) {
      if (index === -1) state.searchHistory.splice(0, state.searchHistory.length);
      else state.searchHistory.splice(index, 1);
    }
  }
};

export default {
  namespaced: true,
  persistedstate: true,
  ...searchHistoryStore
};
