/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:15:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-19 19:51:16
 */
import { Random } from 'better-mock';
import { Application, Request, Response } from 'express';
import select, { DataBaseOperator } from '../data/index';
import { clearToken, decrypt, getToken, verifyToken } from './util';

function int(value: unknown): number {
  return parseInt(value as string);
}

export default function(baseUrl: string, app: Application) {
  // 注册新用户
  app.post(baseUrl + '/users', (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const users: DataBaseOperator = select('users');
    users.insertOne({ username, password, email, token: null, isActive: true, isSuper: false });
    return res.status(201).json({ username });
  });

  // 邮箱发送验证码
  app.post(baseUrl + '/users/email/validation', (req: Request, res: Response) => {
    const { code, email } = req.body;

    const codes: DataBaseOperator = select('codes');

    codes.insertOne({ code, email });
    setTimeout(() => {
      codes.removeOne({ code, email });
    }, 300000); // 5 分钟后失效
    return res.send();
  });

  // 验证验证码
  app.get(baseUrl + '/users/email/validation', (req: Request, res: Response) => {
    const { code, email, type } = req.query;
    if (select('codes').findOne({ code, email })) {
      if (int(type) === 1) {
        const user: Record<string, unknown> = select('users').findOne({ email });
        return res.json({ username: user.username, data: user.password });
      }
      return res.send();
    } else return res.status(403).json({ error: 'code error' });
  });

  // 忘记密码，修改
  app.post(baseUrl + '/users/password', (req: Request, res: Response) => {
    const { username, password, data } = req.body;
    const users: DataBaseOperator = select('users');
    if (data === users.findOne({ username }).password) {
      users.modifyOne({ username }, { password });
      clearToken(username);
      return res.send();
    } else return res.status(403).json({ error: 'You have no modification' });
  });

  // 查询存在信息
  app.get(baseUrl + '/users/exist', (req: Request, res: Response) => {
    const { username, email } = req.query;

    const users: DataBaseOperator = select('users');
    if (username && email)
      return res.json({
        usernameExist: typeof users.findOne({ username }) !== 'undefined',
        emailExist: typeof users.findOne({ email }) !== 'undefined'
      });
    else if (username) return res.json({ usernameExist: typeof users.findOne({ username }) !== 'undefined' });
    else if (email) return res.json({ emailExist: typeof users.findOne({ email }) !== 'undefined' });
    return res.send();
  });

  // 获取用户信息
  app.get(baseUrl + '/users', (req: Request, res: Response) => {
    const username: string = req.query.username as string;
    const type = int(req.query.type);
    const user = select('users').findOne({ username });
    if (type === 0) {
      if (user && user.isActive) {
        return res.json({
          username,
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username.slice(0, 4)),
          email: Random.email('qq.com'),
          profession: '',
          birthday: Random.datetime(),
          gender: 1,
          address: Random.province(),
          city: Random.province(),
          signature: Random.paragraph(5, 30),
          qq: Random.natural(1000000000, 3000000000),
          weibo: Random.word(5, 15)
        });
      }
    } else if (type === 1) {
      if (user && user.isActive) {
        return res.json({
          username,
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username.slice(0, 4)),
          registration_time: Random.datetime(),
          email: Random.email('qq.com'),
          recommend_count: Random.natural(0, 1000),
          dynamic_count: Random.natural(0, 1000),
          like_count: Random.natural(0, 1000),
          fans_count: Random.natural(0, 1000)
        });
      }
    } else return res.status(410).json({ error: 'User name error' });
  });
}
