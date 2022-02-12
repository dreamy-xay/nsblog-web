/*
 * @Description: 公告活动api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 10:01:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-12 11:36:51
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
            'https://s3.bmp.ovh/imgs/2021/09/fd25f71e808f3f23.jpg',
            'https://s3.bmp.ovh/imgs/2021/09/8bcf34ab186f752c.jpg',
            'https://s3.bmp.ovh/imgs/2021/09/040fbcab0802511e.jpg',
            'https://s3.bmp.ovh/imgs/2021/09/7fc65c1d3e881ea5.jpg'
          ][Random.integer(0, 3)],
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
