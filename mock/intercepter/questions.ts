/*
 * @Description: 问答api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 20:59:37
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 21:13:40
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, randomUsers, RandomUser, verifyToken, getToken, getRandomTag } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取发布的提问
  app.get(baseUrl + '/questions', (req: Request, res: Response) => {
    const { username, limit, offset, release_time, browsing_count, topic_name, tag_name, type } = req.query;
    if (username && !select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get questions', { username, limit, offset, release_time, browsing_count, topic_name, tag_name, type });

    const RUsers = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        const tags: string[] = [];
        if (!username) {
          const sum: number = Random.integer(1, 3);
          for (let j: number = 0; j < sum; ++j) tags.push(getRandomTag());
        }
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
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

  // 获取发布的提问
  app.get(baseUrl + '/questions/:question_id(\\d+)', (req: Request, res: Response) => {
    const { question_id } = req.params;
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print('get questions detail', { username, question_id });

    const user: RandomUser = randomUsers().random();

    const tags: string[] = [];
    const sum: number = Random.integer(1, 3);
    for (let j: number = 0; j < sum; ++j) tags.push(getRandomTag());

    const data: Record<string, unknown> = {
      ...(Random.integer(0, 1) ? { collection: Random.increment(Random.integer(1, 10)) } : {}),
      evaluation: Random.integer(0, 1),
      ...(Random.integer(0, 1) ? { solution: 1 } : {})
    };

    return res.json({
      id: Random.increment(Random.integer(1, 10)),
      title: Random.integer(0, 1) ? Random.title(1, 40) : Random.ctitle(1, 40),
      content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
      username: user.username,
      nickname: user.nickname,
      avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
      release_time: Random.datetime(),
      tags,
      evaluation_count: Random.integer(0, 100),
      browsing_count: Random.integer(0, 10000),
      reply_count: Random.integer(0, 100),
      ...data
    });
  });

  // 获取发布的提问的回答
  app.get(baseUrl + '/questions/replies', (req: Request, res: Response) => {
    const { question_id, type, reply_id, limit, offset } = req.query;
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print('get replay questions', { username, question_id, type, reply_id, limit, offset });

    const RUsers = randomUsers(username);
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];

      function getComments(): Record<string, unknown> {
        let ans: Record<string, unknown> = {};
        if (!(question_id && reply_id)) {
          ans = { child_replies: [] };
          const sum = Random.integer(0, 5);
          for (let i: number = 0; i < sum; ++i) {
            const user: RandomUser = RUsers.random();
            const replyUser: RandomUser = RUsers.random();
            const params: Record<string, unknown> = username !== '' ? { evaluation: Random.integer(0, 2) } : {};
            (ans.child_replies as any).push({
              id: Random.increment(Random.integer(1, 10)),
              username: user.username,
              nickname: user.nickname,
              avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
              time: Random.datetime(),
              reply_username: replyUser.username,
              reply_nickname: replyUser.nickname,
              content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
              support_count: Random.integer(0, 9999),
              oppose_count: Random.integer(0, 9999),
              ...params
            });
          }
        }
        return ans;
      }

      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        const params: Record<string, unknown> = username !== '' ? { evaluation: Random.integer(0, 2) } : {};
        ans.push({
          id: i ? Random.increment(Random.integer(1, 10)) : 1,
          username: user.username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
          time: Random.datetime(),
          content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          support_count: Random.integer(0, 9999),
          oppose_count: Random.integer(0, 9999),
          ...params,
          ...getComments()
        });
      }

      return ans;
    }

    return res.json({ replies: getRandom(int(offset) >= 25 ? 0 : Math.min(int(limit), 25 - int(offset))) });
  });

  // 发表提问回答
  app.post(baseUrl + '/questions/replies', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { question_id, content, parent_id, reply_username } = req.body;

    print('release questions replies', { username, question_id, content, parent_id, reply_username });

    const user: Record<string, unknown> = select('user').findOne({ username });

    return res.json({
      id: Random.increment(Random.integer(1, 10)),
      nickname: user.nickname,
      avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username),
      time: Random.datetime()
    });
  });

  // 修改文章评论状态，推荐反对还是不操作
  app.put(baseUrl + '/questions/replies/evaluation', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type, reply_id } = req.body;

    print('modify questions replies evaluation', { username, type, reply_id });

    return res.send();
  });
}
