/*
 * @Description: 学习小组api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 21:24:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-12 13:39:56
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, verifyToken, getToken, randomUsers, RandomUser } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取学习小组(包括详细信息)
  app.get(baseUrl + '/groups', (req: Request, res: Response) => {
    const { topic_name, group_name, limit, offset } = req.query;
    let username: string = req.query.username as string;
    if (username) {
      if (!select('users').findOne({ username })) res.status(410).json({ error: 'User name error' });
    } else if (group_name) username = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print(`get study groups${group_name ? ' detail' : ''}`, { username, topic_name, group_name, limit, offset });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
          topic_name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          member_count: Random.integer(0, 300),
          join: Random.integer(0, 1),
          ...(username ? { time: Random.datetime() } : {})
        });
      }
      return ans;
    }

    if (group_name)
      return res.json({
        member_count: Random.integer(0, 300),
        solicitations_count: Random.integer(0, 1000),
        remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
        join: Random.integer(0, 1)
      });
    else return res.json({ groups: getRandom(int(offset) >= 66 ? 0 : Math.min(int(limit), 66 - int(offset))) });
  });

  // 创建学习小组
  app.post(baseUrl + '/groups', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { group_name, remark, topic_name } = req.body;

    print('new study groups', { username, group_name, remark, topic_name });

    return res.send();
  });

  // 获取征集令
  app.get(baseUrl + '/groups/solicitations', (req: Request, res: Response) => {
    const { group_name, limit, offset } = req.query;

    print('get solicitations', { group_name, limit, offset });

    const RUser = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUser.random();
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50),
          ...(group_name
            ? {
                username: user.username,
                nickname: user.username,
                release_time: Random.datetime(),
                deadline: Random.datetime(),
                agree_count: Random.integer(0, 30)
              }
            : {})
        });
      }
      return ans;
    }

    return res.json({ solicitations: getRandom(int(offset) >= 67 ? 0 : Math.min(int(limit), 67 - int(offset))) });
  });

  // 获取征集令详细信息
  app.get(baseUrl + '/groups/solicitations/solicitation_id(\\d+)', (req: Request, res: Response) => {
    const { solicitation_id } = req.params;
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print('get solicitations detail', { solicitation_id, username });

    const RUser = randomUsers(username);
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUser.random();
        ans.push({
          username: user.username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
          status: Random.integer(0, 1)
        });
      }
      return ans;
    }

    const user: RandomUser = RUser.random();

    return res.json({
      id: Random.increment(Random.integer(1, 10)),
      title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50),
      content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
      username: user.username,
      nickname: user.nickname,
      avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
      fans_count: Random.integer(0, 1000),
      attention: Random.integer(0, 1),
      release_time: Random.datetime(),
      deadline: Random.datetime(),
      users: getRandom(Random.integer(0, 27))
    });
  });

  // 发布征集令
  app.post(baseUrl + '/groups/solicitations', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    const { title, content, deadline } = req.body;

    print('release solicitations', { username, title, content, deadline });

    return res.send();
  });

  // 获取文章
  app.get(baseUrl + '/groups/articles', (req: Request, res: Response) => {
    const { group_name, type, time, limit, offset } = req.query;
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print('get groups articles', { username, group_name, type, time, limit, offset });

    const RUsers = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        ans.push({
          type: Random.integer(0, 1), // 0为文章，1为问答
          id: Random.increment(Random.integer(1, 10)),
          title: Random.integer(0, 1) ? Random.title(3, 20) : Random.ctitle(3, 20),
          content: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.ctitle(1, 2),
          reply_count: Random.integer(0, 1000),
          browsing_count: 12,
          username: user.username,
          nickname: user.nickname,
          release_time: Random.datetime(),
          ...(username
            ? {
                recommend: Random.integer(0, 1),
                recommend_count: Random.integer(0, 3000)
              }
            : {})
        });
      }
      return ans;
    }

    return res.json({ articles: getRandom(int(offset) >= 78 ? 0 : Math.min(int(limit), 78 - int(offset))) });
  });

  // 获取问答
  app.get(baseUrl + '/groups/questions', (req: Request, res: Response) => {
    const { group_name, type, time, limit, offset } = req.query;
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print('get groups questions', { username, group_name, type, time, limit, offset });

    const RUsers = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        ans.push({
          type: Random.integer(0, 1), // 0为文章，1为问答
          id: Random.increment(Random.integer(1, 10)),
          title: Random.integer(0, 1) ? Random.title(3, 20) : Random.ctitle(3, 20),
          content: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.ctitle(1, 2),
          reply_count: Random.integer(0, 1000),
          browsing_count: 12,
          username: user.username,
          nickname: user.nickname,
          release_time: Random.datetime(),
          ...(username
            ? {
                like: Random.integer(0, 1),
                like_count: Random.integer(0, 3000)
              }
            : {})
        });
      }
      return ans;
    }

    return res.json({ questions: getRandom(int(offset) >= 78 ? 0 : Math.min(int(limit), 78 - int(offset))) });
  });

  // 获取资源
  app.get(baseUrl + '/groups/resources', (req: Request, res: Response) => {
    const { group_name, type, time, limit, offset } = req.query;

    print('get groups resources', { group_name, type, time, limit, offset });

    const RUser = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUser.random();
        ans.push({
          id: Random.increment(Random.integer(1, 10)),
          name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          link: Random.url(),
          remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
          upload_time: Random.datetime(),
          username: user.username,
          nickname: user.nickname
        });
      }
      return ans;
    }

    return res.json({ resources: getRandom(int(offset) >= 77 ? 0 : Math.min(int(limit), 77 - int(offset))) });
  });

  // 获取用户
  app.get(baseUrl + '/groups/users', (req: Request, res: Response) => {
    const { group_name, is_admin, limit, offset } = req.query;

    print('get groups users', { group_name, is_admin, limit, offset });

    const RUsers = randomUsers();
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i) {
        const user: RandomUser = RUsers.random();
        ans.push({
          username: user.username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
          signature: (Random.integer(0, 1) ? Random.cparagraph(1, 1) : Random.paragraph(1, 1)).slice(0, 128),
          attention: Random.integer(0, 1)
        });
      }
      return ans;
    }

    return res.json({ users: getRandom(int(offset) >= 73 ? 0 : Math.min(int(limit), 73 - int(offset))) });
  });

  // 加入学习小组
  app.post(baseUrl + '/groups/users', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { group_name } = req.body;

    print('join in groups', { username, group_name });

    return res.send();
  });

  // 退出学习小组
  app.delete(baseUrl + '/groups/users', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { group_name } = req.body;

    print('quit groups', { username, group_name });

    return res.send();
  });
}
