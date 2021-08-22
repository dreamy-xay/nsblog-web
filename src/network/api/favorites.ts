/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 12:55:44
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-22 17:05:24
 */

import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取收藏信息
 * @param {string} username 用户名 `必传参数`
 * @param {number} limit 返回collections的最大数量 `默认位15`
 * @param {number} offset 数据库收藏列表偏移量 `默认为0`
 * @param {0 | 1} is_all 是否获取全部信息，0为不获取全部信息 `默认为0`
 * @param {number} favorites 收藏夹id `默认为''，返回全部收藏夹及其内容，传入id则返回指定收藏夹id内容`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getFavorites(
  username: string,
  limit: number = 15,
  offset: number = 0,
  is_all: 0 | 1 = 0,
  favorites: number | string = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/favorites',
    ...RLC,
    params: {
      username,
      limit,
      offset,
      is_all,
      favorites
    }
  });
}
