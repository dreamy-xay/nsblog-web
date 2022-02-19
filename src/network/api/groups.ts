/*
 * @Description: 学习小组相关api
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-16 10:05:10
 * @LastEditors: Ban
 * @LastEditTime: 2022-02-19 16:17:25
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

/**
 * @description: 获取征集令
 * @param {string} group_name 学习小组名(不传学习小组名则返回最新征集令列表) `默认为''`
 * @param {number} offset 征集令列表偏移量 `默认为0`
 * @param {number} limit 返回征集令列表最大数量 `默认为10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getGroupSolicitations(
  group_name: string = '',
  offset: number = 0,
  limit: number = 10,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/groups/solicitations',
    ...RLC,
    params: {
      group_name,
      offset,
      limit
    }
  });
}

/**
 * @description: 获取征集令详细信息
 * @param {string} solicitation_id 征集令id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getSolicitationInfo(solicitation_id: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: `/groups/solicitations/${solicitation_id}`,
    ...RLC
  });
}

/**
 * @description: 发布征集令
 * @param {string} title 征集令标题 `必传参数`
 * @param {string} content 征集令内容 `必传参数`
 * @param {string} deadline 征集令截止日期 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function releaseGroupSolicitation(
  title: string,
  content: string,
  deadline: string,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: '/groups/solicitations',
    ...RLC,
    data: {
      title,
      content,
      deadline
    }
  });
}

/**
 * @description: 用户接取征集令
 * @param {string} solicitation_id 征集令id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function receiveSolicitation(solicitation_id: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: `/groups/solicitations/users`,
    data: {
      solicitation_id
    },
    ...RLC
  });
}

/**
 * @description: 用户取消接取征集令
 * @param {string} solicitation_id 征集令id `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function cancelSolicitation(solicitation_id: string | number, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: `/groups/solicitations/users`,
    data: {
      solicitation_id
    },
    ...RLC
  });
}

/**
 * @description: 获取征集令
 * @param {string} group_name 学习小组名(不传学习小组名则返回最新征集令列表) `默认为''`
 * @param {0 | 1 | 2} type 类型，0为综合，1为最新，2为热门 `默认为0`
 * @param {0 | 1 | 2 | 3} time 时间，0为不限时间，1为最近一天，2为最近一周，3为最近一个月 `默认为0`
 * @param {number} offset 征集令列表偏移量 `默认为0`
 * @param {number} limit 返回征集令列表最大数量 `默认为10`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getGroupResources(
  group_name: string = '',
  type: 0 | 1 | 2 = 0,
  time: 0 | 1 | 2 | 3 = 0,
  offset: number = 0,
  limit: number = 10,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/groups/resources',
    ...RLC,
    params: {
      group_name,
      type,
      time,
      offset,
      limit
    }
  });
}

/**
 * @description: 获取学习小组文章
 * @param {string} gruop_name 学习小组名 `必传参数`
 * @param {0 | 1 | 2} type 类型，0为综合，1为最新，2为热门 `默认为0`
 * @param {0 | 1 | 2 | 3} time 时间，0为不限时间，1为最近一天，2为最近一周，3为最近一个月 `默认为0`
 * @param {number} limit 返回最大数量 `默认为10`
 * @param {number} offset 偏移量 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Ban
 */
export function getGroupArticles(
  group_name: string,
  type: 0 | 1 | 2 = 0,
  time: 0 | 1 | 2 | 3 = 0,
  limit: number = 10,
  offset: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/group/articles',
    ...RLC,
    params: {
      group_name,
      type,
      time,
      limit,
      offset
    }
  });
}

/**
 * @description: 获取学习小组问答
 * @param {string} gruop_name 学习小组名 `必传参数`
 * @param {0 | 1 | 2} type 类型，0为综合，1为最新，2为热门 `默认为0`
 * @param {0 | 1 | 2 | 3} time 时间，0为不限时间，1为最近一天，2为最近一周，3为最近一个月  `默认为0`
 * @param {number} limit 返回最大数量 `默认为10`
 * @param {number} offset 偏移量 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Ban
 */
export function getGroupQuestions(
  group_name: string,
  type: 0 | 1 | 2 = 0,
  time: 0 | 1 | 2 | 3 = 0,
  limit: number = 10,
  offset: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/group/questions',
    ...RLC,
    params: {
      group_name,
      type,
      time,
      limit,
      offset
    }
  });
}

/**
 * @description: 获取学习小组成员
 * @param {string} gruop_name 学习小组名 `必传参数`
 * @param {0 | 1} is_admin 是否管理员，0为否，1为是 `默认为0`
 * @param {number} limit 返回最大数量 `默认为10`
 * @param {number} offset 偏移量 `默认为0`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Ban
 */
export function getGroupUsers(
  group_name: string,
  is_admin: 0 | 1 = 0,
  limit: number = 10,
  offset: number = 0,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return get({
    url: '/group/users',
    ...RLC,
    params: {
      group_name,
      is_admin,
      limit,
      offset
    }
  });
}
