/*
 * @Description: 获取问答记录api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-17 20:17:15
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-17 20:22:41
 */
import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取问答记录信息
 * @param {string} username 用户名
 * @param {number} offset 数据库问答记录偏移量 `默认为0`
 * @param {number} limit 返回问答记录的最大数量 `默认位10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getQuestions(
  username: string,
  offset: number = 0,
  limit: number = 10,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/questions',
    ...RLC,
    params: {
      username,
      offset,
      limit
    }
  });
}
