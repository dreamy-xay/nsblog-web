/*
 * @Description: modules整合
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-11 11:40:03
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-05-20 20:38:47
 */

/* 所有模块 */
const modules: Record<string, unknown> = {};

// require.context 第二个参数表示是否深度搜索模块（即搜索modules目录及其子目录下所有非 index.ts 的ts文件作为模块，false则表示不搜索子目录）
// 获取模块路径
const routeFiles: __WebpackModuleApi.RequireContext = require.context('./', false, /^\.\/((?!index).)+\.ts$/);
// 导入所有模块
routeFiles.keys().forEach((filePath: string) => {
  // 模块名即文件名
  const moduleName: string = filePath
    .substring(0, filePath.length - 3)
    .split('/')
    .pop();
  const module: Record<string, unknown> = require(`./${moduleName}`); // 导入模块
  modules[moduleName] = module.default || module;
});

// 持久化模块
const persistedstatePath: string[] = [];

// 预处理 persistedstatePath
for (const key in modules)
  if (Object.prototype.hasOwnProperty.call(modules[key], 'persistedstate')) {
    if (modules[key]['persistedstate']) persistedstatePath.push(key);
    delete modules[key]['persistedstate'];
  }

export { persistedstatePath };

export default modules;
