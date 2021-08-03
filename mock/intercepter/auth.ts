/*
 * @Description: 登录api伪造数据
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-09 21:34:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-03 17:52:03
 */

import { Application, Request, Response } from 'express';
import select, { DataBaseOperator } from '../data/index';
import { createToken, clearToken, getToken } from './util';

export default function(baseUrl: string, app: Application) {
  // 登录
  app.post(baseUrl + '/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const users: DataBaseOperator = select('users');
    let ans: Record<string, unknown> = users.findOne({ username });
    if (typeof ans === 'undefined') ans = users.findOne({ email: username });
    return ans && ans.password === password
      ? res.json({ token: createToken((ans as any).username) })
      : res.status(401).json({ error: 'Password or username error' });
  });

  // 登出
  app.post(baseUrl + '/auth/logout', (req: Request, res: Response) => {
    clearToken(req.headers);
    return res.status(200);
  });

  // 注销
  app.post(baseUrl + '/auth/logoff', (req: Request, res: Response) => {
    const { username } = getToken(req.headers);
    select('users').modifyOne({ username }, { isActive: false });
    return res.status(200);
  });
}
