/*
 * @Description: 学习小组api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 21:24:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-13 21:32:38
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int } from './util';
import select from 'mock/data';

export default function(baseUrl: string, app: Application) {
  // 获取学习小组
  app.get(baseUrl + '/groups', (req: Request, res: Response) => {
    const { username, limit, offset } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`${username} getStudyGroups... `);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          id: Random.increment(),
          name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          category: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          member_count: Random.integer(0, 300),
          time: Random.datetime()
        });
      }
      return ans;
    }
    return res.json({ groups: getRandom(int(offset) >= 66 ? 0 : Math.min(int(limit), 66 - int(offset))) });
  });
}
