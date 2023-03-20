/*
 * @Description: 位置第三方工具 api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-20 15:10:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-20 19:02:14
 */

import { jsonp, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取当前联网主机所在位置
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getLocation(RLC: RequestLifeCycle = {}): Promise<unknown> {
  // 跨域，必须用到jsonp
  return jsonp({
    ...RLC,
    url: 'https://apis.map.qq.com/ws/location/v1/ip', // 接口地址
    params: {
      key: 'LICBZ-NUUWI-DCZGA-UETES-6VK2Q-FCBCY',
      output: 'jsonp'
    } // 参数格式必须用到output传参为jsonp，否则会报跨域问题
  });
}
