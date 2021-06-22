/*
 * @Description: vuex
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-15 10:11:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-22 11:29:56
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 管理员写文章页面，切换菜单调用的销毁函数
    articleReleaseDestory: (next: () => void) => {},
    // 文章是否已经保存
    articleReleaseIsSave: true,
    // 文章内容缓存
    articleReleaseContentCache: '',
    // 文章表单缓存
    articleReleaseFormCache: {
      coverImage: '',
      title: '',
      type: 0,
      categories: [],
      summary: '',
      tags: []
    },
    // 文章设置缓存
    articleReleaseSettingCache: {
      reviewPermission: true,
      priority: 100,
      accessPermission: '公开',
      sharingAgreement: '',
      passwordProtection: '',
      friendChain: []
    }
  },
  mutations: {
    // 设置管理员写文章页面时切换菜单调用的销毁函数
    setArticleReleaseDestory(state, destroy: (next: () => void) => void): void {
      state.articleReleaseDestory = destroy;
    },
    // 设置文章保存状态
    setArticleReleaseIsSave(state, status: boolean): void {
      state.articleReleaseIsSave = status;
    },
    // 文章内容缓存
    setArticleReleaseContentCache(state, content: string): void {
      state.articleReleaseContentCache = content;
    },
    // 文章表单缓存
    setArticleReleaseFormCache(state, form: any): void {
      state.articleReleaseFormCache = form;
    },
    // 文章设置缓存
    setArticleReleaseSettingCache(state, setting: any): void {
      state.articleReleaseSettingCache = setting;
    }
  },
  actions: {},
  modules: {}
});
