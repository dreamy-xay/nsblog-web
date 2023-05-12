/*
 * @Description: token基本操作
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-05-12 20:34:57
 */

import store from 'storejs';
import { Base64 } from 'js-base64';
import { decrypt, encrypt } from '@/utils/crypto';

export default store;

/**
 * @description: verifyToken 返回值接口
 * @author: dreamy-xay
 */
export interface TokenInfo {
  status: boolean;
  token?: string;
  username?: string;
}

/**
 * @description: 验证token
 * @param {string} originToken  源token，即从浏览器获取的token(被JSON.stringify化的对象) `默认自动从浏览器获取`
 * @return {TokenInfo} 返回一个对象 内置 status,token,username(后两者仅status为true时才有属性) 属性，status为token是否有效状态，token为获取的最初由后台发送过来的token,username为登录用户名
 * @author: dreamy-xay
 */
export function verifyToken(originToken: string = store.get('token')): TokenInfo {
  if (originToken) {
    try {
      const { token, data, startTime, expires } = <any>decrypt(originToken, true);
      if (
        token &&
        data &&
        startTime !== undefined &&
        expires !== undefined &&
        startTime + expires * 1000 >= new Date().getTime()
      )
        return { status: true, token, username: data };
      else {
        store.remove('token');
        return { status: false };
      }
    } catch {
      // token 解密失败，直接删除
      store.remove('token');
      return { status: false };
    }
  } else return { status: false };
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
 * @param {string} token 后台返回的token `必传参数`
 * @param {string} username 后台返回用户名 `必传参数`
 * @param {number} expires  token从现在起有效期限(以秒记) `默认为172800(2天)`
 * @param {string} tokenKey token存入本地浏览器 localStorage 中的键值 `默认为'token'`
 * @return {void}
 * @author: dreamy-xay
 */
export function setToken(token: string, username: string, expires: number = 172800, tokenKey: string = 'token'): void {
  const options: Record<string, unknown> = {
    token,
    data: username,
    startTime: new Date().getTime(),
    expires
  };
  store.set(tokenKey, encrypt(options));
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
