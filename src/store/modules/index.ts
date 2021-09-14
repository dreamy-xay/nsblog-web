/*
 * @Description: modules整合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:40:03
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-13 21:14:39
 */
import global from './global';
import message from './message';
import globalStore from './globalStore';
import user from './user';

/* 所有模块 */
const modules: Record<string, unknown> = {
  global,
  message,
  globalStore,
  user
};

const persistedstatePath: string[] = []; // 持久化模块

// 预处理 persistedstatePath
for (const key in modules)
  if (Object.prototype.hasOwnProperty.call(modules[key], 'persistedstate')) {
    if (modules[key]['persistedstate']) persistedstatePath.push(key);
    delete modules[key]['persistedstate'];
  }

export { persistedstatePath };

export default modules;
