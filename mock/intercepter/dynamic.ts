/*
 * @Description: 动态api
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 15:43:02
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-21 18:23:13
 */
import { Application, Request, Response } from 'express';
import { Random } from 'better-mock';
import { int, print, randomUsers, RandomUser, getRandomTopic, getRandomTag } from './util';
import select from '../data/index';

export default function(baseUrl: string, app: Application) {
  // 获取动态数据
  app.get(baseUrl + '/dynamic', (req: Request, res: Response) => {
    const { username, limit, offset } = req.query;
    if (username && !select('users').findOne({ username })) return res.status(410).json({ error: 'User name error' });

    print('get dynamics', { username, limit, offset });

    function getRandom(limit: number): Record<string, unknown>[] {
      const ans: Record<string, unknown>[] = new Array<Record<string, unknown>>();
      for (let i: number = 0; i < limit; ++i) {
        ans.push({
          time: Random.datetime(),
          content: randomDynamic()
        });
      }
      return ans;
    }
    return res.json({ dynamic: getRandom(int(offset) >= 66 ? 0 : Math.min(int(limit), 66 - int(offset))) });
  });
}

/**
 * @description: 随机获得html动态
 * @return {string} 返回随机动态
 * @author: dreamy-xay
 */
function randomDynamic(): string {
  const randomNum: number = Random.integer(1, 100000) % 10;
  const RUsers = randomUsers();
  if (randomNum === 0) {
    const user: RandomUser = RUsers.random();
    const tag: string = getRandomTag(getRandomTopic());
    return `<div class="" style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;在开源组创建了专题标签&nbsp;
        <a style="color: #4a9afd;" href="${`/tag/${tag}`}" target="${`/tag/${tag}`}">${tag}</a>
     </div>`;
  } else if (randomNum === 1) {
    const user1: RandomUser = RUsers.random();
    const user2: RandomUser = RUsers.random();
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user1.username}`}" target="${`/user/${user1.username}`}">${
      user1.nickname
    }</a>
        &nbsp;关注了&nbsp;
        <a style="color: #4a9afd;" href="${`/user/${user2.username}`}" target="${`/user/${user2.username}`}">${
      user2.nickname
    }</a>
     </div>`;
  } else if (randomNum === 2) {
    const user: RandomUser = RUsers.random();
    const articleName: string = Random.ctitle(5, 20);
    const articleId: number = Random.integer(0, 1000000);
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;发布了文章&nbsp;
        <a style="color: #4a9afd;" href="${`/article/${articleId}`}" target="${`/article/${articleId}`}">${articleName}</a>
     </div>`;
  } else if (randomNum === 3) {
    const user1: RandomUser = RUsers.random();
    const user2: RandomUser = RUsers.random();
    const questionName: string = Random.ctitle(5, 20);
    const questionId: number = Random.integer(0, 1000000);
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user1.username}`}" target="${`/user/${user1.username}`}">${
      user1.nickname
    }</a>
        &nbsp;回复了&nbsp;
        <a style="color: #4a9afd;" href="${`/user/${user2.username}`}" target="${`/user/${user2.username}`}">${
      user2.nickname
    }</a>
        &nbsp;的问题&nbsp;
        <a style="color: #4a9afd;" href="${`/question/${questionId}`}" target="${`/question/${questionId}`}">${questionName}</a>
     </div>`;
  } else if (randomNum === 4) {
    const user: RandomUser = RUsers.random();
    const articleName: string = Random.ctitle(5, 20);
    const articleId: number = Random.integer(0, 1000000);
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;评论了文章&nbsp;
        <a style="color: #4a9afd;" href="${`/article/${articleId}#comment`}" target="${`/article/${articleId}#comment`}">${articleName}</a>
     </div>`;
  } else if (randomNum === 5) {
    const user: RandomUser = RUsers.random();
    const resourceName: string = Random.ctitle(5, 20);
    const resourceId: number = Random.integer(0, 1000000);
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;上传了资源&nbsp;
        <a style="color: #4a9afd;" href="${`/resource/${resourceId}`}" target="${`/resource/${resourceId}`}">${resourceName}</a>
     </div>`;
  } else if (randomNum === 6) {
    const user: RandomUser = RUsers.random();
    const group: string = Random.ctitle(3, 10);
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;加入了学习小组&nbsp;
        <a style="color: #4a9afd;" href="${`/group/${group}`}" target="${`/group/${group}`}">${group}</a>
     </div>`;
  } else if (randomNum === 7) {
    const user: RandomUser = RUsers.random();
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        &nbsp;你查看了&nbsp;
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;的&nbsp;
        <a style="color: #4a9afd;" href="${`/blog/${user.username}`}" target="${`/blog/${user.username}`}">博客</a>
     </div>`;
  } else if (randomNum === 8) {
    const user: RandomUser = RUsers.random();
    const solicitationName: string = Random.ctitle(5, 20);
    const solicitationId: number = Random.integer(0, 1000000);
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;发布了征集令&nbsp;
        <a style="color: #4a9afd;" href="${`/solicitation/${solicitationId}`}" target="${`/solicitation/${solicitationId}`}">${solicitationName}</a>
     </div>`;
  } else {
    const user: RandomUser = RUsers.random();
    const articleName: string = Random.ctitle(5, 20);
    const articleId: number = Random.integer(0, 1000000);
    return `<div style="font-size: 14px; color: #262626; display: flex;">
        <a style="color: #4a9afd;" href="${`/user/${user.username}`}" target="${`/user/${user.username}`}">${
      user.nickname
    }</a>
        &nbsp;点赞了你的文章&nbsp;
        <a style="color: #4a9afd;" href="${`/article/${articleId}`}" target="${`/article/${articleId}`}">${articleName}</a>
     </div>`;
  }
}
