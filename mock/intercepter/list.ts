/*
 * @Description: 排行榜api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 10:01:23
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 14:43:29
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { print, randomUsers, RandomUser, int, getRandomTag } from './util';

export default function(baseUrl: string, app: Application) {
  // 热门文章
  app.get(baseUrl + '/list/articles', (req: Request, res: Response) => {
    const type: number = int(req.query.type);

    print('get articles list', { type });

    const articles: Record<string, unknown>[] = [];
    const sum: number = Random.integer(6, 9);
    for (let i: number = 0; i < sum; ++i) {
      articles.push({
        id: Random.increment(Random.integer(1, 10)),
        title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50)
      });
    }

    return res.json({ articles });
  });

  // 学习小组活跃排行
  app.get(baseUrl + '/list/groups', (req: Request, res: Response) => {
    print('get groups list');

    const groups: string[] = [];
    const sum: number = Random.integer(6, 9);
    for (let i: number = 0; i < sum; ++i) groups.push(Random.integer(0, 1) ? Random.word(9, 20) : Random.cword(5, 14));

    return res.json({ groups });
  });

  // 学习小组用户活跃排行
  app.get(baseUrl + '/list/groups/users', (req: Request, res: Response) => {
    const type: number = int(req.query.type);

    print('get groups users list', { type });

    const RUser = randomUsers();
    let users: Record<string, unknown>[] = [];
    const sum: number = Random.integer(6, 9);
    for (let i: number = 0; i < sum; ++i) {
      const user: RandomUser = RUser.random();
      users.push({
        username: user.username,
        nickname: user.nickname,
        avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
        activity: Random.integer(100, 9000)
      });
    }

    users = users.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      return <number>b.activity - <number>a.activity;
    });

    return res.json({ users });
  });

  // 热门问答
  app.get(baseUrl + '/list/questions', (req: Request, res: Response) => {
    const type: number = int(req.query.type);

    print('get questions list', { type });

    const questions: Record<string, unknown>[] = [];
    const sum: number = Random.integer(6, 9);
    for (let i: number = 0; i < sum; ++i) {
      questions.push({
        id: Random.increment(Random.integer(1, 10)),
        title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50)
      });
    }

    return res.json({ questions });
  });

  // 热门资源
  app.get(baseUrl + '/list/resources', (req: Request, res: Response) => {
    print('get resources list');

    const resources: Record<string, unknown>[] = [];
    const sum: number = Random.integer(6, 9);
    for (let i: number = 0; i < sum; ++i) {
      resources.push({
        id: Random.increment(Random.integer(1, 10)),
        title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50)
      });
    }

    return res.json({ resources });
  });

  // 热门搜索
  app.get(baseUrl + '/list/search', (req: Request, res: Response) => {
    print('get search list(hot)');

    const search: string[] = [];
    const sum: number = Random.integer(10, 25);
    for (let i: number = 0; i < sum; ++i)
      search.push(Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50));
    return res.json({ search });
  });

  // 热门标签
  app.get(baseUrl + '/list/tags', (req: Request, res: Response) => {
    const type: number = int(req.query.type);

    print('get tags list(hot)', { type });

    const tags: string[] = [];
    const sum: number = Random.integer(10, 25);
    for (let i: number = 0; i < sum; ++i) tags.push(getRandomTag());

    return res.json({ tags });
  });
}
