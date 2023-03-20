/*
 * @Description: 电子邮件第三方工具 api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-20 14:54:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-20 19:05:34
 */

import { post, RequestLifeCycle } from '@/network/request';

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

/**
 * @description: 发送指定模板邮件（指定模板：nsblog注册验证码）
 * @param {string} code 验证码 `必传参数`
 * @param {string} email 邮件 `必传参数`
 * @param {RequestLifeCycle} RLC 请求生命周期 `默认值为 {}`
 * @return {Promise<unknown>} 请求返回promise
 * @author: dreamy-xay
 */
export function sendEmail(code: string, email: string, RLC: RequestLifeCycle = {}): Promise<unknown> {
  return post({
    ...RLC,
    url: 'https://api.emailjs.com/api/v1.0/email/send',
    noAuthorization: true, // 不主动添加 'Authorization'
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
}
