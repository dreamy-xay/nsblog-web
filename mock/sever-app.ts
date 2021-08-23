/*
 * @Description: devSever 请求拦截
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-11 21:28:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-23 13:47:42
 */
import { Application } from 'express';
import { Server } from 'http';
import intercepter from './app';
import socket from './socket';
import * as bodyParser from 'body-parser';

export default function sever(app: Application) {
  if (process.env.VUE_APP_MOCK_SEVER === 'false' && process.env.VUE_APP_MOCK !== 'false') {
    // 解析body
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    // 跨域
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Methods', '*');
      next();
    });

    // 打印请求状态
    app.use((req, res, next) => {
      if (new RegExp(process.env.VUE_APP_APIROUTER).test(req.url) && req.method.toLowerCase() !== 'options')
        console.log(`request invoke: ${req.method} ${req.url}`);
      next();
    });

    // 拦截
    intercepter(app);

    // 监听api端口
    const server: Server = app.listen(process.env.VUE_APP_APIPORT);

    // websocket
    socket(server);
  }
}
