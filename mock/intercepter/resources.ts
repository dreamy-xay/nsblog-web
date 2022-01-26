/*
 * @Description: 资源api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 19:55:56
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-26 13:09:16
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, RandomUser, randomUsers, verifyToken, getToken } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取上传资源
  app.get(baseUrl + '/resources', (req: Request, res: Response) => {
    const { username, type, time, limit, offset } = req.query;
    if (username && !select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get resources', { username, type, time, limit, offset });

    const RUser = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        let data: Record<string, string> = {};
        if (!username) {
          const user: RandomUser = RUser.random();
          data = {
            username: user.username,
            nickname: user.nickname
          };
        }
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          link: Random.url(),
          remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
          upload_time: Random.datetime(),
          ...data
        });
      }
      return ans;
    }
    return res.json({ resources: getRandom(int(offset) >= 77 ? 0 : Math.min(int(limit), 77 - int(offset))) });
  });

  // 获取资源详情信息
  app.get(baseUrl + '/resources/:resource_id(\\d+)', (req: Request, res: Response) => {
    const { resource_id } = req.params;
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print('get resources detail', { username, resource_id });

    const RUser = randomUsers();
    function getRandom(limit: number, hasAvatar: boolean = false): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUser.random();
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          link: Random.url(),
          remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
          upload_time: Random.datetime(),
          username: user.username,
          nickname: user.nickname,
          ...(hasAvatar ? { avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username) } : {})
        });
      }
      return ans;
    }
    const collection: Record<string, unknown> = Random.integer(0, 1)
      ? { collection: Random.increment(Random.integer(1, 10)) }
      : {};

    return res.json({
      ...getRandom(1, true)[0],
      ...(username ? collection : {}),
      download_count: 20,
      recommend_resources: getRandom(Random.integer(8, 11))
    });
  });
}
