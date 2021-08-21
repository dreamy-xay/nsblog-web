/*
 * @Description: socket.io
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 21:44:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-21 14:24:44
 */
import { Random } from 'better-mock';
import { Server } from 'http';
import * as socketIo from 'socket.io';

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
    path: `${process.env.VUE_APP_APIROUTER}/socket/messages`,
    cors: {
      origin: '*',
      allowedHeaders: '*',
      methods: '*'
    }
  });

  const onlineUsers: OnlineUser = new OnlineUser(io);

  io.on('connection', (socket: socketIo.Socket) => {
    // 聊天
    socket.on('online', (username: string) => {
      onlineUsers.online(username, socket.id);

      //建立连接后 用户点击不同通讯录都是建立同样的socket对象
      console.log('--------在线人数：', onlineUsers.count());
      console.log('--------', onlineUsers.getUsers());

      socket.on('sendMessage', (content: string, to: string, from: string) => {
        if (from === username && from !== to && onlineUsers.hasUser(to))
          onlineUsers.emit(to, 'receiveMessage', {
            username: from,
            nickname: Random.natural(0, 1000000) % 2 ? Random.cword(2, 4) : Random.word(4, 8),
            avatar: Random.image('150x150', '#234567', '#FFFFFF', 'png', from.slice(0, 4)),
            content,
            time: Random.now()
          });
      });

      function offline() {
        onlineUsers.offline(username, socket.id);
        console.log('离开一人(' + username + ' ' + socket.id + ')，在线人数：', onlineUsers.count());
        console.log('--------', onlineUsers.getUsers());
      }

      // 随机发送消息
      function messageNotice(timeout: number = Random.natural(100, 50000)) {
        const timer: NodeJS.Timeout = setTimeout(() => {
          clearTimeout(timer);
          const type: number = Random.natural(1, 5);
          if (onlineUsers.emit(username, 'notice', type)) {
            console.log(`--------messageNotice:  type: ${type}`);
            messageNotice();
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
