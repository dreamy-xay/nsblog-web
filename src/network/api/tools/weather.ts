/*
 * @Description: 天气第三方工具 api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-20 15:10:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-20 19:04:36
 */

import { get, RequestLifeCycle } from '@/network/request';
import { getLocation } from '@/network/api/tools/location';

export namespace XinZhiWeather {
  /* https://seniverse.yuque.com/hyper_data/api_v3/bwi8100zvwl0koau#ElVVu
  示例               说明
  WX4FBXXFKE4F       城市ID（可以通过城市查询接口获取）
  北京                城市中文名
  江苏南京            省市名称组合
  江苏鼓楼            省+区县名称组合（目前v3接口暂不支持城市+区县的查询如南京鼓楼）
  beijing            城市拼音/英文名（如拼音相同城市，可在之前加省份和空格，例：shanxi yulin）
  39.93:116.40       经纬度（格式是 纬度:经度，英文冒号分隔）
  220.181.111.86     IP 地址（某些 IP 地址可能无法定位到城市）
  ip                 “ip”两个字母,自动识别请求 IP 地址
  */
  type WeatherLocation = string;

  /* https://seniverse.yuque.com/hyper_data/api_v3/bwi8100zvwl0koau#lBq9g
  示例                说明
  zh-Hans             简体中文
  zh-Hant             繁体中文
  en                  英文
  ja                  日语
  de                  德语
  fr                  法语
  es                  西班牙语
  pt                  葡萄牙语
  hi                  印地语（印度官方语言之一）
  id                  印度尼西亚语
  ru                  俄语
  th                  泰语
  ar                  阿拉伯语
  */
  type WeatherLanguage =
    | 'zh-Hans'
    | 'zh-Hant'
    | 'en'
    | 'ja'
    | 'de'
    | 'fr'
    | 'es'
    | 'pt'
    | 'hi'
    | 'id'
    | 'ru'
    | 'th'
    | 'ar';

  /* https://seniverse.yuque.com/hyper_data/api_v3/bwi8100zvwl0koau#VAjl6
  示例              说明
  c                 当参数为 c 时，温度 c、风速 km/h、能见度 km、气压 mb
  f                 当参数为 f 时，温度 f、风速 mph、能见度 mile、气压 inch
  */
  type WeatherUnit = 'c' | 'f';

  /**
   * @description: 获取指定城市的天气实况
   * @param {WeatherLocation} location 位置 `默认为 'ip'，自动获取当地天气`
   * @param {WeatherLanguage} language 语言 `默认为 'zh-Hans'，简体中文`
   * @param {WeatherUnit} unit 单位 `默认为 'c'，摄氏度`
   * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
   * @return {Promise<unknown>} 请求返回promise
   * @author: dreamy-xay
   */
  export const getWeather = function(
    location: WeatherLocation = 'ip',
    language: WeatherLanguage = 'zh-Hans',
    unit: WeatherUnit = 'c',
    RLC: RequestLifeCycle = {}
  ): Promise<unknown> {
    return get({
      ...RLC,
      noAuthorization: true,
      url: 'https://api.seniverse.com/v3/weather/now.json',
      params: {
        key: 'Sd-ptuKFtXX61wwWg',
        location,
        language,
        unit
      }
    });
  };
}

export namespace HeFengWeather {
  // 需要查询地区的LocationID或以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位），LocationID可通过城市搜索服务获取。例如 location=101010100 或 location=116.41,39.92
  type WeatherLocation = string;

  // 具体查看官网文档 https://dev.qweather.com/docs/resource/language/
  type WeatherLanguage =
    | 'zh-hans'
    | 'zh-hant'
    | 'en'
    | 'ja'
    | 'de'
    | 'fr'
    | 'es'
    | 'pt'
    | 'hi'
    | 'id'
    | 'ru'
    | 'th'
    | 'ar';

  // 具体查看官网文档 https://dev.qweather.com/docs/resource/unit
  type WeatherUnit = 'm' | 'i';

  /**
   * @description: 获取指定城市的天气实况
   * @param {WeatherLocation} location 位置 `默认为 'ip'，自动获取当地天气`
   * @param {WeatherLanguage} language 语言 `默认为 'ZH_HANS'，简体中文`
   * @param {WeatherUnit} unit 单位 `默认为 'm'`
   * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
   * @return {Promise<unknown>} 请求返回promise
   * @author: dreamy-xay
   */
  export const getWeather = async function(
    location: WeatherLocation = 'ip',
    lang: WeatherLanguage = 'zh-hans',
    unit: WeatherUnit = 'm',
    RLC: RequestLifeCycle = {}
  ): Promise<unknown> {
    if (location === 'ip') {
      const res: any = await getLocation();
      location = `${res.result.location.lng.toFixed(2)},${res.result.location.lat.toFixed(2)}`;
    }
    return get({
      ...RLC,
      noAuthorization: true,
      url: 'https://devapi.qweather.com/v7/weather/now',
      params: {
        key: '62969dad6b76459f8f0fc9816cfe0a24',
        location,
        lang,
        unit
      }
    });
  };
}
