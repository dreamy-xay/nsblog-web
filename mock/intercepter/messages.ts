/*
 * @Description: 消息api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 19:45:44
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-19 13:59:20
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken, getToken, randomUsers, RandomUser, int } from './util';

export default function(baseUrl: string, app: Application) {
  // 获取消息
  app.get(baseUrl + '/messages', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { type, offset, limit } = req.query;
    const username: string = getToken(req.headers).username;
    if (int(type) < 0 && int(type) > 4) return res.status(403).json({ error: 'error' });

    console.log(`--------get messages: type ${type}   username ${username}   success`);

    const RUsers = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        let content: unknown;
        const user: RandomUser = RUsers.random();
        if (int(type) === 1) content = Random.integer(0, 1) ? Random.cparagraph(1, 10) : Random.paragraph(1, 10);
        else if (int(type) === 2)
          content = {
            username: user.username,
            nickname: user.nickname,
            avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
            content: Random.integer(0, 1) ? Random.cparagraph(1, 10) : Random.paragraph(1, 10),
            type: Random.natural(1, 2),
            reply_username: RUsers.random().username,
            reply_content: Random.integer(0, 1) ? Random.cparagraph(1, 10) : Random.paragraph(1, 10),
            evaluation: Random.integer(0, 2)
          };
        else if (int(type) === 3)
          content = {
            username: user.username,
            nickname: user.nickname,
            avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
            type: Random.natural(1, 2),
            id: Random.id()
          };
        else
          content = {
            username: user.username,
            nickname: user.nickname,
            avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
            attention: Random.natural(0, 1) ? true : false
          };

        ans.push({
          message_id: Random.increment(Random.integer(0, 10)),
          content,
          status: Random.integer(0, 1),
          time: Random.datetime()
        });
      }
      return ans;
    }
    if (int(type))
      return res.json({ messages: getRandom(int(offset) >= 19 ? 0 : Math.min(int(limit), 19 - int(offset))) });
    else {
      const count: number[] = [];
      for (let i: number = 1; i <= 5; ++i) count.push(Random.natural(0, 2) ? Random.integer(1, 120) : 0);
      return res.json({ count });
    }
  });

  // 删除消息
  app.delete(baseUrl + '/messages/:message_id(\\d+)', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    console.log(`--------delete messages: username ${username}   message_id ${req.params.message_id} success`);
    return res.send();
  });
}
