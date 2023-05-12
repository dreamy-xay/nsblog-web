/*
 * @Description: 封装axios
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-05-12 21:33:03
 */

import axios, { AxiosRequestConfig } from 'axios';
import { getToken, clearToken } from './token';
import store from '@/store';

export interface RequestLifeCycle {
  beforeRequest?(): void;
  afterResponse?(): void;
  successBeforeRequest?(): void;
  successAfterResponse?(): void;
  failBeforeRequest?(): void;
  failAfterResponse?(): void;
}

/**
 * @description: 请求配置接口
 * @author: dreamy-xay
 */
export interface RequestConfig extends AxiosRequestConfig, RequestLifeCycle {
  noAuthorization?: boolean; // 是否不在请求头中（headers）添加 'Authorization' （headers['Authorization'] = getToken()）
  all?: boolean; // axios 返回所有信息，而不是返回 res.data
}

/**
 * @description: request请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function request(options: RequestConfig): Promise<unknown> {
  return new Promise((resolve: (...value: unknown[]) => void, reject: (...reason: unknown[]) => void) => {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: `${process.env.VUE_APP_APIHOST}:${process.env.VUE_APP_APIPORT}${process.env.VUE_APP_APIROUTER}`,
      timeout: 5000
    });

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      params => {
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画，或者执行一段程序
        if (options.successBeforeRequest) options.successBeforeRequest();
        if (options.beforeRequest) options.beforeRequest();

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
        if (
          !options.noAuthorization &&
          (!Object.prototype.hasOwnProperty.call(params.headers, 'Authorization') || !params.headers['Authorization'])
        )
          params.headers['Authorization'] = getToken();

        // 3.对请求的参数进行序列化(看服务器是否需要序列化)

        // 4.等等
        return params;
      },
      err => {
        if (options.failBeforeRequest) options.failBeforeRequest();
        if (options.beforeRequest) options.beforeRequest();
        return Promise.reject(err);
      }
    );

    instance.interceptors.response.use(
      response => {
        if (options.successAfterResponse) options.successAfterResponse();
        if (options.afterResponse) options.afterResponse();

        return response;
      },
      err => {
        if (err && err.response && err.response.status === 401) {
          clearToken();
          store.commit('global/updateTokenInfo', { status: false });
        }
        // if (err && err.response && err.response.status === 410) router.push({ name: '404' });
        if (options.failAfterResponse) options.failAfterResponse();
        if (options.afterResponse) options.afterResponse();
        return Promise.reject(err);
      }
    );

    // 2.传入对象进行网络请求
    instance(options)
      .then(res => {
        // 如果是前端 mock
        if (process.env.VUE_APP_MOCK !== 'false' && process.env.VUE_APP_MOCK_SEVER !== 'false') {
          if (typeof res.data !== 'object' || (res.data.status >= 200 && res.data.status < 300))
            resolve(options.all ? res.data : res.data.data);
          else {
            console.error(
              new Error(
                `Failed to load resource: the server responded with a status of ${res.data.status} (${res.data.statusText})`
              )
            );
            reject(axios.isAxiosError(res.data));
          }
        } else resolve(options.all ? res : res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * @description: get请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function get(options: RequestConfig): Promise<unknown> {
  if (options['method']) delete options['method'];
  return request({
    ...options,
    method: 'GET'
  });
}

/**
 * @description: post请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function post(options: RequestConfig): Promise<unknown> {
  if (options['method']) delete options['method'];
  return request({
    ...options,
    method: 'POST'
  });
}

/**
 * @description: delete请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function del(options: RequestConfig): Promise<unknown> {
  if (options['method']) delete options['method'];
  return request({
    ...options,
    method: 'DELETE'
  });
}

/**
 * @description: put请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function put(options: RequestConfig): Promise<unknown> {
  if (options['method']) delete options['method'];
  return request({
    ...options,
    method: 'PUT'
  });
}

/**
 * @description: 上传文件 upload 请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)，携带文件时采用，请传入data参数
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function upload(options: RequestConfig): Promise<unknown> {
  const data: FormData = new FormData();
  if (options['data']) for (const key in options.data) data.append(key, options.data[key]);
  options.data = data;
  let headers: Record<string, unknown>;
  if (options['headers']) {
    headers = options['headers'];
    headers['Content-Type'] = 'multipart/form-data';
    delete options['headers'];
  } else headers = { 'Content-Type': 'multipart/form-data' };

  return post({
    ...options,
    headers
  });
}

/**
 * @description: jsonp 请求 （仅 RLC、url、params 参数有效）
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)，携带文件时采用，请传入data参数
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function jsonp(options: RequestConfig): Promise<any> {
  return new Promise((resolve: (...value: unknown[]) => void, reject: (...reason: unknown[]) => void) => {
    // 调用request 生命周期
    if (options.successBeforeRequest) options.successBeforeRequest();
    if (options.beforeRequest) options.beforeRequest();

    // 根据时间戳生 + 随机数成一个callback回调名
    const callbackName: string =
      `jsonp_${new Date().getTime()}` +
      `${Math.random()
        .toString()
        .replace(/\D/g, '')}`;

    // 创建一个script
    const script: HTMLScriptElement = document.createElement('script');

    // 字符串拼接生成基本url
    let baseUrl: string = `${options.url}${options.url.indexOf('?') === -1 ? '?' : '&'}callback=${callbackName}`;

    // 遍历query对象拼接参数到url后
    for (const item in options.params) baseUrl += `&${item}=${options.params[item]}`;

    // jsonp核心，通过script的跨域特性发出请求
    script.src = baseUrl;

    // 给window添加属性，用于获取jsonp结果
    window[callbackName] = (res: any) => {
      // 调用request 生命周期
      if (options.successAfterResponse) options.successAfterResponse();
      if (options.afterResponse) options.afterResponse();

      resolve(res);
      // 删除window下属性
      delete window[callbackName];
      // 得到结果后删除创建的script
      document.body.removeChild(script);
    };

    // 动态创建script标记，错误的监听
    script.addEventListener('error', () => {
      // 调用request 生命周期
      if (options.failAfterResponse) options.failAfterResponse();
      if (options.afterResponse) options.afterResponse();

      delete window[callbackName];
      document.body.removeChild(script);
      reject(new Error('The jsonp request failed!')); //  请求失败
    });

    // 把创建的script挂载到DOM
    document.body.appendChild(script);
  });
}
