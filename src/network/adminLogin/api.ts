/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-15 00:09:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-15 00:09:58
 */

import { post } from '@/network/request';

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
