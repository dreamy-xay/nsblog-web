/*
 * @Description: 关注api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 14:25:47
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-14 12:28:16
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { getToken, verifyToken } from './util';
import select from '../data/index';

function int(value: unknown): number {
  return parseInt(value as string);
}

export default function(baseUrl: string, app: Application) {
  // 获取关注情况
  app.get(baseUrl + '/attentions', (req: Request, res: Response) => {
    const { username, limit, offset } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    console.log(`${username} getAttentions...`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          username: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', Random.word(2, 4)),
          signature: Random.paragraph(5, 30)
        });
      return ans;
    }
    return res.json({ attentions: getRandom(int(offset) >= 69 ? 0 : Math.min(int(limit), 69 - int(offset))) });
  });

  // 添加关注
  app.post(baseUrl + '/attentions', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { username } = req.body;
    console.log(`${getToken(req.headers).username} succeeded in adding attention ${username}`);
    return res.send();
  });

  // 取消关注
  app.delete(baseUrl + '/attentions', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { username } = req.body;
    console.log(`${getToken(req.headers).username} successfully canceled attention ${username}`);
    return res.send();
  });

  // 获取粉丝情况
  app.get(baseUrl + '/attentions/fans', (req: Request, res: Response) => {
    const { username, limit, offset } = req.query;

    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    console.log(`${username} getFans...`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          username: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', Random.word(2, 4)),
          signature: Random.paragraph(5, 30)
        });
      return ans;
    }
    return res.json({ attentions: getRandom(int(offset) >= 69 ? 0 : Math.min(int(limit), 69 - int(offset))) });
  });
}
