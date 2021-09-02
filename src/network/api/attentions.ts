/*
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-01 17:02:19
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-02 11:53:12
 */
import { del, post, RequestLifeCycle } from '@/network/request';

/**
 * @description: 添加关注
 * @param {string} username 用户名
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function postAttentions(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/attentions',
    ...RLC,
    data: {
      username
    }
  });
}

/**
 * @description: 删除关注
 * @param {string} username 用户名
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function deleteAttentions(username: string, RLC: RequestLifeCycle = {}) {
  return del({
    url: '/attentions',
    ...RLC,
    data: {
      username
    }
  });
}
