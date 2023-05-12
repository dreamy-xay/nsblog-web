/*
 * @Description: 友链api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-12 13:41:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-13 15:39:33
 */

import { Random } from 'better-mock';
import { Application, Request, Response } from 'express';
import { print, int } from './utils';

export default function(baseUrl: string, app: Application) {
  // 获取友链
  app.get(baseUrl + '/chains', (req: Request, res: Response) => {
    const { username, limit, offset } = req.query;

    print('get friends chains', { username, limit, offset });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          title: Random.integer(0, 1) ? Random.title(1, 3) : Random.ctitle(1, 3),
          link: Random.integer(0, 1) ? Random.url() : `/blog/us${Random.integer(1, 100)}`,
          describe: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3)
        });
      }
      return ans;
    }

    return res.json({ chains: getRandom(int(offset) >= 17 ? 0 : Math.min(int(limit), 17 - int(offset))) });
  });
}
