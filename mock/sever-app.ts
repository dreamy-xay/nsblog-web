/*
 * @Description: devSever 请求拦截
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-11 21:28:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-04-29 23:01:24
 */
import { Application } from 'express';
import http, { Server } from 'http';
import intercepter from './app';
import socket from './socket';
import * as bodyParser from 'body-parser';
import { Random } from 'better-mock';

export default function sever(app: Application) {
  if (process.env.VUE_APP_MOCK_SEVER === 'false' && process.env.VUE_APP_MOCK !== 'false') {
    const server: Server = http.createServer(app);

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
      if (new RegExp(process.env.VUE_APP_APIROUTER).test(req.url) && req.method.toLowerCase() !== 'options') {
        // 请求延时模拟
        const timer: NodeJS.Timeout = setTimeout(() => {
          if (process.env.VUE_APP_API_DEBUG !== 'false')
            console.log(
              '\x1B[45m\x1B[1m%s\x1b[0m\x1B[34m%s\x1b[0m%s',
              ' request invoke: ',
              ` ${req.method} `,
              `${req.url}`
            );
          next();
          clearTimeout(timer);
        }, Random.integer(300, 900));
      } else next();
    });

    // 拦截
    intercepter(app);

    // websocket
    socket(server);

    // 监听api端口
    server.listen(process.env.VUE_APP_APIPORT);
  }
}
