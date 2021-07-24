/*
 * @Description: app整合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-09 17:58:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-24 18:08:37
 */

import { Application } from 'express';
import loginApi from './intercepter/login';
import adminApi from './intercepter/admin';
import userApi from './intercepter/user';

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
export default function intercepter(app: Application) {
  loginApi(BASE_URL, app);
  adminApi(BASE_URL, app);
  userApi(BASE_URL, app);
}
