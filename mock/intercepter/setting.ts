/*
 * @Description: setting
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 23:12:21
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-21 21:54:01
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { print, verifyToken, getToken } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 消息设置获取
  app.get(baseUrl + '/setting/message', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    print('get message settings', { username });

    const setting: Record<string, unknown> = {
      message_prompt: Random.natural(0, 1),
      comment_message_prompt: Random.natural(0, 1),
      attention_message_prompt: Random.natural(0, 1),
      like_message_prompt: Random.natural(0, 1),
      chat_message_prompt: Random.natural(1, 3)
    };
    return res.json(setting);
  });

  // 历史记录设置获取
  app.get(baseUrl + '/setting/history', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    print('get history settings', { username });

    const setting: Record<string, unknown> = {
      history_record: Random.natural(0, 1)
    };
    return res.json(setting);
  });

  // 隐私设置获取
  app.get(baseUrl + '/setting/privacy', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get privacy settings', { username });

    const setting: Record<string, unknown> = {
      view_dynamic: Random.integer(0, 1),
      view_ask: Random.integer(0, 1),
      view_profile: Random.integer(0, 1)
    };
    return res.json(setting);
  });

  // 设置修改
  app.put(baseUrl + '/setting', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    print('modefify settings', { username, settings: JSON.stringify(req.body) });

    res.send();
  });
}
