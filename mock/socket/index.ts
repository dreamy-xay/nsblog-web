/*
 * @Description: socket.io
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 21:44:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-14 12:26:01
 */
import { Random } from 'better-mock';
import { Server } from 'http';
import * as socketIo from 'socket.io';
import { print } from '../intercepter/util';

class OnlineUser {
  private users: Map<string, Set<string>>;
  private io: socketIo.Server;

  constructor(io: socketIo.Server) {
    this.io = io;
    this.users = new Map<string, Set<string>>();
  }

  public online(username: string, userId: string): void {
    if (this.users.has(username)) {
      if (this.users.get(username).has(userId)) return;
      this.users.get(username).add(userId);
    } else
      this.users.set(
        username,
        new Set<string>([userId])
      );
  }

  public offline(username: string, userId: string): void {
    if (this.users.has(username) && this.users.get(username).has(userId)) {
      this.users.get(username).delete(userId);
      if (this.users.get(username).size === 0) this.users.delete(username);
    }
  }

  public emit(username: string, ev: string, ...args: unknown[]): boolean {
    if (this.users.has(username)) {
      this.io.to([...this.users.get(username)]).emit(ev, ...args);
      return true;
    }
    return false;
  }

  public hasUser(username: string): boolean {
    return this.users.has(username);
  }

  public count(): number {
    return this.users.size;
  }

  public getUsers(): unknown {
    return this.users;
  }
}

export default (server: Server) => {
  const io = new socketIo.Server(server, {
    path: `${process.env.VUE_APP_SOCKETROUTER}/message`,
    cors: {
      origin: '*',
      allowedHeaders: '*'
    }
  });

  const onlineUsers: OnlineUser = new OnlineUser(io);

  io.on('connection', (socket: socketIo.Socket) => {
    // 聊天
    socket.on('online', (username: string) => {
      onlineUsers.online(username, socket.id);

      //建立连接后 用户点击不同通讯录都是建立同样的socket对象
      print(`在线人数: ${onlineUsers.count()}`);
      console.log('\x1B[32m>\x1b[0m ', onlineUsers.getUsers(), '\n');

      socket.on('sendMessage', (content: string, to: string, time: string, from: string) => {
        print('send message', { from, to, content, time });

        if (from === username && from !== to && onlineUsers.hasUser(to)) {
          messageNotice(to, 0, false, 5); // 通知来了新消息
          onlineUsers.emit(to, 'receiveMessage', {
            username: from,
            nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
            avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', from),
            content,
            time
          });
        }
      });

      function offline() {
        onlineUsers.offline(username, socket.id);
        print(`离开一人(${username} ${socket.id}，在线人数: ${onlineUsers.count()}`);
        console.log('\x1B[32m>\x1b[0m ', onlineUsers.getUsers(), '\n');
      }

      // 随机发送消息
      function messageNotice(
        to: string = username,
        timeout: number = Random.natural(100, 50000),
        infinity: boolean = true,
        type: number = Random.natural(1, 4)
      ) {
        const timer: NodeJS.Timeout = setTimeout(() => {
          clearTimeout(timer);
          if (onlineUsers.emit(to, 'notice', type)) {
            print('message notice', { type });
            if (infinity) messageNotice();
          }
        }, timeout);
      }
      // 调用随机发送消息
      messageNotice();

      socket.on('offline', offline);
      socket.on('disconnect', offline);
    });
  });
};
