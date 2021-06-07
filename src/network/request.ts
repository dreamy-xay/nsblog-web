import axios from 'axios';
import { getToken } from './token';

// 1.创建axios的实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000
});

export function request(option: object): Promise<any> {
  return new Promise((resolve, reject) => {
    // 配置请求和响应拦截
    instance.interceptors.request.use(
      params => {
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
        params.headers['Authorization'] = getToken();

        // 3.对请求的参数进行序列化(看服务器是否需要序列化)

        // 4.等等
        return params;
      },
      err => {
        return err;
      }
    );

    instance.interceptors.response.use(
      response => {
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
        return err;
      }
    );

    // 2.传入对象进行网络请求
    instance(option)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function get(options: object): Promise<any> {
  return request({
    ...options,
    method: 'GET'
  });
}

export function post(options: object): Promise<any> {
  return request({
    ...options,
    method: 'POST'
  });
}
