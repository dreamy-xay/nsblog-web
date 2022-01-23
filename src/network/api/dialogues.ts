/*
 * @Description: 对话相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 20:50:36
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-22 17:25:23
 */

import { get, del, RequestLifeCycle, put } from '@/network/request';

/**
 * @description: 获取对话记录信息
 * @param {number} offset 数据库历史记录偏移量 `默认为0`
 * @param {number} limit 返回history的最大数量 `默认位20`
 * @param {string | number} friendId 好友用户名，为''则获取全部对话记录 `默认''`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getDialogue(
  offset: number = 0,
  limit: number = 20,
  friendId: string | number = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/dialogues',
    ...RLC,
    params: {
      limit,
      offset,
      friend_id: friendId
    }
  });
}

/**
 * @description: 清零未读对话记录数量
 * @param {string | number} dialogueId 对话记录的id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function clearDialogue(dialogueId: string | number, RLC: RequestLifeCycle = {}) {
  return put({
    url: `/dialogues/${dialogueId}`,
    ...RLC
  });
}

/**
 * @description: 删除对话记录
 * @param {string | number} dialogueId 对话记录的id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function deleteDialogue(dialogueId: string | number, RLC: RequestLifeCycle = {}) {
  return del({
    url: `/dialogues/${dialogueId}`,
    ...RLC
  });
}
