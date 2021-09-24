/*
 * @Description: 历史记录相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-06 11:01:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 10:13:05
 */

import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取浏览历史记录信息
 * @param {number} type 历史记录类型，0为文章和问答；1为文章；2为问答 `默认为0`
 * @param {number} offset 数据库历史记录偏移量 `默认为0`
 * @param {string} keyword 获取title关键词 `默认为''`
 * @param {number} limit 返回history的最大数量 `默认位20`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getHistory(
  type: number = 0,
  offset: number = 0,
  keyword: string = '',
  limit: number = 20,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/history',
    ...RLC,
    params: {
      limit,
      offset,
      type,
      keyword
    }
  });
}

/**
 * @description: 删除历史记录
 * @param {number} id 删除历史记录的id `默认为''，删除全部历史记录`
 * @param {number} type 删除历史记录类型，1为文章，2为问答 `默认为1`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function deleteHistory(id: number | string = '', type: number = 1, RLC: RequestLifeCycle = {}) {
  const params: Record<string, unknown> = id !== '' ? { type } : {};
  return del({
    url: '/history' + (id !== '' ? '/' + id : ''),
    ...RLC,
    params
  });
}
