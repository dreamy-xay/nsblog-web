/*
 * @Description: 问答相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-17 20:17:15
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 20:54:55
 */
import { get, post, RequestLifeCycle } from '@/network/request';

/**
 * @description: 获取问答
 * @param {string} username 用户名 `可选参数`
 * @param {number} release_time 按发布时间排序 1 升序 0 不排 -1 降序 `默认为1`
 * @param {number} browsing_count 按访问量排序 1 升序 0 不排 -1 降序 `默认位10`
 * @param {number} type 资源类型 `可选，0为最热，1为最新，2为待回答，3为周榜，4为月榜`
 * @param {string} topic_name `可选，不填则默认全部专栏`
 * @param {string} tag_name `可选，不填则默认全部专栏标题`
 * @param {number} limit 返回提问记录的最大数量 `默认位10`
 * @param {number} offset 数据库提问记录偏移量 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function getQuestions(
  username: string = '',
  release_time: number = 0,
  browsing_count: number = 0,
  type: number = 0,
  topic_name: string = '',
  tag_name: string = '',
  limit: number = 10,
  offset: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/questions',
    ...RLC,
    params: {
      username,
      release_time,
      browsing_count,
      type,
      topic_name,
      tag_name,
      limit,
      offset
    }
  });
}

/**
 * @description: 获取回答记录信息
 * @param {string} username 用户名
 * @param {number} offset 数据库回答记录偏移量 `默认为0`
 * @param {number} limit 返回问答回答的最大数量 `默认位10`
 * @param {number} release_time 按发布时间排序 1 升序 0 不排 -1 降序 `默认为1`
 * @param {number} browsing_count 按访问量排序 1 升序 0 不排 -1 降序 `默认位10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function getReplies(
  username: string,
  offset: number = 0,
  limit: number = 10,
  release_time: number = 1,
  browsing_count: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/questions/replies',
    ...RLC,
    params: {
      username,
      offset,
      limit,
      release_time,
      browsing_count
    }
  });
}

/**
 * @description: 发布问答
 * @param {string} username 用户名
 * @param {string} title 文章标题
 * @param {string} content 文章内容
 * @param {Array} tags 主题及标签
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function releaseQuestion(
  username: string = '',
  title: string = '',
  content: string = '',
  tags: Array<unknown> = [],
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: '/questions',
    ...RLC,
    data: {
      username,
      title,
      content,
      tags
    }
  });
}
