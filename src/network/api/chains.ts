/*
 * @Description: 友链相关api
 * @Version:
 * @Autor: xiao
 * @Date: 2022-02-12 15:37:25
 * @LastEditors: xiao
 * @LastEditTime: 2022-02-12 16:50:19
 */
import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取友链
 * @param {string} username 用户名 `必传参数`
 * @param {number} limit 返回友链的最大数量 `默认位10`
 * @param {number} offset 数据库友链列表偏移量 `默认为0`
 * @return {Promise<unknown>} 请求返回promise
 * @author: xiao
 */
export function getChains(
  username: string,
  limit: number = 10,
  offset: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/chains',
    ...RLC,
    params: {
      username,
      limit,
      offset
    }
  });
}
