/*
 * @Description: 消息api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 19:45:44
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-11 16:01:06
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken, getToken } from './util';

function int(value: unknown): number {
  return parseInt(value as string);
}

export default function(baseUrl: string, app: Application) {
  // 获取消息
  app.get(baseUrl + '/messages', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { type, offset, limit } = req.query;
    const username: string = getToken(req.headers).username;
    console.log(`get messages: type ${type}   username ${username}   success`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          message_id: Random.increment(Random.integer(0, 10)),
          content: Random.integer(0, 1) ? Random.cparagraph(1, 10) : Random.paragraph(1, 10),
          status: Random.integer(0, 1),
          time: Random.datetime()
        });
      return ans;
    }
    return res.json({ messages: getRandom(int(offset) >= 19 ? 0 : Math.min(int(limit), 19 - int(offset) + 1)) });
  });

  // 删除消息
  app.delete(baseUrl + '/messages/:message_id', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    console.log(`delete messages: username ${username}   message_id ${req.params.message_id} success`);
    return res.send();
  });
}
