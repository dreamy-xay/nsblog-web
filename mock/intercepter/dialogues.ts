/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-017 11:59:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-23 16:26:38
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { print, getToken, RandomUser, randomUsers, verifyToken, int } from './utils';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取对话消息和记录
  app.get(baseUrl + '/dialogues', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { limit, offset, friend_id } = req.query;

    print('get dialogues', { username, friend_id, limit, offset });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          content: Random.natural(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
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
      const RUsers = randomUsers(username);
      for (let i: number = 0; i < cs; ++i) {
        const sum: number = Random.integer(1, 27);
        const records: Record<string, unknown>[] = getRandom(
          int(offset) >= sum ? 0 : Math.min(int(limit), sum - int(offset))
        );
        const user: RandomUser = RUsers.random();
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          username: user.username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
          count: Random.integer(0, 88),
          records
        });
      }
      return res.json({
        dialogues: ans,
        avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username)
      });
    }
  });

  // 清零未读消息
  app.put(baseUrl + '/dialogues/:dialogue_id(\\d+)', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { dialogue_id } = req.params;
    const username: string = getToken(req.headers).username;

    print('clear dialogue', { username, dialogue_id });

    return res.send();
  });

  // 删除对话消息和记录
  app.delete(baseUrl + '/dialogues/:dialogue_id(\\d+)', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { dialogue_id } = req.params;
    const username: string = getToken(req.headers).username;

    print('delete dialogue', { username, dialogue_id });

    return res.send();
  });
}
