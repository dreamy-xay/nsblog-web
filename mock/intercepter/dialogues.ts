/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-017 11:59:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-20 15:33:51
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { getToken, verifyToken } from './util';
import select from '../data/index';

function int(value: unknown): number {
  return parseInt(value as string);
}

export default function(baseUrl: string, app: Application) {
  // 获取对话消息和记录
  app.get(baseUrl + '/dialogues', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { limit, offset, friend_id } = req.query;
    const username: string = getToken(req.headers).username;

    console.log(`--------${username} getDialogues...`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          content: Random.natural(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          status: 0,
          is_me: Random.integer(0, 1) ? true : false,
          time: Random.datetime()
        });
      }
      return ans.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
        return <string>a.time < <string>b.time ? -1 : 1;
      });
    }

    if (friend_id) {
      if (!select('users').findOne({ username: friend_id })) return res.status(410).json({ error: 'Friend id error' });
      return res.json({ records: getRandom(int(offset) >= 118 ? 0 : Math.min(int(limit), 118 - int(offset))) });
    } else {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      const cs: number = Random.natural(0, 30);
      for (let i: number = 0; i < cs; ++i) {
        const sum: number = Random.integer(1, 38);
        const records: Record<string, unknown>[] = getRandom(
          int(offset) >= sum ? 0 : Math.min(int(limit), sum - int(offset))
        );
        ans.push({
          username: Random.name(),
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', Random.word(2, 4)),
          count: Random.integer(0, 88),
          records
        });
      }
      return res.json({
        dialogues: ans,
        avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username.slice(0, 4))
      });
    }
  });

  // 删除对话消息和记录
  app.delete(baseUrl + '/dialogues/:friend_id', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { friend_id } = req.params;
    const username: string = getToken(req.headers).username;
    console.log(`--------delete dialogue: friend_id ${friend_id}   username ${username}   success`);
    return res.send();
  });
}
