/*
 * @Description: setting
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 23:12:21
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-07 18:17:45
 */

import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken, getToken } from './util';

export default function(baseUrl: string, app: Application) {
  // 消息设置获取
  app.get(baseUrl + '/setting/message', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
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
    const setting: Record<string, unknown> = {
      history_record: Random.natural(0, 1)
    };
    return res.json(setting);
  });

  // 设置修改
  app.put(baseUrl + '/setting', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    console.log(`--------modefify setting:  username=>${username}  setting=>${JSON.stringify(req.body)}`);
    res.send();
  });
}
