/*
 * @Description: socket.io
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-10 21:44:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-11 13:52:09
 */
import { Server } from 'http';
import * as socketIo from 'socket.io';

export default (server: Server) => {
  const io = new socketIo.Server(server, {
    path: `${process.env.VUE_APP_APIROUTER}/messages`,
    cors: {
      origin: '*'
    }
  });

  let onlineUsers = {};
  let onlineCount = 0;

  io.on('connection', socket => {
    let toUser = null;
    let fromUser = null;
    let msg = null;
    let currentUser = null;

    socket.on('online', userId => {
      if (!(userId in onlineUsers)) {
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
          for (const user in onlineUsers) {
            if (user != fromUser) io.to(onlineUsers[user]).emit('receiveMessage', msg);
          }
        } else if (toUser in onlineUsers) {
          io.to(onlineUsers[toUser]).emit('receiveMessage', msg);
        } else {
          console.log(toUser + '不在线');
        }
      });

      socket.on('disconnect', () => {
        onlineCount--;
        console.log('离开一人(' + currentUser + ')，在线人数：', onlineCount);
        delete onlineUsers[currentUser];
        currentUser = null;
        console.log(onlineUsers);
      });
    });
  });
};
