/*
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2021-08-17 09:50:38
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-18 15:16:48
 */
import { StoreOptions } from 'vuex';

const searchHistoryStore: StoreOptions<unknown> = {
  state: {
    searchHistory: []
  },

  mutations: {
    setSearchHistory(state: any, history: string = null) {
      if (history.length === 0) return;

      const index = state.searchHistory.findIndex(res => {
        return res === history;
      });

      if (index !== -1) {
        state.searchHistory.splice(index, 1);
      }
      state.searchHistory.unshift(history);
    },

    deleteSearchHistory(state: any, index: number = -1) {
      if (index === -1) state.searchHistory.splice(0, 10000);
      else state.searchHistory.splice(index, 1);
    }
  }
};

export default {
  namespaced: true,
  persistedstate: true,
  ...searchHistoryStore
};
