/*
 * @Description: 收藏api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 11:59:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-12 11:24:09
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { print, getToken, verifyToken, int } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取收藏夹或者收藏
  app.get(baseUrl + '/favorites', (req: Request, res: Response) => {
    const { username, limit, offset, favorite_id, is_all, type } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get favorites', { username, limit, offset, favorite_id, is_all, type });

    function getRandom(limit: number, hasType: boolean = true): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        const type: Record<string, unknown> = hasType ? { type: Random.natural(1, 3) } : {};
        ans.push({
          collection_id: Random.increment(Random.integer(1, 10)),
          content_id: Random.increment(Random.integer(1, 10)),
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
      const ans: Record<string, unknown>[] = [];
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
          favorite_id: Random.increment(Random.integer(1, 10)),
          name: i ? (Random.natural(0, 2) ? Random.cword(1, 8) : Random.word(2, 15)) : '默认收藏夹',
          count: Random.integer(1, 99),
          is_private: Random.integer(0, 1) ? true : false,
          ...all,
          collections
        });
      }
      return res.json({ favorites: ans });
    }
  });

  // 新建收藏夹
  app.post(baseUrl + '/favorites', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { name, is_private, remark } = req.body;

    print('new favorites', { username, name, is_private, remark });

    return res.json({
      id: Random.increment(Random.integer(1, 10))
    });
  });

  // 删除收藏夹
  app.delete(baseUrl + '/favorites/:favorite_id(\\d+)', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { favorite_id } = req.params;

    print('delete favorites', { username, favorite_id });

    return res.send();
  });

  // 添加收藏
  app.post(baseUrl + '/favorites/collections', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type, content_id, favorite_id } = req.body;

    print('add favorites collections', { username, type, content_id, favorite_id });

    return res.json({
      id: Random.increment(Random.integer(1, 10))
    });
  });

  // 取消收藏
  app.delete(baseUrl + '/favorites/collections/:collection_id(\\d+)', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { collection_id } = req.params;

    print('cancel favorites collections', { username, collection_id });

    return res.send();
  });

  // 修改收藏夹名字
  app.put(baseUrl + '/favorites/name', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { name, favorite_id } = req.body;

    print('modify favorites name', { username, name, favorite_id });

    return res.send();
  });

  // 修改收藏夹备注
  app.put(baseUrl + '/favorites/remark', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { remark, favorite_id } = req.body;

    print('modify favorites remark', { username, remark, favorite_id });

    return res.send();
  });

  // 修改收藏夹备注
  app.put(baseUrl + '/favorites/private', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { is_private, favorite_id } = req.body;

    print('modify favorites private', { username, is_private, favorite_id });

    return res.send();
  });
}
