/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 12:55:44
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-10 20:03:18
 */

import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取收藏信息
 * @param {string} username 用户名 `必传参数`
 * @param {number} limit 返回collections的最大数量 `默认位10`
 * @param {number} offset 数据库收藏列表偏移量 `默认为0`
 * @param {number} favorites 收藏夹id `默认为''，返回全部收藏夹及其内容，传入id则返回指定收藏夹id内容`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getCollections(
  username: string,
  limit: number = 10,
  offset: number = 0,
  favorites: number | string = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/collections',
    ...RLC,
    params: {
      username,
      limit,
      offset,
      favorites
    }
  });
}
