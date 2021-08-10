/*
 * @Description: 消息api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 19:45:44
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-10 20:01:23
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { verifyToken, getToken } from './util';

function int(value: unknown): number {
  return parseInt(value as string);
}

export default function(baseUrl: string, app: Application) {
  // 获取消息
  app.get(baseUrl + '/messages', (req: Request, res: Response) => {
    const { type, offset, limit } = req.query;
  });

  // 删除消息
  app.delete(baseUrl + '/messages/:message_id', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    console.log(`delete message: username ${username}   message_id ${req.params.message_id} success`);
    return res.send();
  });
}
