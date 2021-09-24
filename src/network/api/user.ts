/*
 * @Description: 用户相关api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:38:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 10:14:12
 */
import { post, get, put, RequestLifeCycle } from '@/network/request';
import { encrypt } from '@/util/crypto';

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

export function putUserInfo(data: Record<string, unknown>, RLC: RequestLifeCycle = {}): Promise<unknown> {
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

  /**
   * @description: 邮件发送内容选项接口
   * @author: dreamy-xay
   */
  interface MailOptions extends Record<string, unknown> {
    // 发件人
    form_name: string;
    // 发件邮箱
    from_email: string;
    // 发送用户名
    to_name: string;
    // 收件邮箱，如'156093340@qq.com'
    to_email: string;
    // Subject line, 'Hello'
    subject: string;
    // 邮件操作
    operator: string;
    // 邮件验证码
    code: string;
  }

  const code: string = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();

  await post({
    url: 'https://api.emailjs.com/api/v1.0/email/send',
    data: {
      service_id: 'service_p20vj6o',
      template_id: 'template_j4arzam',
      user_id: 'user_Dzut1aPxfgP7nHixpvDMa',
      template_params: {
        form_name: '笔记分享部落阁团队',
        from_email: '1985332264@qq.com',
        to_email: email,
        to_name: '用户',
        subject: '邮箱验证',
        operator: '邮箱验证',
        code
      } as MailOptions
    }
  });

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
export function addUserTag(tagname: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    url: '/users/tag',
    ...RLC,
    data: {
      tagname
    }
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
