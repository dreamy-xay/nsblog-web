import store from 'storejs';
import { Base64 } from 'js-base64';
import { Md5 } from 'ts-md5/dist/md5';

/*
 * 验证token合法
 */
export function verifyToken(originToken = store.get('token')): { status: boolean; token: string } {
  if (originToken) {
    const { token, code, startTime, expires } = JSON.parse(originToken);
    if (token !== null && code !== null && startTime !== null && expires !== null)
      if (startTime + expires * 1000 < new Date().getTime()) return { status: Md5.hashStr(token) === code, token };
      else {
        store.remove('token');
        return { status: false, token: '' };
      }
    else return { status: false, token: '' };
  } else return { status: false, token: '' };
}

/*
 * 获取处理后的token值
 */
export function getToken(): string {
  const token = verifyToken().token; // 后端返回的token值
  const baseCode = Base64.encode(token + ':');
  return `Basic ${baseCode}`;
}

/*
 * 设置token值
 */
export function setToken(token: string, expires: number = 86400): void {
  const options: object = {
    token,
    code: Md5.hashStr(token),
    startTime: new Date().getTime(),
    expires
  };
  store.set('token', JSON.stringify(options));
}
