/*
 * @Description: 资源api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 19:55:56
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-16 19:58:09
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取学习小组
  app.get(baseUrl + '/resources', (req: Request, res: Response) => {
    const { username, limit, offset } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`${username} getResources... `);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          id: Random.increment(),
          name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
          upload_time: Random.datetime()
        });
      }
      return ans;
    }
    return res.json({ resources: getRandom(int(offset) >= 77 ? 0 : Math.min(int(limit), 77 - int(offset))) });
  });
}
