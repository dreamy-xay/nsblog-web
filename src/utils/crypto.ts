/*
 * @Description: 加密解密
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-28 16:32:45
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-05-12 20:14:57
 */
import * as CryptoJS from 'crypto-js';

const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_KEY); //16位
const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_IV);

/**
 * @description: aes加密
 * @param {string | Record<string, unknown>} word 加密对象 `必传参数`
 * @return {string} 返回加密字符串
 * @author: dreamy-xay
 */
export function encrypt(word: string | Record<string, unknown>): string {
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
 * @param {boolean} parse 是否解析json对象字符串 `默认为 false`
 * @return {string | Record<string, unknown>} 返回原串或者原加密对象
 * @author: dreamy-xay
 */
export function decrypt(word: string, parse: boolean = false): string | Record<string, unknown> {
  const encryptedHexStr: CryptoJS.lib.WordArray = CryptoJS.enc.Hex.parse(word);
  const srcs: string = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr: string = decrypt.toString(CryptoJS.enc.Utf8);
  return parse ? JSON.parse(decryptedStr) : decryptedStr;
}
