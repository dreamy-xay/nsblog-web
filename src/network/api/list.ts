/*
 * @Description:排行榜api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-11 15:15:47
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-12 20:43:18
 */
import { get, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取热门文章
 * @param {number} type 0为综合、1为点赞、2为评论 `默认值为 0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getArticlesList(type: number = 0, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/list/articles',
    ...RLC,
    params: {
      type
    }
  });
}

/**
 * @description: 获取学习小组活跃排行
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getGroupsList(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/list/groups',
    ...RLC
  });
}

/**
 * @description: 获取学习小组用户活跃排行
 * @param {number} type 0为最近、1为长期 `默认值为 0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getGroupsUsersList(type: number = 0, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/list/groups/users',
    ...RLC,
    params: {
      type
    }
  });
}

/**
 * @description: 获取热门问答
 * @param {number} type 0为综合、1为点赞、2为评论 `默认值为 0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getQuestionsList(type: number = 0, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/list/questions',
    ...RLC,
    params: {
      type
    }
  });
}

/**
 * @description: 获取热门资源
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getResourcesList(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/list/resources',
    ...RLC
  });
}

/**
 * @description: 获取热门搜索
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getSearchList(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/list/search',
    ...RLC
  });
}

/**
 * @description: 获取热门标签
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getTagsList(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/list/tags',
    ...RLC
  });
}
