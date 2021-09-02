/*
 * @Description: 专题api
 * @Version:
 * @Autor: Ban
 * @Date: 2021-09-02 14:19:10
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-02 15:26:42
 */
import { post, get, del, put, RequestLifeCycle } from '@/network/request';
/**
 * @description: 获取专题名
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getTopics(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/topics',
    ...RLC
  });
}
/**
 * @description: 获取专题标签名
 * @param {topic_name} 专题名
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getTopicTags(topic_name: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/topics/tags',
    ...RLC,
    params: {
      topic_name
    }
  });
}
