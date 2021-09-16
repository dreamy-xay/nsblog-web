/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 11:59:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-16 12:10:07
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { getToken, verifyToken, int } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取收藏夹或者收藏
  app.get(baseUrl + '/favorites', (req: Request, res: Response) => {
    // if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { username, limit, offset, favorite_id, is_all, type } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    console.log(`--------${username} getCollections...`);

    function getRandom(limit: number, hasType: boolean = true): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const type: Record<string, unknown> = hasType ? { type: Random.natural(1, 3) } : {};
        ans.push({
          collection_id: Random.id(),
          content_id: Random.id(),
          title: Random.natural(0, 3) ? Random.ctitle(7, 15) : Random.title(7, 12),
          ...type
        });
      }
      return ans;
    }

    if (favorite_id)
      res.json({
        collections: getRandom(int(offset) >= 29 ? 0 : Math.min(int(limit), 29 - int(offset)), int(type) === 0)
      });
    else {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      const cs: number = Random.natural(0, 15);
      for (let i: number = 0; i < cs; ++i) {
        const sum: number = Random.integer(1, 27);
        const collections: Record<string, unknown>[] = getRandom(
          int(offset) >= sum ? 0 : Math.min(int(limit), sum - int(offset)),
          int(type) === 0
        );
        const all: Record<string, unknown> = int(is_all)
          ? { remark: Random.integer(0, 1) ? Random.paragraph(1, 1) : Random.cparagraph(1, 2), time: Random.datetime() }
          : {};
        ans.push({
          id: Random.id(),
          name: Random.natural(0, 2) ? Random.cword(1, 8) : Random.word(2, 15),
          count: Random.integer(1, 99),
          is_private: Random.integer(0, 1) ? true : false,
          ...all,
          collections
        });
      }
      return res.json({ favorites: ans });
    }
  });

  // 添加收藏
  app.post(baseUrl + '/favorites/collections', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type, content_id, favorite_id } = req.body;
    console.log(
      `--------add favorites>collections: username=>${username}  type=>${type}  content_id=>${content_id}  favorite_id=>${favorite_id}  success`
    );
    return res.send();
  });

  // 取消收藏
  app.delete(baseUrl + '/favorites/collections/:collection_id', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { collection_id } = req.params;
    console.log(
      `--------cancel favorites>collections: username=>${username}  collection_id=>${collection_id}  success`
    );
    return res.send();
  });

  // 新建收藏夹
  app.post(baseUrl + '/favorites', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { name, is_private, remark } = req.body;
    console.log(
      `--------new favorites: username=>${username}   name=>${name}  is_private=>${is_private}  remark=>${remark}  success`
    );
    return res.send();
  });

  // 删除收藏夹
  app.delete(baseUrl + '/favorites/:favorite_id', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { favorite_id } = req.params;
    console.log(`--------delete favorites: username=>${username}  favorite_id=>${favorite_id}  success`);
    return res.send();
  });

  // 修改收藏夹名字
  app.put(baseUrl + '/favorites/name', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { name, favorite_id } = req.body;
    console.log(
      `--------cancel favorites>collections: username=>${username}  name=>${name}  favorite_id=>${favorite_id}  success`
    );
    return res.send();
  });

  // 修改收藏夹备注
  app.put(baseUrl + '/favorites/remark', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { remark, favorite_id } = req.body;
    console.log(
      `--------cancel favorites>collections: username=>${username}  remark=>${remark}  favorite_id=>${favorite_id}  success`
    );
    return res.send();
  });

  // 修改收藏夹备注
  app.put(baseUrl + '/favorites/private', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { is_private, favorite_id } = req.body;
    console.log(
      `--------cancel favorites>collections: username=>${username}  is_private=>${is_private}  favorite_id=>${favorite_id}  success`
    );
    return res.send();
  });
}
