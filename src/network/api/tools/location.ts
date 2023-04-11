/*
 * @Description: 位置第三方工具 api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-20 15:10:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-04-11 16:37:16
 */

import { jsonp, RequestLifeCycle } from '@/network/request';

export interface Location {
  longitude: number;
  latitude: number;
}

export interface LocationInfo {
  ip?: string; // 访问网络ip
  nation: string; // 国家
  province: string; // 省
  city: string; // 城市
  district: string; // 区
  location: Location; // 经纬度
}

export namespace QQ {
  /**
   * @description: 获取当前联网主机所在位置
   * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
   * @return {Promise<unknown>} 请求返回promise
   * @author: dreamy-xay
   */
  export const getLocation = function(RLC: RequestLifeCycle = {}): Promise<unknown> {
    // 跨域，必须用到jsonp
    return jsonp({
      ...RLC,
      url: 'https://apis.map.qq.com/ws/location/v1/ip', // 接口地址
      params: {
        key: 'LICBZ-NUUWI-DCZGA-UETES-6VK2Q-FCBCY',
        output: 'jsonp'
      } // 参数格式必须用到output传参为jsonp，否则会报跨域问题
    });
  };

  /**
   * @description: 规范化 getLocation 返回的地址信息
   * @param {Record<string, unknown>} data 返回的地址信息 `必传参数`
   * @return {LocationInfo} 返回详细地址信息
   * @author: dreamy-xay
   */
  export const standardizeLocationInfo = function(data: Record<string, unknown>): LocationInfo {
    const info: any = data.result;
    const locationInfo: LocationInfo = {
      ip: info.ip,
      nation: info.ad_info.nation,
      province: info.ad_info.province,
      city: info.ad_info.city,
      district: info.ad_info.district,
      location: {
        longitude: info.location.lng,
        latitude: info.location.lat
      }
    };

    return locationInfo;
  };
}
