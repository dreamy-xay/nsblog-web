/*
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-08-10 19:39:04
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-13 17:04:27
 */
import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 得到未读通知数量
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

export function deleteMessages(id: number | string, RLC: RequestLifeCycle = {}) {
  return del({
    url: `/messages/${id}`,
    ...RLC
  });
}
