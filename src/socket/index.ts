/*
 * @Description: webSocket socket.io
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 12:25:53
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-24 23:12:14
 */
import io, { Socket } from 'socket.io-client';

const socket: Socket = io(`${process.env.VUE_APP_APIHOST}:${process.env.VUE_APP_APIPORT}`, {
  path: `${process.env.VUE_APP_APIROUTER}/socket/messages`
});

socket.on('connect', () => {
  console.log('>>>>>>> 和服务器已建立连接');
});

// 处理服务失去连接
socket.on('disconnect', () => {
  console.log('>>>>>>> 和服务器已断开连接');
});

export default socket;
