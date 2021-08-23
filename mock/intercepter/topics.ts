/*
 * @Description: 专题api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-23 12:31:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-23 12:48:06
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';

export default function(baseUrl: string, app: Application) {
  // 获取专题名
  app.get(baseUrl + '/topics', (req: Request, res: Response) => {
    const topics: Record<string, unknown>[] = [];
    const sum: number = Random.integer(10, 25);
    for (let i: number = 0; i < sum; ++i)
      topics.push({
        name: Random.integer(0, 1) ? Random.word(5, 9) : Random.cword(2, 6)
      });
    return res.json({ topics });
  });

  // 获取专题标签名
  app.get(baseUrl + '/topics/tags', (req: Request, res: Response) => {
    const { topic } = req.query;
    console.log(`--------get topic-tags: topic=>${topic}  success`);
    const tags: Record<string, unknown>[] = [];
    const sum: number = Random.integer(1, 40);
    for (let i: number = 0; i < sum; ++i)
      tags.push({
        name: Random.integer(0, 1) ? Random.word(5, 9) : Random.cword(2, 6)
      });
    return res.json({ tags });
  });
}
