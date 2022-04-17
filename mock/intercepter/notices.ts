/*
 * @Description: 公告活动api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 10:01:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-04-17 19:41:11
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { print } from './util';
import { shuffle } from 'lodash';

export default function(baseUrl: string, app: Application) {
  // 获取公告 活动
  app.get(baseUrl + '/notices', (req: Request, res: Response) => {
    print('get notices and activities');

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      const activityCount: number = Random.integer(0, 3);
      for (let i: number = 0; i < activityCount; ++i)
        ans.push({
          content: [
            'https://s3.bmp.ovh/imgs/2022/04/17/cccea1dc3c4418ce.png',
            'https://img-home.csdnimg.cn/images/20220414064012.jpg'
          ][Random.integer(0, 1)],
          link: Random.url(),
          type: 1
        });
      for (let i: number = 0; i < limit - activityCount; ++i)
        ans.push({
          content: Random.integer(0, 1) ? Random.word(9, 20) : Random.cword(5, 14),
          link: Random.url(),
          type: 0
        });
      return shuffle(ans);
    }

    return res.json({ notices: getRandom(Random.integer(3, 8)) });
  });
}
