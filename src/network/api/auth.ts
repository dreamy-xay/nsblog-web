/*
 * @Description: 验证相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-10 20:30:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 10:11:58
 */

import { post, RequestLifeCycle } from '@/network/request';

/**
 * @description: 用户登陆
 * @param {string} username 登录用户名 `必传参数`
 * @param {string} password 登陆密码 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function authLogin(username: string, password: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/auth/login',
    ...RLC,
    data: {
      username,
      password
    }
  });
}

/**
 * @description: 用户登出
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function authLogout(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/auth/logout',
    ...RLC
  });
}

/**
 * @description: 用户注销
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function authLogoff(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/auth/logoff',
    ...RLC
  });
}
