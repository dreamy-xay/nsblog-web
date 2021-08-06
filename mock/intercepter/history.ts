/*
 * @Description: 历史记录api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 10:01:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-06 11:03:44
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken, getToken } from './util';

export default function(baseUrl: string, app: Application) {
  // 获取历史记录
  app.get(baseUrl + '/history', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { limit, offset } = req.query;
    const type: number = parseInt(req.query.type as string);

    function getRandom(limit: number, hasType: boolean = true): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const type: Record<string, number> = hasType
          ? {
              type: Random.natural(1, 2)
            }
          : {};
        const tagList: string[] = [];
        let cs: number = Random.natural(1, 5);
        while (cs--) tagList.push(Random.natural(0, 2) ? Random.cword(4, 6) : Random.word(5, 7));
        ans.push({
          history_id: Random.increment(),
          id: Random.id(),
          time: Random.datetime(),
          title: Random.natural(0, 3) ? Random.ctitle(7, 15) : Random.title(7, 12),
          topic_tag: tagList,
          username: Random.natural(0, 1) ? Random.cname() : Random.name(),
          ...type
        });
      }
      return ans.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
        return new Date(b.time as string).getTime() - new Date(a.time as string).getTime();
      });
    }

    if (type == 0) return res.json({ history: getRandom(Random.natural(0, parseInt(limit as string))) });
    else if (type == 1) return res.json({ history: getRandom(Random.natural(0, parseInt(limit as string)), false) });
    else if (type == 2) return res.json({ history: getRandom(Random.natural(0, parseInt(limit as string)), false) });
    else return res.status(403).json({ error: 'error' });
  });

  // 删除某条历史记录
  app.delete(baseUrl + '/history', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    console.log(`delete all history: username ${username}   success`);
    return res.send();
  });

  // 删除某条历史记录
  app.delete(baseUrl + '/history/:history_id', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { history_id } = req.params;
    const type: string = req.query.type as string;
    const username: string = getToken(req.headers).username;
    console.log(`delete history: history_id ${history_id}  type: ${type}  username ${username}   success`);
    return res.send();
  });
}
