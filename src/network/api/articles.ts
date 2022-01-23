/*
 * @Description: 文章相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 10:10:43
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-22 17:59:02
 */
import { get, post, put, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取文章评论
 * @param {string} articleId 文章id `必传参数`
 * @param {string} commentId 评论id `默认为空`
 * @param {number} offset 起始位置 `默认为0`
 * @param {number} limit 数量限制 `默认为5`
 * @param {RequestLifeCycle} RLC
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function getArticleComments(
  articleId: string,
  commentId: string = '',
  offset: number = 0,
  limit: number = 5,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/articles/comments',
    ...RLC,
    params: {
      article_id: articleId,
      comment_id: commentId,
      limit,
      offset,
    },
  });
}

/**
 * @description: 发表文章评论
 * @param {string} article_id 文章id `必传参数`
 * @param {string} content 评论id `必传参数`
 * @param {string} parent_id 上层评论id `默认为空`
 * @param {string} reply_username 回复用户名 `默认为空`
 * @param {RequestLifeCycle} RLC
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function postArticleComments(
  article_id: string,
  content: string,
  parent_id: string = '',
  reply_username: string = '',
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: '/articles/comments',
    ...RLC,
    params: {
      article_id,
      content,
      parent_id,
      reply_username,
    },
  });
}

/**
 * @description: 修改文章评论评价
 * @param {string} comment_id 评论id `必传参数`
 * @param {number} type 修改类型 `必传参数`
 * @param {RequestLifeCycle} RLC
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function modifyArticleCommentEvaluation(
  comment_id: string,
  type: number,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return put({
    url: '/articles/comments/evaluation',
    ...RLC,
    params: {
      comment_id,
      type,
    },
  });
}

/**
 * @description: 获取文章标签
 * @param {string} username 用户名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为{}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function getTags(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/articles/tags',
    ...RLC,
    params: {
      username,
    },
  });
}

/**
 * @description: 获取文章分类
 * @param {string} username 用户名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为{}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function getCategories(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/articles/categories',
    ...RLC,
    params: {
      username,
    },
  });
}

/**
 * @description: 获取发布的文章列表
 * @param {string} username 用户名 `默认为''`
 * @param {string} category 过滤分类名 `默认为 ''`
 * @param {string} tag 过滤标签名 `默认为 ''`
 * @param {number} offset 起始位置 `默认为0`
 * @param {number} limit 限制条数 `默认为10`
 * @param {1 | -1 | 0} release_time 按发布时间排序，为 0 表示不排序 `默认为 0`
 * @param {1 | -1 | 0} browsing_count 按浏览量排序，为 0 表示不排序 `默认为 0`
 * @param {string } topic_name 文章专题 `默认为''`
 * @param {string} tag_name 文章标签 `默认为''`
 * @param {0 | 1 | 2|3|4|5} type 热门排序类型 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getArticles(
  username: string = '',
  category: string | number = '',
  tag: string = '',
  offset: number = 0,
  limit: number = 10,
  release_time: 1 | -1 | 0 = 0,
  browsing_count: 1 | -1 | 0 = 0,
  topic_name: string = '',
  tag_name: string = '',
  type: 0 | 1 | 2 | 3 | 4 | 5 = 0,
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
      limit,
      topic_name,
      tag_name,
      type,
    },
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
    url: `/articles/${article_id}`,
  });
}

/**
 * @description: 获取文章页面用户信息
 * @param {String} username 用户名
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function getArticlesUser(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/articles/user',
    ...RLC,
    params: {
      username,
    },
  });
}
