/*
 * @Description: app整合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-09 17:58:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-12 12:44:20
 */

import { Application } from 'express';
import loginApi from './intercepter/login';
import adminApi from './intercepter/admin';

// 拦截请求api
const BASE_URL: string =
  (process.env.VUE_APP_MOCK_SEVER !== 'false' ? process.env.VUE_APP_APIHOST + ':' + process.env.VUE_APP_APIPORT : '') +
  process.env.VUE_APP_APIROUTER;

export default function intercepter(app: Application) {
  loginApi(BASE_URL, app);
  adminApi(BASE_URL, app);
}
