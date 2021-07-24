/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:15:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-24 15:18:46
 */
import { Random } from 'better-mock';
import { Application, Request, Response } from 'express';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  app.get(baseUrl + '/users/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const { type } = req.query;
    const user = select('users').findOne({ username });
    if (user && user.isActive)
      return res.json({
        username,
        nickname: Random.natural(0, 1) ? Random.name() : Random.cname(),
        avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', 'test'),
        registration_time: Random.datetime(),
        email: Random.email('qq.com'),
        recommend_count: Random.natural(0, 1000),
        dynamic_count: Random.natural(0, 1000),
        like_count: Random.natural(0, 1000),
        fans_count: Random.natural(0, 1000)
      });
    else return res.json({ msg: 'User does not exist' });
  });
}
