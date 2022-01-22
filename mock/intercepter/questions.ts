/*
 * @Description: 问答api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 20:59:37
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-21 22:44:02
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, randomUsers, RandomUser, verifyToken, getToken } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取发布的提问
  app.get(baseUrl + '/questions', (req: Request, res: Response) => {
    const { username, limit, offset, release_time, browsing_count, topic_name, tag_name, type } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get questions', { username, limit, offset, release_time, browsing_count, topic_name, tag_name, type });

    const RUsers = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        const tags: string[] = [];
        if (username) {
          const sum: number = Random.integer(1, 3);
          for (let j: number = 0; j < sum; ++j)
            tags.push(Random.integer(0, 1) ? Random.word(2, 8) : Random.cword(2, 5));
        }
        ans.push({
          id: Random.increment(),
          title: Random.integer(0, 1) ? Random.title(1, 40) : Random.ctitle(1, 40),
          content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          release_time: Random.datetime(),
          reply_count: Random.integer(0, 5) ? Random.integer(1, 10000) : 0,
          ...(username
            ? {}
            : {
                solution: Random.integer(0, 1),
                browsing_count: Random.integer(0, 5) ? Random.integer(1, 10000) : 0,
                username: user.username,
                nickname: user.nickname,
                tags
              })
        });
      }
      return ans;
    }
    return res.json({ questions: getRandom(int(offset) >= 78 ? 0 : Math.min(int(limit), 78 - int(offset))) });
  });

  // 新建问答
  app.post(baseUrl + '/questions', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { title, content, tag_name } = req.body;

    print('new questions', { username, title, content, tag_name });

    return res.send();
  });

  // @待定
  // 获取发布的提问的回答
  app.get(baseUrl + '/questions/replies', (req: Request, res: Response) => {
    const { username, limit, offset, release_time, browsing_count } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get replay questions', { username, limit, offset, release_time, browsing_count });

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
