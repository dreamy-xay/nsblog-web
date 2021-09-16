/*
 * @Description: 动态api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 15:43:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-16 16:01:26
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取学习小组
  app.get(baseUrl + '/dynamic', (req: Request, res: Response) => {
    const { username, limit, offset } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`${username} getDynamic... `);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          time: Random.datetime(),
          content: Random.integer(0, 1) ? Random.paragraph(1, 1) : Random.cparagraph(1, 1)
        });
      }
      return ans;
    }
    return res.json({ groups: getRandom(int(offset) >= 66 ? 0 : Math.min(int(limit), 66 - int(offset))) });
  });
}
