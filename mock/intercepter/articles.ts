/*
 * @Description: 文章api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-13 21:24:06
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-14 09:29:23
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取发布的文章
  app.get(baseUrl + '/articles', (req: Request, res: Response) => {
    const { username, limit, offset, release_time, browsing_count, tag, category } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(
      `${username} getArticles...  tag=>${tag}  category=>${category}  release_time=>${release_time}  browsing_count=>${browsing_count}`
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
}
