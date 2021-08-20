/*
 * @Description: 工具函数
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-28 00:28:11
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-19 22:45:30
 */

import { Base64 } from 'js-base64';
import { Random } from 'better-mock';
import select, { DataBaseOperator } from '../data/index';
import * as CryptoJS from 'crypto-js';

/**
 * @description: 获取headers token，以及token的信息
 * @param {Record<string, unknown>} headers   headers 传入请求头 `必传参数`
 * @return {{ token: string; time: number; username: string }} 返回token相关信息
 * @author: dreamy-xay
 */
export function getToken(headers: Record<string, unknown>): { token: string; time: number; username: string } {
  let token: string = (headers['authorization'] as string).replace('Basic ', '');
  token = decrypt(Base64.fromBase64(token.substr(0, token.length - 1)));
  const [_, time, username]: string[] = token.split('$^$');
  return {
    token,
    time: parseInt(time),
    username
  };
}

/**
 * @description:
 * @param {string} username 用户名 `必传参数`
 * @return {string} 返回一个专有token
 * @author: dreamy-xay
 */
export function createToken(username: string): string {
  const token: string = encrypt(Random.guid() + '$^$' + new Date().getTime() + '$^$' + username);
  const users: DataBaseOperator = select('users');

  if (users.modifyOne({ username }, { token })) return token;
  else return users.findOne({ username }).token as string;
}

/**
 * @description:清空token
 * @param {Record<string, unknown>} headers 传入请求头 `必传参数`
 * @return {void}
 * @author: dreamy-xay
 */
export function clearToken(headers: Record<string, unknown>): void {
  const { username }: { username: string } = getToken(headers);
  select('users').modifyOne({ username }, { token: null });
}

/**
 * @description: 验证token
 * @param {Record<string, unknown>} headers 传入请求头 `必传参数`
 * @param {boolean} verifyTime 是否验证时间有效性 `默认根据env`
 * @return {boolean} token是否有效
 * @author: dreamy-xay
 */
export function verifyToken(
  headers: Record<string, unknown>,
  verifyTime: boolean = process.env.VUE_APP_MOCK_SEVER === 'false'
): boolean {
  const { token, time, username }: { token: string; time: number; username: string } = getToken(headers);
  const users: DataBaseOperator = select('users');
  const user: Record<string, unknown> = users.findOne({ username });
  if (
    user &&
    user.isActive &&
    decrypt(user.token as string) === token &&
    (verifyTime ? new Date().getTime() - time <= 172800000 : true)
  )
    return true;
  if (user && verifyTime) users.modifyOne({ username }, { token: null });
  return false;
}

/**
 * @description: aes加密
 * @param {string | Record<string, unknown>} 加密对象 `必传参数`
 * @return {string} 返回加密字符串
 * @author: dreamy-xay
 */
export function encrypt(word: string | Record<string, unknown>): string {
  const key = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_KEY); //16位
  const iv = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_IV);
  let encrypted: any = '';
  if (typeof word == 'string') {
    const srcs = CryptoJS.enc.Utf8.parse(word);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  } else if (typeof word == 'object') {
    //对象格式的转成json字符串
    const data = JSON.stringify(word);
    const srcs = CryptoJS.enc.Utf8.parse(data);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  }
  return encrypted.ciphertext.toString();
}

/**
 * @description: aes解密
 * @param {string} 已加密字符串 `必传参数`
 * @return {string} 返回原串
 * @author: dreamy-xay
 */
export function decrypt(word: string): string {
  const key = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_KEY); //16位
  const iv = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_IV);
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
