/*
 * @Description: 学习小组相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-16 10:05:10
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 10:12:49
 */

import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取学习小组
 * @param {string} username 用户名 '必传'
 * @param {number} offset 数据库历史记录偏移量 `默认为0`
 * @param {number} limit 返回学习小组的最大数量 `默认位10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getGroups(
  username: string,
  offset: number = 0,
  limit: number = 10,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/groups',
    ...RLC,
    params: {
      username,
      limit,
      offset
    }
  });
}
