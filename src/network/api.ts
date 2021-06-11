/*
 * @Description:  部分api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-12 00:38:44
 */

import { request, get, post } from '@/network/request';

/**
 * @description: 管理员登录
 * @param {string} account 管理员账户名
 * @param {string} password 管理员密码
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function adminLogin(account: string, password: string): Promise<any> {
  return post({
    url: 'api/private/v1/auth/admin',
    data: { account, password }
  });
}

/**
 * @description: 获取管理员信息
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function getAdminInfo(): Promise<any> {
  return get({
    url: 'api/private/v1/admin'
  });
}
