/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:15:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-29 10:49:40
 */
import { Random } from 'better-mock';
import { Application, Request, Response } from 'express';
import select, { DataBaseOperator } from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取用户信息
  app.get(baseUrl + '/users/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const { type } = req.query;
    const user = select('users').findOne({ username });
    if (user && user.isActive)
      return res.json({
        username,
        nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
        avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', 'test'),
        registration_time: Random.datetime(),
        email: Random.email('qq.com'),
        recommend_count: Random.natural(0, 1000),
        dynamic_count: Random.natural(0, 1000),
        like_count: Random.natural(0, 1000),
        fans_count: Random.natural(0, 1000)
      });
    else return res.json({ msg: 'User does not exist' });
  });

  // 注册新用户
  app.post(baseUrl + '/users', (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (select('users').insertOne({ username, password, email, token: null, isActive: true, isSuper: false }))
      return res.json({ username });
    else return res.status(500).json({ error: 'Server errors, create users fail' });
  });

  // 邮箱发送验证码
  app.post(baseUrl + '/users/email/validation', (req: Request, res: Response) => {
    const { code, email } = req.body;

    const codes: DataBaseOperator = select('codes');

    if (codes.insertOne({ code, email })) {
      setTimeout(() => {
        codes.removeOne({ code, email });
      }, 300000); // 5 分钟后失效
      return res.send();
    } else return res.status(500).json({ error: 'Server errors' });
  });

  // 验证验证码
  app.get(baseUrl + '/users/email/validation', (req: Request, res: Response) => {
    const { code, email } = req.query;
    if (select('codes').findOne({ code, email })) return res.send();
    else return res.json({ error: 'code error' });
  });
}
