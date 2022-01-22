/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-19 18:53:18
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-22 12:02:54
 */
import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取搜索结果
 * @param {string} keyword 关键字 `必传参数`
 * @param {number} option 类型 `0为综合，1为文章，2为问答，3为学习小组，4为资源，5为标签，6为用户`
 * @param {number} type 0为综合，1为最新，2为热门 `可选参数`
 * @param {number} time 0为不限时间，1为最近一天，2为最近一周，3为最近一个月 `可选参数`
 * @param {number} limit `默认为10`
 * @param {number} offset `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Ban
 */

export function search(
  keyword: string,
  option: number,
  type?: number,
  time?: number,
  limit = 10,
  offset = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/search',
    ...RLC,
    params: {
      keyword,
      option,
      type,
      time,
      limit,
      offset
    }
  });
}
