/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:15:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-04-29 11:29:35
 */
import { Random, mock } from 'better-mock';
import { Application, Request, Response } from 'express';
import select, { DataBaseOperator } from '../data/index';
import { print, verifyToken, getToken, int, getRandomTag } from './util';
import * as location from '../../src/util/json/location.json';

function randomAddress(): string {
  if (!Random.integer(0, 2)) return ',,';
  let data: Record<string, unknown>[] = location.Country;
  let ans: string = '';
  let index: number = 0;
  ans += data[index].CountryName;
  data = data[index].State as Record<string, unknown>[];
  index = Random.integer(0, data.length - 1);
  ans += ',' + data[index].StateName;
  data = data[index].City as Record<string, unknown>[];
  index = Random.integer(0, data.length - 1);
  ans += ',' + data[index].CityName;
  return ans;
}

export default function(baseUrl: string, app: Application) {
  // 获取用户信息
  app.get(baseUrl + '/users', (req: Request, res: Response) => {
    const username: string = req.query.username as string;
    const type = int(req.query.type);

    print('get user info', { username, type });

    const user = select('users').findOne({ username });
    if (type === 0) {
      if (user && user.isActive) {
        const gender: number = Random.integer(0, 2);
        const tags: string[] = [];
        const sum: number = Random.integer(0, 20);
        for (let i: number = 0; i < sum; ++i) tags.push(getRandomTag());
        return res.json({
          username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username),
          profession: '电商',
          birthday: Random.datetime(),
          gender: gender === 2 ? null : gender,
          address: randomAddress(),
          city: randomAddress(),
          signature: (Random.integer(0, 1) ? Random.cparagraph(1, 1) : Random.paragraph(1, 1)).slice(0, 128),
          profile: Random.integer(0, 1) ? Random.cparagraph(1, 8) : Random.paragraph(1, 8),
          tags
        });
      } else return res.status(410).json({ error: 'User name error' });
    } else if (type === 1) {
      if (user && user.isActive) {
        return res.json({
          username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username),
          email: user.email,
          registration_time: Random.datetime(),
          recommend_count: Random.natural(0, 1000),
          dynamic_count: Random.natural(0, 1000),
          like_count: Random.natural(0, 1000),
          fans_count: Random.natural(0, 1000)
        });
      } else return res.status(410).json({ error: 'User name error' });
    } else if (type === 2) {
      if (user && user.isActive) {
        const gender: number = Random.integer(0, 2);
        const tags: string[] = [];
        const sum: number = Random.integer(0, 20);
        for (let i: number = 0; i < sum; ++i) tags.push(getRandomTag());

        let articleChartData: Record<string, unknown>[] = mock({
          'list|0-40': [
            {
              time: '@datetime',
              count: '@integer(1,30)'
            }
          ]
        }).list;
        articleChartData = articleChartData.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
          return <string>a.time < <string>b.time ? -1 : 1;
        });

        return res.json({
          // 头部
          username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username),
          signature: (Random.integer(0, 1) ? Random.cparagraph(1, 1) : Random.paragraph(1, 1)).slice(0, 128),
          rank: Random.natural(0, 100000),
          // 关注相关
          like_count: Random.natural(0, 10000),
          fans_count: Random.natural(0, 10000),
          attention: getToken(req.headers).username === username ? null : Random.boolean(), // null
          // 获得成就
          registration_time: Random.datetime(),
          browse_count: Random.natural(0, 10000),
          recommend_count: Random.natural(0, 10000),
          collect_count: Random.natural(0, 10000),
          browse_yesterday: Random.natural(0, 10000), //
          recommend_yesterday: Random.natural(0, 10000), //
          collect_yesterday: Random.natural(0, 10000), //

          // 基本信息
          gender: gender === 2 ? null : gender,
          tags,
          qq: Random.integer(0, 2) ? Random.integer(1000000, 30000000000) : null,
          weibo: Random.integer(0, 2) ? Random.integer(1000000, 30000000000) : null,
          email: user.email,
          // 个人简介
          birthday: Random.datetime(),
          profession: Random.integer(0, 1) ? '电商' : null,
          address: randomAddress(),
          best_topic: tags[0],
          // 图表
          article_chart: {
            article_count: Random.natural(0, 10000),
            data: articleChartData,
            rank_total: Random.natural(0, 10000),
            rank_week: Random.natural(0, 10000),
            release_recently: Random.natural(0, 10000)
          },
          FAQ_chart: {
            FAQ_count: Random.natural(1000, 10000),
            question_count: Random.natural(0, 10000),
            reply_count: Random.natural(1000, 10000),
            reply_adoption: Random.natural(0, 1000)
          },
          resource_chart: {
            resource_count: Random.natural(0, 10000),
            ...mock({
              'data|12': ['@natural(0, 100)']
            }),
            release_recently: Random.natural(0, 10000)
          }
        });
      } else return res.status(410).json({ error: 'User name error' });
    } else if (type === 3) {
      if (user && user.isActive)
        return res.json({
          qq: Random.integer(0, 2) ? Random.integer(1000000, 30000000000) : null,
          weibo: Random.integer(0, 2) ? Random.integer(1000000, 30000000000) : null,
          email: user.email
        });
      else return res.status(410).json({ error: 'User name error' });
    } else return res.status(410).json({ error: 'Type error' });
  });

  // 注册新用户
  app.post(baseUrl + '/users', (req: Request, res: Response) => {
    const { username, email, password, code } = req.body;
    const users: DataBaseOperator = select('users');

    print('new user', { username, email, password, code });

    if (select('codes').findOne({ code, email })) {
      users.insertOne({ username, nickname: username, password, email, token: null, isActive: true, isSuper: false });
      select('codes').removeOne({ code, email });
      return res.status(201).json({ username });
    } else return res.status(403).json({ error: 'code error' });
  });

  // 修改用户信息
  app.put(baseUrl + '/users', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { type } = req.body;
    if (int(type)) {
      const { profession, address } = req.body;

      print('modify userInfo', { username, type, profession, address });
    } else {
      const { nickname, gender, city, birthday, profile } = req.body;
      select('users').modifyOne({ username }, { nickname });

      print('modify userInfo', { username, type, nickname, gender, city, birthday, profile });
    }
    return res.send();
  });

  // 换绑邮箱
  app.post(baseUrl + '/users/email', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { code, email } = req.body;

    print('modify email', { username, code, email });

    const codes: DataBaseOperator = select('codes');
    if (codes.findOne({ code, email })) {
      codes.removeOne({ code, email });
      select('users').modifyOne({ username }, { email });
      return res.send();
    } else return res.status(403).json({ error: 'code error' });
  });

  // 邮箱发送验证码
  app.post(baseUrl + '/users/email/validation', (req: Request, res: Response) => {
    const { code, email } = req.body;

    print('the mailbox sends the verification code', { code, email });

    const codes: DataBaseOperator = select('codes');

    codes.insertOne({ code, email });
    setTimeout(() => {
      codes.removeOne({ code, email });
    }, 300000); // 5 分钟后失效
    return res.send();
  });

  // 验证验证码
  app.get(baseUrl + '/users/email/validation', (req: Request, res: Response) => {
    const { code, email } = req.query;
    const codes: DataBaseOperator = select('codes');

    print('verification code', { code, email });

    if (codes.findOne({ code, email })) {
      codes.removeOne({ code, email });
      const user: Record<string, unknown> = select('users').findOne({ email });
      return res.json({ username: user.username, data: user.password });
    } else return res.status(403).json({ error: 'code error' });
  });

  // 忘记密码，修改
  app.post(baseUrl + '/users/password', (req: Request, res: Response) => {
    const { username, password, data } = req.body;

    print('forget the password and change it', { username, password, data });

    const users: DataBaseOperator = select('users');
    if (data === users.findOne({ username }).password) {
      users.modifyOne({ username }, { password });
      select('users').modifyOne({ username }, { token: null });
      return res.send();
    } else return res.status(403).json({ error: 'You have no modification' });
  });

  // 查询存在信息
  app.get(baseUrl + '/users/exist', (req: Request, res: Response) => {
    const { username, email } = req.query;

    print('get user exist', { username, email });

    const users: DataBaseOperator = select('users');
    if (username && email)
      return res.json({
        usernameExist: typeof users.findOne({ username }) !== 'undefined',
        emailExist: typeof users.findOne({ email }) !== 'undefined'
      });
    else if (username) return res.json({ usernameExist: typeof users.findOne({ username }) !== 'undefined' });
    else if (email) return res.json({ emailExist: typeof users.findOne({ email }) !== 'undefined' });
    return res.send();
  });

  // 设置头像
  app.put(baseUrl + '/users/avatar', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { avatar } = req.body;

    print('modify user avatar', { username, avatar });

    return res.send();
  });

  // 设置个性签名
  app.put(baseUrl + '/users/signature', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { signature } = req.body;

    print('modify user signature', { username, signature });

    return res.send();
  });

  // 换绑邮箱
  app.put(baseUrl + '/users/email', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { email } = req.body;

    print('modify user email', { username, email });

    return res.send();
  });

  // 绑定微博
  app.post(baseUrl + '/users/weibo', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { weibo } = req.body;

    print('modify user weibo', { username, weibo });

    return res.send();
  });

  // 解绑微博
  app.delete(baseUrl + '/users/weibo', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    print('delete user weibo', { username });

    return res.send();
  });

  // 绑定QQ
  app.post(baseUrl + '/users/qq', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { qq } = req.body;

    print('modify user qq', { username, qq });

    return res.send();
  });

  // 解绑QQ
  app.delete(baseUrl + '/users/qq', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    print('delete user qq', { username });

    return res.send();
  });

  // 获取兴趣标签
  app.get(baseUrl + '/users/tag', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get user tags', { username });

    const tags: string[] = [];
    const sum: number = Random.integer(5, 10);
    for (let i: number = 0; i < sum; ++i) tags.push(getRandomTag());
    return res.send({ tags });
  });

  // 添加兴趣标签
  app.post(baseUrl + '/users/tag', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { tag_name } = req.body;

    print('add user tags', { username, tag_name });

    return res.send();
  });

  // 删除兴趣标签
  app.delete(baseUrl + '/users/tag/:tag_name', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { tag_name } = req.params;

    print('delete user tags', { username, tag_name });

    return res.send();
  });

  // 获取个人介绍
  app.get(baseUrl + '/users/profile', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get user profile', { username });

    return res.send({ profile: Random.integer(0, 1) ? Random.paragraph(1, 10) : Random.cparagraph(1, 10) });
  });

  // 获取我的问答
  app.get(baseUrl + '/users/question', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;

    print('get users question info', { username });

    return res.json({
      reply_count: Random.integer(0, 100),
      question_count: Random.integer(0, 100),
      like_count: Random.integer(0, 100),
      accept_count: Random.integer(0, 100)
    });
  });
}
