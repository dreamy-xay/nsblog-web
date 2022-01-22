/*
 * @Description: 学习小组api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 21:24:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-21 21:33:20
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, verifyToken, getToken } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取学习小组
  app.get(baseUrl + '/groups', (req: Request, res: Response) => {
    const { username, topic_name, limit, offset } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get study groups', { username, topic_name, limit, offset });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
          topic_name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          member_count: Random.integer(0, 300),
          join: Random.integer(0, 1),
          ...(username ? { time: Random.datetime() } : {})
        });
      }
      return ans;
    }
    return res.json({ groups: getRandom(int(offset) >= 66 ? 0 : Math.min(int(limit), 66 - int(offset))) });
  });

  // 创建学习小组
  app.post(baseUrl + '/groups', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { group_name, remark, topic_name } = req.body;

    print('new study groups', { username, group_name, remark, topic_name });

    return res.send();
  });
}
