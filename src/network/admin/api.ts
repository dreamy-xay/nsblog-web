/*
 * @Description:  部分api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-22 13:49:09
 */

import { get, post, RequestLC } from '@/network/request';

/**
 * @description: 获取管理员信息
 * @return {Promise<any>} 返回请求的 Promise
 * @param {RequestLC} LC 请求的生命周期
 * @author: dreamy-xay
 */
export function getAdminInfo(LC: RequestLC = {}): Promise<any> {
  return get({
    url: 'api/private/v1/admin',
    ...LC
  });
}

/**
 * @description: 获取所有分类
 * @param {RequestLC} LC 请求的生命周期
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function getArticleCategories(LC: RequestLC = {}): Promise<any> {
  /*  返回数据格式，仅供参考，可以协商
  [
    { id: 0, value: 'C++' },
    { id: 1, value: 'Java' },
    { id: 2, value: '数据结构' },
    { id: 3, value: '算法' },
    { id: 4, value: 'C语言' },
    { id: 5, value: 'Python' },
    { id: 6, value: 'nodejs' },
  ] */
  return get({
    url: 'api/private/v1/article/category',
    ...LC
  });
}

/**
 * @description: 获取所有分封面图片文件
 * @param {RequestLC} LC 请求的生命周期
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function getCoverImageList(LC: RequestLC = {}): Promise<any> {
  /* 返回数据格式，仅供参考，可以协商
  [
    { label: '晚霞', link: '/adminLogin/background.png' },
    { label: '动漫', link: 'https://i.loli.net/2021/06/14/Hy3aqAOpWUwc2Eh.jpg' },
  ] */
  return get({
    url: 'api/private/v1/admin/coverImage',
    ...LC
  });
}

/**
 * @description: 发布文章
 * @param {any} data  文章数据
 * @param {RequestLC} LC 请求的生命周期
 * @return {Promise<any>} 返回请求的 Promise
 * @author: dreamy-xay
 */
export function releaseArticle(data: any, LC: RequestLC = {}): Promise<any> {
  /*  请求数据参考
  {
    accessPermission: 0,
    articleId: null,    //  创建文章为 null, 修改文章不为空
    categories: [
      { id: 0, value: 'C++' },
      { id: 3, value: '算法' }
    ],
    content:
      '<p style="text-align: center;"><span style="text-decoration: underline;">
      <em><strong><span style="background-color: #e03e2d;"><a id="a"></a>test</span></strong></em></span></p>',
    coverImage: '/adminLogin/background.png',
    friendChain: [],
    passwordProtection: null,
    priority: 100,
    reviewPermission: true,
    sharingAgreement: null,
    status: true,
    summary: 'test',
    tags: ['test', 'test2'],
    title: 'test',
    type: 0
  }; */

  /* 返回数据格式，仅供参考，可以协商
  {
    articleId: 1,
  } */
  return post({
    url: 'api/private/v1/article',
    data
  });
}
