/*
 * @Description: 封装axios
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-21 18:24:46
 */

import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './token';

export interface RequestLC {
  beforeRequest?(): void;
  afterResopnse?(): void;
  successBeforeRequest?(): void;
  successAfterResopnse?(): void;
  failBeforeRequest?(): void;
  failAfterResopnse?(): void;
}

/**
 * @description: 请求配置接口
 * @author: dreamy-xay
 */
export interface RequestConfig extends AxiosRequestConfig, RequestLC {}

/**
 * @description: request请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<any>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function request(options: RequestConfig): Promise<any> {
  return new Promise((resolve: (value: unknown) => void, reject: (reason: any) => void) => {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://127.0.0.1:3000',
      timeout: 5000
    });

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      params => {
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画，或者执行一段程序
        if (options.successBeforeRequest) options.successBeforeRequest();
        if (options.beforeRequest) options.beforeRequest();

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
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
        if (options.successAfterResopnse) options.successAfterResopnse();
        if (options.afterResopnse) options.afterResopnse();
        return response.data;
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误';
              break;
            case 401:
              err.message = '未授权的访问';
              break;
          }
        }
        if (options.failAfterResopnse) options.failAfterResopnse();
        if (options.afterResopnse) options.afterResopnse();
        return Promise.reject(err);
      }
    );

    // 2.传入对象进行网络请求
    instance(options)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * @description: get请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<any>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function get(options: RequestConfig): Promise<any> {
  if (options['method']) delete options['method'];
  return request({
    ...options,
    method: 'GET'
  });
}

/**
 * @description: post请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<any>} 返回请求后的Promise
 * @author: dreamy-xay
 */
export function post(options: RequestConfig): Promise<any> {
  if (options['method']) delete options['method'];
  return request({
    ...options,
    method: 'POST'
  });
}
