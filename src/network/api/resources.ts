/*
 * @Description: 资源相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-17 11:13:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-27 13:54:29
 */
import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取共享资源记录信息
 * @param {string} username 用户名
 * @param {number} offset 数据库共享资源偏移量 `默认为0`
 * @param {number} limit 返回共享资源的最大数量 `默认为10`
 * @param {number} time 可选，0为不限时间，1为最近一天，2为最近一周，3为最近一个月 `默认为0`
 * @param {number} type 0为综合，1为最新，2为热门 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getResources(
  username: string,
  offset: number = 0,
  limit: number = 10,
  time: number = 0,
  type: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/resources',
    ...RLC,
    params: {
      username,
      limit,
      offset,
      time,
      type
    }
  });
}

/**
 * @description: 获取获取资源详情信息
 * @param {string | number} resource_id 资源id
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getResourceDetail(resource_id: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: `/resources/${resource_id}`,
    ...RLC,
    params: {
      resource_id
    }
  });
}
