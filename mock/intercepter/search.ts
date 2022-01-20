/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-19 13:30:35
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-20 12:51:28
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import select from '../data/index';
import { getToken, verifyToken, int } from './util';

export default function(baseUrl: string, app: Application) {
  // 获取搜索标签
  app.get(baseUrl + '/search/tag', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    console.log(`--------${username} search ${req.query.tagName} `);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          topic_name: Random.string(2, 9), // 专题名
          fans_count: Random.integer(0, 99999), // 关注数量
          article_count: Random.integer(0, 99999), // 文章数量
          remark: Random.cparagraph(20, 40), // 描述
          isFocus: Random.boolean() // 是否关注
        });
      }
      return ans;
    }
    return res.json({ searchTag: getRandom(Random.integer(0, 10)) });
  });

  // 获取搜索用户
  app.get(baseUrl + '/search/user', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    console.log(`${username} search ${req.query.value} `);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        // 中英文随机
        const r = Random.integer(0, 10) > 5;
        ans.push({
          nickname: r ? Random.cname() : Random.name(), // 昵称
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png'), // 头像
          signature: r ? Random.cparagraph(10, 100) : Random.paragraph(10, 100), // 个性签名
          isFocus: Random.boolean() // 是否关注
        });
      }
      return ans;
    }
    return res.json({ searchTag: getRandom(Random.integer(0, 10)) });
  });
}
