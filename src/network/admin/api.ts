/*
 * @Description:  部分api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-21 17:12:00
 */

import { get, post, RequestLC } from '@/network/request';

/**
 * @description: 获取管理员信息
 * @return {Promise<any>} 返回请求的 Promise
 * @param {RequestLC} LC 请求的生命周期
 * @author: dreamy-xay
 */
export function getAdminInfo(LC: RequestLC = {}): Promise<any> {
  return get({
    url: 'api/private/v1/admin',
    ...LC
  });
}

/**
 * @description: 获取所有分类
 * @param {RequestLC} LC 请求的生命周期
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function getCategories(LC: RequestLC = {}): Promise<any> {
  return get({
    url: 'api/private/v1/admin/category',
    ...LC
  });
}

/**
 * @description: 获取所有分封面图片文件
 * @param {RequestLC} LC 请求的生命周期
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function getCoverImageList(LC: RequestLC = {}): Promise<any> {
  return get({
    url: 'api/private/v1/admin/coverImage',
    ...LC
  });
}

/**
 * @description:
 * @param {any} data  文章数据
 * @param {RequestLC} LC 请求的生命周期
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function releaseArticle(data: any, LC: RequestLC = {}): Promise<any> {
  return post({
    url: 'api/private/v1/admin/release/article',
    data
  });
}
