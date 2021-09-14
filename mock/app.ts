/*
 * @Description: app整合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-09 17:58:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-13 21:33:53
 */

import { Application } from 'express';
import authApi from './intercepter/auth';
import adminApi from './intercepter/admin';
import userApi from './intercepter/user';
import historyApi from './intercepter/history';
import favoritesApi from './intercepter/favorites';
import settingApi from './intercepter/setting';
import attentionsApi from './intercepter/attentions';
import messagesApi from './intercepter/messages';
import dialoguesApi from './intercepter/dialogues';
import topicsApi from './intercepter/topics';
import groupsApi from './intercepter/groups';
import articlesApi from './intercepter/articles';
import questionsApi from './intercepter/questions';

// 拦截请求api
const BASE_URL: string =
  (process.env.VUE_APP_MOCK_SEVER !== 'false' ? process.env.VUE_APP_APIHOST + ':' + process.env.VUE_APP_APIPORT : '') +
  process.env.VUE_APP_APIROUTER;

/**
 * @description: 拦截器
 * @param {Application} app 回调app
 * @return {void}
 * @author: dreamy-xay
 */
export default function intercepter(app: Application): void {
  authApi(BASE_URL, app);
  adminApi(BASE_URL, app);
  userApi(BASE_URL, app);
  historyApi(BASE_URL, app);
  favoritesApi(BASE_URL, app);
  settingApi(BASE_URL, app);
  attentionsApi(BASE_URL, app);
  messagesApi(BASE_URL, app);
  dialoguesApi(BASE_URL, app);
  topicsApi(BASE_URL, app);
  groupsApi(BASE_URL, app);
  articlesApi(BASE_URL, app);
  questionsApi(BASE_URL, app);
}
