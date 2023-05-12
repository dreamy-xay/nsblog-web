/*
 * @Description: 用户相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:38:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-05-12 21:33:37
 */
import { post, get, put, RequestLifeCycle, del } from '@/network/request';
import { sendRegisterEmail } from '@/network/api/tools/email';
import { encrypt } from '@/utils/crypto';

/**
 * @description: 获取用户信息
 * @param {string} username  用户名 `必传参数`
 * @param {number} type 请求数据类型 `默认为1`
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getUserInfo(username: string, type: number = 1, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/users',
    ...RLC,
    params: {
      username,
      type
    }
  });
}

/**
 * @description: 修改用户信息
 * @param {Object} data 请求数据类型和数据 `必传参数`
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */

export function modifyUserInfo(data: Record<string, unknown>, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: '/users',
    ...RLC,
    data
  });
}

/**
 * @description: 查询指定数据是否已存在
 * @param {object} query 查询的内容
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function exist(query: { username?: string; email?: string }, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/users/exist',
    ...RLC,
    params: query
  });
}

/**
 * @description: 注册新用户
 * @param {string} username 用户名 `必传参数`
 * @param {string} password 密码 `必传参数`
 * @param {string} email 邮箱 `必传参数`
 * @param {string} code 验证码 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function signUp(
  username: string,
  password: string,
  email: string,
  code: string,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: '/users',
    ...RLC,
    data: {
      username,
      password,
      email,
      code
    }
  });
}

/**
 * @description: 邮箱发送验证码
 * @param {string} email 邮箱号 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export async function emailSendVCode(email: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  if (process.env.VUE_APP_MOCK === 'false')
    return post({
      url: '/users/email/validation',
      ...RLC,
      data: {
        data: encrypt(email)
      }
    });

  // 生成随机验证码并发送邮件
  const code: string = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();
  await sendRegisterEmail(code, email);

  return post({
    url: '/users/email/validation',
    ...RLC,
    data: {
      code,
      email
    }
  });
}

/**
 * @description: 邮箱验证码校验
 * @param {string} email 邮箱号 `必传参数`
 * @param {string} code 验证码 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function emailValidate(email: string, code: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/users/email/validation',
    ...RLC,
    params: {
      email,
      code
    }
  });
}

/**
 * @description: 忘记密码修改密码
 * @param {string} username 用户名 `必传参数`
 * @param {string} password 修改后的密码 `必传参数`
 * @param {string} data 加密原密码 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function forgotPasswordChange(
  username: string,
  password: string,
  data: string,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: '/users/password',
    ...RLC,
    data: {
      username,
      password,
      data
    }
  });
}

/**
 * @description: 获取兴趣标签
 * @param {string} 用户名 `必传参数`
 * @return {array} 兴趣标签
 * @author: Ban
 */
export function getTag(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/users/tag',
    ...RLC,
    params: {
      username
    }
  });
}

/**
 * @description: 新建兴趣标签
 * @param {string} tag_name 标签名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function addUserTag(tag_name: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/users/tag',
    ...RLC,
    data: {
      tag_name
    }
  });
}

/**
 * @description: 删除兴趣标签
 * @param {string} tag_name 标签名 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Ban
 */
export function delUserTag(tag_name: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return del({
    url: `/users/tag/${tag_name}`,
    ...RLC
  });
}

/**
 * @description: 修改用户个性签名
 * @param {string} signature 请求数据类型和数据 `必传参数`
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: Z_Y_C
 */
export function modifySignature(signature: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return put({
    url: '/users/signature',
    ...RLC,
    data: {
      signature
    }
  });
}

/**
 * @description: 获取用户信息
 * @param {string} username  用户名 `必传参数`
 * @param {number} type 请求数据类型 `默认为1`
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getProfile(username: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/users/profile',
    ...RLC,
    params: {
      username
    }
  });
}

/**
 * @description: 换绑邮箱api
 * @param {*}
 * @return {*}
 * @author: Z_Y_C
 */
export function changeEmail(email: string, code: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/users/email',
    ...RLC,
    data: {
      email,
      code
    }
  });
}

/**
 * @description: 获取我的问答模块数据
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: clq
 */
export function getMyQuestion(RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: '/users/question',
    ...RLC
  });
}
