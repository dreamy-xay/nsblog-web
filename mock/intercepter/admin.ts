/*
 * @Description: 管理员api伪造数据
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-11 22:31:35
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-07-17 16:08:27
 */

import { Application, Request, Response } from 'express';

export default function(baseUrl: string, app: Application) {
  app.get(baseUrl + '/admin', (req: Request, res: Response) => {
    return res.send({});
  });
}
