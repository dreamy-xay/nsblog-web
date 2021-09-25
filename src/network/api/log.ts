/*
 * @Description: 获取登录日志api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-24 19:29:33
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-24 19:52:24
 */

import { get, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取登录日志
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getLogs(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/logs/login',
    ...RLC
  });
}
