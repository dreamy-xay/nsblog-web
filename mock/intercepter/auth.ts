/*
 * @Description: 登录api伪造数据
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-09 21:34:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-21 22:03:02
 */

import { Application, Request, Response } from 'express';
import select, { DataBaseOperator } from '../data/index';
import { print, createToken, clearToken, getToken, verifyToken } from './util';

export default function(baseUrl: string, app: Application) {
  // 登录
  app.post(baseUrl + '/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const users: DataBaseOperator = select('users');

    print('login', { username, password });

    let ans: Record<string, unknown> = users.findOne({ username });
    if (!ans) ans = users.findOne({ email: username });
    if (!ans) return res.status(401).json({ error: 'Password or username error' });
    else if (!ans.isActive) return res.status(401).json({ error: 'Account has been disabled' });
    else if (ans.password === password) return res.json({ token: createToken((ans as any).username) });
    else return res.status(401).json({ error: 'Password or username error' });
  });

  // 登出
  app.post(baseUrl + '/auth/logout', (req: Request, res: Response) => {
    const username: string = getToken(req.headers).username;

    print('logout', { username });

    clearToken(req.headers);
    return res.status(200);
  });

  // 注销
  app.post(baseUrl + '/auth/logoff', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { password } = req.body;
    const user: Record<string, unknown> = select('users').findOne({ username });
    if (user && user.password === password) {
      print('logoff', { username });

      select('users').modifyOne({ username }, { isActive: false });
      return res.status(200);
    } else {
      print('logoff(password error)', { username }, 'fail!');

      res.status(401).json({ error: 'Password error' });
    }
  });
}
