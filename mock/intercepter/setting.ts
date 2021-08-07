/*
 * @Description: setting
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-03 23:12:21
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-07 13:05:47
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
      chat_message_prompt: Random.natural(0, 1)
    };
    return res.json(setting);
  });

  // 设置修改
  app.put(baseUrl + '/setting', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const { setting } = req.body;
    console.log(setting);
    res.send();
  });
}
