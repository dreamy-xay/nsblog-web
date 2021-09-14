/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:15:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-13 14:22:54
 */
import { Random, mock } from 'better-mock';
import { Application, Request, Response } from 'express';
import select, { DataBaseOperator } from '../data/index';
import { clearToken, verifyToken, getToken, int } from './util';
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
    const user = select('users').findOne({ username });
    if (type === 0) {
      if (user && user.isActive) {
        const gender: number = Random.integer(0, 2);
        const tags: string[] = [];
        const sum: number = Random.integer(0, 20);
        for (let i: number = 0; i < sum; ++i)
          tags.push(Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10));
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
        for (let i: number = 0; i < sum; ++i)
          tags.push(Random.integer(0, 1) ? Random.word(2, 10) : Random.cword(2, 10));

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
            data: mock({
              'list|12': ['@natural(0, 100)']
            }).list,
            release_recently: Random.natural(0, 10000)
          }
        });
      } else return res.status(410).json({ error: 'User name error' });
    } else return res.status(410).json({ error: 'Type error' });
  });

  // 注册新用户
  app.post(baseUrl + '/users', (req: Request, res: Response) => {
    const { username, email, password, code } = req.body;
    const users: DataBaseOperator = select('users');
    const codes: DataBaseOperator = select('codes');
    if (codes.findOne({ code, email })) {
      codes.removeOne({ code, email });
      users.insertOne({ username, password, email, token: null, isActive: true, isSuper: false });
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
      console.log(`--------modify userInfo: username=>${username}  profession=>${profession}   address=>${address}`);
    } else {
      const { nickname, gender, city, birthday, profile } = req.body;
      select('users').modifyOne({ username }, { nickname });
      console.log(
        `--------modify userInfo: username=>${username}  nickname=>${nickname}   gender=>${gender}  city=>${city}  birthday=>${birthday}  profile=>${profile}`
      );
    }
    return res.send();
  });

  // 邮箱发送验证码
  app.post(baseUrl + '/users/email/validation', (req: Request, res: Response) => {
    const { code, email } = req.body;

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
    if (codes.findOne({ code, email })) {
      codes.removeOne({ code, email });
      const user: Record<string, unknown> = select('users').findOne({ email });
      return res.json({ username: user.username, data: user.password });
    } else return res.status(403).json({ error: 'code error' });
  });

  // 忘记密码，修改
  app.post(baseUrl + '/users/password', (req: Request, res: Response) => {
    const { username, password, data } = req.body;
    const users: DataBaseOperator = select('users');
    if (data === users.findOne({ username }).password) {
      users.modifyOne({ username }, { password });
      clearToken(username);
      return res.send();
    } else return res.status(403).json({ error: 'You have no modification' });
  });

  // 查询存在信息
  app.get(baseUrl + '/users/exist', (req: Request, res: Response) => {
    const { username, email } = req.query;

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
    console.log(`--------modify avatar: username=>${username}  avatar=>${avatar}`);
    return res.send();
  });

  // 设置个性签名
  app.put(baseUrl + '/users/signature', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { signature } = req.body;
    console.log(`--------modify signature: username=>${username}  signature=>${signature}`);
    return res.send();
  });

  // 换绑邮箱
  app.put(baseUrl + '/users/email', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { email } = req.body;
    console.log(`--------modify email: username=>${username}  email=>${email}`);
    return res.send();
  });

  // 绑定微博
  app.post(baseUrl + '/users/weibo', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { weibo } = req.body;
    console.log(`--------modify weibo: username=>${username} weibo=>${weibo}`);
    return res.send();
  });

  // 解绑微博
  app.delete(baseUrl + '/users/weibo', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    console.log(`--------delete weibo: username=>${username} `);
    return res.send();
  });

  // 绑定QQ
  app.post(baseUrl + '/users/qq', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { qq } = req.body;
    console.log(`--------modify qq: username=>${username} qq=>${qq}`);
    return res.send();
  });

  // 解绑QQ
  app.delete(baseUrl + '/users/qq', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    console.log(`--------delete weibo: username=>${username} `);
    return res.send();
  });

  // 获取兴趣标签
  app.get(baseUrl + '/users/tag', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`--------${username} getTags...`);

    const tags: string[] = [];
    const sum: number = Random.integer(5, 10);
    for (let i: number = 0; i < sum; ++i) tags.push(Random.integer(0, 1) ? Random.word(5, 9) : Random.cword(2, 6));
    return res.send({ tags });
  });

  // 添加兴趣标签
  app.post(baseUrl + '/users/tag', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { name } = req.body;
    console.log(`--------add tags: username=>${username}   name=>${name}`);
    return res.send();
  });

  // 删除兴趣标签
  app.delete(baseUrl + '/users/tag/:name', (req: Request, res: Response) => {
    if (!verifyToken(req.headers)) return res.status(401).json({ error: 'Unauthorized' });
    const username: string = getToken(req.headers).username;
    const { name } = req.params;
    console.log(`--------delete tags: username=>${username}   name=>${name}`);
    return res.send();
  });

  // 获取个人介绍
  app.get(baseUrl + '/users/profile', (req: Request, res: Response) => {
    const { username } = req.query;
    if (!select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });
    console.log(`--------${username} getProfile...`);
    return res.send({ profile: Random.integer(0, 1) ? Random.paragraph(1, 10) : Random.cparagraph(1, 10) });
  });
}
