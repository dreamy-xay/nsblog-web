/*
 * @Description: 问答相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-17 20:17:15
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 10:13:28
 */
import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取提问记录信息
 * @param {string} username 用户名
 * @param {number} offset 数据库提问记录偏移量 `默认为0`
 * @param {number} limit 返回提问记录的最大数量 `默认位10`
 * @param {number} release_time 按发布时间排序 1 升序 0 不排 -1 降序 `默认为1`
 * @param {number} browsing_count 按访问量排序 1 升序 0 不排 -1 降序 `默认位10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getQuestions(
  username: string,
  offset: number = 0,
  limit: number = 10,
  release_time: number = 1,
  browsing_count: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/questions',
    ...RLC,
    params: {
      username,
      offset,
      limit,
      release_time,
      browsing_count
    }
  });
}

/**
 * @description: 获取回答记录信息
 * @param {string} username 用户名
 * @param {number} offset 数据库回答记录偏移量 `默认为0`
 * @param {number} limit 返回问答回答的最大数量 `默认位10`
 * @param {number} release_time 按发布时间排序 1 升序 0 不排 -1 降序 `默认为1`
 * @param {number} browsing_count 按访问量排序 1 升序 0 不排 -1 降序 `默认位10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getReplies(
  username: string,
  offset: number = 0,
  limit: number = 10,
  release_time: number = 1,
  browsing_count: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/questions/replies',
    ...RLC,
    params: {
      username,
      offset,
      limit,
      release_time,
      browsing_count
    }
  });
}
