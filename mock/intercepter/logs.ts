/*
 * @Description: 日志内容获取api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-23 18:26:27
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-21 21:36:42
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { print, getToken, verifyToken } from './utils';

export default function(baseUrl: string, app: Application) {
  // 获取登录登出日志内容
  app.get(baseUrl + '/logs/login', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    print('get login logs', { username });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          time: Random.datetime(),
          content: Random.integer(0, 1) ? '登录' : '登出',
          ip: Random.ip()
        });
      }
      return ans;
    }
    return res.json({ logs: getRandom(Random.integer(0, 10)) });
  });
}
