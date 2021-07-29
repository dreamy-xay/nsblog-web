/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:38:31
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-29 11:08:33
 */
import { post, get, del, put, RequestLifeCycle } from '@/network/request';
import { encrypt } from '@/util/crypto';

/**
 * @description: 获取用户信息
 * @param {string} username  用户名 `必传`
 * @param {number} type 请求数据类型 `默认为0`
 * @param {RequestLifeCycle} RLC  请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function getUserInfo(username: string, type: number = 0, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return get({
    url: `/users/${username}`,
    ...RLC,
    params: {
      type
    }
  });
}

/**
 * @description: 注册新用户
 * @param {string} username 用户名 `必传参数`
 * @param {string} password 密码 `必传参数`
 * @param {string} email 邮箱 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function signUp(
  username: string,
  password: string,
  email: string,
  RLC: RequestLifeCycle = {}
): Promise<unknown> {
  return post({
    url: '/users',
    ...RLC,
    data: {
      username,
      password,
      email
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
