/*
 * @Description: vuex
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-15 10:11:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-24 11:43:51
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
    // 文章 id 缓存
    articleReleaseIdCache: null,
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
    // 文章缓存初始化
    articleCacheInit(state, data: any): void {
      state.articleReleaseIsSave = true;
      state.articleReleaseIdCache = data.id;
      state.articleReleaseContentCache = data.content;
      const tags: any = [];
      const tagType: any = ['', 'success', 'info', 'danger', 'warning'];
      const accessPermission: string[] = ['', '公开', '仅登录用户', '只有我'];
      const categories: any = [];
      for (const tag of data.tags) tags.push({ name: tag.value, ...tag, type: tagType[Math.floor(Math.random() * 5)] });
      for (const category of data.categories)
        categories.push({ name: category.value, type: tagType[Math.floor(Math.random() * 5)], item: category });
      state.articleReleaseFormCache = {
        coverImage: data.coverImage,
        title: data.title,
        type: data.type,
        categories,
        summary: data.summary,
        tags
      };
      state.articleReleaseSettingCache = {
        reviewPermission: data.reviewPermission,
        priority: data.priority,
        accessPermission: accessPermission[Number(data.accessPermission)],
        sharingAgreement: data.sharingAgreement,
        passwordProtection: data.passwordProtection,
        friendChain: []
      };
    },
    // 设置管理员写文章页面时切换菜单调用的销毁函数
    setArticleReleaseDestory(state, destroy: (next: () => void) => void): void {
      state.articleReleaseDestory = destroy;
    },
    // 设置文章保存状态
    setArticleReleaseIsSave(state, status: boolean): void {
      state.articleReleaseIsSave = status;
    },
    // 设置文章保存状态
    setArticleReleaseIdCache(state, id: any): void {
      state.articleReleaseIdCache = id;
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
