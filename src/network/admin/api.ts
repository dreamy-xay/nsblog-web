/*
 * @Description:  部分api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-15 00:30:04
 */

import { get, post, RequestLC } from '@/network/request';

/**
 * @description: 获取管理员信息
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function getAdminInfo(LC: RequestLC = {}): Promise<any> {
  return get({
    url: 'api/private/v1/admin',
    ...LC
  });
}
