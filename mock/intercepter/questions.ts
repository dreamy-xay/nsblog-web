/*
 * @Description: 问答api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 20:59:37
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-19 15:38:40
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取发布的提问
  app.get(baseUrl + '/questions', (req: Request, res: Response) => {
    const { username, limit, offset, release_time, browsing_count } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`${username} getQuestions...  release_time=>${release_time}  browsing_count=>${browsing_count}`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          id: Random.increment(),
          title: Random.integer(0, 1) ? Random.title(1, 40) : Random.ctitle(1, 40),
          content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          release_time: Random.datetime(),
          reply_count: Random.integer(1, 100)
        });
      }
      return ans;
    }
    return res.json({ questions: getRandom(int(offset) >= 78 ? 0 : Math.min(int(limit), 78 - int(offset))) });
  });

  // @待定
  // 获取发布的提问的回答
  app.get(baseUrl + '/questions/replies', (req: Request, res: Response) => {
    const { username, limit, offset, release_time, browsing_count } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`${username} getQuestions...  release_time=>${release_time}  browsing_count=>${browsing_count}`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          id: Random.increment(),
          content: Random.integer(0, 1) ? Random.paragraph(0, 3) : Random.cparagraph(0, 3),
          question_id: Random.integer(0, 10000),
          question_title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50),
          reply_time: Random.datetime()
        });
      }
      return ans;
    }
    return res.json({ replies: getRandom(int(offset) >= 44 ? 0 : Math.min(int(limit), 44 - int(offset))) });
  });
}
