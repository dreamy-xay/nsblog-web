/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 11:59:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-03 12:55:23
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken } from './util';

export default function(baseUrl: string, app: Application) {
  // 获取收藏夹或者收藏
  app.get(baseUrl + '/collections', (req: Request, res: Response) => {
    const { limit, offset, favorites } = req.query;

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i)
        ans.push({
          title: Random.natural(0, 3) ? Random.ctitle(7, 15) : Random.title(7, 12),
          type: Random.natural(1, 2)
        });
      return ans;
    }

    if (favorites) res.json({ collections: getRandom(Random.natural(0, parseInt(limit as string))) });
    else {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      const cs: number = Random.natural(0, 15);
      for (let i: number = 0; i < cs; ++i) {
        const collections: Record<string, unknown>[] = getRandom(Random.natural(0, parseInt(limit as string)));
        ans.push({
          id: Random.guid(),
          name: Random.natural(0, 2) ? Random.cword(1, 8) : Random.word(2, 15),
          count: collections.length,
          collections
        });
      }
      return res.json({ favorites: ans });
    }
  });
}
