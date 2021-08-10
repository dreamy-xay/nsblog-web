/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 11:59:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-10 15:50:41
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken } from './util';
import select from '../data/index';

function int(value: unknown): number {
  return parseInt(value as string);
}

export default function(baseUrl: string, app: Application) {
  // 获取收藏夹或者收藏
  app.get(baseUrl + '/collections', (req: Request, res: Response) => {
    // if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { username, limit, offset, favorites } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    console.log(`${username} getCollections...`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          id: Random.id(),
          title: Random.natural(0, 3) ? Random.ctitle(7, 15) : Random.title(7, 12),
          type: Random.natural(1, 2)
        });
      return ans;
    }

    if (favorites)
      res.json({ collections: getRandom(int(offset) >= 29 ? 0 : Math.min(int(limit), 29 - int(offset) + 1)) });
    else {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      const cs: number = Random.natural(0, 15);
      for (let i: number = 0; i < cs; ++i) {
        const collections: Record<string, unknown>[] = getRandom(
          int(offset) >= 29 ? 0 : Math.min(int(limit), 29 - int(offset) + 1)
        );
        ans.push({
          id: Random.id(),
          name: Random.natural(0, 2) ? Random.cword(1, 8) : Random.word(2, 15),
          count: collections.length,
          collections
        });
      }
      return res.json({ favorites: ans });
    }
  });
}
