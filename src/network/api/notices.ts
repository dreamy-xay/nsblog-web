/*
 * @Description:公告活动api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-11 14:52:17
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-11 15:50:26
 */
import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取公告活动api
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getNotices(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/notices',
    ...RLC
  });
}
