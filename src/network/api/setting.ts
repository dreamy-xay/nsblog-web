/*
 * @Description: 个人设置api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-06 21:49:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-07 13:06:42
 */
import { get, put, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取消息页面设置信息
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getMessageSetting(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/setting/message',
    ...RLC
  });
}

/**
 * @description: 获取消息页面设置信息
 * @param {Record<string, unknown>} setting 需要修改的设置对象 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function modifySetting(setting: Record<string, unknown>, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: '/setting',
    ...RLC,
    data: {
      setting
    }
  });
}
