/*
 * @Description: 登录api伪造数据
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-09 21:34:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-24 14:50:46
 */

import { Application, Request, Response } from 'express';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  app.post(baseUrl + '/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const ans: Record<string, unknown> = select('users').findOne({ username, password });
    return ans ? res.json(ans) : res.status(403).json({ msg: 'Incorrect username or password' });
  });
}
