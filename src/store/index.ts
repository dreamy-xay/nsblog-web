/*
 * @Description: vuex
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-15 10:11:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-15 14:44:08
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 管理员写文章页面，切换菜单调用的销毁函数
    articleReleaseDestory: (next: () => void) => {},
    articleReleaseContentCache: ''
  },
  mutations: {
    setArticleReleaseDestory(state, destroy: (next: () => void) => void): void {
      state.articleReleaseDestory = destroy;
    },
    setArticleReleaseContentCache(state, content: string): void {
      state.articleReleaseContentCache = content;
    }
  },
  actions: {},
  modules: {}
});
