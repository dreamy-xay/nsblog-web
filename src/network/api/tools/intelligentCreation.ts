/*
 * @Description: 智能创作第三方工具api（自行训练的模型并暴露接口）
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-04-11 16:41:21
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-04-15 17:22:22
 */
import { post, RequestLifeCycle } from '@/network/request';

//  以下全部接口用到的token
const AI_TOKEN = 'as89as#5612&jhsgja$Jja90I7&sa712@asasjjj!';

/**
 * @description: 抽取文本摘要接口
 * @param {string} content 文本内容 `必传参数`
 * @param {number} ratio 要使用的句子比例 `默认为 0.2`
 * @param {number} min_length 用于摘要的候选句子的最小长度 `默认为 10`
 * @param {number} max_length 用于摘要的候选句子的最大长度 `默认为 400`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function extractSummary(
  content: string,
  ratio: number = 0.2,
  min_length: number = 10,
  max_length: number = 400,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    ...RLC,
    url: 'http://127.0.0.1:3001/v1/generate/summary',
    noAuthorization: true,
    timeout: 15000,
    data: {
      content,
      ai_token: AI_TOKEN,
      ratio,
      min_length,
      max_length
    }
  });
}

/**
 * @description: 生成文本标题接口
 * @param {string} content 文本内容 `必传参数`
 * @param {number} top_k 在“采样”策略中为top-k滤波保留的最高概率令牌数 `默认为 3000`
 * @param {number} top_p “采样”策略中top-p滤波的累积概率。该值应满足0<=top-p<1 `默认为 0.9`
 * @param {number} max_length 生成标题最大长度 `默认为 32`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function generateTitle(
  content: string,
  top_k: number = 3000,
  top_p: number = 0.9,
  max_length: number = 32,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    ...RLC,
    url: 'http://127.0.0.1:3001/v1/generate/title',
    noAuthorization: true,
    timeout: 15000,
    data: {
      content,
      ai_token: AI_TOKEN,
      top_k,
      top_p,
      max_length
    }
  });
}

/**
 * @description: 文本纠错接口
 * @param {string} content 文本内容 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function correctContent(content: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    ...RLC,
    url: 'http://127.0.0.1:3001/v1/generate/correct',
    noAuthorization: true,
    timeout: 15000,
    data: {
      content,
      ai_token: AI_TOKEN
    }
  });
}

/**
 * @description:
 * @param {string} content 文本内容 `必传参数`
 * @param {'TextRank' | 'TFIDF'} method 使用的抽取方法，含 TextRank 和 TFIDF `默认为 'TextRank'`
 * @param {number} top_k 返回排名靠前top_k的标签`null` 表示所有可能的单词 `默认为 3 (返回前三个)`
 * @param {0 | 1} with_flag 是否返回词性，默认不返回 `默认为 0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function extractTags(
  content: string,
  method: 'TextRank' | 'TFIDF' = 'TextRank',
  top_k: number = 3,
  with_flag: 0 | 1 = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    ...RLC,
    url: 'http://127.0.0.1:3001/v1/generate/tags',
    noAuthorization: true,
    timeout: 15000,
    data: {
      content,
      ai_token: AI_TOKEN,
      method,
      top_k,
      with_flag
    }
  });
}
