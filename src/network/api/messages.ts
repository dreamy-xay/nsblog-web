/*
 * @Description: 消息相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-10 19:39:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 10:13:15
 */
import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取浏览消息记录信息
 * @param {number} type 历史记录类型，0为未读通知数量；1为系统通知；2为回复我的；3为收到的赞；4为关注我的 `默认为0`
 * @param {number} offset 数据库历史记录偏移量 `默认为0`
 * @param {number} limit 返回history的最大数量 `默认位10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getMessages(
  type: number = 0,
  offset: number = 0,
  limit: number = 10,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/messages',
    ...RLC,
    params: {
      type,
      limit,
      offset
    }
  });
}

/**
 * @description: 删除消息
 * @param {number} id 删除消息的id
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function deleteMessages(id: number | string, RLC: RequestLifeCycle = {}) {
  return del({
    url: `/messages/${id}`,
    ...RLC
  });
}
