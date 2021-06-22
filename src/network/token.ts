/*
 * @Description: token基本操作
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-22 08:58:31
 */

import store from 'storejs';
import { Base64 } from 'js-base64';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * @description:
 * @param {string} originToken  源token，即从浏览器获取的token(被JSON.stringify化的对象) `默认自动从浏览器获取`
 * @return {{ status: boolean; token: string }} 返回一个对象 内置 status,token 属性，status为token是否有效状态，token为获取的最初由后台发送过来的token
 * @author: dreamy-xay
 */
export function verifyToken(originToken: string = store.get('token')): { status: boolean; token: string } {
  if (originToken) {
    const { token, code, startTime, expires } = JSON.parse(originToken);
    if (token !== null && code !== null && startTime !== null && expires !== null)
      if (startTime + expires * 1000 >= new Date().getTime()) return { status: Md5.hashStr(token) === code, token };
      else {
        store.remove('token');
        return { status: false, token: '' };
      }
    else return { status: false, token: '' };
  } else return { status: false, token: '' };
}

/**
 * @description: 获取处理后的token值
 * @return {string} 返回发送给后台的转码token
 * @author: dreamy-xay
 */
export function getToken(): string {
  const token = verifyToken().token; // 后端返回的token值
  const baseCode = Base64.encode(token + ':');
  return `Basic ${baseCode}`;
}

/**
 * @description: 设置token值
 * @param {string} token 后台返回的token
 * @param {number} expires  token从现在起有效期限(以秒记) `默认为172800(2天)`
 * @param {string} tokenKey token存入本地浏览器 localStorage 中的键值 `默认为'token'`
 * @return {void}
 * @author: dreamy-xay
 */
export function setToken(token: string, expires: number = 172800, tokenKey: string = 'token'): void {
  const options: object = {
    token,
    code: Md5.hashStr(token),
    startTime: new Date().getTime(),
    expires
  };
  store.set(tokenKey, JSON.stringify(options));
}

/**
 * @description: 清空token值
 * @param {string} tokenKey 清空本地浏览器 localStorage 中指定键值token
 * @return {void}
 * @author: dreamy-xay
 */
export function clearToken(tokenKey: string = 'token'): void {
  store.remove(tokenKey);
}
