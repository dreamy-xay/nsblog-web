/*
 * @Description: 专题api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-23 12:31:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 21:04:43
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { print, verifyToken, getToken, getTopics, getTags } from './utils';

export default function(baseUrl: string, app: Application) {
  // 获取专题名
  app.get(baseUrl + '/topics', (req: Request, res: Response) => {
    print('get topics');

    return res.json({ topics: getTopics() });
  });

  // 获取专题标签名
  app.get(baseUrl + '/topics/tags', (req: Request, res: Response) => {
    const { topic_name } = req.query;

    print('get topic tags', { topic_name });

    return res.json({ tags: getTags(topic_name as string) });
  });

  // 获取专题标签详情信息
  app.get(baseUrl + '/topics/tags/:tag_name', (req: Request, res: Response) => {
    const { tag_name } = req.params;

    print('get topic tag detail', { tag_name });

    return res.json({
      name: tag_name,
      remark: Random.integer(0, 1) ? Random.paragraph(2, 3) : Random.cparagraph(2, 3),
      article_count: Random.integer(1, 1000),
      attention_count: Random.integer(1, 10000),
      attention: Random.integer(0, 1)
    });
  });

  // 创建专题
  app.post(baseUrl + '/topics', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { topic_name, remark } = req.body;

    print('create topic', { username, topic_name, remark });

    return res.send();
  });

  // 创建专题标签
  app.post(baseUrl + '/topics/tags', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { topic_name, tag_name, remark } = req.body;

    print('create topic tag', { username, topic_name, tag_name, remark });

    return res.send();
  });
}
