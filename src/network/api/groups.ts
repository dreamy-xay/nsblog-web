/*
 * @Description: 学习小组相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-16 10:05:10
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-12 18:17:49
 */

import { get, post, del, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取学习小组
 * @param {string} username 用户名 `必传参数`
 * @param {string} topic_name 专栏名称 `默认为空`
 * @param {number} offset 数据库历史记录偏移量 `默认为0`
 * @param {number} limit 返回学习小组的最大数量 `默认位10`
 * @param {string} group_name 学习小组详细信息 `默认为 ''`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getGroups(
  username: string,
  topic_name: string = '',
  offset: number = 0,
  limit: number = 10,
  group_name: string = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/groups',
    ...RLC,
    params: {
      username,
      topic_name,
      limit,
      offset,
      group_name
    }
  });
}

/**
 * @description: 创建学习小组
 * @param {string} group_name 小组名 `必传参数`
 * @param {string} remark 小组备注 `必传参数`
 * @param {string } topic_name 主题名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: xiao
 */
export function createGroups(
  group_name: string,
  remark: string,
  topic_name: string,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: '/groups',
    ...RLC,
    data: {
      group_name,
      remark,
      topic_name
    }
  });
}

/**
 * @description: 加入学习小组
 * @param {string} group_name 小组名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function addGroup(group_name: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/groups/users',
    ...RLC,
    data: {
      group_name
    }
  });
}

/**
 * @description: 退出学习小组
 * @param {string} group_name 小组名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function deleteGroup(group_name: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: '/groups/users',
    ...RLC,
    data: {
      group_name
    }
  });
}
