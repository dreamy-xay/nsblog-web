/*
 * @Description: api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-10 20:30:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-19 20:28:07
 */

import { request, post, get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 管理员登陆
 * @param {string} username 登录用户名 `必传参数`
 * @param {string} password 登陆密码 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function adminLogin(username: string, password: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/login',
    data: {}
  });
}
