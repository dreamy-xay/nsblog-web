/*
 * @Description: 专题api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-23 12:31:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-17 21:49:35
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken, getToken } from './util';

export default function(baseUrl: string, app: Application) {
  // 获取专题名
  app.get(baseUrl + '/topics', (req: Request, res: Response) => {
    const topics: string[] = [];
    const sum: number = Random.integer(2, 25);
    for (let i: number = 0; i < sum; ++i) topics.push(Random.integer(0, 1) ? Random.word(5, 9) : Random.cword(2, 6));
    return res.json({ topics });
  });

  // 获取专题标签名
  app.get(baseUrl + '/topics/tags', (req: Request, res: Response) => {
    const { topic_name } = req.query;
    console.log(`--------get topic-tags: topic_name=>${topic_name}  success`);
    const tags: string[] = [];
    const sum: number = Random.integer(1, 40);
    for (let i: number = 0; i < sum; ++i) tags.push(Random.integer(0, 1) ? Random.word(5, 9) : Random.cword(2, 6));
    return res.json({ tags });
  });

  // 创建专题
  app.post(baseUrl + '/topics', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { topic_name, remark } = req.body;
    console.log(`--------create topic: username=>${username}  topic_name=>${topic_name}  remark=>${remark} success`);
    return res.send();
  });

  // 创建专题标签
  app.post(baseUrl + '/topics/tags', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { topic_name, tag_name, remark } = req.body;
    console.log(
      `--------create topic: username=>${username}  topic_name=>${topic_name}  tag_name=?${tag_name}  remark=>${remark} success`
    );
    return res.send();
  });
}
