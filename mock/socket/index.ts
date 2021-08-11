/*
 * @Description: socket.io
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 21:44:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-11 18:59:03
 */
import { Random } from 'better-mock';
import { Server } from 'http';
import * as socketIo from 'socket.io';

export default (server: Server) => {
  const io = new socketIo.Server(server, {
    path: `${process.env.VUE_APP_APIROUTER}/messages`,
    cors: {
      origin: '*'
    }
  });

  const onlineUsers: Record<string, string> = {};
  let onlineCount: number = 0;

  io.on('connection', socket => {
    let toUser: string = null;
    let fromUser: string = null;
    let msg: string = null;
    let currentUser: string = null;

    // 聊天
    socket.on('online', userId => {
      if (!Object.prototype.hasOwnProperty.call(onlineUsers, userId)) {
        onlineUsers[userId] = socket.id;
        onlineCount++;
        currentUser = userId;
      }

      //建立连接后 用户点击不同通讯录都是建立同样的socket对象
      console.log('在线人数：', onlineCount);
      console.log(onlineUsers);

      socket.on('sendMessage', obj => {
        toUser = obj.toUser;
        fromUser = obj.fromUser;
        msg = obj.message;

        if (toUser === 'allUser') {
          for (const user in onlineUsers)
            if (user != fromUser) io.to(onlineUsers[user]).emit('receiveMessage', msg);
            else if (toUser in onlineUsers) io.to(onlineUsers[toUser]).emit('receiveMessage', msg);
            else console.log(toUser + '不在线');
        }
      });

      socket.on('disconnect', () => {
        if (Object.prototype.hasOwnProperty.call(onlineUsers, currentUser)) {
          --onlineCount;
          console.log('离开一人(' + currentUser + ')，在线人数：', onlineCount);
          delete onlineUsers[currentUser];
          currentUser = null;
          console.log(onlineUsers);
        }
      });
    });

    // 消息
    function getRandom(type: number): Record<string, unknown> {
      let content: unknown;
      if (type === 1) content = Random.integer(0, 1) ? Random.cparagraph(1, 10) : Random.paragraph(1, 10);
      else if (type === 2)
        content = {
          username: Random.word(4, 8),
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', Random.word(2, 4)),
          content: Random.integer(0, 1) ? Random.cparagraph(1, 10) : Random.paragraph(1, 10),
          type: Random.natural(1, 2),
          reply_username: Random.word(4, 8),
          reply_content: Random.integer(0, 1) ? Random.cparagraph(1, 10) : Random.paragraph(1, 10)
        };
      else if (type === 3)
        content = {
          username: Random.word(4, 8),
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', Random.word(2, 4)),
          type: Random.natural(1, 2),
          id: Random.id()
        };
      else
        content = {
          username: Random.word(4, 8),
          nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
          avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', Random.word(2, 4)),
          attention: Random.natural(0, 1) ? true : false
        };

      return {
        message_id: Random.increment(Random.integer(0, 10)),
        content,
        status: Random.integer(0, 1),
        time: Random.datetime()
      };
    }
    // 随机发送消息
    function messageNotice(timeout: number = Random.natural(100, 50000)) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        clearTimeout(timer);
        const type: number = Random.natural(1, 4);
        if (currentUser) {
          io.to(onlineUsers[currentUser]).emit('messageNotice', type, getRandom(type));
          console.log(`messageNotice:  type: ${type}`);
          messageNotice();
        }
      }, timeout);
    }

    messageNotice();
  });
};
