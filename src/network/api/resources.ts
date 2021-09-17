/*
 * @Description: 获取共享资源api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-17 11:13:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-17 20:40:51
 */
import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取共享资源记录信息
 * @param {string} username 用户名
 * @param {number} offset 数据库共享资源偏移量 `默认为0`
 * @param {number} limit 返回共享资源的最大数量 `默认位10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getResources(
  username: string,
  offset: number = 0,
  limit: number = 10,
  release_time: number = 0,
  browsing_count: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/resources',
    ...RLC,
    params: {
      username,
      limit,
      offset,
      release_time,
      browsing_count
    }
  });
}
