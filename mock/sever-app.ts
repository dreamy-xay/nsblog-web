/*
 * @Description: devSever 请求拦截
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-11 21:28:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-12 22:05:53
 */
import { Application } from 'express';
import intercepter from './app';
import * as bodyParser from 'body-parser';

export default function sever(app: Application) {
  if (process.env.VUE_APP_MOCK_SEVER === 'false' && process.env.VUE_APP_MOCK !== 'false') {
    // 监听api端口
    app.listen(process.env.VUE_APP_APIPORT);

    // 解析body
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    // 打印请求状态
    app.use((req, res, next) => {
      if (new RegExp(process.env.VUE_APP_APIROUTER).test(req.url))
        console.log(`request invoke: ${req.method} ${req.url}`);
      next();
    });

    // 拦截
    intercepter(app);
  }
}
