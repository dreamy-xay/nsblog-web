/*
 * @Description: user
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-23 23:15:05
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-02 17:08:19
 */
import { Random } from 'better-mock';
import { Application, Request, Response } from 'express';
import select, { DataBaseOperator } from '../data/index';
import { clearToken, verifyToken, getToken, int } from './util';

export default function(baseUrl: string, app: Application) {
  // 获取用户信息
  app.get(baseUrl + '/users', (req: Request, res: Response) => {
    const username: string = req.query.username as string;
    const type = int(req.query.type);
    const user = select('users').findOne({ username });
    if (type === 0) {
      if (user && user.isActive) {
        return res.json({
          username,
          nickname: user.nickname,
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', username),
          email: user.email,
          profession: '',
          birthday: Random.datetime(),
          gender: 1,
          address: Random.province(),
          city: Random.province(),
          signature: Random.paragraph(5, 30),
          qq: Random.natural(1000000000, 3000000000),
          weibo: Random.word(5, 15)
        });
      }
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
      }
    } else return res.status(410).json({ error: 'User name error' });
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
