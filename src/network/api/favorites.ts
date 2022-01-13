/*
 * @Description: 收藏相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 12:55:44
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-13 14:56:05
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
 * @data {string} username 用户名 `必传参数`
 * @data {number} id 新建收藏夹的id `默认为''`
 * @data {name} name 新建文件夹的名字 `默认为''`
 * @data {number | string} remark 新建文件夹的描述 `默认为''`
 * @data {number} is_private 新建文件夹是否私有 `默认为0(公有)`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function newFavorites(
  username: string,
  id: number | string = '',
  name: string = '',
  remark: number | string = '',
  is_private: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: `/favorites`,
    ...RLC,
    data: {
      username,
      id,
      name,
      remark,
      is_private
    }
  });
}

/**
 * @description: 删除收藏夹
 * @param {number | string} id 删除收藏夹的id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function deleteFavorites(fid: number | string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: `/favorites/${fid}`,
    ...RLC
  });
}

/**
 * @description: 取消收藏
 * @param {number | string} cid 取消收藏的id `默认为''，删除第一个收藏`
 * @param {number | string} fid 取消收藏的id `默认为''，删除第一个收藏`
 * @param {number} type 删除历史记录类型的列表，0为全部，1为文章，2为问答，3为资源 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function cancelCollections(cid: number | string = '', RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: `/favorites/collections/${cid}`,
    ...RLC,
    data: {
      conllection_id: cid
    }
  });
}

/**
 * @description: 添加收藏
 * @param {number | string} cid 取消收藏的id `默认为''，添加第一个收藏`
 * @param {number | string} fid 取消收藏的id `默认为''，添加第一个收藏`
 * @param {number} type 删除历史记录类型的列表，0为全部，1为文章，2为问答，3为资源 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: xiao
 */
export function addCollections(cid: number | string = '', RLC: RequestLifeCycle = {}) {
  return post({
    url: `/favorites/collections/${cid}`,
    ...RLC,
    data: {
      collection_id: cid
    }
  });
}

/**
 * @description: 修改收藏夹标题
 * @param {string} name 需要修改的信息类型 `必传参数`
 * @param {string | number} id 收藏夹id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function modifyName(name: string, fid: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: `/favorites/name`,
    ...RLC,
    data: {
      name,
      favorite_id: fid
    }
  });
}

/**
 * @description: 修改收藏夹描述
 * @param {string} remark 需要修改的信息内容 `必传参数`
 * @param {string | number} id 收藏夹id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function modifyRemark(remark: string, fid: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: `/favorites/remark`,
    ...RLC,
    data: {
      remark,
      favorite_id: fid
    }
  });
}

/**
 * @description: 修改收藏夹类型
 * @param {string} is_private 需要修改的信息内容 `必传参数`
 * @param {string | number} id 收藏夹id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: continue-hs
 */
export function modifyPrivate(is_private: number, fid: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: `/favorites/private`,
    ...RLC,
    data: {
      is_private,
      favorite_id: fid
    }
  });
}
