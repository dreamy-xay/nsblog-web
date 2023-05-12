/*
 * @Description: 工具函数
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-28 00:28:11
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-05-12 20:24:42
 */

import { Base64 } from 'js-base64';
import { Random } from 'better-mock';
import select, { DataBaseOperator } from '../data/index';
import * as CryptoJS from 'crypto-js';
import { shuffle } from 'lodash';

/**
 * @description: 强转成number类型整数
 * @param {unknown} value 强转值 `必传参数`
 * @return {number} 返回number
 * @author: dreamy-xay
 */
export function int(value: unknown): number {
  return parseInt(value as string);
}

/**
 * @description: text格式化变量字符串
 * @param {unknown} value 格式化的变量 `必传参数`
 * @param {string} text 变量名 `必传参数`
 * @return {void}
 * @author: dreamy-xay
 */
/**
 * @description: 打印请求参数，便于debug
 * @param {string | unknown[]} preText 参数前文本，如果为数组就相当于 console.log `必传参数`
 * @param {Record<string, unknown> | undefined} params 打印的参数 `默认为 undefined`
 * @param {string} endText 参数后文本 `默认为 'success!'`
 * @param {string} prefix 打印文字的前缀 `默认为 '\x1B[32m>\x1b[0m '`
 * @return {void}
 * @author: dreamy-xay
 */
export function print(
  preText: string | unknown[],
  params: Record<string, unknown> | undefined = undefined,
  endText: string = 'success!',
  prefix: string = '\x1B[32m>\x1b[0m '
): void {
  if (process.env.VUE_APP_API_DEBUG === 'false') return;
  if (preText instanceof Array) console.log(...preText);
  else {
    let str: string = prefix + preText + (params ? ':' : '');
    if (params)
      for (const key in params) {
        const value: string = typeof params[key];
        str += `${value !== 'null' && value !== 'undefined' && params[key] ? `  ${key}=>${params[key]}` : ''}`;
      }
    str += '  ' + endText + '\n';
    console.log(str);
  }
}

/**
 * @description: 获取headers token，以及token的信息
 * @param {Record<string, unknown>} headers   headers 传入请求头 `必传参数`
 * @return {{ token: string; time: number; username: string }} 返回token相关信息
 * @author: dreamy-xay
 */
export function getToken(headers: Record<string, unknown>): { token: string; time: number; username: string } {
  let token: string = (headers['authorization'] as string).replace('Basic ', '');
  token = decrypt(Base64.fromBase64(token.substring(0, token.length - 1)));
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
 * @param {boolean} verify 是否验证时间、token有效性 `默认根据env`
 * @return {boolean} token是否有效
 * @author: dreamy-xay
 */
export function verifyToken(
  headers: Record<string, unknown>,
  verify: boolean = process.env.VUE_APP_MOCK_SEVER === 'false'
): boolean {
  const { token, time, username }: { token: string; time: number; username: string } = getToken(headers);
  const users: DataBaseOperator = select('users');
  const user: Record<string, unknown> = users.findOne({ username });
  if (
    user &&
    user.isActive &&
    (verify ? decrypt(user.token as string) === token : true) &&
    (verify ? new Date().getTime() - time <= 172800000 : true)
  )
    return true;
  if (user && verify) users.modifyOne({ username }, { token: null });
  return false;
}

/**
 * @description: aes加密
 * @param {string | Record<string, unknown>} word 加密对象 `必传参数`
 * @return {string} 返回加密字符串
 * @author: dreamy-xay
 */
export function encrypt(word: string | Record<string, unknown>): string {
  const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_KEY); //16位
  const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_IV);
  // 对象格式的转成json字符串
  const data: string = typeof word !== 'string' ? JSON.stringify(word) : word;
  const srcs: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(data);
  const encrypted: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

/**
 * @description: aes解密
 * @param {string} word 已加密字符串 `必传参数`
 * @return {string} 返回原串
 * @author: dreamy-xay
 */
export function decrypt(word: string, parse: boolean = false): string {
  const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_KEY); //16位
  const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_IV);
  const encryptedHexStr: CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse(word);
  const srcs: string = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr: string = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}

/**
 * @description: 随机用户
 * @param {string} username 传入忽略用户名 `默认不忽略为null`
 * @return {{ random: Function }} 返回一个对象，可随机用户
 * @author: dreamy-xay
 */
export function randomUsers(username: string = null): { random: () => RandomUser } {
  const users: Record<string, unknown>[] = select('users').findAll({ isActive: true }); // 获取所有用户
  if (username) {
    // 删除指定名字
    for (let i: number = 0; i < users.length; ++i)
      if (users[i].username === username) {
        users.splice(i, 1);
        break;
      }
  }
  return {
    random(): RandomUser {
      const index: number = Random.integer(0, users.length - 1);
      const ans: Record<string, unknown> = users[index];
      users.splice(index, 1);
      return ans as any;
    }
  };
}

/* 随机用户接口 */
export interface RandomUser {
  username: string;
  nickname: string;
  password: string;
  email: string;
  token: string;
}

/**
 * @description: 获取随机专题名
 * @return {string[]} 返回专题列表
 * @author: dreamy-xay
 */
export function getTopics(): string[] {
  const topics: { topic: string; tags: string[] }[] = select('allTopicTags').all() as {
    topic: string;
    tags: string[];
  }[];
  return shuffle(topics.map((item: { topic: string; tags: string[] }) => item.topic));
}

/**
 * @description: 获取指定专题的标签
 * @param {string} topicName 专题名 `必传参数`
 * @return {string[]} 返回标签列表
 * @author: dreamy-xay
 */
export function getTags(topicName: string): string[] {
  const allTopicTags: { topic: string; tags: string[] }[] = select('allTopicTags').all() as {
    topic: string;
    tags: string[];
  }[];
  const index: number = allTopicTags.findIndex(item => item.topic === topicName);
  return index !== -1 ? allTopicTags[index].tags : [];
}

/**
 * @description: 获取随机专题
 * @return {string} 返回专题名
 * @author: dreamy-xay
 */
export function getRandomTopic(): string {
  const allTopicTags: { topic: string; tags: string[] }[] = select('allTopicTags').all() as {
    topic: string;
    tags: string[];
  }[];
  return allTopicTags[Random.integer(0, allTopicTags.length - 1)].topic;
}

/**
 * @description: 获取随机标签
 * @param {string} topicName 专题名，获取指定专题下的随机标签，不传为全部 `默认为 ''`
 * @return {string} 返回标签名
 * @author: dreamy-xay
 */
export function getRandomTag(topicName: string = ''): string {
  const allTopicTags: { topic: string; tags: string[] }[] = select('allTopicTags').all() as {
    topic: string;
    tags: string[];
  }[];
  const tags: string[] = getTags(topicName);
  const randomTags: string[] = tags.length ? tags : allTopicTags[Random.integer(0, allTopicTags.length - 1)].tags;
  return randomTags[Random.integer(0, randomTags.length - 1)];
}
