/*
 * @Description: 文章api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 21:24:06
<<<<<<< HEAD
 * @LastEditors: clq
 * @LastEditTime: 2021-09-24 15:09:13
=======
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 19:39:14
>>>>>>> f40f2a0f40ab59d1bb006dc05e2a5e6cdaa9e7ba
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, verifyToken, getToken, RandomUser, randomUsers } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取发布的文章
  app.get(baseUrl + '/articles', (req: Request, res: Response) => {
    const { username, limit, offset, release_time, browsing_count, tag, category } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(
      `--------${username} getArticles...  tag=>${tag}  category=>${category}  release_time=>${release_time}  browsing_count=>${browsing_count}`
    );

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          id: Random.increment(),
          title: Random.integer(0, 1) ? Random.title(3, 100) : Random.ctitle(3, 50),
          content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          topic_tag: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
          page_view: Random.integer(0, 300),
          comment_count: Random.integer(0, 200),
          recommend_count: Random.integer(0, 900),
          release_time: Random.datetime()
        });
      }
      return ans;
    }
    return res.json({ articles: getRandom(int(offset) >= 78 ? 0 : Math.min(int(limit), 78 - int(offset))) });
  });

  // 获取用户文章所有分类
  app.get(baseUrl + '/articles/categories', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`--------${username} getArticlesCategories... `);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        ans.push({ id: Random.id(), name: Random.integer(0, 1) ? Random.word() : Random.cword() });
      return ans;
    }

    return res.json({ categories: getRandom(Random.integer(0, 40)) });
  });

  // 获取用户文章所有分类
  app.get(baseUrl + '/articles/tags', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`--------${username} getArticlesTags... `);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        ans.push({ id: Random.id(), name: Random.integer(0, 1) ? Random.word() : Random.cword() });
      return ans;
    }

    return res.json({ tags: getRandom(Random.integer(0, 40)) });
  });

  // 文章侧边栏菜单，获取详情
  app.get(baseUrl + '/articles/users', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`--------${username} getArticlesUsersInfo... `);

    function getRandom(limit: number, isRecent: boolean = true): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        if (isRecent)
          ans.push({
            title: Random.integer(0, 1) ? Random.title() : Random.ctitle(),
            article_id: Random.id()
          });
        else
          ans.push({
            title: Random.integer(0, 1) ? Random.title() : Random.ctitle(),
            link: Random.url()
          });
      return ans;
    }

    const user: RandomUser = randomUsers(username as string).random();
    const ans: Record<string, unknown> = {
      username: user.username,
      nickname: user.nickname,
      avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
      signature: (Random.integer(0, 1) ? Random.cparagraph(1, 1) : Random.paragraph(1, 1)).slice(0, 128),
      article_count: Random.integer(0, 100),
      category_count: Random.integer(0, 40),
      tag_count: Random.integer(0, 40),
      recent_article: getRandom(Random.integer(0, 10)),
      friend_chain: getRandom(Random.integer(0, 40), false)
    };

    return res.json(ans);
  });

  // 修改文章状态，推荐反对还是不操作
  app.put(baseUrl + '/articles/evaluation', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type, article_id } = req.body;
    console.log(`--------${username} modifyArticleEvaluation... :   type=>${type}  article_id=>${article_id}`);
    return res.status(200).send();
  });

  // 获取文章评论
  app.get(baseUrl + '/articles/comments', (req: Request, res: Response) => {
    let username: string = '';
    if (verifyToken(req.headers)) username = getToken(req.headers).username;
    const { article_id, comment_id, limit, offset } = req.query;
    console.log(
      `--------getArticlesComments... :  article_id=>${article_id}  ${comment_id ? 'comment_id=>' + comment_id : ''}`
    );

    const RUsers = randomUsers(username);
    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];

      function getComments(): Record<string, unknown> {
        let ans: Record<string, unknown> = {};
        if (article_id) {
          ans = { child_comments: [] };
          const sum = Random.integer(0, 5);
          for (let i: number = 0; i < sum; ++i) {
            const user: RandomUser = RUsers.random();
            const params: Record<string, unknown> = username !== '' ? { evaluation: Random.integer(0, 2) } : {};
            (ans.child_comments as any).push({
              comment_id: Random.id(),
              username: user.username,
              avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
              time: Random.time(),
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
          comment_id: Random.id(),
          username: user.username,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
          time: Random.time(),
          content: Random.integer(0, 1) ? Random.paragraph(1, 3) : Random.cparagraph(1, 3),
          support_count: Random.integer(0, 9999),
          oppose_count: Random.integer(0, 9999),
          ...params,
          ...getComments()
        });
      }

      return ans;
    }

    return res.json({ comments: getRandom(int(offset) >= 25 ? 0 : Math.min(int(limit), 25 - int(offset))) });
  });

  // 修改文章评论状态，推荐反对还是不操作
  app.put(baseUrl + '/articles/comments/evaluation', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type, comment_id } = req.body;
    console.log(`--------${username} modifyArticleCommentsEvaluation... :   type=>${type}  comment_id=>${comment_id}`);
    return res.status(200).send();
  });

  // 获取文章详情
  app.get(baseUrl + '/articles/:article_id(\\d+)', (req: Request, res: Response) => {
    let username: string = '';
    if (verifyToken(req.headers)) username = getToken(req.headers).username;

    const { article_id } = req.params;
    console.log(`--------${username} getDetailArticles:  article_id=>${article_id}`);

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      for (let i: number = 0; i < limit; ++i)
        ans.push({ id: Random.id(), name: Random.integer(0, 1) ? Random.word() : Random.cword() });
      return ans;
    }

    const params: Record<string, unknown> =
      username !== ''
        ? {
            evaluation: Random.integer(0, 2),
            attention: Random.integer(0, 1),
            collection: Random.integer(0, 2)
          }
        : {};

    const user: RandomUser = randomUsers().random();
    const ans: Record<string, unknown> = {
      article_id,
      title: Random.integer(0, 1) ? Random.title() : Random.ctitle(),
      username: user.username,
      nickname: user.nickname,
      avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', user.username),
      release_time: Random.datetime(),
      page_view: Random.integer(0, 1000),
      comment_count: Random.integer(0, 1000),
      topic: Random.integer(0, 1) ? Random.word() : Random.cword(),
      categories: getRandom(Random.integer(0, 2)),
      tags: getRandom(Random.integer(0, 3)),
      content: Random.integer(0, 1) ? Random.paragraph(3, 100) : Random.cparagraph(3, 100),
      recommend_count: Random.integer(0, 1000),
      ...params,
      last_article: {
        article_id: Random.id(),
        title: Random.integer(0, 1) ? Random.title() : Random.ctitle()
      },
      next_article: {
        article_id: Random.id(),
        title: Random.integer(0, 1) ? Random.title() : Random.ctitle()
      }
    };

    return res.json(ans);
  });
}
