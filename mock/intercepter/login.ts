/*
 * @Description: 登录api伪造数据
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-09 21:34:55
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-17 16:10:04
 */

import { Application, Request, Response } from 'express';
import data from './_data';

export default function(baseUrl: string, app: Application) {
  app.post(baseUrl + '/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    let ans: unknown = null;
    for (const user of data.users)
      if (user.isActive && user.username === username && user.password === password) {
        ans = user;
        break;
      }
    return ans ? res.json(ans) : res.status(403).json({ msg: 'Incorrect username or password' });
  });
}
