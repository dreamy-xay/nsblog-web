/*
 * @Description: 文章相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 10:10:43
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-24 20:47:59
 */
import { del, get, post, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取发布的文章列表
 * @param {string} username 用户名 `必传参数`
 * @param {string} category 过滤分类名 `默认为 ''`
 * @param {string} tag 过滤标签名 `默认为 ''`
 * @param {number} offset 起始位置 `默认为0`
 * @param {number} limit 限制条数 `默认为10`
 * @param {'asc' | 'desc' | ''} release_time 按发布时间排序，为''表示不排序 `默认为 ''`
 * @param {'asc' | 'desc' | ''} browsing_count 按浏览量排序，为''表示不排序 `默认为 ''`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getArticles(
  username: string,
  category: string = '',
  tag: string = '',
  offset: number = 0,
  limit: number = 10,
  release_time: 'asc' | 'desc' | '' = '',
  browsing_count: 'asc' | 'desc' | '' = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/articles',
    ...RLC,
    params: {
      username,
      category,
      tag,
      release_time,
      browsing_count,
      offset,
      limit
    }
  });
}

/**
 * @description: 获取文章详细信息
 * @param {number} article_id 文章id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getArticleInfo(article_id: number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: `/articles/${article_id}`
  });
}

/**
 * @description: 获取文章页面用户信息
 * @param {String} username 用户名
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getArticlesUsers(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/articles/users',
    ...RLC,
    params: {
      username
    }
  });
}
