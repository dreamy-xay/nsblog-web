/*
 * @Description: 搜索api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-19 13:30:35
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 14:37:00
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, RandomUser, randomUsers, verifyToken, getToken, getRandomTopic } from './utils';

export default function(baseUrl: string, app: Application) {
  // 获取搜索标签
  app.get(baseUrl + '/search', (req: Request, res: Response) => {
    const { keyword, type, time, limit, offset } = req.query;
    const option: number = int(req.query.option);
    const username: string = verifyToken(req.headers) ? getToken(req.headers).username : '';

    print('search', { username, keyword, option, type, time, limit, offset });

    const RUsers = randomUsers();
    function getRandom(limit: number, type: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = [];
      if (type === 0 || type === 1 || type === 2)
        for (let i: number = 0; i < limit; ++i) {
          const user: RandomUser = RUsers.random();
          ans.push({
            type: type ? type - 1 : Random.integer(0, 1), // 0为文章，1为问答
            id: Random.increment(Random.integer(1, 10)),
            title: Random.integer(0, 1) ? Random.title(3, 20) : Random.ctitle(3, 20),
            content: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.ctitle(1, 2),
            reply_count: Random.integer(0, 1000),
            browsing_count: 12,
            username: user.username,
            nickname: user.nickname,
            release_time: Random.datetime(),
            ...(username
              ? type === 1
                ? {
                    recommend: Random.integer(0, 1),
                    recommend_count: Random.integer(0, 3000)
                  }
                : {
                    like: Random.integer(0, 1),
                    like_count: Random.integer(0, 3000)
                  }
              : {})
          });
        }
      else if (type === 3)
        for (let i: number = 0; i < limit; ++i)
          ans.push({
            name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
            remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
            topic_name: getRandomTopic(),
            member_count: Random.integer(0, 300),
            join: Random.integer(0, 1)
          });
      else if (type === 4)
        for (let i: number = 0; i < limit; ++i) {
          const user: RandomUser = RUsers.random();
          ans.push({
            id: Random.increment(Random.integer(1, 10)),
            name: Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10),
            link: Random.url(),
            username: user.username,
            nickname: user.nickname,
            remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
            upload_time: Random.datetime()
          });
        }
      else if (type === 5)
        for (let i: number = 0; i < limit; ++i)
          ans.push({
            name: Random.integer(0, 1) ? Random.word(2, 8) : Random.cword(2, 5),
            remark: Random.integer(0, 1) ? Random.paragraph(1, 2) : Random.cparagraph(1, 2),
            article_count: Random.integer(0, 3000),
            attention_count: Random.integer(0, 3000),
            attention: Random.integer(0, 1)
          });
      else
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

    if (option === 0)
      return res.json({
        results: getRandom(int(offset) >= 151 ? 0 : Math.min(int(limit), 151 - int(offset)), option)
      });
    else if (option === 1)
      return res.json({
        articles: getRandom(int(offset) >= 151 ? 0 : Math.min(int(limit), 151 - int(offset)), option)
      });
    else if (option === 2)
      return res.json({
        questions: getRandom(int(offset) >= 151 ? 0 : Math.min(int(limit), 151 - int(offset)), option)
      });
    else if (option === 3)
      return res.json({
        gropus: getRandom(int(offset) >= 151 ? 0 : Math.min(int(limit), 151 - int(offset)), option)
      });
    else if (option === 4)
      return res.json({
        resources: getRandom(int(offset) >= 151 ? 0 : Math.min(int(limit), 151 - int(offset)), option)
      });
    else if (option === 5)
      return res.json({
        tags: getRandom(int(offset) >= 151 ? 0 : Math.min(int(limit), 151 - int(offset)), option)
      });
    else if (option === 6)
      return res.json({
        users: getRandom(int(offset) >= 151 ? 0 : Math.min(int(limit), 151 - int(offset)), option)
      });
    else return res.status(403).json({ error: 'error' });
  });

  // 获取相关搜索
  app.get(baseUrl + '/search/about', (req: Request, res: Response) => {
    const { keyword } = req.query;

    print('get about search', { keyword });

    const about: string[] = [];
    const sum: number = Random.integer(0, 15);
    for (let i: number = 0; i < sum; ++i) {
      const word: string = Random.integer(0, 1) ? Random.word(3, 15) : Random.cword(2, 10);
      const index: number = Random.integer(0, word.length - 1);
      about.push(word.slice(0, index) + keyword + word.slice(index, word.length));
    }

    return res.json({
      about
    });
  });
}
