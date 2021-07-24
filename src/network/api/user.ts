/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:38:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-24 13:11:43
 */
import { post, get, del, put, RequestLifeCycle } from '@/network/request';

/**
 * @description:
 * @param {string} username  用户名 `必传`
 * @param {number} type 请求数据类型 `默认为0`
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getUserInfo(username: string, type: number = 0, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: `/users/${username}`,
    ...RLC,
    params: {
      type
    }
  });
}
