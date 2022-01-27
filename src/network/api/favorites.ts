/*
 * @Description: 收藏相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 12:55:44
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-27 14:10:51
 */

import { get, RequestLifeCycle, del, put, post } from '@/network/request';

/**
 * @description: 获取收藏信息
 * @param {string} username 用户名 `必传参数`
 * @param {number} limit 返回collections的最大数量 `默认位15`
 * @param {number} offset 数据库收藏列表偏移量 `默认为0`
 * @param {number} type 获取收藏列表的类型 `默认为0`
 * @param {0 | 1} is_all 是否获取全部信息，0为不获取全部信息 `默认为0`
 * @param {number} favorite_id 收藏夹id `默认为''，返回全部收藏夹及其内容，传入id则返回指定收藏夹id内容`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getFavorites(
  username: string,
  limit: number = 15,
  offset: number = 0,
  type: number = 0,
  is_all: 0 | 1 = 0,
  favorite_id: number | string = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/favorites',
    ...RLC,
    params: {
      username,
      limit,
      offset,
      type,
      is_all,
      favorite_id
    }
  });
}

/**
 * @description: 新建收藏夹
 * @param {string} name 收藏夹名称 `必传参数`
 * @param {number} is_private 收藏夹是否私有 `默认为0（公开）`
 * @param {string}  remark 收藏夹描述 `默认为''`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function newFavorites(
  name: string,
  is_private: number = 0,
  remark: string = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: `/favorites`,
    ...RLC,
    data: {
      name,
      remark,
      is_private
    }
  });
}

/**
 * @description: 删除收藏夹
 * @param {number | string} favorite_id 删除收藏夹的id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function deleteFavorites(favorite_id: number | string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: `/favorites/${favorite_id}`,
    ...RLC
  });
}

/**
 * @description: 取消收藏
 * @param {number | string} collection_id 取消收藏的id `必传值`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function cancelCollections(collection_id: number | string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: `/favorites/collections/${collection_id}`,
    ...RLC
  });
}

/**
 * @description: 新建收藏
 * @param {number | string} type 删除历史记录类型的列表，0为全部，1为文章，2为问答，3为资源 `默认为0`
 * @param {number | string} cid 添加收藏的内容id `必传值`
 * @param {number | string} fid 添加收藏的收藏夹id `必传值`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: xiao
 */
export function addCollections(
  type: number | string = '',
  cid: number | string = '',
  fid: number | string = '',
  RLC: RequestLifeCycle = {}
) {
  return post({
    url: `/favorites/collections`,
    ...RLC,
    data: {
      type,
      cid,
      fid
    }
  });
}

/**
 * @description: 修改收藏夹标题
 * @param {string} name 修改后的收藏夹标题 `必传参数`
 * @param {string | number} favorite_id 收藏夹id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function modifyName(name: string, favorite_id: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: `/favorites/name`,
    ...RLC,
    data: {
      name,
      favorite_id
    }
  });
}

/**
 * @description: 修改收藏夹描述
 * @param {string} remark 修改后的收藏夹描述 `必传参数`
 * @param {string | number} favorite_id 收藏夹id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function modifyRemark(
  remark: string,
  favorite_id: string | number,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return put({
    url: `/favorites/remark`,
    ...RLC,
    data: {
      remark,
      favorite_id
    }
  });
}

/**
 * @description: 修改收藏夹类型
 * @param {string} is_private 修改后的收藏夹类型 `必传参数,0为公开，1为私有`
 * @param {string | number} favorite_id 收藏夹id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function modifyPrivate(
  is_private: number,
  favorite_id: string | number,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return put({
    url: `/favorites/private`,
    ...RLC,
    data: {
      is_private,
      favorite_id
    }
  });
}
