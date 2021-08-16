/*
 * @Description: modules整合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:40:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-16 16:47:13
 */
import global from './global';
import message from './message';

/* 所有模块 */
const modules: Record<string, unknown> = {
  global,
  message
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
