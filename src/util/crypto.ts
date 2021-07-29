/*
 * @Description: 加密解密
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-28 16:32:45
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-28 17:04:59
 */
import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_KEY); //16位
const iv = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_CRYPTO_IV);

/**
 * @description: aes加密
 * @param {string | Record<string, unknown>} 加密对象 `必传参数`
 * @return {string} 返回加密字符串
 * @author: dreamy-xay
 */
export function encrypt(word: string | Record<string, unknown>): string {
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
