/*
 * @Description: 对话api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 20:50:36
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-25 18:16:28
 */

/*
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-06 11:01:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-10 16:32:11
 */

import { get, del, RequestLifeCycle, put, upload } from '@/network/request';

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
 * @param {string | number} friendId 删除历史记录的id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function clearDialogue(friendId: string | number, RLC: RequestLifeCycle = {}) {
  return put({
    url: `/dialogues/${friendId}`,
    ...RLC
  });
}

/**
 * @description: 删除对话记录
 * @param {string | number} friendId 删除历史记录的id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function deleteDialogue(friendId: string | number, RLC: RequestLifeCycle = {}) {
  return del({
    url: `/dialogues/${friendId}`,
    ...RLC
  });
}
