/*
 * @Description: 关注相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-01 17:02:19
 * @LastEditors: clq
 * @LastEditTime: 2021-09-26 19:47:12
 */
import { del, put, get, post, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取关注人员信息
 * @param {string} username 用户名
 * @param {number} offset 起始位置
 * @param {number} limit 限制条数
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function getAttentions(
  username: string,
  offset: number,
  limit: number,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/attentions',
    ...RLC,
    params: {
      username,
      offset,
      limit
    }
  });
}

/**
 * @description: 获取粉丝信息
 * @param {string} username 用户名
 * @param {number} offset 起始位置
 * @param {number} limit 限制条数
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function getFans(username: string, offset: number, limit: number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/attentions/fans',
    ...RLC,
    params: {
      username,
      offset,
      limit
    }
  });
}

/**
 * @description: 添加关注
 * @param {string} username 用户名
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function addAttentions(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/attentions',
    ...RLC,
    data: {
      username
    }
  });
}

/**
 * @description: 删除关注
 * @param {string} username 用户名
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function deleteAttentions(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: '/attentions',
    ...RLC,
    data: {
      username
    }
  });
}

/**
 * @description: 修改文章评价
 * @param {string} articleId 文章id `必传参数`
 * @param {number} type 修改方式 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function modifyArticleEvaluation(articleId: string, type: number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: '/articles/evaluation',
    ...RLC,
    data: {
      articleId,
      type
    }
  });
}
