/*
 * @Description: 历史记录api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 10:01:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-23 12:34:28
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken, getToken, randomUsers, RandomUser, int } from './util';

export default function(baseUrl: string, app: Application) {
  // 获取历史记录
  app.get(baseUrl + '/history', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { limit, offset, keyword } = req.query;
    const type: number = int(req.query.type);

    const RUsers = randomUsers();
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
        const user: RandomUser = RUsers.random();
        ans.push({
          history_id: Random.increment(),
          id: Random.id(),
          time: Random.datetime(),
          title: keyword + (Random.natural(0, 3) ? Random.ctitle(15, 45) : Random.title(7, 12)),
          topic_tag: tagList,
          username: user.username,
          nickname: user.nickname,
          ...type
        });
      }
      return ans.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
        return <string>a.time < <string>b.time ? 1 : -1;
      });
    }

    if (type == 0)
      return res.json({
        history: getRandom(int(offset) >= 89 ? 0 : Math.min(int(limit), 89 - int(offset) + 1))
      });
    else if (type == 1)
      return res.json({
        history: getRandom(int(offset) >= 83 ? 0 : Math.min(int(limit), 83 - int(offset) + 1), false)
      });
    else if (type == 2)
      return res.json({
        history: getRandom(int(offset) >= 83 ? 0 : Math.min(int(limit), 83 - int(offset) + 1), false)
      });
    else return res.status(403).json({ error: 'error' });
  });

  // 删除全部历史记录
  app.delete(baseUrl + '/history', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    console.log(`--------delete all history: username ${username}   success`);
    return res.send();
  });

  // 删除某条历史记录
  app.delete(baseUrl + '/history/:history_id', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { history_id } = req.params;
    const type: string = req.query.type as string;
    const username: string = getToken(req.headers).username;
    console.log(`--------delete history: history_id ${history_id}  type: ${type}  username ${username}   success`);
    return res.send();
  });
}
