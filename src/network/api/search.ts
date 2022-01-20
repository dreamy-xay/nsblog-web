/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-19 18:53:18
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-20 10:58:46
 */
import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取标签搜索结果
 * @param {string} tagName 标签名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Ban
 */

export function searchTag(tagName: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/search/tag',
    ...RLC,
    params: {
      tagName
    }
  });
}

/**
 * @description: 获取用户搜索结果
 * @param {string} username 用户名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {*}
 * @author: Ban
 */

export function searchUser(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/search/user',
    ...RLC,
    params: {
      username
    }
  });
}
